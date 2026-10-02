# MEGA PROMPT — Évora Erasmus Anki Deck Project (COMPLETE)
# Paste this ENTIRE file into ChatGPT (GPT-4o) / Claude / Gemini
# Last updated: includes ALL Moodle activities 00-05
# ============================================================

---

## 🎓 HOW THIS PROJECT STARTED — ORIGINAL PROMPTS (verbatim, typos included)

I am an **Erasmus student at the University of Évora, Portugal**. I have 5 classes, exams are in **English**, I don't speak Portuguese. Goal: pass all classes.

These were my exact messages to the AI:

> **"check and reaad literally everything for context, pls be so much through and dont miss anything let me know if there is more imformation you need from my side, there is no chance i could fail anything from this class i need to pass it but idk any portegese, make me html for me to study this class and especially exam oriented and also for specific examns and tests orinted anki cards pls very clear ones, and goal is to pass the class pls"**

> **"continue and dont open google chrome pls jsut use the ifnormation given"**

> **"continue"**

> **"exmans oriented right dififrent types of anki cards and htmls exam oriented also examsn gonna be english also in html there should be some yotube video links too"**

> **"read the old promts as well as the goals and make sure all done like anki accordingly and so forth"**

> **"where r all the anki files is the deep audit found no issues other than those"**

> **"but anki cards i wanna put the to anki it should be cards u know covering littterally all the files"**

> **"there should be many specially oriented anki cards no?"**

> **"gimme a chatgpt astra promt about this also include the original promts in it as well"**

> **"but the promt should include all my originnal poromts how we started the poroejct also it should have been oriented on for all evora classes"**

> **"did u had alll those ifnromation as well [pasted full Moodle content]... and could u add to to github pages solution to all those projects as well i think there are many especially 1 to 4 and anki cards exam oritented do u need mor information"**

---

## 📚 MY 5 ERASMUS CLASSES AT ÉVORA

1. **INF13207L — Tecnologias Web** (Web Technologies — Prof. José Saias) ← FULL CONTENT BELOW
2. **INF13204L — Metodologias e Desenvolvimento de Software** (Software Methods — Prof. Pedro Salgueiro)
3. **MAT02354L — Probabilidade e Estatística** (Probability & Statistics — Prof. Russell Jara)
4. **INF14387L — Transformação e Análise de Dados** (Data Analysis — Prof. Daniela Schmidt)
5. **INF13186L — Interação Pessoa-Máquina** (HCI — Prof. Paulo Quaresma)

---

## 📄 ANKI OUTPUT FORMAT — FOLLOW EXACTLY

```
#separator:tab
#html:true
#tags column:3

Front[TAB]Back[TAB]Tag
```

- **Real tab character** between columns — NOT pipe `|` NOT comma
- HTML allowed: `<b>` `<code>` `<br>` `<ul>` `<li>` `<pre>`
- One card per line
- Output **ALL 300+ cards** — do NOT stop, do NOT truncate

---

## 📘 INF13207L — TECNOLOGIAS WEB (Full Moodle Content)

### LECTURE STRUCTURE (Aulas Teóricas):
1. `01` — Web e introdução ao DW (Web intro & Development)
2. `02` — Apontadores e imagens (Links & Images)
3. `03a` — CSS: propriedades comuns, selectores (CSS common properties, selectors)
4. `03b` — CSS: display, float, position
5. `04` — Web design responsivo (Responsive web design)

### PRACTICAL ACTIVITIES (Atividades Práticas):
- `00` — Ambiente DW (Dev environment, HTTP, network tools)
- `01` — Conteúdos básicos, links (Basic content, links)
- `02` — CSS elementar (Elementary CSS)
- `03` — Cores e fundos (Colors and backgrounds)
- `04.1` — Elementos flutuantes (Float elements)
- `04.2` — Responsividade (Responsive design)
- `05` — Imagens responsivas (Responsive images)

---

### ACTIVITY 00 — Dev Environment & HTTP

