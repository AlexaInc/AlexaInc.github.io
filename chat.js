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
                <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H6l-2 2V4h16v12z"/></svg>
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
