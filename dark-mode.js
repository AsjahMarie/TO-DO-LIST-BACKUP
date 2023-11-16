/*
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
*/


// Just trying something out

function darkmode() {
    const wasDark = localStorage.getItem('darkmode') == 'true';
    localStorage.setItem('darkmode', !wasDark);
    const element = document.body;
    element.classList.toggle('dark-mode', !wasDark);
}

function onload(){
    document.body.classList.toggle('dark-mode', localStorage.getItem('darkmode') == 'true');
}
