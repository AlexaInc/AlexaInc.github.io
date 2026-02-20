/**
 * AlexaInc Logic-Based Chat Assistant
 */

const CHAT_LOGIC = {
    start: {
        text: "Hi there! I'm Alexa, your personal assistant for the AlexaInc ecosystem. How can I help you today?",
        options: [
            { text: "What is AlexaInc?", next: "about" },
            { text: "Check Bot Status", next: "status" },
            { text: "Bot Support / Help", next: "support" },
            { text: "Contact Creator", next: "contact" }
        ]
    },
    about: {
        text: "AlexaInc is a specialized bot ecosystem focused on high-performance automation for WhatsApp, Telegram Management, and Music streaming. We build tools that make social interaction faster and smarter.",
        options: [
            { text: "Which bots do you have?", next: "bots" },
            { text: "Back to Menu", next: "start" }
        ]
    },
    bots: {
        text: "Our flagships are:\n1. Alexa V3 (WhatsApp)\n2. AlexaTG (Telegram AI/Games)\n3. AlexaxMusic (Music Streaming)",
        options: [
            { text: "View Ecosystem", url: "/" },
            { text: "Back to Menu", next: "start" }
        ]
    },
    status: {
        text: "You can check the real-time health of all our bots on our Status Realms page. We monitor API latency and system uptime 24/7.",
        options: [
            { text: "Check Status Now", url: "/alexa-v3/" },
            { text: "Back to Menu", next: "start" }
        ]
    },
    support: {
        text: "Need help setting up a bot or found a bug? Join our official community or check the documentation on GitHub.",
        options: [
            { text: "WhatsApp Community", url: "https://chat.whatsapp.com/L1S1FhAnFpC6zU3pPh6sC8" },
            { text: "Telegram Group", url: "https://t.me/alexa_support" },
            { text: "Back to Menu", next: "start" }
        ]
    },
    contact: {
        text: "Looking to hire a developer or discuss a project? Hansaka Rasanjana is the creator of this ecosystem. You can reach out directly via Email or LinkedIn.",
        options: [
            { text: "Email Hansaka", url: "mailto:rasanjanahansaka8@gmail.com" },
            { text: "View GitHub", url: "https://github.com/AlexaInc" },
            { text: "Back to Menu", next: "start" }
        ]
    }
};

class ChatAssistant {
    constructor() {
        this.container = null;
        this.window = null;
        this.body = null;
        this.fab = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createWidget();
        this.addEventListeners();
        this.renderStep('start');
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'chat-widget';
        widget.innerHTML = `
            <div class="chat-fab" id="chat-fab">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="28" height="28">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
            </div>
            <div class="chat-window" id="chat-window">
                <div class="chat-header">
                    <div class="bot-avatar">🤖</div>
                    <div>
                        <h4>Alexa Assistant</h4>
                        <p>Specialized Support Bot</p>
                    </div>
                </div>
                <div class="chat-body" id="chat-body"></div>
            </div>
        `;
        document.body.appendChild(widget);
        this.container = widget;
        this.window = widget.querySelector('#chat-window');
        this.body = widget.querySelector('#chat-body');
        this.fab = widget.querySelector('#chat-fab');
    }

    addEventListeners() {
        this.fab.addEventListener('click', () => this.toggleChat());

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.container.contains(e.target)) {
                this.toggleChat();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('active', this.isOpen);
        if (this.isOpen) {
            this.fab.style.transform = 'scale(0.9) rotate(-10deg)';
        } else {
            this.fab.style.transform = '';
        }
    }

    renderStep(stepKey) {
        const step = CHAT_LOGIC[stepKey];
        if (!step) return;

        // Add Bot Message
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot-msg';
        msgDiv.innerText = step.text;

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options';

        step.options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'chat-option';
            btn.innerText = opt.text;
            btn.onclick = () => {
                this.addUserMessage(opt.text);
                if (opt.url) {
                    window.open(opt.url, '_blank');
                } else {
                    setTimeout(() => this.renderStep(opt.next), 300);
                }
            };
            optionsDiv.appendChild(btn);
        });

        this.body.appendChild(msgDiv);
        this.body.appendChild(optionsDiv);
        this.scrollToBottom();
    }

    addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message user-msg';
        msgDiv.innerText = text;
        this.body.appendChild(msgDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.body.scrollTop = this.body.scrollHeight;
    }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatAssistant();
});