**Network tools covered (need cards for these):**
- `ping` — test connectivity with a server, see response times
- `telnet` — verify network connectivity to a specific port
- `nmap` — scan port range to check which ports are active
- `curl` — test HTTP requests as if you were a browser
- `tcpdump` — capture network packets in transit
- `host`, `dig`, `nslookup` — DNS lookup details (hostname, IP address)
- `ifconfig` / `ipconfig` / `ip` — network interface info and IP addresses
- `netstat` / `ss` — network statistics, socket statistics
- `lynx` — command-line browser
- `nc` / `netcat` — send/receive IP packets

**Web development environment:**
- Browser = client-side tool
- Server = accepts HTTP requests, responds with content
- Python simple HTTP server: `python3 -m http.server 8080`
- Access local server: `http://localhost:8080/index.html`
- Common web ports: 80 (HTTP), 443 (HTTPS), 8080 (dev)
- Browser DevTools: Network tab to see HTTP traffic, Console for logs

**HTTP concepts:**
- HTTP = HyperText Transfer Protocol
- HTTPS = HTTP + SSL/TLS encryption (secure)
- HTTP 404 = File not found
- favicon.ico — browser requests this automatically for the tab icon
- `<link rel="icon" href="favicon.ico">` — add favicon in `<head>`

---

### ACTIVITY 01 — Basic HTML Content & Links

**HTML Document creation steps (from Moodle):**
1. Create folder `BlackGooseBistro`
2. Create `index.html` with basic content
3. Add `<head>`, `<title>`, `<body>` structure
4. Add `<h1>`, `<h2>`, `<p>`, `<em>`, `<ul>`, `<br>`
5. Add image `<img src="blackgoose.png" height="50">`
6. Add `<style>` internally first, then externalise to stylesheet.css
7. Run Python server and access via localhost
8. Add link to `menu.html`
9. Add fragment links in `menu.html` for each menu section
10. Add SVG image as a link (replace text link with SVG)
11. Create `horario.html` with: title = student name, list of enrolled subjects, timetable table where each cell links to the subject section above

**Fragment links from Activity 01:**
```html
<!-- Define fragment targets: -->
<h2 id="salmon">Salmon</h2>
<h2 id="steak">Steak</h2>

<!-- Link to fragments from top of page: -->
<a href="#salmon">Salmon</a>
<a href="#steak">Steak</a>

<!-- Link back to start page: -->
<a href="index.html">Start</a>
```

**HTML table structure (needed for horario.html):**
```html
<table>
  <tr>
    <th>Monday</th>
    <th>Tuesday</th>
  </tr>
  <tr>
    <td><a href="#web">Web Tech</a></td>
    <td><a href="#math">Stats</a></td>
  </tr>
</table>
```

---

### ACTIVITY 02 — Elementary CSS (Full Solutions)

**Part A — Twenties (twenties.html + stylesheet.css):**

Requirements (from Moodle, in English):
1. h1 = red
2. h2 = red (then later changed to grey)
3. paragraphs: font-size small, font-family sans-serif
4. paragraphs: margin-left 100px
5. h2: margin-left 100px
6. h1: border-bottom 1px solid red
7. image: float right, margin top/bottom 0px, left/right 12px
8. Externalise CSS to stylesheet.css
9. h2 changed to grey
10. em and strong inside p: blue + bold

```css
/* stylesheet.css */
h1 { color: red; border-bottom: 1px solid red; }
h2 { color: gray; margin-left: 100px; }
p  { font-size: small; font-family: sans-serif; margin-left: 100px; }
img { float: right; margin: 0 12px; }
p em, p strong { color: blue; font-weight: bold; }
```

**Part B — Black Goose Bistro (menu.html fonts):**

