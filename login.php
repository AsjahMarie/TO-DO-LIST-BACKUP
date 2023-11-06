<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Database connection parameters
    $servername = "127.0.0.1";
    $db_username = "root";
    $db_password = "Asjah724!";
    $dbname = "userauthentication";

    // Establish the connection
    $conn = new mysqli($servername, $db_username, $db_password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL query
    $sql = "SELECT id, password FROM users WHERE username = ?";

    // Create a prepared statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();

    // Store the result
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        // Bind the fetched password
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();

        // Verify the entered password with the stored hashed password
        if (password_verify($password, $hashed_password)) {
            echo "Login successful!"; // Change this according to your application flow
            // Set session variables, redirect to home page, etc.
        } else {
            echo "Incorrect password!";
        }
    } else {
        echo "User not found!";
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
