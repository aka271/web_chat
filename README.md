# Direct User-to-User Chat Application
This is a simple, real-time chat application that allows users to register, log in, and have private conversations with other users. It is built with a Java backend and a plain HTML, CSS, and JavaScript frontend.

## Features
- User Authentication: Secure user registration and login system.
- User List: View a list of all registered users. (Future enhancement: show online status).
- Private Messaging: Click on a user to open a private chat window.
- Real-Time Communication: Messages are delivered instantly between users using WebSockets.

## Technology Stack
### Backend:

- Java 11 (or newer)
- Javalin: A lightweight web framework for the REST API and WebSocket handling.
- Maven: For project build and dependency management.

### Frontend:

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

## How to Run This Project
To get this project running locally, follow these steps.

**Prerequisites**
- Java Development Kit (JDK): Version 11 or higher.
- Apache Maven: Make sure Maven is installed and configured on your system.
- A modern web browser (like Chrome, Firefox, or Edge).

**1. Clone the Repository**
```bash
git clone <your-repository-url>
cd <repository-folder>
```

**2. Run the Backend Server**
1. Open a terminal in the root directory of the project.
2. Compile the project and download all the necessary dependencies using Maven:
```bash
mvn compile
```
3. Run the main application class to start the server:
```bash
mvn exec:java -Dexec.mainClass="com.yourusername.chatapp.App"
```

4. If successful, you will see a message in the console indicating that the server has started (e.g., Server has started on port 7070!). The backend is now running and ready to accept connections.

**3. Launch the Frontend**
1. Navigate to the src/main/resources/static/ directory in your project folder.
2. Open the index.html file directly in your web browser.
3. The registration/login page should appear, and you can start using the application.

## API Endpoints
The backend exposes the following REST endpoints for user management:

- `POST /api/register`
    - **Description:** Registers a new user.
    - **Body (JSON):** { "username": "your_username", "password": "your_password" }
- `POST /api/login`
  - **Description:** Logs in an existing user.
  - **Body (JSON):** { "username": "your_username", "password": "your_password" }
- `GET /api/users`
  - **Description:** Retrieves a list of all registered users.