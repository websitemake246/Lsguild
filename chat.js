let currentUser = null;
let messages = [];

function loadChatData() {
    const saved = localStorage.getItem('laststand_chat');
    if (saved) {
        messages = JSON.parse(saved);
    } else {
        messages = [];
    }
    displayMessages();
}

function saveChatData() {
    localStorage.setItem('laststand_chat', JSON.stringify(messages));
}

function chatLogin() {
    const username = document.getElementById('chatUsername').value;
    const password = document.getElementById('chatPassword').value;
    
    const guildData = JSON.parse(localStorage.getItem('laststand_guild') || '{"users":[]}');
    const user = guildData.users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = `LS † ${username}`;
        document.getElementById('currentUser').innerText = `Logged in as: ${currentUser}`;
        document.getElementById('loginPrompt').style.display = 'none';
        document.getElementById('chatArea').style.display = 'flex';
        document.getElementById('chatArea').style.flexDirection = 'column';
        document.getElementById('chatArea').style.height = 'calc(100vh - 150px)';
        loadChatData();
        setInterval(loadChatData, 3000);
    } else {
        alert('Invalid credentials! Contact admin for access.');
    }
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text && currentUser) {
        messages.push({
            user: currentUser,
            text: text,
            time: new Date().toLocaleTimeString(),
            date: new Date().toDateString()
        });
        saveChatData();
        displayMessages();
        input.value = '';
    }
}

function displayMessages() {
    const container = document.getElementById('messagesArea');
    if (!container) return;
    
    container.innerHTML = '';
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <strong>${msg.user}</strong> <small>${msg.time}</small><br>
            ${msg.text}
        `;
        container.appendChild(messageDiv);
    });
    container.scrollTop = container.scrollHeight;
}

document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
