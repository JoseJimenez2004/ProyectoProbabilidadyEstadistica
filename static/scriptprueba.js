document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const facebookBtn = document.getElementById('facebook-login');
    const appleBtn = document.getElementById('apple-login');
    const googleBtn = document.getElementById('google-login');
    const loginForm = document.getElementById('login-form');
    const forgotPassword = document.getElementById('forgot-password');
    const signupButton = document.getElementById('signup-button');
    const simulationResult = document.getElementById('simulation-result');
    const progressBar = document.getElementById('progress-bar');
    const userFullname = document.getElementById('user-fullname');
    const userEmail = document.getElementById('user-email');
    const loginMethod = document.getElementById('login-method');
    const loginTime = document.getElementById('login-time');
    
    // URLs oficiales de autenticación
    const FACEBOOK_LOGIN_URL = 'https://www.facebook.com/login.php';
    const GOOGLE_LOGIN_URL = 'https://accounts.google.com/signin';
    
    // Función para cargar el SDK de Apple
    function loadAppleSDK() {
        if (!window.AppleID) {
            const script = document.createElement('script');
            script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/es_ES/appleid.auth.js';
            script.onload = initAppleAuth;
            document.head.appendChild(script);
        } else {
            initAppleAuth();
        }
    }
    
    function initAppleAuth() {
        if (window.AppleID) {
            AppleID.auth.init({
                clientId: 'tu.client.id.apple',
                scope: 'name email',
                redirectURI: 'https://tu-dominio.com/auth/apple/callback',
                state: 'state'
            });
        }
    }
    
    // Redirección a Facebook
    facebookBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simulación educativa
        const simulate = confirm("¿Deseas ver la simulación educativa primero?\n\nCancelar para ir directamente a Facebook");
        
        if (simulate) {
            simulateLogin('Facebook', 'usuario@facebook.com', 'Usuario Facebook');
        } else {
            window.open(FACEBOOK_LOGIN_URL, '_blank');
        }
    });
    
    // Redirección a Google
    googleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simulación educativa
        const simulate = confirm("¿Deseas ver la simulación educativa primero?\n\nCancelar para ir directamente a Google");
        
        if (simulate) {
            simulateLogin('Google', 'usuario@gmail.com', 'Usuario Google');
        } else {
            window.open(GOOGLE_LOGIN_URL, '_blank');
        }
    });
    
    // Autenticación con Apple (simulación)
    appleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loadAppleSDK();
        
        if (window.AppleID) {
            AppleID.auth.signIn()
                .then(response => {
                    if (response.authorization.id_token) {
                        const email = response.user ? response.user.email : 'usuario@icloud.com';
                        const name = response.user ? `${response.user.name.firstName} ${response.user.name.lastName}` : 'Usuario Apple';
                        simulateLogin('Apple', email, name);
                    }
                })
                .catch(error => {
                    console.error('Error en Apple Sign In:', error);
                    simulateLogin('Apple', 'usuario@icloud.com', 'Usuario Apple');
                });
        } else {
            simulateLogin('Apple', 'usuario@icloud.com', 'Usuario Apple');
        }
    });
    
    // Simulación de inicio de sesión con formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if(email && password) {
            simulateLogin('Credenciales', email, email.split('@')[0]);
        }
    });
    
    // Simulación de "Olvidé mi contraseña"
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        alert('SIMULACIÓN: Se enviaría un correo electrónico para restablecer la contraseña');
    });
    
    // Simulación de registro
    signupButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('SIMULACIÓN: Te redirigiríamos a un formulario de registro');
    });
    
    // Función para simular el inicio de sesión
    function simulateLogin(method, email, name = null) {
        // Ocultar el formulario y mostrar el resultado
        simulationResult.style.display = 'block';
        
        // Generar un nombre si no se proporciona
        const fullname = name || generateRandomName(email.split('@')[0]);
        
        // Actualiza barra de progreso
        progressBar.style.width = '0%';
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 2;
            progressBar.style.width = progress + '%';
            if (progress >= 100) clearInterval(progressInterval);
        }, 50);
        
        // Actualizar datos del usuario después de un retraso
        setTimeout(() => {
            userFullname.textContent = fullname;
            userEmail.textContent = email;
            loginMethod.textContent = method;
            
            // fecha y hora actual
            const now = new Date();
            loginTime.textContent = now.toLocaleString();
            
            // Mostrar mensaje educativo
            setTimeout(() => {
                alert(`Simulación educativa completada.\n\nEn un escenario real, serías redirigido a:\n${method === 'Facebook' ? FACEBOOK_LOGIN_URL : method === 'Google' ? GOOGLE_LOGIN_URL : 'la página de autenticación correspondiente'}`);
            }, 2000);
        }, 1500);
    }
    
    // Función para generar un nombre aleatorio
    function generateRandomName(base) {
        const names = [
            `${base}`, 
            `${base}`, 
            `${base}`, 
            `${base}`,
            `${base}`,
            `${base}`,
            `${base}`,
            `${base}`
        ];
        
        const surnames = [
            "", "", "", "", "", "", ""
        ];
        
        return `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
    }
});