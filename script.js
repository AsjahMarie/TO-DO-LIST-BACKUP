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
            function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save user preference to local storage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('isDarkMode', isDarkMode);
}

// Check the user's preference from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
});


