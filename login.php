<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Connect to your MySQL database
    $conn = new mysqli("localhost", "username", "password", "your_db");

    $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($query);

    if ($result->num_rows == 1) {
        // Valid login, redirect to home page
        $_SESSION['username'] = $username;
        header("Location: homepage.html");
        exit();
    } else {
        echo "Invalid username or password.";
    }
}
?>
