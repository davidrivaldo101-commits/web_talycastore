/* ===== auth.js: login & logout versi latihan (tanpa server) =====
PENTING: ini hanya SIMULASI untuk belajar. Data akun tersimpan di kode
sehingga bisa dibaca siapa saja. Untuk website sungguhan, login harus
diproses di server (PHP/Node.js + database + password di-hash). */
const USERS = [
    { username: "admin", password: "admin123", nama: "Admin Talyca Store", role: "Admin" },
    { username: "david", password: "david123", nama: "Siswa PKL", role: "Pelanggan" }
];
const KEY = "vs_user";
// Ambil data user yang sedang login (atau null)
function getUser() {
    try { return JSON.parse(sessionStorage.getItem(KEY)); }
    catch (e) { return null; }
}
// Cek username & password, simpan sesi jika cocok
function login(username, password) {
    const found = USERS.find(u => u.username === username && u.password === password);
    if (!found) return false;
    sessionStorage.setItem(KEY, JSON.stringify({ username: found.username, nama: found.nama, role: found.role }));
    return true;
}
// Hapus sesi lalu kembali ke halaman login
function logout() {
    sessionStorage.removeItem(KEY);
    window.location.href = "login.html?pesan=logout";
}
// Halaman terlindungi: wajib login
function requireLogin() {
    if (!getUser()) window.location.href = "login.html?pesan=wajib";
}
// Tampilkan tombol Login atau Halo + Logout di navbar
function renderAuthMenu() {
    const box = document.getElementById("auth-menu");
    if (!box) return;
    const user = getUser();
    if (user) {
        box.innerHTML =
            '<a href="dashboard.html" class="user-link">Halo, ' + user.nama.split(" ")[0] + '</a>' +
            '<button type="button" class="btn-logout" id="btnLogout">Logout</button>';
        document.getElementById("btnLogout").addEventListener("click", logout);
    } else {
        box.innerHTML = '<a href="login.html" class="btn-login">Login</a>';
    }
}
document.addEventListener("DOMContentLoaded", renderAuthMenu);