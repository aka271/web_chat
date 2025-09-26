document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    const currentUser = sessionStorage.getItem('currentUser');
    let activeChatUser = null;

    // --- Security Check ---
    // If no user is stored in the session, they shouldn't be here.
    if (!currentUser) {
        document.body.innerHTML = `
            <div style="font-family: sans-serif; text-align: center; padding: 40px; color: #c7c7c7;">
                <h1>Access Denied</h1>
                <p>No user session found. Redirecting to login...</p>
            </div>
        `;
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 2000);
        return; // Stop script execution
    }

    // --- DOM Element References ---
    const userListEl = document.getElementById('user-list');
    const logoutBtn = document.getElementById('logout-btn');
    const chatWelcomeEl = document.getElementById('chat-welcome-message');
    const chatWindowEl = document.getElementById('chat-window');
    const chatWithUsernameEl = document.getElementById('chat-with-username');
    const currentUserUsernameEl = document.getElementById('current-user-username');


    // --- API Helper ---
    async function apiCall(endpoint, method, body = null) {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(`/api/${endpoint}`, options);
        if (response.headers.get("Content-Type")?.includes("application/json")) {
            return { status: response.status, data: await response.json() };
        }
        return { status: response.status, data: await response.text() };
    }

    // --- Core Functions ---

    // Fetches users from the backend and displays them in the sidebar.
    async function loadUsers() {
        const { status, data } = await apiCall('users', 'GET');
        if (status === 200) {
            userListEl.innerHTML = ''; // Clear existing list
            data.forEach(user => {
                // Don't show the current user in their own user list
                if (user.username !== currentUser) {
                    const userItem = document.createElement('div');
                    userItem.className = 'user-item';
                    userItem.textContent = user.username;
                    userItem.dataset.username = user.username;
                    userListEl.appendChild(userItem);
                }
            });
        } else {
            console.error('Failed to load users:', data);
        }
    }

    // Switches the main view to show the chat window for a specific user.
    function openChatWith(username) {
        activeChatUser = username;
        chatWelcomeEl.classList.remove('active-chat-area');
        chatWindowEl.classList.add('active-chat-area');
        chatWithUsernameEl.textContent = username;

        // Highlight the selected user in the sidebar
        document.querySelectorAll('.user-item').forEach(item => {
            item.classList.toggle('active', item.dataset.username === username);
        });
        
        // When we implement WebSockets, we would load message history here.
        // For now, we'll just clear the message list for the new chat.
        document.getElementById('message-list').innerHTML = '';
    }

    // --- Event Handlers ---
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = '/index.html';
    });

    // Use event delegation for user items to handle clicks efficiently.
    userListEl.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('user-item')) {
            const username = e.target.dataset.username;
            openChatWith(username);
        }
    });

    // --- Initial Setup ---
    if (currentUserUsernameEl) {
        currentUserUsernameEl.textContent = currentUser;
    }
    chatWelcomeEl.classList.add('active-chat-area'); // Show welcome message initially
    loadUsers(); // Fetch the user list as soon as the page loads
});

