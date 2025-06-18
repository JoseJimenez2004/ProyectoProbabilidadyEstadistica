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
            
            // Simulación de inicio de sesión con Facebook
            facebookBtn.addEventListener('click', function() {
                const email = 'usuario@facebook.com';
                simulateLogin('Facebook', email);
            });
            
            // Simulación de inicio de sesión con Apple
            appleBtn.addEventListener('click', function() {
                const email = 'usuario@icloud.com';
                simulateLogin('Apple', email);
            });
            
            // Simulación de inicio de sesión con Google
            googleBtn.addEventListener('click', function() {
                const email = 'usuario@gmail.com';
                simulateLogin('Google', email);
            });
            
            // Simulación de inicio de sesión con formulario
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                if(email && password) {
                    simulateLogin('Credenciales', email);
                }
            });
            
            // Simulación de "Olvidé mi contraseña"
            forgotPassword.addEventListener('click', function(e) {
                e.preventDefault();
                alert('SIMULACIÓN: Se enviaría un correo electrónico para restablecer la contraseña');
            });
            
            // Simulación de registro
            signupButton.addEventListener('click', function() {
                alert('SIMULACIÓN: Te redirigiríamos a un formulario de registro');
            });
            
            // Función para simular el inicio de sesión
            function simulateLogin(method, email) {
                // Ocultar el formulario y mostrar el resultado
                simulationResult.style.display = 'block';
                
                // Generar un nombre aleatorio basado en el email
                const username = email.split('@')[0];
                const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
                const fullname = generateRandomName(capitalizedUsername);
                
                // Actualiza barra de progreso
                progressBar.style.width = '0%';
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += 2;
                    progressBar.style.width = progress + '%';
                    if (progress >= 100) clearInterval(progressInterval);
                }, 50);
                
                //  datos del usuario después de un retraso
                setTimeout(() => {
                    userFullname.textContent = fullname;
                    userEmail.textContent = email;
                    loginMethod.textContent = method;
                    
                    // fecha y hora actual
                    const now = new Date();
                    loginTime.textContent = now.toLocaleString();
                }, 1500);
            }
            
            // Función para generar un nombre aleatorio
            function generateRandomName(base) {
                const names = [
                    `${base} `, 
                    `${base} `, 
                    `${base} `, 
                    `${base} `,
                    `${base}`,
                    `${base} `,
                    `${base} `,
                    `${base} `
                ];
                
                const surnames = [
                    "", "", "", "", "", "", ""
                ];
                
                return `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
            }
        });
    