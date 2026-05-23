<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AlexaInc | Specialized Bot Ecosystem</title>
    <meta name="description" content="Explore the AlexaInc Bot Ecosystem - WhatsApp, Telegram, Music, Gaming and more.">
    <link rel="stylesheet" href="/index.css">
    <link rel="icon" href="https://github.com/AlexaInc.png" type="image/png">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2210833108870700" crossorigin="anonymous"></script>
    <style>
        .source-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        .source-modal.active {
            display: flex;
        }
        .modal-content {
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            width: 90%;
            max-width: 1200px;
            max-height: 90vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .modal-header {
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h3 {
            margin: 0;
            color: var(--accent-primary);
        }
        .modal-close {
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1.5rem;
            cursor: pointer;
        }
        .modal-body {
            flex: 1;
            overflow: hidden;
            display: flex;
        }
        .modal-file-tree {
            width: 250px;
            border-right: 1px solid var(--border-color);
            overflow-y: auto;
            padding: 1rem;
            background: rgba(0,0,0,0.2);
        }
        .modal-file-content {
            flex: 1;
            overflow: auto;
            padding: 1rem;
        }
        .tree-item {
            padding: 0.4rem 0.6rem;
            cursor: pointer;
            border-radius: 4px;
            transition: background 0.2s;
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--text-secondary);
        }
        .tree-item:hover {
            background: rgba(255,255,255,0.1);
            color: var(--text-primary);
        }
        .tree-item.active {
            background: rgba(124, 77, 255, 0.2);
            color: var(--accent-primary);
        }
        .folder-item {
            padding: 0.4rem 0.6rem;
            cursor: pointer;
            border-radius: 4px;
            transition: background 0.2s;
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--accent-secondary);
        }
        .folder-item:hover {
            background: rgba(255,255,255,0.1);
        }
        .folder-children {
            padding-left: 1rem;
            display: none;
        }
        .folder-children.expanded {
            display: block;
        }
        .code-block {
            white-space: pre;
            font-family: var(--font-mono);
            font-size: 0.85rem;
            line-height: 1.6;
            color: var(--text-primary);
            overflow-x: auto;
        }
        .code-line {
            display: flex;
        }
        .line-number {
            color: var(--text-secondary);
            opacity: 0.5;
            min-width: 3rem;
            text-align: right;
            padding-right: 1rem;
            user-select: none;
        }
        .file-header {
            margin-bottom: 1rem;
            color: var(--text-secondary);
            font-size: 0.8rem;
            font-family: var(--font-mono);
        }
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            color: var(--text-secondary);
        }
        .error {
            color: #ff4444;
            padding: 1rem;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="bg-glow"></div>
    <div class="grid-overlay"></div>

    <nav>
        <div class="container">
            <a href="/" class="logo">AlexaInc<span style="color: var(--accent-primary);">.</span></a>
            <div class="nav-links">
                <a href="/" class="nav-link active" data-i18n="nav_ecosystem">Ecosystem</a>
                <a href="/about/" class="nav-link" data-i18n="nav_about">About Me</a>
                <div class="lang-switcher">
                    <button class="lang-btn" id="lang-btn">EN</button>
                    <div class="lang-dropdown" id="lang-dropdown">
                        <button onclick="setLanguage('en')">English</button>
                        <button onclick="setLanguage('si')">සිංහල</button>
                        <button onclick="setLanguage('ta')">தமிழ்</button>
                        <button onclick="setLanguage('fr')">Français</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main class="container">
        <section class="hero">
            <div class="status-header">
                <div class="status-badge">
                    <span class="status-dot"></span>
                    <span><span data-i18n="system_status">System Status</span>: <span id="bot-status-text" style="color: var(--accent-primary); font-weight: 700;">FETCHING...</span></span>
                </div>
                <div id="bot-update-text" class="mono" style="font-size: 0.75rem; opacity: 0; transition: opacity 0.5s;">
                    Scanning...
                </div>
            </div>
            <div class="hero-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="80" height="80">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
            </div>
            <div class="pill special" style="margin-bottom: 1.5rem;">The Bot Realms</div>
            <h1>AlexaInc <span style="color: var(--accent-primary);">Ecosystem</span></h1>
            <p>A decentralized network of intelligent bots spanning WhatsApp, Telegram, Music, Gaming, and Developer Tools. Each service is independently deployed and monitored for maximum reliability.</p>
        </section>

        <section id="realms">
            <div class="grid-3">
                <!-- Alexa V3 -->
                <div class="realm-card" data-realm="whatsapp">
                    <div class="realm-header">
                        <div class="realm-status" id="status-alexa-v3">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-wa);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
                        </svg>
                    </div>
                    <div class="pill whatsapp">WhatsApp</div>
                    <h3>Alexa V3</h3>
                    <p>The industry-leading WhatsApp automation bot. Powerful utilities, advanced group management, and seamless media processing.</p>
                    <div class="features">
                        <span>⚡ High Speed</span>
                        <span>🔒 Secure</span>
                        <span>🤖 AI Powered</span>
                    </div>
                    <div class="card-actions">
                        <a href="/alexa-v3/" class="btn btn-primary" data-i18n="learn_more">Learn Details →</a>
                        <button class="btn btn-source" onclick="openSource('alexa-v3')">Source Code</button>
                    </div>
                </div>

                <!-- AlexaTG -->
                <div class="realm-card" data-realm="telegram">
                    <div class="realm-header">
                        <div class="realm-status" id="status-alexatg">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-tg);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.244 8.783l-1.884 8.878c-.14.613-.51.764-1.022.478l-2.87-2.116-1.385 1.333c-.154.154-.282.282-.58.282l.205-2.91 5.302-4.787c.23-.205-.05-.316-.358-.112l-6.55 4.125-2.822-.882c-.613-.193-.625-.613.128-.91l11.02-4.246c.51-.193.957.112.741 1.259z"></path>
                        </svg>
                    </div>
                    <div class="pill telegram">Telegram</div>
                    <h3>AlexaTG</h3>
                    <p>Specialized Telegram bot for professional group management, environmental AI components, and interactive mini-games.</p>
                    <div class="features">
                        <span>🎮 Fun Enabled</span>
                        <span>🤖 AI Powered</span>
                        <span>🛡️ Admin Tools</span>
                    </div>
                    <div class="card-actions">
                        <a href="/alexatg/" class="btn btn-primary" data-i18n="learn_more">Intelligence Specs →</a>
                        <button class="btn btn-source" onclick="openSource('alexatg')">Source Code</button>
                    </div>
                </div>

                <!-- SNOWSTORM -->
                <div class="realm-card" data-realm="winter">
                    <div class="realm-header">
                        <div class="realm-status" id="status-snowstorm">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-snow);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M12 2L9 7H2l5.5 4.5L5 17l7-4 7 4-2.5-5.5L22 7h-7L12 2z"></path>
                        </svg>
                    </div>
                    <div class="pill snowstorm">Winter Survival</div>
                    <h3>SNOWSTORM</h3>
                    <p>Tactical winter survival battle royale on Telegram. Scavenge for resources, build fires, and outlast rivals.</p>
                    <div class="features">
                        <span>❄️ Survival</span>
                        <span>🏆 Competitive</span>
                        <span>🔥 Resource Mgmt</span>
                    </div>
                    <div class="card-actions">
                        <a href="/snowstorm/" class="btn btn-primary" data-i18n="learn_more">Survival Specs →</a>
                        <button class="btn btn-source" onclick="openSource('snowstorm')">Source Code</button>
                    </div>
                </div>

                <!-- AlexaxMusic -->
                <div class="realm-card" data-realm="music">
                    <div class="realm-header">
                        <div class="realm-status" id="status-alexaxmusic">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-music);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>
                        </svg>
                    </div>
                    <div class="pill music">Music</div>
                    <h3>AlexaxMusic</h3>
                    <p>High-fidelity music streaming for Telegram. Crystal clear audio, seamless playlists, and shared listening.</p>
                    <div class="features">
                        <span>🎵 Hi-Fi Audio</span>
                        <span>🔊 Streaming</span>
                        <span>🎧 Shared Play</span>
                    </div>
                    <div class="card-actions">
                        <a href="/alexaxmusic/" class="btn btn-primary" data-i18n="learn_more">Streaming Specs →</a>
                        <button class="btn btn-source" onclick="openSource('alexaxmusic')">Source Code</button>
                    </div>
                </div>

                <!-- pybaileys -->
                <div class="realm-card" data-realm="dev">
                    <div class="realm-header">
                        <div class="realm-status" id="status-pybaileys">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-dev);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
                        </svg>
                    </div>
                    <div class="pill dev">Developer Engine</div>
                    <h3>pybaileys core</h3>
                    <p>The backbone of our WhatsApp automation, providing a robust Python interface for creators.</p>
                    <div class="features">
                        <span>🐍 Python</span>
                        <span>🔧 API</span>
                        <span>⚡ Performance</span>
                    </div>
                    <div class="card-actions">
                        <a href="/pybaileys/" class="btn btn-primary" data-i18n="learn_more">Developer API →</a>
                        <button class="btn btn-source" onclick="openSource('pybaileys')">Source Code</button>
                    </div>
                </div>

                <!-- YTDL -->
                <div class="realm-card" data-realm="api">
                    <div class="realm-header">
                        <div class="realm-status" id="status-ytdl">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-api);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M10 8.65v6.7L15.5 12 10 8.65zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path>
                        </svg>
                    </div>
                    <div class="pill api">API Space</div>
                    <h3>YTDL Utility</h3>
                    <p>High-performance YouTube downloader API hosted on Hugging Face. Get metadata or direct binary buffers.</p>
                    <div class="features">
                        <span>📥 Download</span>
                        <span>🔌 REST API</span>
                        <span>⚙️ Metadata</span>
                    </div>
                    <div class="card-actions">
                        <a href="/ytdl/" class="btn btn-primary" data-i18n="learn_more">Developer API →</a>
                        <button class="btn btn-source" onclick="openSource('ytdl')">Source Code</button>
                    </div>
                </div>

                <!-- Queen Noxi -->
                <div class="realm-card" data-realm="queen">
                    <div class="realm-header">
                        <div class="realm-status" id="status-queennoxi">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-tg);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"></path>
                        </svg>
                    </div>
                    <div class="pill telegram">Queen Noxi</div>
                    <h3>Queen Noxi</h3>
                    <p>Advanced Telegram bot with rich features for group management and automation.</p>
                    <div class="features">
                        <span>👑 Advanced</span>
                        <span>🛡️ Moderation</span>
                        <span>⚡ Fast</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-source" onclick="openSource('queennoxi')">Source Code</button>
                    </div>
                </div>

                <!-- TeleDrive -->
                <div class="realm-card" data-realm="teledrive">
                    <div class="realm-header">
                        <div class="realm-status" id="status-teledrive">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-tg);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path>
                        </svg>
                    </div>
                    <div class="pill api">Cloud Storage</div>
                    <h3>TeleDrive</h3>
                    <p>Free unlimited cloud storage powered by Telegram. Secure file hosting and sharing.</p>
                    <div class="features">
                        <span>☁️ Cloud</span>
                        <span>🔒 Secure</span>
                        <span>♾️ Unlimited</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-source" onclick="openSource('teledrive')">Source Code</button>
                    </div>
                </div>

                <!-- Queen Noxi Lilly -->
                <div class="realm-card" data-realm="lilly">
                    <div class="realm-header">
                        <div class="realm-status" id="status-queennoxililly">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-tg);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                        </svg>
                    </div>
                    <div class="pill telegram">Queen Noxi Lilly</div>
                    <h3>Queen Noxi Lilly</h3>
                    <p>Extended variant of Queen Noxi with enhanced features and custom modules.</p>
                    <div class="features">
                        <span>🌸 Enhanced</span>
                        <span>🧩 Modular</span>
                        <span>🔧 Custom</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-source" onclick="openSource('queennoxililly')">Source Code</button>
                    </div>
                </div>

                <!-- Quote API -->
                <div class="realm-card" data-realm="quote">
                    <div class="realm-header">
                        <div class="realm-status" id="status-quoteapi">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-api);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path>
                        </svg>
                    </div>
                    <div class="pill api">API Service</div>
                    <h3>Quote API</h3>
                    <p>Generate beautiful quote images from Telegram messages. Clean REST API for developers.</p>
                    <div class="features">
                        <span>💬 Quotes</span>
                        <span>🔌 API</span>
                        <span>🎨 Styling</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-source" onclick="openSource('quoteapi')">Source Code</button>
                    </div>
                </div>

                <!-- QuoteCpp -->
                <div class="realm-card" data-realm="quotecpp">
                    <div class="realm-header">
                        <div class="realm-status" id="status-quotecpp">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-api);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
                        </svg>
                    </div>
                    <div class="pill dev">Developer</div>
                    <h3>QuoteCpp</h3>
                    <p>C++ powered quote generation service. High performance and reliable API.</p>
                    <div class="features">
                        <span>⚡ C++</span>
                        <span>🔌 API</span>
                        <span>🚀 Fast</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-source" onclick="openSource('quotecpp')">Source Code</button>
                    </div>
                </div>

                <!-- Anarkani Music -->
                <div class="realm-card" data-realm="anarkani">
                    <div class="realm-header">
                        <div class="realm-status" id="status-anarkanimusic">
                            <span class="status-dot"></span>
                            <span class="status-text">FETCHING</span>
                        </div>
                    </div>
                    <div class="realm-icon" style="color: var(--accent-music);">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>
                        </svg>
                    </div>
                    <div class="pill music">Anarkani Music</div>
                    <h3>Anarkani Music</h3>
                    <p>Another powerful music streaming service for Telegram groups with advanced features.</p>
                    <div class="features">
                        <span>🎵 Music</span>
                        <span>🔊 Streaming</span>
                        <span>🎧 Playlists</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-source" onclick="openSource('anarkanimusic')">Source Code</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="status-section" style="margin-top: 4rem;">
            <div class="glass-panel" style="padding: 2rem;">
                <h2 style="margin-bottom: 1.5rem;">📊 System Status Dashboard</h2>
                <div class="mono" id="status-dashboard">
                    <p>Loading status information...</p>
                </div>
            </div>
        </section>
    </main>

    <!-- Source Code Viewer Modal -->
    <div class="source-modal" id="source-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modal-title">Source Code</h3>
                <button class="modal-close" onclick="closeSource()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-file-tree" id="modal-file-tree">
                    <div class="loading">Loading file tree...</div>
                </div>
                <div class="modal-file-content" id="modal-file-content">
                    <div class="loading">Select a file to view its contents</div>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <div class="container" style="padding: 4rem 0; border-top: 1px solid var(--border-color); text-align: center;">
            <p class="mono" style="opacity: 0.6;">© 2026 Hansaka Rasanjana (AlexaInc). Built for the Decentralized Social World.</p>
        </div>
    </footer>

    <script src="/status.js"></script>
    <script src="/lang.js"></script>
    <script src="/chat.js"></script>
    <script>
        // Repository mapping
        const REPO_MAP = {
            'alexa-v3': 'AlexaInc/alexa-v3',
            'alexatg': 'AlexaInc/alexatg',
            'snowstorm': 'AlexaInc/SNOWSTORM',
            'alexaxmusic': 'AlexaInc/alexaxmusic',
            'pybaileys': 'AlexaInc/pybaileys',
            'ytdl': 'AlexaInc/ytdl',
            'anarkanimusic': 'anarkani/anarkanimusic',
            'quoteapi': 'quotlytga/quotlytga',
            'quotecpp': 'quotlytga/quotecpp',
            'queennoxi': 'noxirobot/queennoxi',
            'teledrive': 'tdrive/teledrive',
            'queennoxililly': 'noxirobot/queennoxililly'
        };

        function openSource(repoKey) {
            const repo = REPO_MAP[repoKey];
            if (!repo) {
                alert('Repository not found');
                return;
            }
            loadRepoViewer(repo);
            document.getElementById('source-modal').classList.add('active');
        }

        function closeSource() {
            document.getElementById('source-modal').classList.remove('active');
        }

        async function loadRepoViewer(repo) {
            const [owner, name] = repo.split('/');
            document.getElementById('modal-title').textContent = `${owner}/${name}`;
            
            const apiBase = `https://api.github.com/repos/${owner}/${name}/contents`;
            const treeEl = document.getElementById('modal-file-tree');
            const contentEl = document.getElementById('modal-file-content');
            
            treeEl.innerHTML = '<div class="loading">Loading...</div>';
            contentEl.innerHTML = '<div class="loading">Select a file to view</div>';
            
            try {
                const response = await fetch(apiBase);
                if (!response.ok) throw new Error('Repository not found');
                const tree = await response.json();
                
                treeEl.innerHTML = '';
                const sorted = tree.sort((a, b) => {
                    if (a.type === 'dir' && b.type !== 'dir') return -1;
                    if (a.type !== 'dir' && b.type === 'dir') return 1;
                    return a.name.localeCompare(b.name);
                });
                
                for (const item of sorted) {
                    if (item.type === 'dir') {
                        const folder = document.createElement('div');
                        folder.innerHTML = `
                            <div class="folder-item" data-path="${item.path}">
                                📁 ${item.name}
                            </div>
                            <div class="folder-children" id="folder-${item.path}"></div>
                        `;
                        treeEl.appendChild(folder);

                        folder.querySelector('.folder-item').addEventListener('click', async (e) => {
                            e.stopPropagation();
                            const subFolder = document.getElementById(`folder-${item.path}`);
                            if (subFolder.classList.contains('expanded')) {
                                subFolder.classList.remove('expanded');
                            } else {
                                subFolder.classList.add('expanded');
                                if (!subFolder.dataset.loaded) {
                                    await loadSubTree(item.path, subFolder, apiBase);
                                    subFolder.dataset.loaded = 'true';
                                }
                            }
                        });
                    } else {
                        const fileItem = document.createElement('div');
                        fileItem.className = 'tree-item';
                        fileItem.dataset.path = item.path;
                        fileItem.textContent = `📄 ${item.name}`;
                        treeEl.appendChild(fileItem);

                        fileItem.addEventListener('click', () => {
                            document.querySelectorAll('.tree-item').forEach(i => i.classList.remove('active'));
                            fileItem.classList.add('active');
                            loadFileContent(item, apiBase, contentEl);
                        });
                    }
                }
            } catch (e) {
                treeEl.innerHTML = `<div class="error">Failed to load repository: ${e.message}</div>`;
            }
        }

        async function loadSubTree(path, container, apiBase) {
            try {
                const response = await fetch(`${apiBase}/${path}`);
                if (!response.ok) throw new Error('Failed to load subdirectory');
                const tree = await response.json();
                
                const sorted = tree.sort((a, b) => {
                    if (a.type === 'dir' && b.type !== 'dir') return -1;
                    if (a.type !== 'dir' && b.type === 'dir') return 1;
                    return a.name.localeCompare(b.name);
                });
                
                for (const item of sorted) {
                    if (item.type === 'dir') {
                        const folder = document.createElement('div');
                        folder.innerHTML = `
                            <div class="folder-item" data-path="${item.path}">
                                📁 ${item.name}
                            </div>
                            <div class="folder-children" id="folder-${item.path}"></div>
                        `;
                        container.appendChild(folder);

                        folder.querySelector('.folder-item').addEventListener('click', async (e) => {
                            e.stopPropagation();
                            const subFolder = document.getElementById(`folder-${item.path}`);
                            if (subFolder.classList.contains('expanded')) {
                                subFolder.classList.remove('expanded');
                            } else {
                                subFolder.classList.add('expanded');
                                if (!subFolder.dataset.loaded) {
                                    await loadSubTree(item.path, subFolder, apiBase);
                                    subFolder.dataset.loaded = 'true';
                                }
                            }
                        });
                    } else {
                        const fileItem = document.createElement('div');
                        fileItem.className = 'tree-item';
                        fileItem.dataset.path = item.path;
                        fileItem.textContent = `📄 ${item.name}`;
                        container.appendChild(fileItem);

                        fileItem.addEventListener('click', () => {
                            document.querySelectorAll('.tree-item').forEach(i => i.classList.remove('active'));
                            fileItem.classList.add('active');
                            loadFileContent(item, apiBase, document.getElementById('modal-file-content'));
                        });
                    }
                }
            } catch (e) {
                container.innerHTML = `<div class="error">Failed to load: ${e.message}</div>`;
            }
        }

        async function loadFileContent(item, apiBase, contentEl) {
            contentEl.innerHTML = '<div class="loading">Loading file content...</div>';
            
            try {
                const response = await fetch(item.url || `${apiBase}/${item.path}`);
                if (!response.ok) throw new Error('Failed to load file');
                const data = await response.json();
                
                if (data.encoding === 'base64') {
                    const content = atob(data.content);
                    const lines = content.split('\n');
                    const fileName = item.path.split('/').pop();
                    const lang = fileName.includes('.') ? fileName.split('.').pop() : 'text';
                    
                    contentEl.innerHTML = `
                        <div class="file-header">${fileName} • ${formatSize(item.size)} • ${lang.toUpperCase()}</div>
                        <pre class="code-block">${lines.map((line, i) => 
                            `<div class="code-line"><span class="line-number">${i + 1}</span><span>${escapeHtml(line)}</span></div>`
                        ).join('\n')}</pre>
                    `;
                } else {
                    contentEl.innerHTML = `<pre class="code-block">${escapeHtml(data.content || 'Empty file')}</pre>`;
                }
            } catch (e) {
                contentEl.innerHTML = `<div class="error">Failed to load file: ${e.message}</div>`;
            }
        }

        function formatSize(bytes) {
            if (!bytes || bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Close modal on outside click
        document.getElementById('source-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('source-modal')) {
                closeSource();
            }
        });

        // Keyboard shortcut to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSource();
            }
        });
    </script>
</body>
</html>
