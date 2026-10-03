# Statistics and Data: actual-course source audit

The current focused files replace the earlier generic decks. They are based on the supplied authenticated Moodle materials and exact posted tasks. Every card has page, cell or practical-task provenance. Foundation cards support solving the taught problems; exam practice means rehearsal of those methods, not a prediction of an unseen assessment or a claim that an actual past paper was provided.

## Reviewed material

- Statistics: all 6 pages of `FUC_PEstat_R.pdf`, all 7 pages of `Semana1_a.pdf`, all 8 pages of `Semana2pe.pdf`, all 4 scanned pages of `distribuicoes.pdf`, and all supplied teaching summaries through 30 September. The scanned formulas, tables and event diagrams were rendered and inspected. Cohort-specific summaries are retained in source labels; the student's teaching group is not yet verified.
- Assigned book: only printed pages 69, 91 and 94, verified as PDF pages 82, 104 and 107. Four short exact assigned-problem cards use 145 front/back words in total. Other lecture exercises are attributed to the supplied lecturer slides. The complete 409-page bibliography book was not turned into a deck.
- Data: all 6 presentation pages, all 24 Data Types pages, all 29 notebook source cells, Practical 1 and Practical 2 as saved in `live_course.md`. PDFs were rendered and visually reviewed. Notebook cells were parsed as JSON and never executed. Stored notebook outputs are treated as evidence of a saved execution state, not proof that the displayed source runs correctly in order; very large saved tables were not copied into the deck.

## Content retained for passing preparation

Statistics has 112 cards: 36 foundation and 76 exam practice. It covers the posted event algebra and probability interpretations/axioms, independence and conditional/total/Bayes rules, discrete/continuous PMF/PDF/CDF, bivariate joint/marginal/conditional functions, expectation/variance and conditional moments, covariance/correlation, raw/central moments and MGF. Worked tasks include the exact numbered-ball and coin examples, food-consumption density, salary table, joint continuous density, consultation-count table, and the assigned employee/PMF/food exercises. The posted main-distribution reference and Mathematics-group summary support Bernoulli, Binomial, discrete Uniform, Geometric, Negative Binomial, Poisson/approximation, Hypergeometric and Multinomial. Reference-backed continuous distributions include Uniform, scale-parameter Exponential, Normal and the chi-square/t/F relationships.

Data has 74 cards: 18 foundation and 56 exam practice. It covers Python types and operations, collection choices, the exact diagnosis-only records, data quality/representation and the lecture's LLM/provenance pipeline, the exact Portuguese NLP preprocessing/frequency tasks, notebook strings/lists/dictionaries/control flow/error handling and supported pandas acquisition/inspection/transformation. Actual posted-code faults are rehearsed as debugging questions.

The fields `track`, `style`, `source` and `reason` make the purpose of each item explicit. Each card has one permitted tag and a unique course-prefixed front. Formulas and worked steps use English; the actual Portuguese input text and field names remain unchanged.

## Removed or deferred

- Removed unsupported SQL, NumPy, PCA, Pearson/Spearman Data Analysis, broad supervised/unsupervised/overfitting theory, generic ETL acronym drills and scaling recipes from the Data deck. The actual posted notebook supports a narrower set of pandas operations, so those operations remain. Its commented groupby/chart and guarded regression blocks support diagnostic cards, not a claim that missing columns or a trained model exist.
- Removed generic Statistics regression/CLT/inference drills that lack current teaching detail in the reviewed files. The two list-only cards about later inference topics are removed from the active deck. Pending official topics remain here only: FUC pp.2–3 modules5–7 include estimation by moments/MLE, confidence intervals and tests for means/proportions/variances, two-population comparison, normality/equal-variance diagnostics, and sign/Wilcoxon/Mann–Whitney. Detailed teaching and exercise cards await the posted material.
- Removed the Data list-only card about later program headings. Presentation p.3 explicitly lists attribute analysis, selection and reduction, and image-data processing; these pending headings remain in this audit only until detailed teaching material is available.
- Standalone permutations/combination questions were removed. The combination coefficient remains where a posted binomial/hypergeometric formula needs it.
- The reference sheet contains additional families such as Beta, Gamma, Logistic, Lognormal, Pareto, Weibull, Cauchy and Laplace. It was read in full; detailed formula drills for families not listed in the official main-distribution syllabus or current summaries were not added. The no-moment/no-MGF caution is retained because it directly supports the current MGF topic. The full reference remains available for lookup.
- Teacher biography, contacts, hobbies, book bibliography and presentation introductions are omitted from memorisation cards. Assessment rules and dates are recorded below instead.

