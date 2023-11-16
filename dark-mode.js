// dark-mode.js
function changeTheme() {
    const darkModeRadio = document.getElementById('darkModeRadio');

    if (darkModeRadio.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

const darkModeRadio = document.getElementById('darkModeRadio');
if (darkModeRadio) {
    darkModeRadio.addEventListener('change', changeTheme);
}