Requirements (from Moodle):
- body: Verdana → sans-serif fallback; font-size 100%; line-height 1.4
- h1: Marko One (from Google Fonts); 1.5rem; centered; text-shadow
- h2: same size as parent (1em); uppercase; centered
- `h2 + p`: centered, italic
- p and dl: calc(1em * 7/8) — 7/8 of current size using em
- dt: bold
- strong inside dt: italic + maroon colour
- div#info: teal, centered
- div#info p: gray, italic
- `.price`: Georgia/serif, italic, gray
- `.label`: bold, normal style, small-caps
- `p.warning`: x-small, red
- h1 paragraph: gray
- h2: text-transform uppercase
- `h2 + p`: center, italic
- text-shadow on h1: .1em horizontal, .1em vertical, .2em blur, lightslategray

```css
/* Link Google Font FIRST in <head>: */
/* <link href="http://fonts.googleapis.com/css?family=Marko+One" rel="stylesheet"> */

body      { font-family: Verdana, sans-serif; font-size: 100%; line-height: 1.4; }
h1        { font-family: 'Marko One', serif; font-size: 1.5rem; text-align: center;
            text-shadow: .1em .1em .2em lightslategray; }
h2        { font-size: 1em; text-align: center; text-transform: uppercase; }
h2 + p    { text-align: center; font-style: italic; }
p, dl     { font-size: calc(1em * 7/8); }
dt        { font-weight: bold; }
dt strong { font-style: italic; color: maroon; }
div#info  { color: teal; text-align: center; }
div#info p{ color: gray; font-style: italic; }
.price    { font-family: Georgia, serif; font-style: italic; color: gray; }
.label    { font-weight: bold; font-style: normal; font-variant: small-caps; }
p.warning { font-size: x-small; color: red; }
div#header p { color: gray; }
```

---

### ACTIVITY 03 — Colors & Backgrounds (bistro.html)

**Part A — Colors:**
- h1: purple = `rgb(153, 51, 153)` = `#993399`
- h2: orange-brown = `rgb(204, 102, 0)` = `#cc6600`
- body background: light green = `rgb(210, 220, 157)` = `#d2dc9d`
- div#header background: white at 50% transparency = `rgba(255, 255, 255, 0.5)`
- Links: same colour as h1 = `#993399`
- Visited links: `#937393`
- Hover: text `#c700f2`, background white
- Active: red
- h1 font-size: 140% of root element

**⚠️ Exam trap:** Clearing browser cache to test :visited vs :link
- CTRL + SHIFT + DELETE → clear recent history

```css
h1         { color: #993399; font-size: 140%; }
h2         { color: #cc6600; }
body       { background-color: #d2dc9d; }
div#header { background-color: rgba(255,255,255,0.5); }
a:link     { color: #993399; }
a:visited  { color: #937393; }
a:focus    { color: maroon; background-color: #ffd9d9; }
a:hover    { color: #c700f2; background-color: white; }
a:active   { color: red; }
```

**Part B — Backgrounds:**
Step-by-step (each step = exam-worthy card):
1. `background-image: url(images/bullseye.png)` on body (repeats by default)
2. div#header: `url(images/purpledot.png)` + `background-repeat: repeat-x` (horizontal only)
3. Change to `images/blackgoose.png`
4. `background-repeat: no-repeat`
5. Center: `background-position: center top`
6. Various positions tested: `right top`, `right bottom`, `left 50%`, `center 100px`
7. Final position: `background-position: center 100px`
8. Fix position: `background-attachment: fixed`
9. Combine to shorthand:

```css
div#header { background: url(images/blackgoose.png) no-repeat center 100px fixed; }
```

---

### ACTIVITY 04.1 — Float Elements

**Float concepts:**
- `float: left` or `float: right` removes element from normal flow
- Other content wraps around floated elements
- Use case: navigation bar with `float: left` on `<li>` items
- `position: relative` + `top: 100px` on `<ul>` = offset from normal position

**The `clear` property:**
- `clear: left` — element cannot have floated elements on its left
- `clear: right` — element cannot have floated elements on its right
- `clear: both` — element clears floats on BOTH sides (most common)
- Used to stop text from wrapping around floated elements

