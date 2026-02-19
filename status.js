/**
 * AlexaInc Secure Status System
 * Reads status from data/status.json (updated via GitHub Actions).
 * Direct fetch only as fallback for WhatsApp if JSON is missing.
 */

const DEFAULT_WA_NUMBER = "94705327164";

async function updateBotStatus(statusElementId, updateElementId) {
    const statusText = document.getElementById(statusElementId);
    const updateText = document.getElementById(updateElementId);
    const waChatBtn = document.getElementById('wa-chat-btn');
    const tgChatBtn = document.getElementById('tg-chat-btn');

    // Determine page context based on folder name
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const folderName = pathParts[0] || 'root';

    const pageIdMap = {
        'alexa-v3': 'alexa-v3',
        'alexatg': 'alexatg',
        'alexaxmusic': 'alexaxmusic'
    };
    const botId = pageIdMap[folderName];

    if (!botId) return;

    if (statusText) statusText.innerText = "CONNECTING...";

    try {
        // 1. Fetch the master status file using absolute path
        const response = await fetch('./data/status.json');
        if (!response.ok) throw new Error('Status configuration not found');

        const data = await response.json();
        const botData = data[botId];

        if (botData) {
            // Update UI from JSON
            if (statusText) {
                statusText.innerText = botData.status.toUpperCase();
                statusText.style.color = botData.status === "DELAYED" ? "#ffbd2e" : (botData.status === "OFFLINE" ? "#ff5f56" : "inherit");
            }
            if (updateText) {
                updateText.innerText = botData.update;
                updateText.style.opacity = "0.6";
            }

            // Handle specific chat buttons
            if (botId === 'alexa-v3' && waChatBtn) {
                waChatBtn.href = `https://wa.me/${botData.phoneNumber || DEFAULT_WA_NUMBER}`;
            } else if (tgChatBtn) {
                const tgUsernames = {
                    'alexatg': 'alexaIncbot',
                    'alexaxmusic': 'Alexaincmusicbot'
                };
                tgChatBtn.href = `https://t.me/${tgUsernames[botId]}`;
            }
        }
    } catch (error) {
        console.warn("Secure status check failed. Switching to limited direct fetch fallback.");

        // Fallback: If status.json is missing/blocked, we can only safely verify WhatsApp via Koyeb
        // or any bot via GitHub Activity. We DON'T use Telegram tokens here.
        if (botId === 'alexa-v3') {
            try {
                const waRes = await fetch("https://frozen-ilysa-alexainclk-c22bf93f.koyeb.app/status");
                const waData = await waRes.json();
                if (statusText) statusText.innerText = waData.status.toUpperCase();
            } catch (e) {
                if (statusText) statusText.innerText = "STANDBY";
            }
        } else {
            // For TG bots, fallback to simple GitHub activity check (No token needed)
            const botRepos = { 'alexatg': 'alexatg', 'alexaxmusic': 'AlexaxMusic' };
            try {
                const ghRes = await fetch(`https://api.github.com/repos/AlexaInc/${botRepos[botId]}`);
                if (ghRes.ok) {
                    if (statusText) statusText.innerText = "ACTIVE";
                    if (updateText) updateText.innerText = "Active on GitHub";
                }
            } catch (e) {
                if (statusText) statusText.innerText = "STANDBY";
            }
        }
    }
}

// Auto-initialize based on page context
document.addEventListener('DOMContentLoaded', () => {
    updateBotStatus('bot-status-text', 'bot-update-text');
});
