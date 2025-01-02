# Calendar Communication Management System

## Overview
This project is a **Customer Relationship Management (CRM) Communication Management System** designed to streamline communication tracking for companies. It allows users to:

- View companies and their communication details.
- Log communications by company name or ID.
- Highlight overdue and upcoming communications.
- Provide authentication and role-based access control (Admin/User).

The system is built using:

- **Frontend**: React with Material-UI
- **Backend**: Express.js with MongoDB
- **Authentication**: JWT (JSON Web Tokens)

---

## Features

### Authentication
- **Registration** for new users with roles (Admin/User).
- **Login** with JWT-based authentication.
- Middleware to verify token validity and restrict access based on roles.

### Company Management
- View all companies and their communication history.
- Add, update, and delete companies (Admin only).
- Log communications for companies by name or ID.

### Communication Tracking
- Highlight overdue communications in red.
- Highlight communications scheduled for today in yellow.
- Manage periodicity of communications and set reminders.

### Notifications
- Show notifications for overdue and upcoming communications.

---

## Installation

### Prerequisites
- Node.js (>= 14.x)
- MongoDB (local or cloud instance)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository.git
   cd crm-communication-management
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     MONGO_URI=mongodb://localhost:27017/crm
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. Start MongoDB server:
   ```bash
   mongod
   ```

5. Run the backend:
   ```bash
   cd backend
   npm start
   ```

6. Run the frontend:
   ```bash
   cd frontend
   npm start
   ```

---

## Project Structure

### Backend
- **`/models`**: Contains Mongoose models (`User`, `Company`).
- **`/routes`**: API endpoints for authentication, companies, and communications.
- **`server.js`**: Main server file.

### Frontend
- **`/src/components`**: React components (e.g., `Dashboard`, `CommunicationActionModal`, `Notifications`).
- **`/src/services`**: API service functions for backend communication.
- **`/src/pages`**: Pages such as `Login`, `Register`, and `Dashboard`.

---

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register`: Register a new user.
- `POST /login`: Authenticate a user and return a token.

### Companies (`/api/companies`)
- `GET /`: Fetch all companies.
- `POST /`: Add a new company (Admin only).
- `PUT /:id`: Update a company by ID (Admin only).
- `DELETE /:id`: Delete a company by ID (Admin only).
- `POST /log-by-name/:name`: Log communication for a company by name.

### Communications (`/api/communications`)
- `GET /overdue`: Fetch overdue communications.
- `GET /today`: Fetch today’s communications.

---

## Usage

### Register and Login
1. Access the app at `http://localhost:3000`.
2. Register as a new user or log in with an existing account.
3. Upon successful login, you will be redirected to the dashboard.

### Dashboard
1. View the list of companies and their communication details.
2. Highlighted rows indicate overdue or due-today communications.
3. Select companies and log new communications.

### Admin Features
1. Add, update, or delete companies.
2. Manage communication methods and periodicity.

---

## Dependencies

### Backend
- Express
- Mongoose
- Bcrypt
- JWT
- Dotenv

### Frontend
- React
- Material-UI
- Axios
- React Router

---

## Future Enhancements
- Implement advanced analytics for communication patterns.
- Add notifications via email or SMS.
- Improve UI with custom themes.

---

## License
This project is licensed under the MIT License.

---

## Contact
For questions or contributions, please contact **Chetan G Mundasad** at **mundasadchetan2706@gmail.com**.

