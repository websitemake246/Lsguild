let guildData = { players: [], users: [] };

function loadAdminData() {
    const saved = localStorage.getItem('laststand_guild');
    if (saved) {
        guildData = JSON.parse(saved);
    } else {
        guildData = {
            players: [
                { rank: 1, name: "CRYONIX", role: "Leader", description: "Guild Founder" },
                { rank: 2, name: "KARDIS ✕", role: "Elite", description: "Top Fragger" },
                { rank: 3, name: "DANNZY", role: "Sniper", description: "AWM Specialist" }
            ],
            users: [{ username: 'admin', password: 'admin123', role: 'admin' }]
        };
    }
    saveData();
}

function saveData() {
    localStorage.setItem('laststand_guild', JSON.stringify(guildData));
}

function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    const user = guildData.users.find(u => u.username === username && u.password === password);
    if (user) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        refreshUsersList();
        refreshPlayersPreview();
    } else {
        alert('Invalid credentials! Use admin/admin123');
    }
}

function createUser() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('memberRole').value;
    const desc = document.getElementById('memberDesc').value;
    
    if (!username || !password) {
        alert('Username and password required!');
        return;
    }
    
    guildData.users.push({
        username: username,
        password: password,
        role: role,
        description: desc,
        createdAt: new Date().toISOString()
    });
    
    saveData();
    refreshUsersList();
    alert(`User ${username} created! They can login to chat with LS † ${username}`);
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
}

function addOrUpdatePlayer() {
    const name = document.getElementById('playerName').value;
    const rank = parseInt(document.getElementById('playerRank').value);
    const role = document.getElementById('playerRole').value;
    const desc = document.getElementById('playerDesc').value;
    
    if (!name || !rank) {
        alert('Name and rank required!');
        return;
    }
    
    const existing = guildData.players.findIndex(p => p.rank === rank);
    const playerData = { rank: rank, name: name, role: role, description: desc };
    
    if (existing !== -1) {
        guildData.players[existing] = playerData;
    } else {
        guildData.players.push(playerData);
    }
    
    saveData();
    refreshPlayersPreview();
    alert(`Player LS † ${name} added at rank #${rank}`);
}

function refreshUsersList() {
    const container = document.getElementById('usersList');
    if (!container) return;
    
    container.innerHTML = '<h3>Registered Members</h3>';
    guildData.users.forEach(user => {
        if (user.username !== 'admin') {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.innerHTML = `
                <strong>LS † ${user.username}</strong>
                <p>Role: ${user.role || 'Member'}</p>
                <p>${user.description || 'No description'}</p>
                <button onclick="deleteUser('${user.username}')" class="danger-btn">Delete</button>
            `;
            container.appendChild(card);
        }
    });
}

function refreshPlayersPreview() {
    const preview = document.getElementById('playersPreview');
    if (preview) {
        preview.innerHTML = '<h3>Current Top 10:</h3>';
        guildData.players.sort((a,b) => a.rank - b.rank).forEach(p => {
            preview.innerHTML += `<p>#${p.rank}: LS † ${p.name} - ${p.role}</p>`;
        });
    }
}

function deleteUser(username) {
    if (confirm(`Delete ${username}?`)) {
        guildData.users = guildData.users.filter(u => u.username !== username);
        saveData();
        refreshUsersList();
    }
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    location.reload();
}

if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    refreshUsersList();
    refreshPlayersPreview();
}

loadAdminData();
