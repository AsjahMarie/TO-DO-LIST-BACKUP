function showSignUpForm() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}

function showLoginForm() {
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

//for Calendar
document.addEventListener('DOMContentLoaded', function() {
    var calendar = $('#calendar').fullCalendar({
        // Existing options...

        // Add a callback function for eventDrop (if you want to allow event moving)
        eventDrop: function(event) {
            alert(event.title + ' was dropped on ' + event.start.format());
            // Handle event drop action (e.g., update event on drop)
        }
        // JavaScript to toggle dark mode
// Select all radio buttons with name 'theme'
const themeRadios = document.querySelectorAll('input[type="radio"][name="theme"]');

// Function to handle theme change
function changeTheme() {
    // Loop through each radio button
    themeRadios.forEach(radio => {
        if (radio.checked) {
            if (radio.value === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
}

// Add event listeners to radio buttons for theme change
themeRadios.forEach(radio => {
    radio.addEventListener('change', changeTheme);
});