**Container collapse problem:**
- If all children are floated, parent container height = 0
- Fix 1: `overflow: auto` on container
- Fix 2: add `clear: both` pseudo-element (clearfix technique)

**Horizontal navigation bar with float:**
```css
ul { list-style: none; padding: 0; overflow: auto; }
li { float: left; }
li a { display: block; padding: 10px; }
```

**`position` property values:**
- `static` — default, normal flow
- `relative` — offset from normal position (with top/right/bottom/left)
- `absolute` — positioned relative to nearest positioned ancestor
- `fixed` — positioned relative to viewport (stays on screen when scrolling)
- `sticky` — acts like relative until scroll threshold, then fixed

**Offset properties (used with position):** `top`, `right`, `bottom`, `left`
**z-index** — stacking order (higher = on top)

---

### ACTIVITY 04.2 — Responsive Web Design (Jenware project)

**Viewport meta tag (REQUIRED for responsive pages):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
- `width=device-width` — viewport width = device screen width
- `initial-scale=1` — no initial zoom (100%)
- Without this: mobile browsers zoom out to show full desktop page

**Responsive images (basic — make images never wider than browser):**
```css
img { max-width: 100%; }
```

**Media Queries — the core of responsive design:**
```css
/* Apply styles ONLY when viewport is 481px or wider */
@media (min-width: 481px) {
  img { float: left; margin: 0 6px; }
  .more { clear: left; }
  div.products { margin: 1em; }
  section.testimonials { border-radius: 16px; margin: 1em 5%; }
}

/* Apply styles ONLY when viewport is 780px or wider */
@media (min-width: 780px) {
  div.products { float: left; width: 55%; }
  section.testimonials { float: right; }
  div.content { max-width: 1024px; margin: 0 auto; }
}
```

**Jenware exercise requirements:**
- Below 481px: single column, no floats
- 481px and above:
  - Product images float left, text wraps right
  - Image margins: top/bottom 0px, left/right 6px
  - `.more` class: `clear: left` (stops wrap after image)
  - `div.products`: margin 1em
  - Testimonials: `border-radius: 16px`, margin `1em 5%`
- 780px and above:
  - `div.products`: float left, 55% width
  - Testimonials: float right, same top distance
  - `div.content`: max-width 1024px, `margin: 0 auto` (centred)

**`margin: 0 auto`** — centres a block element horizontally when it has a defined width

**`border-radius`** — rounds corners:
```css
border-radius: 16px;        /* all corners */
border-radius: 10px 5px;    /* top-left+bottom-right, top-right+bottom-left */
```

**CSS units for responsive design:**
- `%` — percentage of parent width
- `vw` — viewport width (1vw = 1% of browser window width)
- `vh` — viewport height
- `min-width` / `max-width` — responsive constraints

---

### ACTIVITY 05 — Responsive Images (Elva project)

**The problem:** Sending a 1600px image to a mobile with a 480px screen wastes bandwidth.

**Solution 1 — `srcset` with descriptors (size-based):**
```html
<img srcset="elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px"
     src="elva-fairy-800w.jpg"
     alt="Elva dressed as a fairy">
```
- `480w` = this image is 480px wide (width descriptor)
- `sizes`: if viewport ≤ 600px, display image at 480px; otherwise 800px
- `src` = fallback for browsers that don't support srcset

**Solution 2 — `<picture>` element (art direction — different image, not just size):**
```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg">
  <source media="(min-width: 800px)" srcset="elva-800w.jpg">
  <img src="elva-800w.jpg" alt="Elva">
</picture>
```
- `<source>` elements list alternatives with media conditions
- Browser picks first matching `<source>`
- `<img>` = REQUIRED fallback (also provides alt text)
- Use `<picture>` when you need a completely different image (not just size)

