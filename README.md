# Évora Erasmus study package — 2026/27

English study support for five University of Évora classes. The active package was rebuilt from the course material visible in Moodle on **2 October 2026** and focuses on the work needed for assessments and practical projects.

## Start here

- [Passing guide](study/study_guide.html): assessment weights, minimum marks, dates, current topics, and project checklists.
- [Interactive practice](study/anki_cards.html): filter by course, foundation/exam-practice track, and question style; reveal answers and save review marks locally.
- [Anki import instructions](study/anki_decks/README.md): split and combined UTF-8 tab-separated imports.
- [Complete 604-card import](study/anki_import.txt).

The deck contains **279 foundation cards** and **325 exam-practice cards**:

| Course | Foundations | Exam practice | Total |
|---|---:|---:|---:|
| INF13207L — Web Technologies | 147 | 155 | 302 |
| INF13204L — Software Methods | 61 | 24 | 85 |
| MAT02354L — Probability and Statistics | 36 | 76 | 112 |
| INF14387L — Data Transformation and Analysis | 18 | 56 | 74 |
| INF13186L — Human–Computer Interaction | 17 | 14 | 31 |

## Repository layout

```text
.
├── index.html                 # Repository landing page
├── study/
│   ├── study_guide.html       # Passing-focused course guide
│   ├── anki_cards.html        # Interactive offline practice
│   ├── anki_import.txt        # All 604 cards
│   ├── anki_decks/            # Combined and split imports
│   └── audits/                # Coverage and source-scope reports
├── web-tech/                  # Reconstructed Web practical examples
└── chatgpt_prompt.md          # Original project brief and requirements
```

## Scope and provenance

The cards use the lectures, activities, notebook cells, assessment pages, and announcements reviewed for the five courses. They are generated study questions, not leaked or claimed past-paper questions. No actual past exam paper was available in the reviewed course pages.

Authenticated Moodle downloads, lecturer PDFs, the large course notebook, rendered review images, internal build caches, and backups are deliberately excluded from this public repository. They may contain course-distributed or personal material and are not required to use the finished deck. The audits record the relevant source names/pages without republishing those files.

The source material will change during the semester. Check Moodle before each assessment for new topic boundaries, rooms, deadlines, and project instructions.

## Validation

The exports were checked for UTF-8 encoding, real tab separators, three Anki directives, one physical line per note, balanced restricted HTML, unique questions, complete/disjoint foundation and exam-practice splits, valid local links, and matching embedded/downloaded card data. See [the validation report](study/validation-report.json).

