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
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

toggleSwitch.addEventListener('change', switchTheme);
    });
});