**Moodle exercise requirements:**
- If display ≤ 600px: use `elva-fairy-480w.jpg` (480px)
- If display > 600px: use `elva-fairy-800w.jpg` (800px)
- For 2nd image: ≤799px use `elva-480w-close-portrait.jpg`, ≥800px use `elva-800w.jpg`

**Key difference: srcset vs picture:**
- `srcset` = same image, different resolutions → browser chooses
- `<picture>` = different images for different conditions → you control which shows

---

### DISPLAY, FLOAT, POSITION (Lecture 03b — CSS)

**`display` property values:**
- `block` — starts on new line, full width
- `inline` — stays in text flow, no width/height
- `inline-block` — inline but respects width/height/padding
- `none` — removes element completely (not in layout, invisible)
- `flex` — flexbox container
- `grid` — grid container

**`float` + `clear` summary:**
```css
/* Float image right, text wraps around it */
img { float: right; margin: 0 12px; }

/* Navigation bar */
li { float: left; }

/* Stop wrapping */
.clear { clear: both; }

/* Fix container collapse */
.container { overflow: auto; }
```

**`position` values and use cases:**
```css
/* Offset from normal position — still takes up space */
.relative { position: relative; top: 20px; left: 10px; }

/* Removed from flow, positioned to nearest positioned ancestor */
.tooltip { position: absolute; top: 0; right: 0; }

/* Stays fixed on screen even when page scrolls (e.g. navbar) */
.navbar { position: fixed; top: 0; width: 100%; }
```

---

### ALL CSS SELECTORS (complete reference)

| Selector | Syntax | What it selects |
|---|---|---|
| Element | `p` | All `<p>` elements |
| Class | `.price` | All with class="price" |
| ID | `#header` | Element with id="header" |
| Descendant | `div p` | All `<p>` ANYWHERE inside `<div>` |
| Direct child | `div > p` | `<p>` as DIRECT children only |
| Adjacent sibling | `h2 + p` | First `<p>` IMMEDIATELY after `<h2>` |
| General sibling | `p ~ ul` | ALL `<ul>` after `<p>` at same level |
| Universal | `*` | Every element |
| Grouping | `h1, h2, p` | All three independently |
| Element+Class | `dt.newitem` | `<dt>` with class="newitem" |
| Element+ID | `div#header` | `<div>` with id="header" |
| Pseudo-class | `a:hover` | `<a>` when mouse is over it |

---

### ALL COLOUR NOTATIONS

| Format | Example | Notes |
|---|---|---|
| Named | `color: red` | 140+ named colours |
| Hex 6-digit | `color: #993399` | #RRGGBB |
| Hex 3-digit | `color: #F06` | Only if each pair is same digit doubled |
| RGB | `color: rgb(153,51,153)` | 0–255 per channel |
| RGB% | `color: rgb(78%,70%,90%)` | Percentage form |
| RGBa | `color: rgba(255,255,255,0.5)` | 4th = alpha (0=transparent, 1=solid) |
| HSL | `color: hsl(300,50%,40%)` | Hue(0-360°), Sat(%), Light(%) |
| HSLa | `color: hsla(300,50%,40%,0.5)` | With alpha |

**Hex shorthand rule:** `#FF0066` → `#F06` ✅ | `#C8B2E6` → `#CBE` ❌

---

### ALL BOX MODEL PROPERTIES

**Padding shorthand (TRBL clockwise):**
- `padding: 10px` — all 4 sides
- `padding: 10px 20px` — Top+Bottom=10, Left+Right=20
- `padding: 10px 20px 30px` — Top=10, L+R=20, Bottom=30
- `padding: 10px 20px 30px 40px` — Top Right Bottom Left

**Border:**
- Shorthand: `border: 2px solid red`
- ⚠️ Must set `border-style` or border won't show!
- Styles: `solid | dashed | dotted | double | groove | ridge | inset | outset | none`
- Individual sides: `border-top`, `border-bottom`, `border-left`, `border-right`

**Margin collapse:** Vertical margins don't add — largest wins.

**box-shadow:** `h v blur spread color` (has spread)
**text-shadow:** `h v blur color` (NO spread)

