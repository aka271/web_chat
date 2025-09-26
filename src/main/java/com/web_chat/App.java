package com.web_chat;

import com.web_chat.model.User;

import io.javalin.Javalin;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Scanner;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import java.io.InputStream;
import java.util.Scanner;
import java.nio.charset.StandardCharsets;

public class App {

    private static Map<String, User> users = new ConcurrentHashMap<>();

    public static void main(String[] args) {
        int port = 7070; // Default port
        String host = "localhost"; // Default host
        users.put("admin", new User("admin", "admin"));
        System.out.println("Admin created.");

        // Create and configure the Javalin server instance
        Javalin app = Javalin.create(config -> {
            config.staticFiles.add("/static");
        }).start(port);

        System.out.println("Server started on http://" + host + ":" + port + "!");

        app.post("/api/register", ctx -> {
            User newUser = ctx.bodyAsClass(User.class); // Read user data from JSON body
            if (users.containsKey(newUser.getUsername())) {
                ctx.status(400).result("Username already exists");
            } else {
                User userToSave = new User(newUser.getUsername(), newUser.getPassword());
                users.put(userToSave.getUsername(), userToSave);
                ctx.status(201).result("User registered successfully");
                System.out.println("User registered: " + userToSave.getUsername());
            }
        });

        app.post("/api/login", ctx -> {
            User loginAttempt = ctx.bodyAsClass(User.class); // Read user data from JSON body
            System.out.println("Login attempt for user: " + loginAttempt.getUsername());

            User storedUser = users.get(loginAttempt.getUsername());

            if (storedUser != null && storedUser.getPassword().equals(loginAttempt.getPassword())) {
                ctx.status(200).result("Login successful");
            } else {
                ctx.status(401).result("Invalid username or password");
            }
        });

        app.get("/chat", ctx -> {
            try (InputStream inputStream = App.class.getResourceAsStream("/static/chat.html")) {
                if (inputStream != null) {
                    // Use a Scanner to read the InputStream into a String
                    Scanner scanner = new Scanner(inputStream, StandardCharsets.UTF_8.name()).useDelimiter("\\A");
                    String htmlContent = scanner.hasNext() ? scanner.next() : "";
                    ctx.html(htmlContent);
                } else {
                    ctx.status(404).result("Not Found");
                }
            }
        });

        app.get("/api/users", ctx -> {
            // We must remove password data before sending user info to the client
            var publicUsers = users.values().stream()
                .map(user -> {
                    // Create a new user object for transfer that doesn't include the password
                    User publicUser = new User();
                    publicUser.setUsername(user.getUsername());
                    // We don't set the password
                    return publicUser;
                })
                .collect(Collectors.toList());
            
            ctx.json(publicUsers);
            System.out.println("Sent user list to a client.");
        });

    }
}
