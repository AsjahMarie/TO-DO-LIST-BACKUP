document.addEventListener('DOMContentLoaded', function(){
    //checks if the dark mode preference is stored

    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    //applies dark mode if the preference is true

    if(isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    //toggles dark mode on button click
    
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.top = '10px';
    darkModeToggle.style.right = '10px';

    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', function(){

        //toggle dark mode class
    document.body.classList.toggle('dark-mode');

        //Updates and Stores the Preference

     const currentMode = document.body.classList.contains('dark-mode');

     localStorage.setItem('darkMode', currentMode.toString());

        //Update button text
     darkModeToggle.textContent = currentMode ? 'Light Mode' : 'Dark Mode';  
    });      
});
