// AI Governance Infrastructure Website
// Single-page application with routing

console.log('App.js loaded successfully');

class App {
    constructor() {
        this.currentPage = 'home';
        this.theme = localStorage.getItem('theme') || 'light';
        this.activePillar = null;
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

    showPillar(pillarId) {
        this.activePillar = pillarId;
        this.render();
    }

    closePillar() {
        this.activePillar = null;
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
            if (e.target.closest('[data-pillar]')) {
                const pillarId = e.target.closest('[data-pillar]').dataset.pillar;
                this.showPillar(pillarId);
            }
            if (e.target.closest('.pillar-modal-close') || e.target.closest('.pillar-modal-overlay')) {
                this.closePillar();
            }
        });
    }

    render() {
        const root = document.getElementById('root');
        root.innerHTML = `
            ${this.renderNav()}
            ${this.renderPage()}
            ${this.renderPillarModal()}
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
                        <a href="#strategy" class="nav-link ${this.currentPage === 'strategy' ? 'active' : ''}" data-navigate="strategy">Strategy</a>
                        <a href="#milestones" class="nav-link ${this.currentPage === 'milestones' ? 'active' : ''}" data-navigate="milestones">Milestones</a>
                        <button class="theme-toggle">${themeIcon}</button>
                    </div>
                </div>
            </nav>
        `;
    }

    renderPage() {
        const pages = {
            home: this.renderHome(),
            strategy: this.renderStrategy(),
            milestones: this.renderMilestones()
        };
        return pages[this.currentPage] || pages.home;
    }

    renderPillarModal() {
        if (!this.activePillar) return '';

        const pillars = {
            evidence: {
                title: 'Evidence Infrastructure',
                icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>`,
                description: 'Making AI capabilities and risks legible to decision-makers',
                details: `
                    <p style="margin-bottom: 16px;">Converting technical outputs into formats institutions can act on:</p>
                    <ul style="list-style: none; padding: 0; line-height: 2; color: var(--text-secondary);">
                        <li>• Risk dashboards for corporate governance</li>
                        <li>• Scenario analyses for policy planning</li>
                        <li>• Threshold indicators for regulatory triggers</li>
                        <li>• Verification mechanisms for treaty compliance</li>
                    </ul>
                    <div style="margin-top: 20px; padding: 16px; background: var(--accent-glow); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <strong>Example:</strong> Our Verification Mechanism Feasibility Scorer translates policy goals into scored technical approaches with clear tradeoff dimensions.
                    </div>
                `
            },
            decision: {
                title: 'Decision Infrastructure',
                icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
                </svg>`,
                description: 'Creating pathways from evidence to institutional response',
                details: `
                    <p style="margin-bottom: 16px;">Building processes that translate information into coordinated action:</p>
                    <ul style="list-style: none; padding: 0; line-height: 2; color: var(--text-secondary);">
                        <li>• Decision protocols that specify institutional pathways</li>
                        <li>• Governance simulations and tabletop exercises</li>
                        <li>• Cross-institutional bridging mechanisms</li>
                        <li>• Advisory architectures for technical input</li>
                    </ul>
                    <div style="margin-top: 20px; padding: 16px; background: var(--bg-elevated); border-radius: 8px;">
                        <strong>Not:</strong> Recommendations for what to decide<br/>
                        <strong style="color: var(--accent);">But:</strong> The machinery that converts evidence into coordinated institutional action
                    </div>
                `
            },
            capacity: {
                title: 'Capacity Infrastructure',
                icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
                </svg>`,
                description: 'Developing people who can operate at the boundary',
                details: `
                    <p style="margin-bottom: 16px;">Training operators who can bridge technical and institutional worlds:</p>
                    <ul style="list-style: none; padding: 0; line-height: 2; color: var(--text-secondary);">
                        <li>• Institutional embedding programs at key interfaces</li>
                        <li>• Rotational pathways between technical and policy roles</li>
                        <li>• Community infrastructure for isolated practitioners</li>
                        <li>• Pipeline development addressing demographic gaps</li>
                    </ul>
                    <div style="margin-top: 20px; padding: 16px; background: var(--accent-glow); border-radius: 8px;">
                        <strong>Why this matters:</strong> Translation infrastructure requires people who can operate in both technical and institutional contexts. You can't translate between worlds you haven't inhabited.
                    </div>
                `
            }
        };

        const pillar = pillars[this.activePillar];
        if (!pillar) return '';

        return `
            <div class="pillar-modal-overlay" onclick="event.target === this && app.closePillar()">
                <div class="pillar-modal">
                    <button class="pillar-modal-close" onclick="app.closePillar()">×</button>
                    <div class="pillar-modal-icon" style="color: var(--accent);">
                        ${pillar.icon}
                    </div>
                    <h2 class="pillar-modal-title">${pillar.title}</h2>
                    <p class="pillar-modal-subtitle">${pillar.description}</p>
                    <div class="pillar-modal-content">
                        ${pillar.details}
                    </div>
                </div>
            </div>
        `;
    }

    renderHome() {
        return `
            <!-- Hero Section -->
            <section class="hero">
                <div class="hero-gradient"></div>
                
                <div class="badge">
                    <span class="badge-dot"></span>
                    <span class="badge-text">Born from Apart Research Hackathon • Jan 30 - Feb 1, 2025</span>
                </div>

                <h1 class="hero-title">
                    Building infrastructure to translate<br/>
                    <span class="text-accent">AI governance proposals into institutional action</span>
                </h1>

                <p class="hero-subtitle">
                    We identified a gap in the process of translating technical governance proposals into policy 
                    documents and institutional decisions. The missing layer is infrastructure that connects what 
                    we learn about AI systems to decisions institutions can implement.
                </p>

                <div class="hero-cta">
                    <a href="#strategy" class="btn btn-primary" data-navigate="strategy">Our Approach</a>
                    <a href="#milestones" class="btn btn-secondary" data-navigate="milestones">6-Month Roadmap</a>
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
                        <div class="stat-value">6</div>
                        <div class="stat-label">Co-founders</div>
                    </div>
                </div>
            </section>

            <!-- Proof of Concept -->
            <section class="section">
                <div class="section-header">
                    <h2 class="section-title">Proof of Concept</h2>
                    <p class="section-subtitle">
                        At the Apart Research hackathon, we built the Verification Mechanism Feasibility Scorer 
                        to demonstrate that translation infrastructure is buildable
                    </p>
                </div>

                <div class="poc-showcase">
                    <img src="vmfs-screenshot.png" alt="Verification Mechanism Feasibility Scorer" class="poc-image"/>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">Translation Infrastructure in Action</h3>
                    <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">
                        In 48 hours, we built a tool that translates treaty policy goals into scored technical 
                        verification mechanisms. It makes verification options comparable across Trust, Cost, 
                        Friction, and Cheating dimensions — enabling treaty negotiators to make informed choices 
                        about which approaches to adopt.
                    </p>
                    <p style="color: var(--text-secondary); line-height: 1.7;">
                        This prototype revealed the full scope of the translation gap. We're now building complete 
                        infrastructure across evidence, decision, and capacity layers.
                    </p>
                </div>
            </section>

            <!-- The Translation Challenge -->
            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">The Translation Challenge</h2>
                    <p class="section-subtitle">
                        It's tempting to tell a simple story that institutions are "slow" and therefore can't 
                        govern fast-growing AI capabilities. But institutions and technologies move on different 
                        timelines and under different constraints.
                    </p>
                </div>

                <div class="card card-large">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <p style="font-size: 17px; line-height: 1.8; color: var(--text-secondary);">
                            The real challenge is that we don't yet have established pathways to translate what we 
                            learn about AI systems into decisions that institutions can update.
                        </p>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 32px; align-items: center;">
                        <div style="text-align: center;">
                            <div style="font-weight: 600; margin-bottom: 8px;">Technical Findings</div>
                            <div style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
                                • Safety research<br/>
                                • Capability evaluations<br/>
                                • Red team findings
                            </div>
                        </div>
                        <div style="font-size: 32px; color: var(--text-tertiary);">?</div>
                        <div style="text-align: center;">
                            <div style="font-weight: 600; margin-bottom: 8px;">Institutional Decisions</div>
                            <div style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
                                • Policy updates<br/>
                                • Regulatory frameworks<br/>
                                • Treaty mechanisms
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); text-align: center; color: var(--text-secondary);">
                        We're building the infrastructure that fills this gap.
                    </div>
                </div>
            </section>

            <!-- Interactive Three Pillars Visualization -->
            <section class="section">
                <div class="section-header">
                    <h2 class="section-title">Our Approach: Three Layers of Infrastructure</h2>
                    <p class="section-subtitle">
                        Click each pillar to learn more about how they reinforce each other
                    </p>
                </div>

                <div class="pillars-diagram">
                    <svg class="pillars-connections" viewBox="0 0 400 400" style="position: absolute; width: 100%; height: 100%; pointer-events: none;">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" opacity="0.4"/>
                            </marker>
                        </defs>
                        <!-- Evidence to Decision -->
                        <path d="M 120 200 Q 200 150 280 200" stroke="var(--accent)" stroke-width="2" fill="none" opacity="0.4" marker-end="url(#arrowhead)"/>
                        <!-- Decision to Capacity -->
                        <path d="M 280 220 Q 250 280 200 300" stroke="var(--accent)" stroke-width="2" fill="none" opacity="0.4" marker-end="url(#arrowhead)"/>
                        <!-- Capacity to Evidence -->
                        <path d="M 180 300 Q 150 250 120 220" stroke="var(--accent)" stroke-width="2" fill="none" opacity="0.4" marker-end="url(#arrowhead)"/>
                    </svg>

                    <div class="pillar-node pillar-evidence" data-pillar="evidence">
                        <div class="pillar-node-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </div>
                        <div class="pillar-node-title">Evidence</div>
                        <div class="pillar-node-subtitle">Making AI legible</div>
                    </div>

                    <div class="pillar-node pillar-decision" data-pillar="decision">
                        <div class="pillar-node-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
                            </svg>
                        </div>
                        <div class="pillar-node-title">Decision</div>
                        <div class="pillar-node-subtitle">Evidence to action</div>
                    </div>

                    <div class="pillar-node pillar-capacity" data-pillar="capacity">
                        <div class="pillar-node-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div class="pillar-node-title">Capacity</div>
                        <div class="pillar-node-subtitle">Training operators</div>
                    </div>

                    <!-- Center: Virtuous Cycle -->
                    <div class="virtuous-cycle">
                        <div class="virtuous-cycle-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                            </svg>
                        </div>
                        <div class="virtuous-cycle-text">Virtuous<br/>Cycle</div>
                    </div>
                </div>

                <div style="margin-top: 48px; text-align: center;">
                    <div class="card" style="max-width: 600px; margin: 0 auto; padding: 24px;">
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">The Reinforcing Loop</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 15px;">
                            Embedded people surface translation failures → we prototype infrastructure fixes → 
                            fixes make technical work more usable → better decisions create demand for more infrastructure → 
                            demand creates capacity for more embedded people
                        </p>
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
                <p class="hero-subtitle" style="max-width: 700px;">
                    Building infrastructure where technical knowledge meets institutional decision-making
                </p>
            </section>

            <!-- North Star -->
            <section class="section section-narrow">
                <div class="card card-large" style="background: var(--bg-elevated); border: 2px solid var(--accent);">
                    <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; text-align: center; color: var(--accent);">
                        Our North Star
                    </h2>
                    <p style="font-size: 18px; line-height: 1.8; color: var(--text); text-align: center; max-width: 600px; margin: 0 auto;">
                        Build an organization that advises, facilitates, and produces evidence to help institutions 
                        navigate AI safety, futures, and treaty implementation — bridging the gap between what we 
                        know and what we can act on.
                    </p>
                </div>
            </section>

            <!-- Core Principles -->
            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">Core Principles</h2>
                    <p class="section-subtitle">
                        These principles guide our work and reflect our commitment to effective, grounded governance infrastructure
                    </p>
                </div>

                <div style="display: grid; gap: 16px;">
                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Public Good Infrastructure</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            We build infrastructure that multiple institutions can use, not proprietary tools for specific clients. 
                            Translation mechanisms should be accessible to anyone working at the technical-policy boundary.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Start Where Failure Is Visible</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            We enter through real breakdown points where translation has failed — capability surprises, 
                            unimplementable policies, stalled negotiations. Each failure is a design opportunity for better infrastructure.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Build With Users</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            We prototype with institutions experiencing translation problems, testing infrastructure 
                            in real contexts before scaling. User feedback shapes what we build.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Train Operators Simultaneously</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Infrastructure needs people who can run it. We develop both systems and operators in parallel, 
                            ensuring our infrastructure can be maintained and evolved over time.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Maintain Boundary Position</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Effective translation requires staying between worlds rather than becoming deeply embedded in one. 
                            We maintain technical literacy and institutional fluency without drifting toward pure research or pure advocacy.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 8px;">Acknowledge Political Context</h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            AI safety is itself a political stance in the broader landscape of AI governance. We're transparent 
                            about our values while building infrastructure that serves institutions with different perspectives. 
                            Our goal is effective translation, not false neutrality.
                        </p>
                    </div>
                </div>
            </section>

            <!-- The Virtuous Cycle (Centerpiece) -->
            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">The Virtuous Cycle</h2>
                    <p class="section-subtitle">
                        How our three infrastructure layers create and reinforce demand
                    </p>
                </div>

                <div class="card card-large" style="background: var(--bg-elevated);">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" style="margin: 0 auto;">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                        </svg>
                    </div>

                    <div style="display: grid; gap: 20px;">
                        <div style="padding: 20px; background: var(--accent-glow); border-radius: 12px; border-left: 3px solid var(--accent);">
                            <strong>1. Embedded people surface translation failures</strong>
                            <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 8px;">
                                Operators placed at technical-policy boundaries identify where translation breaks down in practice
                            </p>
                        </div>

                        <div style="padding: 20px; background: var(--bg-subtle); border-radius: 12px;">
                            <strong>2. We prototype infrastructure fixes</strong>
                            <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 8px;">
                                Build evidence, decision, or capacity infrastructure to address identified gaps
                            </p>
                        </div>

                        <div style="padding: 20px; background: var(--accent-glow); border-radius: 12px; border-left: 3px solid var(--accent);">
                            <strong>3. Fixes make technical work more usable</strong>
                            <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 8px;">
                                Institutions can now act on technical findings that were previously inaccessible
                            </p>
                        </div>

                        <div style="padding: 20px; background: var(--bg-subtle); border-radius: 12px;">
                            <strong>4. Better decisions create demand for more infrastructure</strong>
                            <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 8px;">
                                Success in one context reveals adjacent translation needs
                            </p>
                        </div>

                        <div style="padding: 20px; background: var(--accent-glow); border-radius: 12px; border-left: 3px solid var(--accent);">
                            <strong>5. Demand creates capacity for more embedded people</strong>
                            <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 8px;">
                                Institutions request operators, creating career pathways and professional identity
                            </p>
                        </div>
                    </div>

                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border); text-align: center;">
                        <p style="color: var(--text-secondary); line-height: 1.7; font-style: italic;">
                            Each layer strengthens the others. More operators surface more gaps. More infrastructure 
                            makes technical work more actionable. More successful decisions create more demand.
                        </p>
                    </div>
                </div>
            </section>

            <!-- How We Work -->
            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">Our Approach</h2>
                </div>

                <div class="expandable open">
                    <div class="expandable-header">
                        <h3 class="expandable-title">The Wedge Strategy</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">We don't try to build all infrastructure simultaneously. We enter through failure points — moments where everyone agrees translation broke down:</p>
                            <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                <li>• A capability surprise where labs knew something regulators didn't</li>
                                <li>• A policy that asks for technical guarantees that don't exist</li>
                                <li>• An international negotiation stalled on verification mechanisms</li>
                                <li>• A corporate board unable to make safety tradeoffs</li>
                            </ul>
                            <div style="margin-top: 20px; padding: 16px; background: var(--bg-elevated); border-radius: 8px;">
                                <strong>The pattern:</strong>
                                <ol style="padding-left: 20px; color: var(--text-secondary); line-height: 2; margin-top: 8px;">
                                    <li>Identify where translation broke</li>
                                    <li>Ask: what infrastructure would have prevented this?</li>
                                    <li>Build a pilot version</li>
                                    <li>Test with institutions who experienced the failure</li>
                                    <li>Iterate based on what gets used</li>
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
                                        Institutions request our infrastructure: "Can you run that simulation for our context?" 
                                        "Can your embedded person help us translate these findings?"
                                    </p>
                                </div>
                                <div style="padding: 20px; background: var(--accent-glow); border-radius: 12px; border: 1px solid var(--accent);">
                                    <h5 style="font-weight: 600; margin-bottom: 8px;">Inflection Point</h5>
                                    <p style="color: var(--text-secondary); line-height: 1.7;">
                                        Organizations build on top of our infrastructure. They assume the translation layer 
                                        exists and design their work to interface with it.
                                    </p>
                                </div>
                                <div style="padding: 20px; background: var(--bg-elevated); border-radius: 12px;">
                                    <h5 style="font-weight: 600; margin-bottom: 8px;">Endgame</h5>
                                    <p style="color: var(--text-secondary); line-height: 1.7;">
                                        The infrastructure becomes expected and invisible — like APIs, like courts, like ICAO 
                                        aviation standards. People forget there was a time when technical work and institutional 
                                        decisions couldn't connect.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="expandable">
                    <div class="expandable-header">
                        <h3 class="expandable-title">Our Positioning</h3>
                        <span class="expandable-icon">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="expandable-body">
                            <p style="margin-bottom: 16px;">Translation infrastructure requires being positioned between worlds:</p>
                            <div style="padding: 20px; background: var(--accent-glow); border-radius: 12px; border-left: 3px solid var(--accent);">
                                <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px;">
                                    The skillset isn't "Can you build a novel evaluation?" It's: Can you understand technical 
                                    work well enough to know what's decision-relevant? Can you understand institutional constraints 
                                    well enough to know what's implementable? Can you design systems that bridge the gap?
                                </p>
                                <p style="color: var(--text); font-weight: 600;">
                                    We succeed by being bilingual, not by being the best speakers of either language.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            ${this.renderFooter()}
        `;
    }

    renderMilestones() {
        return `
            <section class="hero" style="min-height: 60vh;">
                <div class="hero-gradient"></div>
                <h1 class="hero-title" style="font-size: clamp(36px, 6vw, 56px);">
                    6-Month Milestones
                </h1>
                <p class="hero-subtitle" style="max-width: 600px;">
                    Our roadmap for building translation infrastructure
                </p>
            </section>

            <section class="section section-narrow">
                <div class="timeline">
                    <!-- Month 1-2 -->
                    <div class="timeline-item">
                        <div class="timeline-marker">
                            <div class="timeline-marker-inner">1-2</div>
                        </div>
                        <div class="timeline-content">
                            <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">Foundation & First Embedding</h3>
                            <div class="card" style="margin-bottom: 16px;">
                                <h4 style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Evidence Infrastructure</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Expand VMFS prototype to cover 3 additional verification contexts</li>
                                    <li>• Develop format translation templates for safety eval → policy brief</li>
                                    <li>• Create shared vocabulary document for AI capabilities/risks</li>
                                </ul>
                            </div>
                            <div class="card" style="margin-bottom: 16px;">
                                <h4 style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Capacity Infrastructure</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Place first embedded fellow in target institution</li>
                                    <li>• Establish baseline metrics for translation failure points</li>
                                    <li>• Document initial gap analysis from embedded perspective</li>
                                </ul>
                            </div>
                            <div class="card">
                                <h4 style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Organizational</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Formalize team structure and roles</li>
                                    <li>• Establish partnership with 2-3 pilot institutions</li>
                                    <li>• Secure initial funding for 6-month operations</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Month 3-4 -->
                    <div class="timeline-item">
                        <div class="timeline-marker">
                            <div class="timeline-marker-inner">3-4</div>
                        </div>
                        <div class="timeline-content">
                            <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">Prototype Testing & Iteration</h3>
                            <div class="card" style="margin-bottom: 16px;">
                                <h4 style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Decision Infrastructure</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Run first governance simulation/tabletop exercise</li>
                                    <li>• Develop decision protocol template for capability surprises</li>
                                    <li>• Test cross-institutional bridging mechanism (pilot)</li>
                                </ul>
                            </div>
                            <div class="card" style="margin-bottom: 16px;">
                                <h4 style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Evidence Infrastructure</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Test format translation tools with 3 institutions</li>
                                    <li>• Iterate based on feedback from actual users</li>
                                    <li>• Document what works vs. what needs redesign</li>
                                </ul>
                            </div>
                            <div class="card">
                                <h4 style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Community Building</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Host first convening of translation practitioners</li>
                                    <li>• Begin women-in-AI-safety pipeline program</li>
                                    <li>• Establish online community infrastructure</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Month 5-6 -->
                    <div class="timeline-item">
                        <div class="timeline-marker">
                            <div class="timeline-marker-inner">5-6</div>
                        </div>
                        <div class="timeline-content">
                            <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">Scaling & Documentation</h3>
                            <div class="card" style="margin-bottom: 16px;">
                                <h4 style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Capacity Infrastructure</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Place 2-3 additional embedded fellows</li>
                                    <li>• Launch rotational pathway program (pilot cohort)</li>
                                    <li>• Create training materials for translation operators</li>
                                </ul>
                            </div>
                            <div class="card" style="margin-bottom: 16px;">
                                <h4 style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Infrastructure Refinement</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Publish v1.0 of translation infrastructure toolkit</li>
                                    <li>• Make tools available for other organizations to adopt</li>
                                    <li>• Document case studies from first 6 months</li>
                                </ul>
                            </div>
                            <div class="card">
                                <h4 style="font-weight: 600; margin-bottom: 8px; color: var(--accent);">Evaluation & Next Phase</h4>
                                <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                                    <li>• Measure impact: # institutions using tools, translation success rate</li>
                                    <li>• Gather feedback from embedded fellows and partner institutions</li>
                                    <li>• Define 12-month roadmap based on learnings</li>
                                    <li>• Present findings at EA Global and relevant conferences</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Success Metrics -->
            <section class="section section-narrow">
                <div class="section-header">
                    <h2 class="section-title">Success Metrics</h2>
                    <p class="section-subtitle">How we'll know if we're making progress</p>
                </div>

                <div class="grid-2">
                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Adoption Metrics</h3>
                        <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                            <li>• 5+ institutions actively using our tools</li>
                            <li>• 3-5 embedded fellows placed</li>
                            <li>• 15+ practitioners in translation network</li>
                        </ul>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Impact Metrics</h3>
                        <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                            <li>• 3+ documented cases of successful translation</li>
                            <li>• 2+ decision protocols adopted by institutions</li>
                            <li>• Reduced time from finding → policy update</li>
                        </ul>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Infrastructure Metrics</h3>
                        <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                            <li>• Translation toolkit v1.0 published</li>
                            <li>• 10+ format templates available</li>
                            <li>• Training materials for 3 infrastructure types</li>
                        </ul>
                    </div>

                    <div class="card">
                        <h3 style="font-weight: 600; margin-bottom: 12px;">Community Metrics</h3>
                        <ul style="list-style: none; padding: 0; color: var(--text-secondary); line-height: 2;">
                            <li>• 2 convenings of translation practitioners</li>
                            <li>• Women-in-AI-safety pipeline launched</li>
                            <li>• Active online community established</li>
                        </ul>
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
                    AI Governance Infrastructure • Building the translation layer
                </p>
                <p class="footer-text" style="margin-top: 8px;">
                    Born from Apart Research Hackathon • January 30 - February 1, 2025
                </p>
            </footer>
        `;
    }
}

// Make app globally accessible for modal interactions
let app;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing App...');
    app = new App();
    console.log('App initialized successfully');
});
