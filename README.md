# Construction & Co. - Full Stack Application

This project is a full-stack web application for a construction company, consisting of a responsive Landing Page and a functional Admin Panel.

## Project Structure

The project is divided into two main folders:

*   **`frontend/`**: The client-side application (HTML, CSS, JavaScript, Vite).
*   **`backend/`**: The server-side API and database logic (Node.js, Express, MongoDB).

---

## 1. Backend Setup

The backend connects to the MongoDB database and serves the API endpoints.

### Prerequisites
*   Node.js installed
*   MongoDB installed locally OR a MongoDB Atlas account

### Installation
1.  Open your terminal and navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```

### Configuration
*   By default, the app connects to a local MongoDB instance (`mongodb://localhost:27017/construction_db`).
*   **For Cloud Deployment (Atlas):** Set the `MONGO_URI` environment variable in your deployment platform to your connection string.

### Running the Server
Start the backend server:
```bash
npm start
```
*   The server will start on **Port 5000**.
*   Console output should show: `Server running on port 5000` and `MongoDB Connected`.

---

## 2. Frontend Setup

The frontend is built with Vite for a fast development experience.

### Installation
1.  Open a new terminal window and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App
Start the development server:
```bash
npm run dev
```
*   Click the link shown in the terminal (e.g., `http://localhost:5173`) to open the app.

---

## API Endpoints

The backend provides the following RESTful API routes:

*   **Projects**: `GET /api/projects`, `POST /api/projects`, `DELETE /api/projects/:id`
*   **Clients**: `GET /api/clients`, `POST /api/clients`, `DELETE /api/clients/:id`
*   **Contact**: `GET /api/contact`, `POST /api/contact`
*   **Subscribers**: `GET /api/subscribers`, `POST /api/subscribers`

## Technologies Used

*   **Frontend**: HTML5, CSS3, JavaScript, Vite
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB, Mongoose