## Source problems corrected transparently

1. Data Types p.8 calls dictionaries unordered. Modern Python preserves insertion order; the key–value nature and appropriate dictionary uses remain intact.
2. Notebook cell11 shows `frutas.append("pera", "ananas")`, which raises `TypeError`. The card gives `extend(["pera", "ananas"])` or separate appends and notes the saved-output inconsistency.
3. Notebook cell24 uppercases column names; cells26–27 still use lowercase names. Cards diagnose this execution-order mismatch and use the actual uppercase names.
4. The commented chart requires a missing `quantity` column. The regression block requires `price`, `quantity`, `revenue`; they are absent from the displayed schema. It is not presented as a completed model.
5. Practical2 specifically forbids correcting, deleting or replacing its records. Its cards diagnose `None`, category-case differences, age250, negative income, identical rows and unknown satisfaction range; they ask what evidence would confirm an error. The notebook's later cleaning examples do not override that task instruction.
6. The exponential reference uses scale β, while the earlier generic deck used rate λ. The new cards explicitly state β=1/λ and use matching formulas.
7. Reviewed formula display avoids mixed baseline/superscript expressions that can change meaning: Poisson uses `exp(−λ) λᵏ/k!`, multinomial uses `∏ᵢ pᵢ^(xᵢ)`, exponential uses `exp(−x/β)/β` and survival `exp(−t/β)`, and the chi-square MGF uses `(1−2t)^(−ν/2)`. The authoring scripts and active JSON use the same corrected expressions.

## Verified assessment and passing-relevant notes

### Statistics — FUC pp.4–5

Continuous assessment has two tests weighted equally: NF = 0.50 F1 + 0.50 F2. Each test must be at least 8/20. The FUC explicitly caps the normal-season grade at 9 where the calculated average is at least 9.5 but the second test is below 8. A high average therefore does not override the per-test minimum. Final assessment by exam is also available. An oral verification may be required under the stated regulation.

Posted calendar, all 09:00–13:00: first test 31 October 2026; second test plus normal exam 15 January 2027; resit 29 January 2027; special exam 27 July 2027; extraordinary exam 10 September 2027. The FUC labels 27 July 2027 as Friday, but the calendar date is Tuesday; confirm the special-date entry before relying on it. The other listed weekdays match. Do not silently replace the posted date.

The FUC allows AI as technical, analytical and learning support when students understand, validate and take responsibility for the results. AI use in assessments/exams needs teacher authorisation. These materials are study support, and fabricated sources or results are not acceptable.

### Data — presentation p.4 and authenticated `live_course.md`

Theory is 50%; practical project is 50%. The theory route can be continuous assessment or exam; choosing the exam does not remove the practical component. The live course specifies two tests at 25% each with at least 8/20 each, and project at 50% with presentation or a practical test, also at least 8/20. The exam-route text says exam50% + project50% but does not independently repeat every minimum; confirm the exact exam minimum rather than infer it.

Posted date windows: first test 26–30 October 2026; second 14–18 December 2026; regular exam 4–8 January 2027; resit 25–29 January 2027; final project in January. Exact days depend on room availability and are not yet specified. Practical2 allows pairs and requires no submission; that does not imply the graded final project has the same policy.

## Remaining evidence gaps

No actual exam paper or test paper was supplied. First-test topic boundaries, the student's Statistics teaching group, grading rubric, allowed exam aids/language arrangements, Data final-project brief and exact Data assessment dates are not confirmed by these files. The notebook names an external CSV but its complete standalone dataset file was not supplied; the toy-record task must not be padded with invented “10 problems” to satisfy a separate larger-dataset lab instruction. Detailed image processing, embeddings/retrieval implementations and later statistical inference teaching remain pending.

## Validation

`focused_stats_data_validation.json` records successful schema, source, unique-front, permitted-tag, single-line-field and HTML checks, the corrected formula strings and the absence of future-heading-only cards. Independent rational arithmetic confirms the joint-density normalisation, triangular/upper-square probabilities, food mean/variance, assigned PMF moments/transformation and employee probability. The exponential worked result is independently checked against `exp(−1/2)≈0.6065`. The Portuguese first-text solution was independently checked: 24 words, 19 distinct, with `a` appearing4 times and `forma`/`de` twice. Rebuilding from the authoring scripts preserves the corrected formulas and 112/74 card counts. No notebook cells or untrusted downloads were executed.
