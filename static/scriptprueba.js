window.fbAsyncInit = function() {
    FB.init({
        appId: 'TU_APP_ID_FACEBOOK',
        cookie: true,
        xfbml: true,
        version: 'v19.0'
    });
};

document.addEventListener('DOMContentLoaded', function () {
    const facebookBtn = document.getElementById('facebook-login');
    const simulationResult = document.getElementById('simulation-result');
    const progressBar = document.getElementById('progress-bar');
    const userFullname = document.getElementById('user-fullname');
    const userEmail = document.getElementById('user-email');
    const loginMethod = document.getElementById('login-method');
    const loginTime = document.getElementById('login-time');

    // Facebook login real
    facebookBtn.addEventListener('click', function () {
        FB.login(function (response) {
            if (response.authResponse) {
                FB.api('/me', { fields: 'name,email' }, function (profile) {
                    simulateLogin('Facebook', profile.email, profile.name);
                });
            } else {
                alert('Inicio de sesión con Facebook cancelado.');
            }
        }, { scope: 'email' });
    });

    // Google login callback
    window.handleGoogleLogin = function (response) {
        const jwt = response.credential;
        const payload = JSON.parse(atob(jwt.split('.')[1]));
        simulateLogin('Google', payload.email, payload.name);
    };

    // Función de simulación de login
    function simulateLogin(method, email, name) {
        simulationResult.style.display = 'block';
        progressBar.style.width = '0%';
        let progress = 0;

        const progressInterval = setInterval(() => {
            progress += 2;
            progressBar.style.width = progress + '%';
            if (progress >= 100) clearInterval(progressInterval);
        }, 30);

        setTimeout(() => {
            userFullname.textContent = name || generateRandomName(email);
            userEmail.textContent = email;
            loginMethod.textContent = method;
            loginTime.textContent = new Date().toLocaleString();
        }, 1500);
    }

    // Nombre aleatorio si no se provee
    function generateRandomName(email) {
        const base = email.split('@')[0];
        return base.charAt(0).toUpperCase() + base.slice(1) + " Pérez";
    }
});
 