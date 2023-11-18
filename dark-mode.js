// dark-mode.js
/*
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
document.addEventListener('DOMContentLoaded', function(){
    var themeMode = localStorage.getItem('modeCheckbox') === 'true';
    var bodyTheme = localStorage.getItem()

    document.getElementById('darkMode').checked = themeMode;
});

function changeMode(){
    const body = document.body;
    const checkbox = document.getElementById('darkMode');

    if(checkbox.checked){
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }

    localStorage.setItem('modeCheckbox', checkbox.checked);
    

}
