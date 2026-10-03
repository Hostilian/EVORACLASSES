# Focused Web source and scope audit

The focused set contains **302 notes: 155 exam-practice notes and 147 foundation notes**. Its purpose is to help complete the actual supplied practical tasks and practise the behaviour shown in the currently available lectures. It does not claim to reproduce an actual exam, predict question frequency, or cover material that has not been supplied.

`focused_web.json` contains the requested front/back/tag/track/style/source/reason fields. `focused_web_classification.json` classifies every one of the 444 previous Web notes. The originals and root outputs were not modified by this audit.

## What changed

- 193 previous notes retained, with shorter answers where useful.
- 44 previous notes consolidated into 11 comparisons or complete tasks.
- 207 previous notes dropped. These include historical/name/acronym trivia, obscure absolute-unit conversions, unnecessary CSS specification details, repetitive lists and repeated syntax examples.
- Fourteen integrated practice tasks and one source-based link-state comparison were added from the earlier sources. The time limits are suggested practice times authored for study, not official exam limits.
- 83 notes added from the newly available Moodle lectures: 32 from T03b and 51 from T04. Their source pages are anchored individually.

Integrated tasks are retained alongside selected smaller building blocks when they require a different learning action: assemble an entire page/style change, combine paths and fragments, diagnose a failed resource, or check a layout across viewport widths. Exact parallel question/answer syntax duplicates were removed. Card count was not used as a completion quota.

## Tracks and study order

`foundation` explains the concepts needed to understand the source examples: document structure, browser/server roles, paths, selectors/cascade, typography, boxes, network-tool purposes, positioning and responsive concepts. It includes some short syntax exercises where the material is lecture background rather than a demonstrated Moodle activity requirement.

`exam_practice` requires an action: write code, trace a result, diagnose a mistake, calculate a size, or solve a design scenario. Moodle Activity01/02/03 tasks take priority. New lecture examples are also practised, with their lecture source shown rather than an unsupported claim that a teacher will ask them on the exam. Study the relevant foundation before attempting its practice task.

Styles: `recall` 129, `write_code` 107, `trace` 29, `debug` 22, `scenario` 13, `true_false` 2.

## Moodle and assessment evidence

The local Moodle export supplies real practical requirements for Activity00–03 and the assessment rules. The parent agent additionally inspected the authenticated current Web Moodle course, id737, and downloaded two newly visible lecture resources absent from the earlier DOCX: resource14286 (T03b) and resource14287 (T04). Source filenames below are the actual downloaded files. This audit performed no browsing of its own.

The export says practical projects are compulsory in all sittings and include software, report and presentation. Written assessment is three tests or an exam; the weighting is 60% written and 20% for each of two projects. Each written assessment and each project has an 8/20 minimum. Passing preparation therefore includes completing and explaining practical work, not only recalling flashcards. The assessment rule snapshot is not treated as independently verified current regulations here; the parent’s live Moodle evidence should control the final guide.

No actual past paper, marking scheme, exact question frequency or complete later-semester teaching sequence was supplied. The source’s course objectives are broader than the currently available HTML/CSS materials and include complex Web applications. The focused set covers the material available at this review, not an invented complete future syllabus. Obtain later course resources and official project/exam instructions when available. Dates from the older export lack explicit years and remain source evidence, not a confirmed schedule.

## Coverage retained for practical work

| Evidence | Skills represented |
|---|---|
| Moodle Activity00 | Client/server roles; inspect page/requests/logs; test more than one browser; HTTP/HTTPS security context; ping vs Web availability; DNS/socket/interface/port tools and their purposes |
| Moodle Activity01 | HTML structure and UTF-8/title; h1/h2/p/em/ul/br; goose image inside h1 at50px; internal styling; local HTTP server/URL/logs; relative Home/Menu paths; matching fragment IDs; SVG link image; favicon404; timetable cells linked to course details |
| Moodle Activity02A | Repair the image paragraph; final heading/paragraph styles; float/margin wrapping; all paragraph descendants blue/bold; externalize rules to stylesheet.css; inspect failed stylesheet requests |
| Moodle Activity02B | Font loading/fallbacks and @font-face; relative font calculations; centered heading/intro; text shadow; dt bold; all strong italic and only dt strong maroon; class/ID/descendant styles; labels and warning |
| Moodle Activity03A/B | Colour representations and 50% alpha; link/visited/hover states; root-relative h1 sizing; background image/repeat/position/attachment; shorthand retaining earlier background colour |
| T03a lecture examples | Rules/comments, inheritance and precedence, selector tracing, common colour/font/box/list/background behaviour, box-width arithmetic, shadows |
| T03b pp2–8 | display block/inline/inline-block/none; normal flow; navigation link boxes; float wrapping and clearing; multi-float layout |
| T03b pp9–10 | Basic shape-outside/shape-margin behavior; no memorization of long polygon coordinates |
| T03b pp11–17 | static/relative/absolute/fixed/sticky; offsets and space reservation; containing block; simple z-index tracing with necessary same-context assumption |
| T04 pp3–12 | Responsive purpose, flexible layout/images/media queries, viewport declaration, fixed/adaptive/fluid layout, grid fr/minmax and flex container/direct children, images that fit |
| T04 pp13–20 | Screen/print/orientation/min/max-width media queries, threshold tracing, conditional stylesheet links, baseline/cascade and content-driven breakpoints |
| T04 pp21–28 | Mobile-first columns, readability, small-screen menu/image/table decisions; no memorization of historical site names or diagram labels |
| T04 pp29–40 | Density calculations, srcset x/w descriptors, sizes expressions and slot calculations, art direction, picture source order and img fallback |
| T04 p41 | Browser/device testing, intermediate widths, legibility, navigation and overflow |

## Source corrections retained without long caveats

The original tasks require every p descendant (`p *`), italics on every strong (with dt-only maroon), h1 at140% of the root (`1.4rem`), and the half-transparent header colour retained in the final background shorthand. These are preserved in practice tasks rather than the earlier brief’s incomplete CSS answers.

The 17 requested trap topics each remain an exam-practice note. Corrections avoid teaching false rules: doctype belongs before html rather than requiring an absolute physical first line; absolute internal URLs are valid; Marko One may be unquoted; selector specificity does not defeat important declarations; em references depend on the property; collapse examples state their necessary block/positive-margin assumptions. Their answers keep only what is needed to solve the given task.

Additional source repairs:

- T03a p9 `font-face: Verdana` is corrected to `font-family`.
- T03a p52 border-box arithmetic is handled correctly through size-calculation skills; source typo550 is not memorized as a special fact.
- T03b p6 explicit float width is not falsely claimed mandatory for intrinsically sized images.
- T04 p10 spelling `minimax` is corrected to `minmax`.
- T04 pp35–37 srcset selection is not defined as always the first listed file. The browser uses the candidate information, expected slot and density. `sizes` is not falsely taught as a CSS layout-setting property.
- T04 p40 picture uses source plus final img; no false rule says picture can never have global HTML attributes.
- The Python http.server command uses the standard-library module; the older Moodle installation suggestion is not turned into a requirement to install a similarly named package.

## Newly supplied file evidence

Both new PDFs were read in full and all60 pages were rendered and inspected, including display/float/position diagrams and responsive layout/menu/density/art-direction illustrations. Text extracts and rendered pages are under `deck_build/sources`.

