package com.web_chat;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.web_chat.model.User;
import io.javalin.Javalin;


public class App 
{

    private static Map<String, User> users = new ConcurrentHashMap<>();

    public static void main( String[] args )
    {
        int port = 7070; // Default port
        String host = "localhost"; // Default host
        users.put("admin", new User("admin", "admin", "admin@admin.com"));

        // Create and configure the Javalin server instance
        Javalin app = Javalin.create(config -> {
            config.staticFiles.add("/static");
        }).start(7070);

        System.out.println("Server started on http://" + host + ":" + port + "!");


        app.post("/api/register", ctx -> {
            String username = ctx.formParam("username");
            String password = ctx.formParam("password");
            String email = ctx.formParam("email");

            if (username == null || password == null || email == null ||
                username.isEmpty() || password.isEmpty() || email.isEmpty()) {
                ctx.status(400).result("All fields are required.");
                return;
            }

            if (users.containsKey(username)) {
                ctx.status(400).result("Username already exists.");
                return;
            }

            User newUser = new User(username, password, email);
            users.put(username, newUser);
            System.out.println("Registered new user: " + username + ", Email: " + email);

            ctx.status(200).result("User registered successfully!");
        });

        app.post("/api/login", ctx -> {
            String username = ctx.formParam("username");
            String password = ctx.formParam("password");

            if (username == null || password == null ||
                username.isEmpty() || password.isEmpty()) {
                ctx.status(400).result("Username and password are required.");
                return;
            }

            User user = users.get(username);
            if (user == null || !user.getPassword().equals(password)) {
                ctx.status(401).result("Invalid username or password.");
                return;
            }

            System.out.println("User logged in: " + username);
            ctx.status(200).result("Login successful!");
        });


    }
}
