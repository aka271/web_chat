// This script is dedicated to the login/registration page (index.html)
document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let isLoginMode = true;

    // --- DOM Element References ---
    const authForm = document.getElementById('auth-form');
    const formTitle = document.getElementById('form-title');
    const switchFormLink = document.getElementById('switch-form-link');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const errorMessage = document.getElementById('error-message');

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
        const data = await response.text();
        return { status: response.status, data };
    }

    // --- UI Update Function ---
    function updateAuthForm() {
        errorMessage.textContent = '';
        authForm.reset();
        if (isLoginMode) {
            formTitle.textContent = 'Login';
            loginBtn.style.display = 'block';
            registerBtn.style.display = 'none';
            switchFormLink.textContent = 'Need to register?';
        } else {
            formTitle.textContent = 'Register';
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'block';
            switchFormLink.textContent = 'Already have an account?';
        }
    }

    // --- Event Handlers ---
    switchFormLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        updateAuthForm();
    });

    loginBtn.addEventListener('click', async () => {
        const username = authForm.username.value;
        const password = authForm.password.value;
        if (!username || !password) {
            errorMessage.textContent = 'Please enter username and password.';
            return;
        }
        const { status, data } = await apiCall('login', 'POST', { username, password });

        if (status === 200) {
            // --- THIS IS THE FIX ---
            // 1. We successfully log in.
            // 2. We save the username to the browser's session storage.
            sessionStorage.setItem('currentUser', username);
            // 3. THEN we redirect to the chat page.
            window.location.href = '/chat';
        } else {
            errorMessage.textContent = data;
        }
    });

    registerBtn.addEventListener('click', async () => {
        const username = authForm.username.value;
        const password = authForm.password.value;
        if (!username || !password) {
            errorMessage.textContent = 'Please enter username and password.';
            return;
        }
        const { status, data } = await apiCall('register', 'POST', { username, password });

        if (status === 201) {
            isLoginMode = true;
            updateAuthForm();
            errorMessage.textContent = 'Registration successful! Please log in.';
        } else {
            errorMessage.textContent = data;
        }
    });

    // --- Initial Setup ---
    updateAuthForm();
});

