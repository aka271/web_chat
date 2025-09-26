package com.web_chat;

import com.web_chat.model.User;
import io.javalin.Javalin;


public class App 
{
    public static void main( String[] args )
    {
        int port = 7070; // Default port
        String host = "localhost"; // Default host

        // Create and configure the Javalin server instance
        Javalin app = Javalin.create(config -> {
            config.staticFiles.add("/static");
        }).start(7070);

        System.out.println("Server started on http://" + host + ":" + port + "!");

    }
}
