// Function to check if user is admin
function isAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.email === 'admin@umn.ac.id';
}

// Function to redirect if not admin
function requireAdmin() {
    if (!isAdmin()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    // Insert demo user if not already in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.some(u => u.email === 'demo@umn.ac.id')) {
        users.push({
            name: 'Demo User',
            nim: '0000000000',
            email: 'demo@umn.ac.id',
            password: 'demo',
            confirmPassword: 'demo', // optional, for registration consistency
            phone: '081234567890',
            prodi: 'Informatika' // or any default value
        });
        localStorage.setItem('users', JSON.stringify(users));
    }
    if (!users.some(u => u.email === 'admin@umn.ac.id')) {
        users.push({
            name: 'Demo Admin',
            nim: '0000000000',
            email: 'admin@umn.ac.id',
            password: 'admin',
            confirmPassword: 'admin', // optional, for registration consistency
            phone: '081234567890',
            prodi: 'Sistem Informasi' // or any default value
        });
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            // Here you would typically make an API call to verify credentials
            // For demo purposes, we'll use localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                if (email === 'admin@umn.ac.id') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'consultation.html';
                }
            } else {
                alert('Email atau password salah');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: this.querySelector('input[placeholder="Nama Lengkap"]').value,
                nim: this.querySelector('input[placeholder="NIM"]').value,
                email: this.querySelector('input[type="email"]').value,
                password: this.querySelector('input[placeholder="Password"]').value,
                confirmPassword: this.querySelector('input[placeholder="Konfirmasi Password"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                prodi: this.querySelector('select[name="prodi"]').value
            };

            if (formData.password !== formData.confirmPassword) {
                alert('Password tidak sama');
                return;
            }

            // Here you would typically make an API call to register the user
            // For demo purposes, we'll use localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            if (users.some(u => u.email === formData.email)) {
                alert('Email sudah terdaftar');
                return;
            }

            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registrasi berhasil! Silakan login.');
            window.location.href = 'login.html';
        });
    }

    // Check if user is logged in for consultation page
    if (window.location.pathname.includes('consultation.html')) {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            window.location.href = 'login.html';
        } else {
            // Auto-fill user data in consultation form
            const userData = JSON.parse(currentUser);
            const form = document.getElementById('consultation-form');
            if (form) {
                form.querySelector('input[placeholder="Nama Lengkap"]').value = userData.name;
                form.querySelector('input[placeholder="NIM"]').value = userData.nim;
                form.querySelector('input[placeholder="Email UMN"]').value = userData.email;
                form.querySelector('input[placeholder="Nomor Telepon"]').value = userData.phone;
                form.querySelector('select[name="prodi"]').value = userData.prodi;

                // Make these fields readonly
                form.querySelector('input[placeholder="Nama Lengkap"]').readOnly = true;
                form.querySelector('input[placeholder="NIM"]').readOnly = true;
                form.querySelector('input[placeholder="Email UMN"]').readOnly = true;
                form.querySelector('input[placeholder="Nomor Telepon"]').readOnly = true;
                form.querySelector('select[name="prodi"]').disabled = true;
            }
        }
    }
});