# MAT02354L — Formula page planning outline (NOT an exam-permitted printout)

Use this to **study and plan** your ONE permitted handwritten single-sided A4 page. On the day of the actual assessment, only your **own handwritten formulas and definitions** are permitted; do **not** carry this printed Markdown, completed worked solutions or a two-sided sheet. The lecturer may inspect the page.

Sources: reviewed Weeks 1–3; Murteira excerpt; exam rules announced on Moodle 2 October 2026. The exact 31 October F1 coverage and Week 4 PDF content remain unverified.

## Priority if space is limited
**1. Conditional probability/Bayes:** P(A|B)=P(A∩B)/P(B). Independence iff P(A∩B)=P(A)P(B). P(B)=ΣᵢP(B|Aᵢ)P(Aᵢ). P(Aⱼ|B)=P(B|Aⱼ)P(Aⱼ)/P(B).

**2. Random variables:** F(x)=P(X≤x). Discrete: Σ p(x)=1; continuous: ∫f(x)dx=1, P(a<X<b)=F(b)−F(a). E[X]=Σxp(x) or ∫xf(x)dx; Var(X)=E[X²]−E[X]²; Cov(X,Y)=E[XY]−E[X]E[Y].

**3. Count models** (always define X/support and assumptions):
- Bernoulli: P(X=x)=p^x(1−p)^(1−x), x=0,1. Mean p; variance p(1−p).
- Binomial: P(X=k)=C(n,k)p^k(1−p)^(n−k), k=0..n. Mean np; variance np(1−p).
- Geometric (counts trials through first success): P(X=k)=(1−p)^(k−1)p, k≥1. Mean 1/p; variance (1−p)/p².
- Negative binomial (counts trials through rth success): P(X=k)=C(k−1,r−1)p^r(1−p)^(k−r), k≥r. Mean r/p; variance r(1−p)/p².
- Poisson: P(X=k)=e^(−λ)λ^k/k!, k≥0. Mean=variance=λ.
- Hypergeometric: population N with M successes, n draws without replacement: P(X=k)=C(M,k)C(N−M,n−k)/C(N,n). Mean np (p=M/N); variance np(1−p)(N−n)/(N−1).
- Discrete uniform 1..N: P(X=x)=1/N; mean (N+1)/2, variance (N²−1)/12.

**4. Continuous models:**
- Uniform(a,b): f=1/(b−a), mean (a+b)/2, variance (b−a)²/12.
- Exponential RATE λ: f(x)=λe^(−λx), x≥0, P(X>x)=e^(−λx), mean 1/λ, variance 1/λ². Memoryless.
- Normal(μ,σ²): Z=(X−μ)/σ, P(X≤x)=Φ((x−μ)/σ).
- Gamma shape α, RATE λ: mean α/λ, variance α/λ², M(t)=(1−t/λ)^(−α) for t<λ; only if test includes this later posted reading.

**5. Joint/moments/MGF:** f_X(x)=Σ_y p(x,y) or ∫f(x,y)dy; p(x|y)=p(x,y)/p_Y(y). M_X(t)=E[e^(tX)], M′(0)=E[X], M″(0)=E[X²]; if independent, M_(X+Y)(t)=M_X(t)M_Y(t).

## High-risk mistakes to eliminate
- Rate λ versus scale β=1/λ in exponential/gamma.
- Geometric counts trials (starts at 1) versus failures (starts at 0).
- Binomial independent draws versus hypergeometric without replacement.
- For continuous variables, a density value f(x) is not P(X=x).
- E[X²] is not Var(X); subtract E[X]².
- Do not use an approximation without naming assumptions.
- Ignore this file during the actual exam except for material you personally selected and handwrote as permitted by the lecturer.

Official test: Saturday 31 October 2026 at CLAV; reporting time listed as 09:45 and actual test runs 10:00–12:00. Personally register via Moodle by 16 October 23:59.
