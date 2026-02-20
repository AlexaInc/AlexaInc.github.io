/**
 * AlexaInc Multi-Language Manager
 */

let translations = {};
let currentLang = localStorage.getItem('selectedLang') || 'en';

async function initTranslations() {
    try {
        const response = await fetch('/data/translations.json');
        translations = await response.json();
        applyTranslations(currentLang);
        updateSwitcherUI();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Use innerHTML to support <br> in titles
            el.innerHTML = translations[lang][key];
        }
    });

    // Update local storage
    localStorage.setItem('selectedLang', lang);
    currentLang = lang;

    // update switcher button
    updateSwitcherUI();

    // Update lang attribute for accessibility/fonts
    document.documentElement.lang = lang;
}

function updateSwitcherUI() {
    const btn = document.getElementById('lang-btn');
    if (btn) {
        btn.innerText = currentLang.toUpperCase();
    }
}

function setLanguage(lang) {
    applyTranslations(lang);
    // Close dropdown
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.remove('active');
}

// Dropdown Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    initTranslations();

    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            langDropdown.classList.remove('active');
        });
    }
});
