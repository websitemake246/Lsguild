let guildData = {
    players: [
        { rank: 1, name: "CRYONIX", role: "Leader", description: "Guild Founder & Leader" },
        { rank: 2, name: "KARDIS ✕", role: "Elite", description: "Top Fragger" },
        { rank: 3, name: "DANNZY", role: "Sniper", description: "AWM Specialist" }
    ],
    members: []
};

function loadData() {
    const saved = localStorage.getItem('laststand_guild');
    if (saved) {
        guildData = JSON.parse(saved);
    }
    displayPlayers();
}

function displayPlayers() {
    const grid = document.getElementById('playersGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    guildData.players.sort((a,b) => a.rank - b.rank).forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div class="player-name">LS † ${player.name}</div>
            <div class="player-tag">Rank #${player.rank} • ${player.role}</div>
            <p>${player.description}</p>
        `;
        grid.appendChild(card);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('UID Copied: ' + text);
}

// Theme Toggle
function initTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', theme);
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');
    if (theme === 'light') {
        if (moonIcon) moonIcon.style.display = 'none';
        if (sunIcon) sunIcon.style.display = 'inline-block';
    }
}

document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    initTheme();
});

loadData();
initTheme();