---

### PSEUDO-CLASSES (order critical!)

`:link → :visited → :focus → :hover → :active`
Memory: **LoVe Fears HAte**

---

### TOP 20 EXAM TRAPS

1. `<!DOCTYPE html>` must be absolute line 1
2. `border-style` missing → no border appears (width+color not enough)
3. `div p` (descendant) vs `div, p` (grouping) — SPACE vs COMMA
4. Missing `alt` on `<img>` — REQUIRED attribute
5. Wrong pseudo-class order → hover doesn't work
6. Absolute URL for same-server files (should be relative)
7. CSS is `color` not `colour` (American English)
8. `em` = parent, `rem` = root `<html>` — different!
9. `<link rel="stylesheet">` must be in `<head>` not `<body>`
10. `rel="ref"` typo — must be `rel="stylesheet"`
11. `opacity` affects ALL children vs `rgba()` transparent background only
12. `#C8B2E6` cannot shorten to `#CBE` — pairs not doubled
13. Float container collapses → need `overflow: auto` or `clear: both`
14. Google Fonts `<link>` must be in `<head>` BEFORE CSS uses it
15. Multi-word font names need quotes: `'Marko One'`
16. `text-shadow` has NO spread (only `box-shadow` has spread)
17. Vertical margins collapse — 2em + 4em = 4em, not 6em
18. No `<meta name="viewport">` → mobile doesn't respond
19. `srcset` vs `<picture>`: srcset = same image different sizes, picture = different images
20. `position: absolute` removes from flow; `position: relative` keeps space

---

## 📘 INF13204L — SOFTWARE METHODOLOGIES & DEVELOPMENT

Generate 40+ cards. Topics:
- SDLC phases: Requirements, Design, Implementation, Testing, Deployment, Maintenance
- Waterfall: linear, each phase complete before next; hard to change requirements late
- Agile: iterative, working software over documentation, customer collaboration
- **Scrum roles:** Product Owner (owns backlog), Scrum Master (facilitates), Dev Team (builds)
- **Scrum events:** Sprint (1-4 week iteration), Sprint Planning, Daily Scrum (15 min), Sprint Review, Sprint Retrospective
- **Scrum artifacts:** Product Backlog (all features), Sprint Backlog (sprint tasks), Increment (working software)
- **Kanban:** visualise work, limit WIP, flow-based (no sprints)
- **UML diagrams:** Use Case (actors + use cases), Class (structure), Sequence (time-ordered interactions), Activity (flow/process)
- Requirements: Functional (what system does) vs Non-functional (how well: performance, security, usability)
- Testing levels: Unit, Integration, System, Acceptance (UAT)
- Black-box vs White-box testing
- Git: commit, branch, merge, pull request, clone, push, pull, fork
- SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- Design patterns: Singleton, Observer, Factory, MVC (Model-View-Controller)
- CI/CD: Continuous Integration (auto-test on commit), Continuous Delivery/Deployment

Tags: `SW_sdlc` `SW_agile` `SW_scrum` `SW_kanban` `SW_uml` `SW_testing` `SW_git` `SW_solid` `SW_patterns`

---

## 📘 MAT02354L — PROBABILITY & STATISTICS