- `moodle_sources\INF13207L\tweb-t003b_css_floating_positioning.pdf`; SHA256 `6299b61cdd9a6122a4cf364f477eff35a6f91c99bce7e5974766735419b1dc60`.
- `moodle_sources\INF13207L\tweb-t004_webDesignResponsivo.pdf`; SHA256 `c09c650c8c2d495e81ad11c55cd08270a191436ee3a3d8e95642ef4552009a5d`.

## Per-note classification of the previous 444 notes

For a consolidation, the destination question identifies the replacement. A dropped note does not mean the underlying topic is absent: repeated syntax/examples are represented by the retained source activity or an integrated task.

| Previous index | Previous question | Decision | Reason or replacement |
|---:|---|---|---|
| 1 | Expand URL. | consolidated | Consolidated into: Break down http://www.uevora.pt/page.html into scheme, host and path. |
| 2 | Identify the scheme in http://www.uevora.pt/page.html . | consolidated | Consolidated into: Break down http://www.uevora.pt/page.html into scheme, host and path. |
| 3 | Identify the host in http://www.uevora.pt/page.html . | consolidated | Consolidated into: Break down http://www.uevora.pt/page.html into scheme, host and path. |
| 4 | Identify the path in http://www.uevora.pt/page.html . | consolidated | Consolidated into: Break down http://www.uevora.pt/page.html into scheme, host and path. |
| 5 | Expand HTTP. | dropped | ancillary names, acronyms, history or memorized lists |
| 6 | Where does client-side JavaScript execute? | consolidated | Consolidated into: What roles do HTML, CSS and JavaScript have, and which processing normally runs on the server? |
| 7 | Where does server-side PHP execute? | consolidated | Consolidated into: What roles do HTML, CSS and JavaScript have, and which processing normally runs on the server? |
| 8 | What are the core roles of HTML, CSS and browser JavaScript? | consolidated | Consolidated into: What roles do HTML, CSS and JavaScript have, and which processing normally runs on the server? |
| 9 | In introductory web architecture, what does the frontend usually mean? | consolidated | Consolidated into: What roles do HTML, CSS and JavaScript have, and which processing normally runs on the server? |
| 10 | In introductory web architecture, what does the backend usually mean? | consolidated | Consolidated into: What roles do HTML, CSS and JavaScript have, and which processing normally runs on the server? |
| 11 | What does interaction design (IxD) focus on? | consolidated | Consolidated into: How do interaction design, interface design and user experience differ? |
| 12 | What does UI design focus on? | consolidated | Consolidated into: How do interaction design, interface design and user experience differ? |
| 13 | What does UX design consider beyond the visible interface? | consolidated | Consolidated into: How do interaction design, interface design and user experience differ? |
| 14 | What is a wireframe used for? | retained | T01 pp11–13 |
| 15 | How does a storyboard differ from a wireframe? | retained | T01 pp11–13 |
| 16 | What is the purpose of an XML sitemap? | retained | T01 p17 |
| 17 | What does robots.txt communicate? | retained | T01 p18 |
| 18 | TRUE or FALSE: robots.txt protects private files from human visitors. | dropped | repeated syntax/example for an already practised action |
| 19 | Write the recommended HTML5 doctype. | dropped | repeated syntax/example for an already practised action |
| 20 | Why should an HTML document include the HTML5 doctype? | dropped | repeated syntax/example for an already practised action |
| 21 | Which element is the root of an HTML document? | dropped | repeated syntax/example for an already practised action |
| 22 | What belongs in <head> ? | retained | Moodle Activity01 |
| 23 | What belongs in <body> ? | retained | Moodle Activity01 |
| 24 | Where does the text in <title> normally appear? | retained | Moodle Activity01 |
| 25 | Write the UTF-8 character encoding declaration. | retained | Moodle Activity01 |
| 26 | Write a minimal explicit HTML5 document with title Study and heading Hello. | retained | Moodle Activity01 |
| 27 | What is the purpose of lang="en" on the root element? | dropped | obscure units or unnecessary specification detail |
| 28 | Which HTML element represents the highest heading level? | retained | Moodle Activity01 |
| 29 | Write a paragraph containing Exam practice. | dropped | repeated syntax/example for an already practised action |
| 30 | Which tag creates a hyperlink? | dropped | repeated syntax/example for an already practised action |
| 31 | Which element inserts an image? | dropped | repeated syntax/example for an already practised action |
| 32 | What does <br> represent? | retained | Moodle Activity01 |
| 33 | What does <hr> represent semantically? | dropped | repeated syntax/example for an already practised action |
| 34 | What is the semantic role of <strong> ? | retained | Moodle Activity01 |
| 35 | How does <b> differ from <strong> ? | dropped | obscure units or unnecessary specification detail |
| 36 | What is the semantic role of <em> ? | retained | Moodle Activity01 |
| 37 | How does <i> differ from <em> ? | dropped | obscure units or unnecessary specification detail |
| 38 | What is the default display difference between <div> and <span> ? | retained | Moodle Activity01 |
| 39 | TRUE or FALSE: a <div> must always display as a block. | dropped | obscure units or unnecessary specification detail |
| 40 | Write an unordered list containing HTML and CSS. | retained | Moodle Activity01 |
| 41 | Write an ordered list containing First and Second. | retained | Moodle Activity01 |
| 42 | What does <li> represent? | dropped | repeated syntax/example for an already practised action |
| 43 | Write a description list defining HTTP as a web protocol. | retained | Moodle Activity01 |
| 44 | Which element contains a term or name inside a description list? | dropped | repeated syntax/example for an already practised action |
| 45 | Write HTML for x squared using superscript. | dropped | repeated syntax/example for an already practised action |
| 46 | Write HTML for H₂O using subscript. | dropped | obscure units or unnecessary specification detail |
| 47 | Which element represents a table row? | dropped | repeated syntax/example for an already practised action |
| 48 | How do <th> and <td> differ? | retained | Moodle Activity01 |
| 49 | Write a table with header Name and one data value Ana. | retained | Moodle Activity01 |
| 50 | Which semantic element marks a major navigation region? | dropped | obscure units or unnecessary specification detail |
| 51 | Which semantic element contains a page’s dominant main content? | dropped | obscure units or unnecessary specification detail |
| 52 | When is <article> appropriate? | dropped | obscure units or unnecessary specification detail |
| 53 | When is <aside> appropriate? | dropped | obscure units or unnecessary specification detail |
| 54 | What does <section> represent? | dropped | obscure units or unnecessary specification detail |
| 55 | How do <header> and <footer> differ? | dropped | obscure units or unnecessary specification detail |
| 56 | What is a void element? | dropped | repeated syntax/example for an already practised action |
| 57 | What is wrong with <img src="logo.png" alt="Logo"></img> ? | dropped | obscure units or unnecessary specification detail |
| 58 | What does the HTML character reference &lt; represent? | dropped | obscure units or unnecessary specification detail |
| 59 | What does the HTML character reference &gt; represent? | dropped | obscure units or unnecessary specification detail |
| 60 | What does the HTML character reference &amp; represent? | dropped | obscure units or unnecessary specification detail |
| 61 | What does the HTML character reference &nbsp; represent? | dropped | obscure units or unnecessary specification detail |
| 62 | What does the HTML character reference &copy; represent? | dropped | obscure units or unnecessary specification detail |
| 63 | Write inline CSS that makes a paragraph red. | retained | T01 p26; Moodle Activity01/02A |
| 64 | Write internal CSS that makes all paragraphs red. | retained | T01 p26; Moodle Activity01/02A |
| 65 | Write the HTML link to an external stylesheet named style.css. | retained | T01 p26; Moodle Activity01/02A |
| 66 | Why use an external stylesheet for many related pages? | retained | T01 p26; Moodle Activity01/02A |
| 67 | What is one maintenance disadvantage of inline CSS? | dropped | repeated syntax/example for an already practised action |
| 68 | Which attribute tells a link element that the referenced file is a stylesheet? | dropped | repeated syntax/example for an already practised action |
| 69 | What are the three parts of p { color: red; } ? | retained | T03a pp4–7 |
| 70 | Write a CSS comment containing menu styles. | retained | T03a pp4–7 |
| 71 | Write a link to about.html in the same folder. | retained | T02 p5; Moodle Activity01 |
| 72 | Write a link from site/index.html to site/recipes/pasta.html. | retained | T02 p6 |
| 73 | From site/pages/about.html, write the href for site/index.html. | retained | T02 p7 |
| 74 | From site/pages/about.html, write an img src for site/images/logo.png. | retained | T02 p7 |
| 75 | From site/a/b/page.html, write the href for site/index.html. | retained | T02 p7 |
| 76 | From site/a/b/page.html, write the href for site/a/help.html. | dropped | repeated syntax/example for an already practised action |
| 77 | From site/pages/about.html, write the href for site/pages/contact.html. | dropped | repeated syntax/example for an already practised action |
| 78 | What does ../ mean in a relative URL path? | dropped | repeated syntax/example for an already practised action |
| 79 | What does a leading slash mean in /recipes/salmon.html ? | retained | T02 p8 |
| 80 | Is an absolute URL restricted to a different server? | dropped | repeated syntax/example for an already practised action |
| 81 | Why are relative URLs often useful for internal site links? | dropped | repeated syntax/example for an already practised action |
| 82 | Write an absolute hyperlink to the University of Évora example address. | retained | T02 pp3–4 |
| 83 | Write a link that requests a new tab or window. | retained | T02 p11 |
| 84 | With no base target or target attribute, where does a normal link open? | dropped | repeated syntax/example for an already practised action |
| 85 | Write a link that opens an email composer for a@b.com. | retained | T02 p12 |
| 86 | Write a same-page link to an element whose id is contact. | consolidated | Consolidated into: Write both sides of a same-page Contact fragment link. |
| 87 | Write the target heading for href="#contact" . | consolidated | Consolidated into: Write both sides of a same-page Contact fragment link. |
| 88 | Write a link to the details section of about.html in the same folder. | consolidated | Consolidated into: Write both sides of a same-page Contact fragment link. |
| 89 | What is wrong when href="#contact" is intended to jump to id="contacts" ? | consolidated | Consolidated into: Write both sides of a same-page Contact fragment link. |
| 90 | Write an image wrapped in a link to index.html. | retained | Moodle Activity01 task18; T02 p2 |
| 91 | TRUE or FALSE: href="/index.html" goes up exactly one folder. | dropped | repeated syntax/example for an already practised action |
| 92 | Write HTML for photo.jpg with alternative text A black goose. | dropped | repeated syntax/example for an already practised action |
| 93 | What does an image’s src attribute specify? | dropped | repeated syntax/example for an already practised action |
| 94 | What should alt describe for an informative image? | retained | T02 p13 |
| 95 | What alt value should a purely decorative image normally have? | retained | T02 p13 |
| 96 | Why supply image width and height attributes when the dimensions are known? | dropped | obscure units or unnecessary specification detail |
| 97 | Which listed image format is especially suited to lossless raster graphics with transparency? | retained | T02 pp9,16 |
| 98 | Why is JPEG commonly used for photographs? | retained | T02 pp9,16 |
| 99 | What is the palette limit of one GIF frame? | dropped | obscure units or unnecessary specification detail |
| 100 | Why do SVG shapes scale well? | dropped | repeated syntax/example for an already practised action |
| 101 | Is WebP limited to lossy compression? | dropped | obscure units or unnecessary specification detail |
| 102 | Choose a listed format for a scalable geometric logo. | dropped | repeated syntax/example for an already practised action |
| 103 | How do raster images differ from vector images? | retained | T02 pp9,16 |
| 104 | Write HTML that loads an external SVG as an image. | retained | T02 p18 |
| 105 | Can page CSS directly select shapes inside an SVG loaded through img? | consolidated | Consolidated into: How does inline SVG differ from SVG loaded through img? |
| 106 | Why use inline SVG when individual paths need page CSS or JavaScript? | consolidated | Consolidated into: How does inline SVG differ from SVG loaded through img? |
| 107 | TRUE or FALSE: an SVG file can never contain raster imagery. | dropped | obscure units or unnecessary specification detail |
| 108 | What does the selector p match? | dropped | repeated syntax/example for an already practised action |
| 109 | Write a selector for paragraphs. | retained | T03a p5; Moodle Activity02B |
| 110 | What does the selector .price match? | dropped | repeated syntax/example for an already practised action |
| 111 | Write a selector for all elements with class price. | retained | T03a p5; Moodle Activity02B |
| 112 | What does the selector #header match? | dropped | repeated syntax/example for an already practised action |
| 113 | Write a selector for the element with id header. | retained | T03a p5; Moodle Activity02B |
| 114 | What does the selector div p match? | dropped | repeated syntax/example for an already practised action |
| 115 | Write a selector for all paragraphs anywhere inside a div. | retained | T03a pp33–35 |
| 116 | What does the selector div > p match? | dropped | repeated syntax/example for an already practised action |
| 117 | Write a selector for only direct paragraph children of a div. | retained | T03a pp33–35 |
| 118 | What does the selector h2 + p match? | dropped | repeated syntax/example for an already practised action |
| 119 | Write a selector for a paragraph immediately after an h2 at the same level. | retained | T03a pp33–35 |
| 120 | What does the selector p ~ ul match? | dropped | repeated syntax/example for an already practised action |
| 121 | Write a selector for all unordered lists that follow a paragraph sibling. | retained | T03a pp33–35 |
| 122 | What does the selector * match? | dropped | repeated syntax/example for an already practised action |
| 123 | Write a selector for every element. | retained | T03a pp33–35 |
| 124 | What does the selector h1, h2 match? | dropped | repeated syntax/example for an already practised action |
| 125 | Write a selector for both h1 and h2 headings. | dropped | repeated syntax/example for an already practised action |
| 126 | What does the selector dt.newitem match? | dropped | repeated syntax/example for an already practised action |
| 127 | Write a selector for description terms with class newitem. | dropped | repeated syntax/example for an already practised action |
| 128 | What does the selector div#header match? | dropped | repeated syntax/example for an already practised action |
| 129 | Write a selector for the div with id header. | retained | T03a p5; Moodle Activity02B |
| 130 | What does the selector div#info p match? | dropped | repeated syntax/example for an already practised action |
| 131 | Write a selector for paragraphs anywhere inside div with id info. | dropped | repeated syntax/example for an already practised action |
| 132 | How do div p and div, p differ? | dropped | repeated syntax/example for an already practised action |
| 133 | Given <div><p>A</p><section><p>B</p></section></div> , which paragraphs match div > p ? | consolidated | Consolidated into: Trace A B : which paragraphs match div p and div > p? |
| 134 | Given <div><p>A</p><section><p>B</p></section></div> , which paragraphs match div p ? | consolidated | Consolidated into: Trace A B : which paragraphs match div p and div > p? |
| 135 | Given <h2>Title</h2><span>Note</span><p>Text</p> , does h2 + p match the paragraph? | retained | T03a pp33–35 |
| 136 | Do whitespace and comments between h2 and p prevent h2 + p from matching? | dropped | obscure units or unnecessary specification detail |
| 137 | Write CSS making both h1 and p text red. | retained | T03a pp33–35 |
| 138 | Write CSS making only paragraphs inside div#info gray. | dropped | repeated syntax/example for an already practised action |
| 139 | May several elements share the same class? | retained | T03a p5; Moodle Activity02B |
| 140 | Does .price match class="price special" ? | dropped | obscure units or unnecessary specification detail |
| 141 | What is the specificity tuple of p (IDs, classes, types)? | consolidated | Consolidated into: For comparable normal author rules, how are element, class and ID selectors ranked? |
| 142 | What is the specificity tuple of .warning ? | consolidated | Consolidated into: For comparable normal author rules, how are element, class and ID selectors ranked? |
| 143 | What is the specificity tuple of #header ? | consolidated | Consolidated into: For comparable normal author rules, how are element, class and ID selectors ranked? |
| 144 | What is the specificity tuple of div#info p ? | consolidated | Consolidated into: For comparable normal author rules, how are element, class and ID selectors ranked? |
| 145 | What is the specificity tuple of p.warning ? | consolidated | Consolidated into: For comparable normal author rules, how are element, class and ID selectors ranked? |
| 146 | Do combinators such as spaces and > add specificity? | consolidated | Consolidated into: For comparable normal author rules, how are element, class and ID selectors ranked? |
| 147 | For ordinary competing declarations in the same origin and layer, which wins: p or .warning? | consolidated | Consolidated into: For comparable normal author rules, how are element, class and ID selectors ranked? |
| 148 | Given equally specific ordinary rules p { color: red; } p { color: blue; } , what is the resulting text colour? | consolidated | Consolidated into: For comparable normal author rules, how are element, class and ID selectors ranked? |
| 149 | TRUE or FALSE: selector specificity is the first and only step of the CSS cascade. | consolidated | Consolidated into: For comparable normal author rules, how are element, class and ID selectors ranked? |
| 150 | Given #x { color: red; } p { color: blue !important; } and <p id="x">Text</p> , what colour wins? | retained | T03a pp11–15 |
| 151 | Write a named-colour declaration making text red. | dropped | repeated syntax/example for an already practised action |
| 152 | Write the six-digit hexadecimal colour declaration used for the Bistro h1. | dropped | repeated syntax/example for an already practised action |
| 153 | Convert #993399 to decimal RGB. | retained | T03a p38; Moodle Activity03A |
| 154 | Expand the shorthand #F06 . | retained | T03a p38; Moodle Activity03A |
| 155 | Shorten #AABBCC without changing its colour. | dropped | repeated syntax/example for an already practised action |
| 156 | Can #C8B2E6 be shortened to a three-digit hex value without changing it? | dropped | repeated syntax/example for an already practised action |
| 157 | Write text colour using RGB percentages 78%, 70%, 90%. | retained | T03a p38; Moodle Activity03A |
| 158 | Write a half-transparent white background using rgba. | dropped | repeated syntax/example for an already practised action |
| 159 | What do alpha values 0 and 1 mean in rgba? | retained | T03a pp36–40 |
| 160 | What does HSL stand for? | retained | T03a pp36–40 |
| 161 | In HSL, what does hue describe? | dropped | repeated syntax/example for an already practised action |
| 162 | What does 0% saturation produce in HSL? | dropped | repeated syntax/example for an already practised action |
| 163 | What do HSL lightness values 0% and 100% produce? | dropped | repeated syntax/example for an already practised action |
| 164 | Write an HSL text colour with hue 300, saturation 50% and lightness 40%. | retained | T03a pp36–40 |
| 165 | Write HSLA text colour with hue 300, saturation 50%, lightness 40% and alpha 0.5. | dropped | repeated syntax/example for an already practised action |
| 166 | How does opacity: 0.5; affect child text? | dropped | repeated syntax/example for an already practised action |
| 167 | Which declaration makes a background translucent while leaving its text opacity unchanged? | dropped | repeated syntax/example for an already practised action |
| 168 | TRUE or FALSE: setting child opacity to 1 cancels a parent opacity of 0.5. | dropped | obscure units or unnecessary specification detail |
| 169 | What happens to an unknown declaration such as colour: red; ? | dropped | repeated syntax/example for an already practised action |
| 170 | Write a font stack using Marko One, then Verdana, then sans-serif. | dropped | repeated syntax/example for an already practised action |
| 171 | In what order does the browser consider a font-family list? | retained | T03a p22; Moodle Activity02B |
| 172 | Why end a font-family list with a generic family? | dropped | repeated syntax/example for an already practised action |
| 173 | Write CSS making a heading italic. | dropped | repeated syntax/example for an already practised action |
| 174 | Write CSS making description terms bold. | dropped | repeated syntax/example for an already practised action |
| 175 | Which traditional numeric font-weight values correspond to normal and bold? | dropped | obscure units or unnecessary specification detail |
| 176 | Write CSS rendering .label in small capitals. | dropped | repeated syntax/example for an already practised action |
| 177 | Write CSS centring h2 text. | dropped | repeated syntax/example for an already practised action |
| 178 | What does text-align: justify; normally do? | retained | T03a p27 |
| 179 | What does text-transform: uppercase; do? | consolidated | Consolidated into: How do uppercase, lowercase and capitalize change displayed text? |
| 180 | What does text-transform: lowercase; do? | consolidated | Consolidated into: How do uppercase, lowercase and capitalize change displayed text? |
| 181 | What does text-transform: capitalize; do? | consolidated | Consolidated into: How do uppercase, lowercase and capitalize change displayed text? |
| 182 | What does text-transform: none; do? | consolidated | Consolidated into: How do uppercase, lowercase and capitalize change displayed text? |
| 183 | Write a declaration removing text-decoration from links. | consolidated | Consolidated into: Which text-decoration values underline, strike through and draw an overline? |
| 184 | Write a declaration striking text through. | consolidated | Consolidated into: Which text-decoration values underline, strike through and draw an overline? |
| 185 | Which text-decoration value draws a line above the text? | consolidated | Consolidated into: Which text-decoration values underline, strike through and draw an overline? |
| 186 | If font-size is 20px and line-height is 1.4, what is the used line height? | retained | Moodle Activity02B; T03a pp21–30 |
| 187 | Why is unitless line-height useful for inherited text styles? | dropped | obscure units or unnecessary specification detail |
| 188 | Write the Bistro heading’s text shadow. | dropped | repeated syntax/example for an already practised action |
| 189 | Does text-shadow support a spread radius? | dropped | repeated syntax/example for an already practised action |
| 190 | For font-size: 1.5em on a child of a 20px parent, what is the child’s font size? | retained | Moodle Activity02B; T03a pp21–30 |
| 191 | If an element’s own font size is 20px, what is padding: 1em? | retained | T03a pp19,51 |
| 192 | If the root font size is 16px, what is font-size: 1.5rem? | retained | Moodle Activity02B; T03a pp21–30 |
| 193 | TRUE or FALSE: em always uses the parent’s font size for every property. | dropped | repeated syntax/example for an already practised action |
| 194 | If a parent has 16px text, what is font-size: 100% on its child? | dropped | repeated syntax/example for an already practised action |
| 195 | Is a CSS px necessarily one physical display pixel? | dropped | obscure units or unnecessary specification detail |
| 196 | What percentage does calc(1em * 7/8) represent for font-size? | retained | Moodle Activity02B; T03a pp21–30 |
| 197 | Write a CSS width 40px less than the containing block’s width. | dropped | obscure units or unnecessary specification detail |
| 198 | Write a head link loading the Marko One font stylesheet, using the brief’s URL with HTTPS. | dropped | repeated syntax/example for an already practised action |
| 199 | Are quotes always mandatory around an ordinary multi-word CSS family name such as Marko One? | dropped | repeated syntax/example for an already practised action |
| 200 | Name the box model regions from inside to outside. | retained | T03a pp16,50 |
| 201 | Which region separates content from its border? | retained | T03a pp16,50 |
| 202 | Which region separates an element’s border from neighbouring boxes? | retained | T03a pp16,50 |
| 203 | What order do four padding or margin shorthand values follow? | retained | T03a pp54,60 |
| 204 | Expand padding: 2em; . | retained | T03a pp54,60 |
| 205 | Expand padding: 10px 20px; . | retained | T03a pp54,60 |
| 206 | Expand padding: 10px 20px 30px; . | retained | T03a pp54,60 |
| 207 | Expand padding: 25px 50px 75px 100px; . | retained | T03a pp54,60 |
| 208 | Write padding for top 4px, right 8px, bottom 12px and left 16px. | dropped | repeated syntax/example for an already practised action |
| 209 | Write margins with 0 top/bottom and 12px left/right. | retained | T03a pp54,60 |
| 210 | Write a 2px solid red border on every side. | retained | T03a pp55–59; Moodle Activity02A |
| 211 | What is the initial border-style? | dropped | repeated syntax/example for an already practised action |
| 212 | Write a 1px solid red bottom border only. | retained | T03a pp55–59; Moodle Activity02A |
| 213 | Name the border-style values listed in the supplied CSS slide. | dropped | obscure units or unnecessary specification detail |
| 214 | Expand border-style: solid dashed double dotted; . | retained | T03a pp55–59; Moodle Activity02A |
| 215 | What do thin, medium and thick specify for border-width? | dropped | obscure units or unnecessary specification detail |
| 216 | Under content-box, find border-box width for width 200px, horizontal padding 10px per side and border 2px per side. | retained | T03a pp51–52 |
| 217 | What changes when box-sizing is border-box? | retained | T03a pp51–52 |
| 218 | Write the exercise box shadow with offsets 6px, blur 5px, spread 10px and gray colour. | retained | T03a p63 |
| 219 | In box-shadow: 6px 6px 5px 10px gray; , which value is the spread? | dropped | repeated syntax/example for an already practised action |
| 220 | For adjoining positive vertical block margins of 2em and 4em that collapse, what is the resulting gap? | dropped | repeated syntax/example for an already practised action |
| 221 | TRUE or FALSE: every pair of vertical margins always collapses. | dropped | obscure units or unnecessary specification detail |
| 222 | Do horizontal margins collapse like adjoining vertical block margins? | dropped | obscure units or unnecessary specification detail |
| 223 | If collapsing margins are +20px and −5px, what is their combined margin? | dropped | repeated syntax/example for an already practised action |
| 224 | What does float: right do in a text layout? | retained | Moodle Activity02A; T03b pp5–7 |
| 225 | Why can a container with only floated children have no content height? | retained | Moodle Activity02A; T03b pp5–7 |
| 226 | Write the course’s overflow-based fix for a container with only floated children. | dropped | repeated syntax/example for an already practised action |
| 227 | What is a possible side effect of using overflow: auto to contain floats? | dropped | repeated syntax/example for an already practised action |
| 228 | How do overflow: visible and overflow: hidden differ? | retained | T03a p53 |
| 229 | How do overflow: scroll and overflow: auto differ? | retained | T03a p53 |
| 230 | Write CSS floating images right with 12px horizontal margins. | dropped | repeated syntax/example for an already practised action |
| 231 | Write the Bistro body background colour. | dropped | repeated syntax/example for an already practised action |
| 232 | Write a background image declaration for images/bullseye.png. | dropped | repeated syntax/example for an already practised action |
| 233 | What is the initial background-repeat behaviour for an image? | retained | T03a p41 |
| 234 | What does background-repeat: no-repeat; request? | dropped | repeated syntax/example for an already practised action |
| 235 | What does background-repeat: repeat-x; request? | dropped | repeated syntax/example for an already practised action |
| 236 | What does background-repeat: repeat-y; request? | dropped | repeated syntax/example for an already practised action |
| 237 | Write a background centred horizontally and positioned 100px from the top. | retained | Moodle Activity03A/B |
| 238 | What does background-position: left top request? | dropped | repeated syntax/example for an already practised action |
| 239 | What does background-position: 50% 50% normally do? | dropped | repeated syntax/example for an already practised action |
| 240 | What does background-attachment: fixed request? | dropped | repeated syntax/example for an already practised action |
| 241 | What is the initial background-attachment value? | retained | T03a p43 |
| 242 | How does background-attachment: local relate to a scrollable element? | retained | T03a p43 |
| 243 | Write a blackgoose background shorthand: no repeat, centre x, y 100px, fixed, retaining half-transparent white. | dropped | repeated syntax/example for an already practised action |
| 244 | Write a linear gradient from aqua to green towards the bottom. | retained | T03a pp45–46 |
| 245 | Why is background-color: linear-gradient(...) invalid? | dropped | repeated syntax/example for an already practised action |
| 246 | What happens to unspecified background longhands when using the background shorthand? | dropped | repeated syntax/example for an already practised action |
| 247 | Write CSS removing the bullet marker from a list. | retained | T03a pp31–32 |
| 248 | Write CSS giving an ordered list lower-case alphabetic markers. | retained | T03a pp31–32 |
| 249 | Which marker value gives upper-case Roman numerals? | dropped | repeated syntax/example for an already practised action |
| 250 | Name the three course bullet-marker shapes. | dropped | repeated syntax/example for an already practised action |
| 251 | Write an image-based list marker using bullet.png. | dropped | repeated syntax/example for an already practised action |
| 252 | How do list-style-position: inside and outside differ? | dropped | repeated syntax/example for an already practised action |
| 253 | Write the course’s link-state ordering mnemonic as pseudo-classes. | dropped | repeated syntax/example for an already practised action |
| 254 | What state does :link select? | retained | T03a pp48–49 |
| 255 | What state does :visited select? | retained | T03a pp48–49 |
| 256 | What state does :focus select? | retained | T03a pp48–49 |
| 257 | What state does :hover select? | retained | T03a pp48–49 |
| 258 | What state does :active select? | retained | T03a pp48–49 |
| 259 | Why can a later a:link colour override an earlier a:hover colour? | dropped | repeated syntax/example for an already practised action |
| 260 | TRUE or FALSE: writing hover before link is always invalid CSS. | dropped | repeated syntax/example for an already practised action |
| 261 | Write a hover rule making links #c700f2 on white. | dropped | repeated syntax/example for an already practised action |
| 262 | Write a focus rule making links maroon on #ffd9d9. | dropped | repeated syntax/example for an already practised action |
| 263 | Write an active-link rule making text red. | dropped | repeated syntax/example for an already practised action |
| 264 | Write the course’s unvisited and visited link colours. | dropped | repeated syntax/example for an already practised action |
| 265 | Why should a keyboard-focus indicator remain visible? | retained | T03a pp48–49 |
| 266 | Write CSS from memory — Twenties: make h1 red with a 1px solid red bottom border. | dropped | repeated syntax/example for an already practised action |
| 267 | Write CSS from memory — Twenties: make h2 gray and move it 100px from the left using margin. | dropped | repeated syntax/example for an already practised action |
| 268 | Write CSS from memory — Twenties: make paragraphs small sans-serif with a 100px left margin. | dropped | repeated syntax/example for an already practised action |
| 269 | Write CSS from memory — Twenties: make em and strong descendants of paragraphs blue and bold. | dropped | repeated syntax/example for an already practised action |
| 270 | Write CSS from memory — Menu fonts: give body Verdana fallback sans-serif, 100% font size and line height 1.4. | retained | Moodle Activity02B; T03a pp21–30 |
| 271 | Write CSS from memory — Menu fonts: give h1 Marko One fallback serif at 1.5rem. | dropped | repeated syntax/example for an already practised action |
| 272 | Write CSS from memory — Menu fonts: centre h1 and add the .1em/.1em/.2em lightslategray shadow. | dropped | repeated syntax/example for an already practised action |
| 273 | Write CSS from memory — Menu fonts: make h2 1em, centred and uppercase. | retained | Moodle Activity02B; T03a pp21–30 |
| 274 | Write CSS from memory — Menu fonts: centre and italicize only the paragraph immediately after an h2. | retained | Moodle Activity02B; T03a pp21–30 |
| 275 | Write CSS from memory — Menu fonts: make p and dl text 7/8 of the parent’s font size. | dropped | repeated syntax/example for an already practised action |
| 276 | Write CSS from memory — Menu fonts: make strong inside dt italic and maroon. | dropped | repeated syntax/example for an already practised action |
| 277 | Write CSS from memory — Menu fonts: make div#info teal and centre its text. | dropped | repeated syntax/example for an already practised action |
| 278 | Write CSS from memory — Menu fonts: override div#info paragraphs to gray italic text. | dropped | repeated syntax/example for an already practised action |
| 279 | Write CSS from memory — Menu fonts: give .price Georgia fallback serif, italic style and gray colour. | dropped | repeated syntax/example for an already practised action |
| 280 | Write CSS from memory — Menu fonts: make .label bold, non-italic and small-caps. | dropped | repeated syntax/example for an already practised action |
| 281 | Write CSS from memory — Menu fonts: make only p.warning x-small and red. | dropped | repeated syntax/example for an already practised action |
| 282 | Write CSS from memory — Bistro colour practice: make h1 #993399 at 140% of its parent’s font size. | dropped | repeated syntax/example for an already practised action |
| 283 | Write CSS from memory — Bistro colours: make h2 #cc6600. | dropped | repeated syntax/example for an already practised action |
| 284 | Write CSS from memory — Bistro colours: make div#header background half-transparent white. | retained | Moodle Activity03A/B |
| 285 | Write CSS from memory — Bistro backgrounds: tile purpledot.png horizontally in div#header. | retained | Moodle Activity03A/B |
| 286 | Write CSS from memory — Local blackgoose.css: reproduce the body style. | retained | Moodle Activity01; supplied blackgoose.css |
| 287 | Write CSS from memory — Local blackgoose.css: reproduce the h2 colour and font size. | dropped | repeated syntax/example for an already practised action |
| 288 | Write CSS from memory — Local blackgoose.css: reproduce the h1 bottom border and top margin. | dropped | repeated syntax/example for an already practised action |
| 289 | Write CSS from memory — Local blackgoose.css: reproduce the h1 alignment, family, weight and case. | dropped | repeated syntax/example for an already practised action |
| 290 | In menu.html, which selector targets the span elements containing prices? | dropped | repeated syntax/example for an already practised action |
| 291 | In menu.html, which selector targets description terms marked as new items? | retained | Moodle Activity02B; T03a pp21–30 |
| 292 | What nesting error appears beside the image in the local twenties.html? | retained | Moodle Activity02A; T03b pp5–7 |
| 293 | What is absent from the supplied menu_contents.txt skeleton for a complete explicit HTML5 document? | dropped | repeated syntax/example for an already practised action |
| 294 | Exam trap 01 — What is the recommended correction when an HTML5 document starts with html and omits its doctype? | retained | T01 p22; Moodle Activity01 |
| 295 | Exam trap 02 — Why does border-width plus border-color leave an ordinary border invisible? | retained | T03a pp55–59; Moodle Activity02A |
| 296 | Exam trap 03 — What is wrong with h1 p when the task is to colour both headings and paragraphs? | retained | T03a p35; Moodle Activity02A |
| 297 | Exam trap 04 — An ordinary informative img has src but no alt. What should be added? | retained | T02 p13; Moodle Activity01 |
| 298 | Exam trap 05 — Why might hover colour fail with a:hover followed by a:link? | retained | T03a pp48–49; Moodle Activity03A |
| 299 | Exam trap 06 — Is an absolute same-server URL invalid, and why might an exercise prefer a relative path? | retained | T02 pp3–8; Moodle Activity01 |
| 300 | Exam trap 07 — Fix p { colour: red; } . | retained | T03a p6; Moodle Activity02A |
| 301 | Exam trap 08 — A child uses font-size: 2em, while another uses 2rem. Which reference size does each use? | retained | T03a p19; Moodle Activity02B |
| 302 | Exam trap 09 — Where should the stylesheet link be placed in the course’s standard HTML skeleton? | retained | T01 p26; Moodle Activity02A |
| 303 | Exam trap 10 — Fix <link rel="ref" href="style.css"> . | retained | T01 p26; Moodle Activity02A |
| 304 | Exam trap 11 — A half-transparent background also makes the text fade. How should opacity be replaced? | retained | T03a pp37,40; Moodle Activity03A |
| 305 | Exam trap 12 — Why does replacing #C8B2E6 with #CBE change the colour? | retained | T03a p38; Moodle Activity03A |
| 306 | Exam trap 13 — A normal block container has only floated children and collapses. Give the course fix. | retained | Moodle Activity02A; T03b pp5–7 |
| 307 | Exam trap 14 — The page requests Marko One but never loads it. What is missing? | retained | Moodle Activity02B |
| 308 | Exam trap 15 — Should you quote Marko One in a font-family declaration? | retained | T03a p22; Moodle Activity02B |
| 309 | Exam trap 16 — What is wrong with text-shadow: 1px 1px 2px 3px gray; ? | retained | T03a pp30,63; Moodle Activity02B |
| 310 | Exam trap 17 — Two adjoining positive block margins collapse: 2em bottom and 4em top. What gap results? | retained | T03a p62 |
| 311 | How does the Web differ from the Internet? | retained | T01 p2 |
| 312 | Describe one HTTP client-server interaction. | retained | T01 pp4–6; Moodle Activity00 |
| 313 | Why can opening one HTML page cause several network requests? | retained | T01 pp4–6; Moodle Activity00 |
| 314 | Name the web-server software examples in the supplied introduction. | dropped | ancillary names, acronyms, history or memorized lists |
| 315 | Expand the traditional LAMP stack used in the lecture. | dropped | ancillary names, acronyms, history or memorized lists |
| 316 | How do traditional WAMP and MAMP names differ from LAMP? | dropped | ancillary names, acronyms, history or memorized lists |
| 317 | How does a web application differ in emphasis from an informational website? | retained | T01 p8 |
| 318 | Why collect user needs before designing a site? | retained | T01 pp11–13 |
| 319 | How does a planning site diagram differ from an XML sitemap? | retained | T01 pp11–13 |
| 320 | What does WYSIWYG mean for an editor? | dropped | ancillary names, acronyms, history or memorized lists |
| 321 | What is one advantage and one constraint of hosting a site in-house? | retained | T01 pp28–29 |
| 322 | What role does a hosting provider play? | dropped | repeated syntax/example for an already practised action |
| 323 | How does registering a domain differ from buying hosting? | retained | T01 pp28–29 |
| 324 | What does a content management system help manage? | dropped | repeated syntax/example for an already practised action |
| 325 | What does ISP stand for? | dropped | ancillary names, acronyms, history or memorized lists |
| 326 | Activity00: what is lynx used for? | retained | Moodle Activity00 |
| 327 | Activity00: what is ping used for? | retained | Moodle Activity00 |
| 328 | Activity00: what is telnet used for? | retained | Moodle Activity00 |
| 329 | Activity00: what is nmap used for? | retained | Moodle Activity00 |
| 330 | Activity00: what is curl used for? | retained | Moodle Activity00 |
| 331 | Activity00: what is tcpdump used for? | retained | Moodle Activity00 |
| 332 | Activity00: what is host used for? | consolidated | Consolidated into: Which Activity00 tools query DNS, and what do they check? |
| 333 | Activity00: what is dig used for? | consolidated | Consolidated into: Which Activity00 tools query DNS, and what do they check? |
| 334 | Activity00: what is nslookup used for? | consolidated | Consolidated into: Which Activity00 tools query DNS, and what do they check? |
| 335 | Activity00: what is ifconfig used for? | retained | Moodle Activity00 |
| 336 | Activity00: what is ipconfig used for? | retained | Moodle Activity00 |
| 337 | Activity00: what is ip a used for? | retained | Moodle Activity00 |
| 338 | Activity00: what is ip route used for? | retained | Moodle Activity00 |
| 339 | Activity00: what is nc / netcat used for? | retained | Moodle Activity00 |
| 340 | Activity00: what is netstat -atp used for? | consolidated | Consolidated into: What do netstat and ss help inspect in Activity00? |
| 341 | Activity00: what is ss -t -a -p used for? | consolidated | Consolidated into: What do netstat and ss help inspect in Activity00? |
| 342 | Activity00: what is ss -u -a used for? | consolidated | Consolidated into: What do netstat and ss help inspect in Activity00? |
| 343 | Activity00: what is man curl used for? | retained | Moodle Activity00 |
| 344 | TRUE or FALSE: a failed ping proves a website is unavailable. | retained | Moodle Activity00 |
| 345 | What do DNS queries check that ping does not directly establish? | consolidated | Consolidated into: Which Activity00 tools query DNS, and what do they check? |
| 346 | As standard background for Activity00, what are the default ports for HTTP and HTTPS? | retained | Moodle Activity00 |
| 347 | What does localhost mean when testing a local web server? | retained | Moodle Activity00 |
| 348 | Write the activity command starting Python’s simple server on port 8080. | retained | Moodle Activity01 |
| 349 | Write the activity URL to fetch index.html from the local server on port 8080. | retained | Moodle Activity01 |
| 350 | How does opening a local page through file:// differ from localhost HTTP? | retained | Moodle Activity01 |
| 351 | What can an HTTP server access log help you inspect? | retained | Moodle Activity01 |
| 352 | What does a favicon request returning status 404 mean? | retained | Moodle Activity01 |
| 353 | Write a head link to favicon.ico using the activity’s icon MIME type. | dropped | repeated syntax/example for an already practised action |
| 354 | Why are meaningful headings preferable to merely enlarging paragraph text? | retained | Moodle Activity01 |
| 355 | What does reusing target="courseWindow" in several links do? | retained | T02 p11 |
| 356 | Write a horario.html table cell linking to the web section in courses.html. | dropped | repeated syntax/example for an already practised action |
| 357 | An image is naturally 400×200. What width preserves its ratio when height is 100? | retained | T02 p15; Moodle Activity01 |
| 358 | What can happen when an image’s width and height are both forced to the wrong ratio? | dropped | repeated syntax/example for an already practised action |
| 359 | What does an SVG viewBox specify? | retained | T02 pp17–19 |
| 360 | Write an inline SVG with a 100×100 coordinate system and a circle centred at (50,50) with radius 20. | retained | T02 pp17–19 |
| 361 | Which SVG element draws a rectangle? | dropped | repeated syntax/example for an already practised action |
| 362 | Write an SVG rectangle at (10,20), width 40 and height 30. | dropped | repeated syntax/example for an already practised action |
| 363 | Which SVG element places text at drawing coordinates? | dropped | repeated syntax/example for an already practised action |
| 364 | Write a CSS @import loading fonts.css. | retained | T03a pp8–9 |
| 365 | Write a simple @font-face definition loading marko.woff2. | retained | Moodle Activity02B; T03a pp21–30 |
| 366 | What is wrong with @fontface in a font-loading rule? | dropped | repeated syntax/example for an already practised action |
| 367 | What is CSS inheritance? | retained | T03a p11 |
| 368 | Given #parent { color: red; } p { color: blue; } , what colour is a p inside #parent? | retained | T03a pp11–15 |
| 369 | TRUE or FALSE: margin and padding normally inherit automatically. | dropped | repeated syntax/example for an already practised action |
| 370 | What does the CSS value inherit request? | dropped | repeated syntax/example for an already practised action |
| 371 | Write an important red text declaration. | retained | T03a pp11–15 |
| 372 | Which browser tool helps explain why a CSS rule did not apply? | retained | T03a p20; Moodle Activity00 |
| 373 | Why is the Network panel useful when a stylesheet has no effect? | retained | T03a p20; Moodle Activity00 |
| 374 | What does the CSS unit in represent? | dropped | obscure units or unnecessary specification detail |
| 375 | What does the CSS unit cm represent? | dropped | obscure units or unnecessary specification detail |
| 376 | What does the CSS unit mm represent? | dropped | obscure units or unnecessary specification detail |
| 377 | What does the CSS unit q represent? | dropped | obscure units or unnecessary specification detail |
| 378 | What does the CSS unit pt represent? | dropped | obscure units or unnecessary specification detail |
| 379 | What does the CSS unit pc represent? | dropped | obscure units or unnecessary specification detail |
| 380 | What does the CSS unit ex represent? | dropped | obscure units or unnecessary specification detail |
| 381 | What does the CSS unit ch represent? | dropped | obscure units or unnecessary specification detail |
| 382 | What does the CSS unit vw represent? | retained | T03a p19; T04 pp33–37 |
| 383 | What does the CSS unit vh represent? | retained | T03a p19; T04 pp33–37 |
| 384 | What does the CSS unit vmin represent? | dropped | obscure units or unnecessary specification detail |
| 385 | What does the CSS unit vmax represent? | dropped | obscure units or unnecessary specification detail |
| 386 | If a viewport is 1200px wide, what is 50vw? | dropped | obscure units or unnecessary specification detail |
| 387 | For a viewport 800px wide and 600px tall, what is 10vmin? | dropped | obscure units or unnecessary specification detail |
| 388 | Why is “a percentage is always relative to the parent” incomplete? | dropped | obscure units or unnecessary specification detail |
| 389 | Write font shorthand for italic bold 16px text, line-height 1.4, Verdana fallback sans-serif. | retained | T03a p21 |
| 390 | What must be considered when replacing font longhands with the font shorthand? | dropped | obscure units or unnecessary specification detail |
| 391 | What is the font-style value oblique used for? | retained | T03a p25 |
| 392 | Write a 2em first-line indent for paragraphs. | retained | T03a p26 |
| 393 | How do text-align: start and end differ from left and right? | dropped | obscure units or unnecessary specification detail |
| 394 | Write lower-case Roman markers for an ordered list. | dropped | obscure units or unnecessary specification detail |
| 395 | Write decimal ordered-list markers with leading zeroes. | dropped | obscure units or unnecessary specification detail |
| 396 | Which list-style-type gives upper-case alphabetic markers? | dropped | obscure units or unnecessary specification detail |
| 397 | What does background-repeat: space request? | dropped | repeated syntax/example for an already practised action |
| 398 | What does background-repeat: round request? | dropped | repeated syntax/example for an already practised action |
| 399 | Write two background images with front.png above back.png. | retained | T03a p44 |
| 400 | What does background-origin control? | dropped | repeated syntax/example for an already practised action |
| 401 | What does background-clip control? | dropped | repeated syntax/example for an already practised action |
| 402 | How does background-size: cover differ from contain? | retained | T03a p44 |
| 403 | Write an aqua-to-green radial gradient background. | retained | T03a pp45–46 |
| 404 | What were vendor prefixes such as -webkit- used for in the lecture examples? | dropped | repeated syntax/example for an already practised action |
| 405 | Write a 10px corner radius on a box. | retained | T03a p59 |
| 406 | What does inset change in box-shadow? | retained | T03a p63 |
| 407 | Write an inset gray shadow with offsets 2px, blur 4px and spread 1px. | retained | T03a p63 |
| 408 | With width 200px, horizontal padding 10px and border 2px per side under border-box, what is content width? | retained | T03a pp51–52 |
| 409 | Original Twenties activity: write CSS making every element inside a p blue and bold. | retained | Moodle Activity02A; T03b pp5–7 |
| 410 | Original Menu activity: make every strong italic, but only strong inside dt maroon. | retained | Moodle Activity02B; T03a pp21–30 |
| 411 | Original Bistro activity: make h1 140% of the root font size. | retained | Moodle Activity03A/B |
| 412 | Original Bistro activity: compact the header background while preserving its 50% white background colour. | dropped | repeated syntax/example for an already practised action |
| 413 | Why does the later gray h2 rule win over an earlier red h2 rule in the Twenties activity? | retained | Moodle Activity02A; T03b pp5–7 |
| 414 | Why can .price make a span gray even if its enclosing div#info has teal text? | dropped | repeated syntax/example for an already practised action |
| 415 | What is hypertext? | dropped | ancillary names, acronyms, history or memorized lists |
| 416 | Who proposed the Web at CERN in 1989? | dropped | ancillary names, acronyms, history or memorized lists |
| 417 | Expand W3C and describe its role. | dropped | ancillary names, acronyms, history or memorized lists |
| 418 | What is the purpose of an HTTP GET request? | dropped | repeated syntax/example for an already practised action |
| 419 | How do the designer and developer roles differ in the introduction? | dropped | repeated syntax/example for an already practised action |
| 420 | Activity00: why test the same page in at least two browsers? | retained | Moodle Activity00 |
| 421 | Which browser panel normally shows JavaScript errors and logged messages? | retained | Moodle Activity00 |
| 422 | What does HTTPS add to HTTP as standard background for the activity’s security discussion? | retained | Moodle Activity00 |
| 423 | TRUE or FALSE: ordinary HTTP encrypts the page’s network traffic by itself. | retained | Moodle Activity00 |
| 424 | Does Python’s python3 -m http.server require installing a third-party httpserver package? | retained | Moodle Activity01 |
| 425 | Write robots.txt instructions asking all cooperative crawlers not to crawl /private/. | retained | T01 p18 |
| 426 | Where is the conventional robots.txt file requested for an origin? | retained | T01 p18 |
| 427 | Name the five generic font families pictured in the supplied CSS slide. | dropped | ancillary names, acronyms, history or memorized lists |
| 428 | How do font-weight: bolder and lighter differ from fixed numeric weights? | retained | Moodle Activity02B; T03a pp21–30 |
| 429 | Write a negative first-line indentation of 2em. | dropped | repeated syntax/example for an already practised action |
| 430 | What does text-transform: full-width request? | consolidated | Consolidated into: How do uppercase, lowercase and capitalize change displayed text? |
| 431 | Write Greek lower-case ordered-list markers. | dropped | repeated syntax/example for an already practised action |
| 432 | Write a background position aligned to the right and bottom. | retained | Moodle Activity03A/B |
| 433 | Write a background position aligned left and centred vertically. | retained | Moodle Activity03A/B |
| 434 | The supplied slide contains font-face: Verdana; . What property should specify this font family? | retained | T03a pp8–9 |
| 435 | Correct the slide’s arithmetic: content width 500px, total horizontal padding 50px, total border 10px. Find visible border-box width. | dropped | repeated syntax/example for an already practised action |
| 436 | With border-box width 500px, total horizontal padding 50px and total border 10px, find content width. | dropped | repeated syntax/example for an already practised action |
| 437 | How does border-style: hidden differ from none for collapsed table borders? | dropped | obscure units or unnecessary specification detail |
| 438 | Activity01: put blackgoose.png inside h1 at height 50px while preserving its intrinsic ratio. | retained | Moodle Activity01 |
| 439 | Activity01: write a timetable cell linking to course details on the same page with id web. | retained | Moodle Activity01 |
| 440 | Which SVG attributes define a circle’s centre and radius? | dropped | obscure units or unnecessary specification detail |
| 441 | How do SVG fill and stroke differ? | dropped | obscure units or unnecessary specification detail |
| 442 | Which rect attributes give an SVG rectangle rounded corners? | dropped | obscure units or unnecessary specification detail |
| 443 | Which namespace is conventionally declared on a standalone SVG root? | dropped | obscure units or unnecessary specification detail |
| 444 | How do font-weight: normal and font-style: normal differ? | dropped | obscure units or unnecessary specification detail |
