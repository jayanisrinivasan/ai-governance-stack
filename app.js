// AI Governance Infrastructure Website
// Single-page application with routing

class App {
    constructor() {
        this.currentPage = 'home';
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.body.setAttribute('data-theme', this.theme);
        this.render();
        this.attachEventListeners();
        window.addEventListener('popstate', () => this.handleRouteChange());
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.render();
    }

    navigate(page) {
        this.currentPage = page;
        window.history.pushState({}, '', `#${page}`);
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleRouteChange() {
        const hash = window.location.hash.slice(1) || 'home';
        this.currentPage = hash;
        this.render();
    }

    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-navigate]')) {
                e.preventDefault();
                const page = e.target.closest('[data-navigate]').dataset.navigate;
                this.navigate(page);
            }
            if (e.target.closest('.theme-toggle')) {
                this.toggleTheme();
            }
            if (e.target.closest('.expandable-header')) {
                const expandable = e.target.closest('.expandable');
                expandable.classList.toggle('open');
            }
        });
    }

    render() {
        const root = document.getElementById('root');
        root.innerHTML = `
            ${this.renderNav()}
            ${this.renderPage()}
        `;
    }

    renderNav() {
        const themeIcon = this.theme === 'light' 
            ? '🌙' 
            : '☀️';
        
        return `
            <nav class="nav">
                <div class="nav-container">
                    <a href="#home" class="nav-logo" data-navigate="home">AI Governance Infrastructure</a>
                    <div class="nav-links">
                        <a href="#evidence" class="nav-link ${this.currentPage === 'evidence' ? 'active' : ''}" data-navigate="evidence">Evidence</a>
                        <a href="#decision" class="nav-link ${this.currentPage === 'decision' ? 'active' : ''}" data-navigate="decision">Decision</a>
                        <a href="#capacity" class="nav-link ${this.currentPage === 'capacity' ? 'active' : ''}" data-navigate="capacity">Capacity</a>
                        <a href="#strategy" class="nav-link ${this.currentPage === 'strategy' ? 'active' : ''}" data-navigate="strategy">Strategy</a>
                        <a href="#about" class="nav-link ${this.currentPage === 'about' ? 'active' : ''}" data-navigate="about">About</a>
                        <button class="theme-toggle">${themeIcon}</button>
                    </div>
                </div>
            </nav>
        `;
    }

    renderPage() {
        const pages = {
            home: this.renderHome(),
            evidence: this.renderEvidence(),
            decision: this.renderDecision(),
            capacity: this.renderCapacity(),
            strategy: this.renderStrategy(),
            about: this.renderAbout()
        };
        return pages[this.currentPage] || pages.home;
    }

    renderHome() {
        return `
            <!-- Hero Section -->
            <section class="hero">
                <div class="hero-gradient"></div>
                
                <div class="badge">
                    <span class="badge-dot"></span>
                    <span class="badge-text">Born from Apart Research Hackathon</span>
                </div>

                <h1 class="hero-title">
                    AI governance fails because we lack<br/>
                    <span class="text-accent">infrastructure to connect knowledge to action</span>
                </h1>

                <p class="hero-subtitle">
                    We know more about AI risks than we can act on. The gap isn't ideas or expertise — 
                    it's the missing infrastructure that translates understanding into institutional response.
                </p>

                <div class="hero-cta">
                    <a href="#strategy" class="btn btn-primary" data-navigate="strategy">Explore Our Approach</a>
                    <a href="#about" class="btn btn-secondary" data-navigate="about">Our Story</a>
                </div>

                <div class="stats">
                    <div class="stat">
                        <div class="stat-value">3</div>
                        <div class="stat-label">Infrastructure Layers</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">48</div>
                        <div class="stat-label">Hours to Build Proof</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">Jan 2025</div>
                        <div class="stat-label">Founded</div>
                    </div>
                </div>
            </section>

            <!-- The Problem -->
            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">The Translation Gap</h2>
                    <p class="section-subtitle">
                        Researchers publish findings that never reach policymakers. Labs run evaluations that don't 
                        inform deployment decisions. Governments pass laws without implementation pathways.
                    </p>
                </div>

                <div class="card card-large">
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 32px; align-items: center;">
                        <div style="text-align: center;">
                            <div style="font-weight: 600; margin-bottom: 8px;">Technical World</div>
                            <div style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
                                • Safety research<br/>
                                • Capability evals<br/>
                                • Red team findings
                            </div>
                        </div>
                        <div style="font-size: 32px; color: var(--text-tertiary);">?</div>
                        <div style="text-align: center;">
                            <div style="font-weight: 600; margin-bottom: 8px;">Institutional World</div>
                            <div style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
                                • Policy decisions<br/>
                                • Regulatory action<br/>
                                • Treaty negotiations
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); text-align: center; color: var(--text-secondary);">
                        The bottleneck isn't technical expertise or policy thinking.<br/>
                        <strong style="color: var(--accent);">It's the translation infrastructure that connects them.</strong>
                    </div>
                </div>
            </section>

            <!-- Proof of Concept -->
            <section class="section">
                <div class="section-header">
                    <h2 class="section-title">We've Already Started</h2>
                    <p class="section-subtitle">
                        At the Apart Research hackathon where we met (January 30 - February 1, 2025), 
                        we built the Verification Mechanism Feasibility Scorer
                    </p>
                </div>

                <div class="poc-showcase">
                    <img src="vmfs-screenshot.png" alt="Verification Mechanism Feasibility Scorer" class="poc-image"/>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">Translation Infrastructure in Action</h3>
                    <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">
                        In 48 hours, we proved that translation infrastructure is buildable. The tool translates treaty policy goals 
                        into scored technical verification mechanisms — making options comparable across Trust, Cost, Friction, and 
                        Cheating dimensions.
                    </p>
                    <p style="color: var(--text-secondary); line-height: 1.7;">
                        Treaty negotiators could finally evaluate verification approaches with clear tradeoffs. That prototype 
                        revealed the full scope of what's missing. <strong style="color: var(--text);">We're now building the complete infrastructure layer.</strong>
                    </p>
                </div>
            </section>

            <!-- Three Pillars -->
            <section class="section">
                <div class="section-header">
                    <h2 class="section-title">Our Approach: Three Layers of Infrastructure</h2>
                </div>

                <div class="grid-3">
                    <a href="#evidence" data-navigate="evidence" class="pillar-card">
                        <div class="pillar-icon" style="background: rgba(30, 64, 175, 0.1); color: var(--blue);">
                            📊
                        </div>
                        <h3 class="pillar-title">Evidence Infrastructure</h3>
                        <p class="pillar-description">
                            Making AI capabilities and risks legible to decision-makers through format translation, 
                            shared vocabularies, and verification pathways.
                        </p>
                        <span class="pillar-link">Learn More →</span>
                    </a>

                    <a href="#decision" data-navigate="decision" class="pillar-card">
                        <div class="pillar-icon" style="background: rgba(15, 118, 110, 0.1); color: var(--teal);">
                            ⚙️
                        </div>
                        <h3 class="pillar-title">Decision Infrastructure</h3>
                        <p class="pillar-description">
                            Creating pathways from evidence to institutional response through protocols, 
                            simulations, and cross-institutional bridging.
                        </p>
                        <span class="pillar-link">Learn More →</span>
                    </a>

                    <a href="#capacity" data-navigate="capacity" class="pillar-card">
                        <div class="pillar-icon" style="background: rgba(22, 101, 52, 0.1); color: var(--green);">
                            👥
                        </div>
                        <h3 class="pillar-title">Capacity Infrastructure</h3>
                        <p class="pillar-description">
                            Developing people who can operate at the boundary through embedding programs, 
                            rotational pathways, and community building.
                        </p>
                        <span class="pillar-link">Learn More →</span>
                    </a>
                </div>
            </section>

            <!-- Why This Matters -->
            <section class="section section-narrow">
                <div class="card card-large" style="background: linear-gradient(180deg, var(--accent-glow) 0%, transparent 100%); border-color: var(--accent);">
                    <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; text-align: center;">Why This Matters Now</h2>
                    <p style="color: var(--text-secondary); line-height: 1.7; text-align: center; max-width: 600px; margin: 0 auto;">
                        AI capabilities are advancing faster than institutions can respond. Not because institutions are slow — 
                        but because they lack the infrastructure to translate technical developments into actionable decisions. 
                        Every month without this infrastructure means safety research that can't inform deployment, policies that 
                        can't be implemented, and decisions made blind.
                    </p>
                </div>
            </section>

            ${this.renderFooter()}
        `;
    }

    renderEvidence() {
        return `
            <section class="hero" style="min-height: 60vh;">
                <div class="hero-gradient"></div>
                <div class="badge">
                    <span class="badge-dot"></span>
                    <span class="badge-text">Infrastructure Layer 1</span>
                </div>
                <h1 class="hero-title" style="font-size: clamp(36px, 6vw, 56px);">
                    Evidence Infrastructure
                </h1>
                <p class="hero-subtitle" style="max-width: 600px;">
                    Making AI capabilities and risks legible to decision-makers
                </p>
            </section>

            <section class="section">
                <div class="section-header">
                    <h2 class="section-title">The Problem</h2>
                </div>

                <div class="grid-2">
                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Format Mismatch</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            A 200-page evaluation report doesn't inform a treaty negotiation. Red team findings don't map 
                            onto corporate risk management. Capability demonstrations don't translate to liability frameworks.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Language Barriers</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Technical communities and policy institutions use different vocabularies, often solving different 
                            versions of the same problem without realizing it.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Evidentiary Standards</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            What counts as "sufficient evidence" differs across contexts. Regulators, corporate boards, and 
                            treaty negotiators need different types and levels of proof.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Verification Gaps</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Claims can't be checked across trust boundaries. Labs can't prove safety to regulators. 
                            Countries can't verify each other's commitments.
                        </p>
                    </div>
                </div>
            </section>

            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">What We're Building</h2>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Format Translation Mechanisms</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Converting technical outputs into decision-relevant inputs:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Risk dashboards for corporate governance</li>
                                <li>• Scenario analyses for policy planning</li>
                                <li>• Threshold indicators for regulatory triggers</li>
                                <li>• Capability maps for treaty negotiations</li>
                            </ul>
                            <div style="margin-top: 20px; padding: 16px; background: var(--accent-glow); border-radius: 8px; border-left: 3px solid var(--accent);">
                                <strong>Example:</strong> Our Verification Mechanism Feasibility Scorer takes policy goals 
                                ("verify compute usage") and produces scored technical approaches with clear tradeoff dimensions — 
                                making verification options comparable and decision-ready.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Shared Vocabularies</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Creating common language so technical and policy communities solve the same problem:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Unified risk taxonomies that work across contexts</li>
                                <li>• Capability benchmarks legible to non-technical decision-makers</li>
                                <li>• Harm frameworks that bridge technical and social dimensions</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Evidentiary Standards</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Defining what counts as sufficient evidence in different institutional contexts:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Regulatory compliance thresholds</li>
                                <li>• Corporate due diligence requirements</li>
                                <li>• International verification criteria</li>
                                <li>• Academic-policy translation protocols</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Verification Pathways</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Designing mechanisms that make claims checkable across trust boundaries:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Third-party audit protocols</li>
                                <li>• Continuous monitoring architectures</li>
                                <li>• Multi-stakeholder verification systems</li>
                                <li>• Cross-border transparency mechanisms</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section section-narrow">
                <div class="card card-large">
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; text-align: center;">
                        Not Just Summaries — Infrastructure
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center; margin-top: 24px;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 8px; color: var(--text-tertiary);">Traditional Approach</div>
                            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
                                Summarize technical paper for policymakers<br/>
                                Explain findings in simpler terms<br/>
                                Write one-time policy brief
                            </div>
                        </div>
                        <div style="font-size: 24px; color: var(--accent);">→</div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Our Approach</div>
                            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
                                Build translation systems that work continuously<br/>
                                Create shared vocabularies that persist<br/>
                                Design standards that institutions adopt
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section section-narrow">
                <div class="card" style="padding: 32px; border: 2px solid var(--accent); background: var(--accent-glow);">
                    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">How It Connects</h3>
                    <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">
                        Evidence infrastructure enables <strong>Decision Infrastructure</strong>: Protocols are empty without 
                        legible, trustworthy inputs to act on.
                    </p>
                    <p style="color: var(--text-secondary); line-height: 1.7;">
                        Evidence infrastructure requires <strong>Capacity Infrastructure</strong>: Technical outputs need people 
                        who can operationalize them in institutional contexts.
                    </p>
                </div>
            </section>

            ${this.renderFooter()}
        `;
    }

    renderDecision() {
        return `
            <section class="hero" style="min-height: 60vh;">
                <div class="hero-gradient"></div>
                <div class="badge">
                    <span class="badge-dot"></span>
                    <span class="badge-text">Infrastructure Layer 2</span>
                </div>
                <h1 class="hero-title" style="font-size: clamp(36px, 6vw, 56px);">
                    Decision Infrastructure
                </h1>
                <p class="hero-subtitle" style="max-width: 600px;">
                    Creating pathways from evidence to institutional action
                </p>
            </section>

            <section class="section">
                <div class="section-header">
                    <h2 class="section-title">The Problem</h2>
                    <p class="section-subtitle">
                        Evidence doesn't automatically produce decisions. Institutions need processes that 
                        translate information into coordinated response.
                    </p>
                </div>

                <div class="grid-2">
                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Timing</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            When does evidence trigger what institutional response? Who convenes whom? What analysis happens?
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Coordination</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            How do multiple institutions with different mandates act on the same evidence coherently?
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Uncertainty</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            How do you act when you can't wait for perfect information? What thresholds trigger response?
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Cross-Context</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            How does evidence gathered in one context inform decisions in another? Lab testing → regulatory enforcement → treaty compliance?
                        </p>
                    </div>
                </div>
            </section>

            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">What We're Building</h2>
                </div>

                <div class="expandable open">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Decision Protocols</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">If X evidence emerges, here's the institutional pathway:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Who needs to convene</li>
                                <li>• What analysis is required</li>
                                <li>• Which authorities get activated</li>
                                <li>• What coordination mechanisms engage</li>
                            </ul>
                            <div style="margin-top: 20px; padding: 16px; background: var(--bg-elevated); border-radius: 8px;">
                                <strong>Not:</strong> recommendations for what to decide<br/>
                                <strong style="color: var(--accent);">But:</strong> the machinery that converts evidence into coordinated institutional action
                            </div>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Governance Simulations</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">War-gaming policy responses before crises hit:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Tabletop exercises for capability surprises</li>
                                <li>• Cross-institutional coordination drills</li>
                                <li>• Treaty implementation stress tests</li>
                                <li>• Corporate governance scenario planning</li>
                            </ul>
                            <p style="margin-top: 16px; color: var(--text-secondary); line-height: 1.7;">
                                <strong>Purpose:</strong> Identify where coordination breaks down while stakes are still low, 
                                then build infrastructure to fix it.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Cross-Institutional Bridging</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Designing mechanisms so evidence gathered in one context can inform decisions in another:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Lab safety findings → regulatory standards</li>
                                <li>• Academic research → treaty verification requirements</li>
                                <li>• Corporate risk assessments → industry-wide protocols</li>
                                <li>• National monitoring → international transparency regimes</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Advisory Architectures</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">How technical experts can inform decisions without either being ignored or causing paralysis:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Expert panel structures that produce actionable outputs</li>
                                <li>• Technical advisory protocols for time-sensitive decisions</li>
                                <li>• Red team integration pathways</li>
                                <li>• Academic-policy interfaces that work under pressure</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section section-narrow">
                <div class="card card-large" style="background: var(--bg-elevated);">
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Case Study: Treaty Verification</h3>
                    <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">
                        Our hackathon prototype addressed a specific decision infrastructure gap: 
                        <strong>How do treaty negotiators choose between verification mechanisms?</strong>
                    </p>
                    <div style="padding: 20px; background: var(--accent-glow); border-radius: 12px; border-left: 3px solid var(--accent); margin: 20px 0;">
                        <div style="font-weight: 600; margin-bottom: 12px;">The problem:</div>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">
                            Negotiators know verification is necessary but can't evaluate technical approaches. 
                            They need decision infrastructure that makes technical options comparable, surfaces tradeoffs 
                            explicitly, and connects to treaty enforcement mechanisms.
                        </p>
                        <div style="font-weight: 600; margin-bottom: 12px; color: var(--accent);">Our solution:</div>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            A scoring system that translates verification mechanisms into decision-relevant dimensions 
                            (Trust, Cost, Friction, Cheating risk) — creating a pathway from "we need verification" 
                            to "here's which approach to adopt and why."
                        </p>
                    </div>
                    <p style="color: var(--text-secondary); line-height: 1.7; font-style: italic;">
                        This is decision infrastructure: not arguing for a specific verification mechanism, 
                        but building the system that makes the choice institutionally possible.
                    </p>
                </div>
            </section>

            ${this.renderFooter()}
        `;
    }

    renderCapacity() {
        return `
            <section class="hero" style="min-height: 60vh;">
                <div class="hero-gradient"></div>
                <div class="badge">
                    <span class="badge-dot"></span>
                    <span class="badge-text">Infrastructure Layer 3</span>
                </div>
                <h1 class="hero-title" style="font-size: clamp(36px, 6vw, 56px);">
                    Capacity Infrastructure
                </h1>
                <p class="hero-subtitle" style="max-width: 600px;">
                    Developing people who can operate at the boundary
                </p>
            </section>

            <section class="section">
                <div class="section-header">
                    <h2 class="section-title">The Problem</h2>
                    <p class="section-subtitle">
                        Infrastructure is only as good as the people operating it. Translation work requires 
                        technical literacy + institutional fluency + systems thinking. Almost no one is trained for this.
                    </p>
                </div>

                <div class="card card-large" style="background: var(--bg-elevated);">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">The Skill Gap</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Technical experts who can't navigate institutional constraints.<br/>
                            Policy professionals who can't parse technical feasibility.<br/>
                            No career pathways for people building between worlds.
                        </p>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center;">
                        <div style="text-align: center; padding: 20px; background: var(--accent-glow); border-radius: 12px;">
                            <div style="font-weight: 600; margin-bottom: 8px;">Technical Depth</div>
                            <div style="font-size: 14px; color: var(--text-secondary);">Can build evals<br/>but can't navigate<br/>institutions</div>
                        </div>
                        <div style="font-size: 32px; color: var(--accent); font-weight: 700;">∩</div>
                        <div style="text-align: center; padding: 20px; background: var(--accent-glow); border-radius: 12px;">
                            <div style="font-weight: 600; margin-bottom: 8px;">Institutional Fluency</div>
                            <div style="font-size: 14px; color: var(--text-secondary);">Understand governance<br/>but can't parse<br/>technical feasibility</div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 24px; padding: 16px; background: var(--accent); color: white; border-radius: 8px; font-weight: 600;">
                        Translation Capacity (Tiny Overlap)
                    </div>
                </div>
            </section>

            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">What We're Building</h2>
                </div>

                <div class="expandable open">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Institutional Embedding Programs</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Placing people at key boundary points where translation happens:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Lab ↔ regulator interfaces</li>
                                <li>• Academic ↔ policy bridges</li>
                                <li>• Domestic ↔ international coordination nodes</li>
                                <li>• Corporate ↔ civil society touchpoints</li>
                            </ul>
                            <div style="margin-top: 16px; padding: 16px; background: var(--bg-elevated); border-radius: 8px;">
                                <strong>Not:</strong> consultants who parachute in<br/>
                                <strong style="color: var(--accent);">But:</strong> operators embedded in institutions, building translation infrastructure from the inside
                            </div>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Rotational Pathways</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Creating career tracks where people move between worlds:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Technical → policy → technical rotations</li>
                                <li>• Lab → government → international organization paths</li>
                                <li>• Academic → implementation → academic cycles</li>
                            </ul>
                            <p style="margin-top: 16px; color: var(--text-secondary); line-height: 1.7;">
                                <strong>Purpose:</strong> Develop dual fluency. You can't translate between worlds you haven't inhabited.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Community Infrastructure</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Convening the (currently tiny) network of people doing translation work:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Connecting isolated practitioners across institutions</li>
                                <li>• Sharing what works and what fails</li>
                                <li>• Building collective knowledge about governance infrastructure</li>
                                <li>• Creating support systems for difficult boundary-spanning work</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Pipeline Development</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Addressing demographic gaps and building entry pathways:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• Women-in-AI-safety pipeline (identified gap)</li>
                                <li>• Contributor → operator → leader pathways</li>
                                <li>• Non-traditional background inclusion</li>
                                <li>• Junior → senior mentorship structures</li>
                            </ul>
                            <p style="margin-top: 16px; color: var(--text-secondary); line-height: 1.7;">
                                <strong>Why this matters:</strong> Translation infrastructure can't work if it only reflects 
                                one institutional perspective. Diverse viewpoints aren't nice-to-have — they're structurally necessary.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section section-narrow">
                <div class="card card-large">
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; text-align: center;">The Career Path Problem</h3>
                    <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px;">
                        Right now, there's no obvious career for "AI governance infrastructure builder":
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px;">
                        <div style="padding: 16px; background: var(--bg-subtle); border-radius: 8px;">
                            <div style="font-weight: 600; color: var(--text-tertiary); margin-bottom: 8px;">Current Reality</div>
                            <ul style="list-style: none; padding: 0; font-size: 14px; color: var(--text-secondary); line-height: 1.8;">
                                <li>• Too technical for policy orgs</li>
                                <li>• Too policy-focused for tech</li>
                                <li>• No professional community</li>
                                <li>• Unclear advancement</li>
                            </ul>
                        </div>
                        <div style="padding: 16px; background: var(--accent-glow); border-radius: 8px; border: 1px solid var(--accent);">
                            <div style="font-weight: 600; color: var(--accent); margin-bottom: 8px;">We're Building</div>
                            <ul style="list-style: none; padding: 0; font-size: 14px; color: var(--text-secondary); line-height: 1.8;">
                                <li>• Recognition as essential work</li>
                                <li>• Clear career progression</li>
                                <li>• Professional community</li>
                                <li>• Institutional legitimacy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            ${this.renderFooter()}
        `;
    }

    renderStrategy() {
        return `
            <section class="hero" style="min-height: 60vh;">
                <div class="hero-gradient"></div>
                <h1 class="hero-title" style="font-size: clamp(36px, 6vw, 56px);">
                    Our Strategy
                </h1>
                <p class="hero-subtitle" style="max-width: 600px;">
                    Building infrastructure where worlds collide
                </p>
            </section>

            <section class="section section-narrow">
                <div class="card card-large" style="background: var(--bg-elevated); text-align: center;">
                    <blockquote style="font-size: 20px; line-height: 1.6; color: var(--text); font-style: italic; margin: 0;">
                        "AI governance infrastructure must be built where worlds collide — not inside labs, 
                        not inside governments, but at the boundary where technical reality meets institutional decision-making."
                    </blockquote>
                    <p style="margin-top: 24px; color: var(--text-secondary); line-height: 1.7;">
                        This is where translation happens. Where context gets lost. Where good research dies in PowerPoint. 
                        Where policy gets written without understanding what's technically possible.
                    </p>
                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border);">
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Most organizations optimize for depth in one domain. Labs build better evals. Think tanks write better policy.
                        </p>
                        <p style="margin-top: 12px; font-weight: 600; color: var(--accent); font-size: 18px;">
                            We optimize for connection.
                        </p>
                    </div>
                </div>
            </section>

            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">Core Principles</h2>
                </div>

                <div class="expandable open">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Why Translation Infrastructure</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <div style="margin-bottom: 20px;">
                                <h4 style="font-weight: 600; margin-bottom: 12px;">What we're not:</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Not a technical AI safety organization (we don't build novel evals)</li>
                                    <li>• Not a policy think tank (we don't advocate for specific policies)</li>
                                    <li>• Not a consulting firm (we're not for-hire services)</li>
                                    <li>• Not a research institution (we don't primarily produce papers)</li>
                                </ul>
                            </div>
                            <div style="padding: 20px; background: var(--accent-glow); border-radius: 12px; border-left: 3px solid var(--accent);">
                                <h4 style="font-weight: 600; margin-bottom: 12px; color: var(--accent);">What we are:</h4>
                                <p style="color: var(--text-secondary); line-height: 1.7;">
                                    The infrastructure layer that makes technical work institutionally usable and 
                                    institutional needs technically answerable. We sit at the boundary. That's not a 
                                    compromise — it's the only place this work can be done.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">How The Three Pillars Reinforce Each Other</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 20px;">This isn't three separate workstreams. It's a system:</p>
                            <div style="display: grid; gap: 16px;">
                                <div style="padding: 16px; background: var(--bg-elevated); border-radius: 8px; border-left: 3px solid var(--blue);">
                                    <strong>Evidence → Decision:</strong><br/>
                                    <span style="color: var(--text-secondary);">Protocols are empty without legible, trustworthy inputs</span>
                                </div>
                                <div style="padding: 16px; background: var(--bg-elevated); border-radius: 8px; border-left: 3px solid var(--teal);">
                                    <strong>Decision → Capacity:</strong><br/>
                                    <span style="color: var(--text-secondary);">Systems need operators; people need systems to operate</span>
                                </div>
                                <div style="padding: 16px; background: var(--bg-elevated); border-radius: 8px; border-left: 3px solid var(--green);">
                                    <strong>Capacity → Evidence:</strong><br/>
                                    <span style="color: var(--text-secondary);">Technical outputs need people who can institutionalize them</span>
                                </div>
                            </div>
                            <div style="margin-top: 24px; padding: 20px; background: var(--accent-glow); border-radius: 12px;">
                                <strong style="color: var(--accent);">The virtuous cycle:</strong>
                                <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 8px;">
                                    Embedded people surface translation failures → we prototype infrastructure fixes → 
                                    fixes make technical work more usable → better decisions create demand for more infrastructure → 
                                    demand creates jobs for more embedded people → more people surface more gaps
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">The Wedge Strategy</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <h4 style="font-weight: 600; margin-bottom: 12px;">We Enter Through Failure Points</h4>
                            <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">
                                We don't try to build all infrastructure simultaneously. We start where breakdown is most visible.
                            </p>
                            <div style="margin-bottom: 20px;">
                                <h5 style="font-weight: 600; margin-bottom: 8px; font-size: 14px;">Examples of entry points:</h5>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Major capability surprise where labs knew something governments didn't</li>
                                    <li>• Policy that's unimplementable (asks for technical guarantees that don't exist)</li>
                                    <li>• International negotiation stalled because countries can't verify claims</li>
                                    <li>• Corporate board can't make safety tradeoffs because risks aren't legible</li>
                                </ul>
                            </div>
                            <div style="padding: 20px; background: var(--bg-elevated); border-radius: 12px;">
                                <h5 style="font-weight: 600; margin-bottom: 12px;">The pattern:</h5>
                                <ol style="padding-left: 20px; color: var(--text-secondary); line-height: 2;">
                                    <li>Identify where translation broke</li>
                                    <li>Ask: what infrastructure would have prevented this?</li>
                                    <li>Build a pilot version</li>
                                    <li>Test with institutions who felt the pain</li>
                                    <li>Iterate based on what actually gets used</li>
                                    <li>Expand to adjacent contexts</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">What Success Looks Like</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <div style="display: grid; gap: 20px;">
                                <div style="padding: 20px; background: var(--bg-elevated); border-radius: 12px;">
                                    <h5 style="font-weight: 600; margin-bottom: 8px;">Early Signal</h5>
                                    <p style="color: var(--text-secondary); line-height: 1.7;">
                                        Institutions start requesting our infrastructure: "Can you run that simulation for our context?" 
                                        "Can your embedded person help us make these findings usable?"
                                    </p>
                                </div>
                                <div style="padding: 20px; background: var(--accent-glow); border-radius: 12px; border: 1px solid var(--accent);">
                                    <h5 style="font-weight: 600; margin-bottom: 8px;">Inflection Point</h5>
                                    <p style="color: var(--text-secondary); line-height: 1.7;">
                                        Other organizations start building <strong>on top of</strong> our infrastructure. 
                                        They assume the translation layer exists and design their work to interface with it.
                                    </p>
                                </div>
                                <div style="padding: 20px; background: var(--bg-elevated); border-radius: 12px;">
                                    <h5 style="font-weight: 600; margin-bottom: 8px;">Endgame</h5>
                                    <p style="color: var(--text-secondary); line-height: 1.7;">
                                        The infrastructure becomes <strong>expected and invisible</strong> — like APIs, like courts, 
                                        like ICAO aviation standards. People forget there was a time when technical work and 
                                        institutional decisions couldn't talk to each other.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Why We Can Do This</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <h4 style="font-weight: 600; margin-bottom: 12px;">The Unique Positioning</h4>
                            <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">
                                Most people doing AI governance are either deep technical (can build evals but can't navigate institutions) 
                                or deep policy (understand governance but can't parse technical feasibility).
                            </p>
                            <div style="padding: 20px; background: var(--accent-glow); border-radius: 12px; border-left: 3px solid var(--accent); margin: 20px 0;">
                                <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px;">
                                    <strong>Translation infrastructure requires being positioned between worlds, not deep in one.</strong>
                                </p>
                                <p style="color: var(--text-secondary); line-height: 1.7;">
                                    The skillset isn't "Can you build a novel evaluation?" It's: Can you understand technical work 
                                    well enough to know what's decision-relevant? Can you understand institutional constraints well 
                                    enough to know what's implementable? Can you design systems that bridge the gap?
                                </p>
                            </div>
                            <p style="color: var(--text); font-weight: 600; text-align: center; font-size: 18px;">
                                We succeed by being bilingual, not by being the best speakers of either language.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            ${this.renderFooter()}
        `;
    }

    renderAbout() {
        return `
            <section class="hero" style="min-height: 60vh;">
                <div class="hero-gradient"></div>
                <h1 class="hero-title" style="font-size: clamp(36px, 6vw, 56px);">
                    About Us
                </h1>
                <p class="hero-subtitle" style="max-width: 600px;">
                    Six people building the infrastructure AI governance needs
                </p>
            </section>

            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">How We Started</h2>
                </div>

                <div class="card card-large" style="background: var(--bg-elevated);">
                    <p style="font-size: 17px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 24px;">
                        We met at an <strong style="color: var(--text);">Apart Research hackathon</strong> 
                        (January 30 - February 1, 2025).
                    </p>
                    
                    <p style="font-size: 17px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 24px;">
                        Each of us arrived working on different aspects of AI governance. By the end of 48 hours, 
                        we'd independently identified the same problem from different angles: 
                        <strong style="color: var(--accent);">the gap isn't ideas or expertise — it's infrastructure.</strong>
                    </p>

                    <div style="padding: 24px; background: var(--accent-glow); border-radius: 12px; border: 1px solid var(--accent); margin: 32px 0;">
                        <p style="font-size: 17px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 16px;">
                            We built a prototype to prove it: the <strong style="color: var(--text);">Verification Mechanism Feasibility Scorer</strong>. 
                            It translated treaty policy goals into scored technical verification approaches. The tool worked. 
                            Treaty negotiators could finally evaluate verification mechanisms across Trust, Cost, Friction, 
                            and Cheating dimensions.
                        </p>
                    </div>

                    <p style="font-size: 17px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 24px;">
                        But more importantly, we'd discovered a pattern visible across every institution we'd worked with:
                    </p>

                    <p style="font-size: 20px; font-weight: 600; text-align: center; color: var(--accent); margin: 32px 0; padding: 24px; background: var(--bg-subtle); border-radius: 12px;">
                        Technical work and policy decisions fail to connect because the translation infrastructure doesn't exist.
                    </p>

                    <p style="font-size: 17px; line-height: 1.8; color: var(--text-secondary);">
                        What started as a weekend project became a shared conviction: someone needs to build the connective 
                        tissue between AI knowledge and institutional action.
                    </p>

                    <p style="font-size: 20px; font-weight: 700; text-align: center; margin-top: 32px; color: var(--text);">
                        We're that team.
                    </p>
                </div>
            </section>

            <section class="section">
                <div class="section-header">
                    <h2 class="section-title">Why Us</h2>
                </div>

                <div class="grid-2">
                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px; font-size: 18px;">We've Lived in Multiple Worlds</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px;">Our team has experience across:</p>
                        <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                            <li>• AI safety research organizations</li>
                            <li>• Policy institutions and government</li>
                            <li>• Academic-policy partnerships</li>
                            <li>• Multi-stakeholder governance processes</li>
                            <li>• Technical implementation and deployment</li>
                        </ul>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 12px; font-style: italic;">
                            We've each seen translation breakdown from inside different institutions.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px; font-size: 18px;">We've Already Built Translation Infrastructure</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px;">
                            Our hackathon prototype proved we can design and ship infrastructure that works — in 48 hours.
                        </p>
                        <p style="color: var(--accent); font-weight: 600; line-height: 1.7;">
                            Imagine what's possible with focus and time.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px; font-size: 18px;">We're Positioned at the Boundary</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            We're not trying to be the deepest technical team or the most connected policy organization. 
                            We're bilingual — and that's what translation infrastructure requires.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px; font-size: 18px;">We're Building for the Long Term</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            This isn't a project. It's infrastructure. We're building systems that will outlast us, 
                            operated by people we're training, used by institutions we haven't met yet.
                        </p>
                    </div>
                </div>
            </section>

            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">Our Principles</h2>
                </div>

                <div style="display: grid; gap: 16px;">
                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Public Good Infrastructure</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            We're building infrastructure that any institution can use, not proprietary tools for specific clients.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Start Where Failure Is Visible</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            We enter through real breakdown points, not theoretical gaps.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Build With Users</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            We prototype with institutions experiencing translation problems, not in isolation.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Train Operators</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Infrastructure needs people who can run it. We're building both simultaneously.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Stay at the Boundary</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            We don't drift deep into technical work or deep into policy advocacy. Translation requires staying between worlds.
                        </p>
                    </div>
                </div>
            </section>

            ${this.renderFooter()}
        `;
    }

    renderFooter() {
        return `
            <footer class="footer">
                <p class="footer-text">
                    AI Governance Infrastructure • Building the translation layer governance needs
                </p>
                <p class="footer-text" style="margin-top: 8px;">
                    Born from Apart Research Hackathon • January 30 - February 1, 2025
                </p>
            </footer>
        `;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