Generate 40+ cards. Topics:
- **Probability basics:** Sample space Ω, event A, P(A) between 0 and 1
- **Addition rule:** P(A∪B) = P(A) + P(B) - P(A∩B)
- **Complement:** P(A') = 1 - P(A)
- **Conditional probability:** P(A|B) = P(A∩B) / P(B)
- **Independence:** P(A∩B) = P(A)·P(B)
- **Bayes' theorem:** P(A|B) = P(B|A)·P(A) / P(B)
- **Random variables:** discrete (countable) vs continuous (measurable)
- **Expected value E(X):** weighted average of outcomes
- **Variance Var(X):** spread of distribution; Var(X) = E(X²) - [E(X)]²
- **Standard deviation:** σ = √Var(X)
- **Distributions:** Binomial B(n,p), Poisson λ, Normal N(μ,σ²), Uniform, Exponential
- **Normal distribution:** bell curve, mean=median=mode, 68-95-99.7 rule
- **Z-score:** Z = (X - μ) / σ (how many SDs from mean)
- **Central Limit Theorem:** sample means approach normal distribution as n→∞
- **Hypothesis testing:** H₀ (null), H₁ (alternative), p-value, α significance level
- **Type I error:** reject H₀ when true (false positive) — α
- **Type II error:** fail to reject H₀ when false (false negative) — β
- **Confidence interval:** range that likely contains true parameter
- **Correlation:** Pearson r (-1 to +1), positive/negative/zero
- **Regression:** y = mx + b; least squares
- **Descriptive stats:** mean, median, mode, range, IQR, standard deviation, variance

Tags: `STAT_probability` `STAT_distributions` `STAT_normal` `STAT_hypothesis` `STAT_descriptive` `STAT_formulas`

---

## 📘 INF14387L — DATA TRANSFORMATION & ANALYSIS

Generate 30+ cards. Topics:
- **Data types:** structured (tables), semi-structured (JSON/XML), unstructured (text/images)
- **ETL:** Extract (from sources), Transform (clean/reshape), Load (to destination)
- **Data cleaning:** handle nulls (drop/fill/interpolate), remove duplicates, fix outliers, standardise formats
- **Normalisation:** scale to [0,1]; Standardisation: Z-score (mean=0, SD=1)
- **SQL SELECT:** `SELECT col FROM table WHERE cond ORDER BY col LIMIT n`
- **SQL JOINs:** INNER (match both), LEFT (all left + matches), RIGHT (all right + matches), FULL OUTER
- **SQL aggregation:** COUNT, SUM, AVG, MAX, MIN + GROUP BY + HAVING
- **Pandas:** `pd.read_csv()`, `.head()`, `.describe()`, `.groupby()`, `.merge()`, `.dropna()`, `.fillna()`
- **NumPy:** arrays, broadcasting, `np.mean()`, `np.std()`, `np.where()`
- **Data viz types:** bar (categories), line (time), histogram (distribution), scatter (correlation), box plot (spread)
- **Correlation:** Pearson (linear), Spearman (rank-based)
- **PCA:** dimensionality reduction, finds principal components
- **ML basics:** supervised (labelled data) vs unsupervised (no labels)
- **Train/test split:** typically 80/20; prevents overfitting
- **Overfitting:** model fits training data too well, poor on new data

Tags: `DATA_types` `DATA_etl` `DATA_sql` `DATA_pandas` `DATA_viz` `DATA_ml` `DATA_stats`

---

## 📘 INF13186L — HUMAN-COMPUTER INTERACTION (HCI)

Generate 40+ cards. Topics:
- **HCI definition:** study of how people design, evaluate, and implement interactive computing systems
- **Usability 5 components (Nielsen):** Learnability, Efficiency, Memorability, Errors (low+recoverable), Satisfaction
- **Norman's Design Principles:** Visibility, Feedback, Constraints, Mapping, Consistency, Affordance
  - **Affordance:** perceived properties suggesting how to use it (door handle affords pulling)
  - **Mapping:** relationship between control and effect (stove controls match burner positions)
  - **Feedback:** system tells user what happened (button click sound)
  - **Constraints:** prevent wrong actions (greyed-out disabled buttons)
- **Mental model:** user's understanding of how system works vs actual system model
- **Gestalt principles:** Proximity (close = related), Similarity (same look = same group), Continuity (eye follows smooth lines), Closure (mind completes incomplete shapes)
- **Fitts' Law:** time to reach target ∝ distance/size — bigger buttons = easier to hit
- **Hick's Law:** decision time increases logarithmically with number of choices
- **WCAG levels:** A (minimum), AA (standard), AAA (enhanced)
- **Colour contrast ratio:** minimum 4.5:1 for normal text (WCAG AA)
- **Keyboard navigation:** all interactive elements must be reachable via Tab key
- **Personas:** fictional user archetypes based on research — name, goals, frustrations
- **Task analysis / Hierarchical Task Analysis (HTA):** breaking tasks into subtasks
- **Prototyping:** Low-fi (paper sketch), High-fi (interactive digital mockup)
- **Usability testing:** Think-aloud (user speaks thoughts), A/B testing (compare 2 versions), Heuristic evaluation (expert reviews against heuristics)
- **Nielsen's 10 Usability Heuristics:**
  1. Visibility of system status
  2. Match between system and real world
  3. User control and freedom (undo/redo)
  4. Consistency and standards
  5. Error prevention
  6. Recognition rather than recall
  7. Flexibility and efficiency of use
  8. Aesthetic and minimalist design
  9. Help users recognise, diagnose, and recover from errors
  10. Help and documentation
- **Information architecture:** organisation, labelling, navigation, search
- **Responsive design:** adapts layout to device (mobile-first approach)
- **Interaction styles:** command line, menus, forms, direct manipulation, gesture/NUI

Tags: `HCI_definition` `HCI_usability` `HCI_norman` `HCI_gestalt` `HCI_laws` `HCI_heuristics` `HCI_testing` `HCI_accessibility` `HCI_prototyping`

---

## 📋 CARD QUALITY CHECKLIST

For EVERY card:
- ✅ One specific fact — not everything at once
- ✅ Exam question phrasing ("What does...", "Write the...", "What is WRONG with...")
- ✅ `<code>` tags around all CSS/HTML/SQL/Python
- ✅ TRUE/FALSE cards ("TRUE or FALSE: ...")
- ✅ Write-from-memory cards ("Write the CSS for X from memory")
- ✅ Spot-the-error cards ("What is wrong with this code?")
- ✅ Fill-in-blank cards ("The ___ property controls...")
- ✅ Multiple angles on same concept

**Make EXTRA cards for these (most exam-heavy):**
- Web Tech: all CSS selectors + combinators (one card per type), pseudo-class order, box model shorthand rules, URL path navigation examples, all colour notations
- HCI: ALL 10 Nielsen heuristics (one card each), Norman's 6 principles (one card each)
- Stats: Every formula written out (E(X), Var(X), Bayes', P(A|B))
- Software: Every Scrum event + artifact + role explained separately

---

## 🏷️ ALL TAGS

Web Tech: `T01_HTML` `T01_concepts` `T01_CSS` `T01_http` `T02_links` `T02_images` `T02_svg` `T03_selectors` `T03_colors` `T03_fonts` `T03_boxmodel` `T03_backgrounds` `T03_pseudo` `T03_display` `T03_float` `T03_position` `T04_responsive` `T04_mediaqueries` `T05_responsive_images` `T03_exercises` `exam_trap`

Software: `SW_sdlc` `SW_agile` `SW_scrum` `SW_kanban` `SW_uml` `SW_testing` `SW_git` `SW_solid` `SW_patterns`

Stats: `STAT_probability` `STAT_distributions` `STAT_normal` `STAT_hypothesis` `STAT_descriptive` `STAT_formulas`

Data: `DATA_types` `DATA_etl` `DATA_sql` `DATA_pandas` `DATA_viz` `DATA_ml`

HCI: `HCI_definition` `HCI_usability` `HCI_norman` `HCI_gestalt` `HCI_laws` `HCI_heuristics` `HCI_testing` `HCI_accessibility` `HCI_prototyping`

---

**NOW OUTPUT THE COMPLETE 300+ CARD ANKI IMPORT FILE.**
**Start with the 3 header lines (#separator:tab / #html:true / #tags column:3).**
**Output EVERY card. Do NOT stop. Do NOT truncate. Do NOT say "continued in next message."**
**This student needs to pass all 5 university classes. Be thorough.**
