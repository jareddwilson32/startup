(async () => {
    let authenticated = false;
    const username = localStorage.getItem('username');
    if (username) {
        const nameEl = document.querySelector('#username');
        nameEl.value = username;
        const user = await getUser(nameEl.value);
        authenticated = user?.authenticated;
    }

    if (authenticated) {
        document.querySelector('#playerName').textContent = username;
    }
})();

async function loginUser() {
    loginOrCreate(`/api/auth/login`);
}

async function createUser() {
    loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
    const username = document.querySelector('#username')?.value;
    const password = document.querySelector('#password')?.value;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const body = await response.json();

    if (response?.status === 200) {
        localStorage.setItem('username', usrename);
        window.location.href = 'play.html';
    }
    else {
        const modalEl = document.querySelector('#msgModal');
        modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
    }
}

function play() {
    window.location.href = 'play.html';
}

function logout() {
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

async function getUser(username) {
    const response = await fetch(`/api/user/${username}`);
    if (response.status === 200) {
        return response.json();
    }
    else {
        return null;
    }
}
