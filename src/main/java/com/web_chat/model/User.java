package com.web_chat.model;

import java.util.UUID;

public class User {
    private String userId;
    private String username;
    private String password;

    // ** THIS IS THE FIX **
    // The Jackson library requires a no-argument constructor to create an
    // instance of the class before it can populate the fields from the JSON.
    public User() {}

    // This constructor is for our own use, to create users in the code.
    public User(String username, String password) {
        this.userId = UUID.randomUUID().toString();
        this.username = username;
        this.password = password;
    }

    // --- Getters ---
    public String getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // --- Setters --
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

