// Redireciona usuário já autenticado para seu dashboard
(async function redirectIfLoggedIn() {
    try {
        const res = await fetch('/api/me', { headers: { Accept: 'application/json' } });
        if (res.ok) {
            const data = await res.json();
            if (data.user) {
                const perfil = String(data.user.perfil || '').toLowerCase();
                if (perfil === 'admin' || perfil === 'administrador') {
                    window.location.replace('/admin.html');
                } else if (perfil === 'restaurante') {
                    window.location.replace('/dashboardv2.html');
                } else {
                    window.location.replace('/meu-perfil.html');
                }
            }
        }
    } catch (_) { /* não logado, segue normalmente */ }
})();

const loginForm = document.getElementById('login-form');

function getLoginMessage() {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('erro');

    if (error === 'credenciais') return ['E-mail ou senha inválidos.', 'error'];
    if (error === 'login-obrigatorio') return ['Entre com sua conta para continuar.', 'info'];
    return null;
}

const initialLoginMessage = getLoginMessage();
if (initialLoginMessage) {
    window.JustDoEatUI.showToast(initialLoginMessage[0], initialLoginMessage[1]);
}

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!loginForm.reportValidity()) {
            window.JustDoEatUI.showToast('Preencha e-mail e senha para entrar.', 'error');
            return;
        }

        const formData = new FormData(loginForm);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new URLSearchParams(formData)
            });
            const result = await response.json();

            if (!response.ok) {
                window.JustDoEatUI.showToast(result.error || 'Não foi possível entrar.', 'error');
                return;
            }

            window.JustDoEatUI.showToast('Login realizado com sucesso.', 'success');
            window.setTimeout(() => {
                window.location.href = result.redirectTo || '/dashboard.html';
            }, 650);
        } catch (error) {
            window.JustDoEatUI.showToast('Falha de conexão ao tentar entrar.', 'error');
        }
    });
}
