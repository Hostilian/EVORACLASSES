"""Check reviewed public interfaces and reject obvious private-file/credential accidents.

This is an offline guard, not a privacy, copyright or authenticated-flow guarantee.
No network request, secret access, private-progress read or artifact upload occurs.
"""
import json
import re
import subprocess
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
HTML_FILES = ["index.html", "study/today.html", "study/phone_setup.html", "study/pipeline.html"]
REVIEWED_FILES = HTML_FILES + ["README.md", "study/today.js", "study/today-plan.json", "scripts/check-study-plan.cjs", "scripts/validate-public-study.py", ".github/workflows/study-checks.yml"]
FORBIDDEN_SUFFIXES = {".pdf", ".doc", ".docx", ".ppt", ".pptx", ".ipynb", ".xls", ".xlsx", ".pem", ".p12", ".pfx", ".key"}
PRIVATE_NAMES = {"phone-sync-connection.json", "telegram-destination.json", "master-record.json", "private-study-progress.json", "daily-checklists.json", "credentials.json", "secrets.json", "token.txt"}
PRIVATE_DIRS = {"academic", "moodle_sources", "moodle-archive", "private-progress", "phone-sync-backend"}
SECRET_PATTERNS = [
    re.compile(r"\bgh[pousr]_[A-Za-z0-9]{30,}\b"),
    re.compile(r"\bgithub_pat_[A-Za-z0-9_]{40,}\b"),
    re.compile(r"(?<![A-Za-z0-9])\d{6,12}:[A-Za-z0-9_-]{35}(?![A-Za-z0-9_-])"),
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    re.compile(r"\bex\d+@alunos\.uevora\.pt\b", re.IGNORECASE),
]


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.csp = set(), [], False

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if "id" in values:
            if values["id"] in self.ids:
                raise ValueError("Duplicated page element ID")
            self.ids.add(values["id"])
        for name in ("href", "src"):
            if name in values:
                self.links.append(values[name])
        if tag == "meta" and values.get("http-equiv", "").lower() == "content-security-policy":
            self.csp = True


def page(path):
    parsed = Page()
    parsed.feed(path.read_text(encoding="utf-8-sig"))
    return parsed


def check_link(source, value):
    url = urlsplit(value)
    if url.scheme:
        if url.scheme != "https" or url.username or url.password or url.hostname in {"localhost", "127.0.0.1", "::1"}:
            raise ValueError("Unsafe public page link in " + source.name)
        return
    target = (source.parent / unquote(url.path)).resolve() if url.path else source
    if not target.is_relative_to(ROOT) or not target.is_file():
        raise ValueError("Missing or non-public local link in " + source.name + ": " + url.path)
    if url.fragment and target.suffix == ".html" and unquote(url.fragment) not in page(target).ids:
        raise ValueError("Missing local page fragment in " + source.name + ": " + url.fragment)


def guard_file(path):
    relative = path.relative_to(ROOT)
    if path.is_symlink() or not path.resolve().is_relative_to(ROOT):
        raise ValueError("Public file escapes the study package: " + relative.as_posix())
    if path.suffix.lower() in FORBIDDEN_SUFFIXES or path.name.lower() in PRIVATE_NAMES or any(part.lower() in PRIVATE_DIRS for part in relative.parts) or path.name.lower() == ".env" or path.name.lower().startswith(".env."):
        raise ValueError("Private/original file is tracked publicly: " + relative.as_posix())
    raw = path.read_bytes()
    if b"\x00" in raw[:4096]:
        return
    try:
        content = raw.decode("utf-8-sig")
    except UnicodeDecodeError:
        return
    if any(pattern.search(content) for pattern in SECRET_PATTERNS):
        # Never print a suspected secret or personal identifier.
        raise ValueError("Credential or private student identifier pattern in " + relative.as_posix())


def main():
    tracked = subprocess.run(["git", "ls-files", "-z"], cwd=ROOT, capture_output=True, check=True).stdout.decode("utf-8").split("\x00")
    files = {ROOT / value for value in tracked if value and (ROOT / value).is_file()}
    files.update(ROOT / value for value in REVIEWED_FILES)
    for path in files:
        guard_file(path)
    links = 0
    for relative in HTML_FILES:
        source = ROOT / relative
        parsed = page(source)
        if relative != "index.html" and not parsed.csp:
            raise ValueError("Study interface has no content security policy: " + relative)
        for value in parsed.links:
            check_link(source, value)
            links += 1
    plan = json.loads((ROOT / "study/today-plan.json").read_text(encoding="utf-8-sig"))
    # Source freshness is recorded independently of the authored suggestion date.
    authored = date.fromisoformat(plan["updated_on"])
    assert date.fromisoformat(plan["course_sources_last_checked"]) <= authored
    assert plan["weekly_base_minutes"] == 420 and plan["weekly_max_minutes"] == 480
    assert len(plan["courses"]) == 5
    assert all(date.fromisoformat(r["source_checked_on"]) <= authored for r in plan["requirements"])
    for override in plan.get("dated_priority_overrides", []):
        for task in override["priorities"]:
            for link in task.get("links", []):
                check_link(ROOT / "study/today.html", link["url"])
    result = subprocess.run(["node", str(ROOT / "scripts/check-study-plan.cjs")], cwd=ROOT, capture_output=True, text=True, check=True)
    print(json.dumps({"public_files_checked": len(files), "local_links_checked": links, "plan_contract": json.loads(result.stdout), "mode": "offline", "authenticated_flow_verified": False, "copyright_review_automated": False}))


if __name__ == "__main__":
    main()
