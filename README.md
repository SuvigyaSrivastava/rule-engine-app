# Rule Engine with AST

This project is a simple 3-tier rule engine application designed to determine user eligibility based on attributes such as age, department, salary, experience, etc. The system uses Abstract Syntax Trees (ASTs) to represent conditional rules and allows for the dynamic creation, combination, and evaluation of these rules.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Backend API Endpoints](#backend-api-endpoints)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [License](#license)

## Technologies Used
- Node.js
- Express.js
- React.js
- MongoDB
- Mongoose
- Axios
- Material UI

## Project Structure
rule-engine-app/
│
├── backend/
│   ├── controllers/       # Contains the logic for handling requests
│   ├── models/            # Database schemas (Mongoose models)
│   ├── routes/            # Defines the API routes for rules and users
│   ├── utils/             # Utility functions (e.g., AST processing)
│   ├── validators/        # Validation logic for rules
│   ├── index.js           # Entry point for the backend server
│   └── .env               # Environment variables for the backend
│
├── frontend/
│   ├── src/               # Contains React components and logic
│   ├── public/            # Public files such as index.html
│   ├── .env               # Environment variables for the frontend
│   ├── package.json       # Frontend dependencies and scripts
│   └── README.md          # Readme for the frontend (if separate)
│
└── README.md              # Project's main README file


## Features
- **Rule Creation**: Create rules with logical operators (AND, OR) and conditions.
- **Rule Combination**: Combine multiple rules into a single AST for complex decision-making.
- **Rule Evaluation**: Evaluate rules against user data to determine eligibility.
- **User Management**: Create and manage user data for rule evaluation.
- **UI**: Simple user-friendly interface built using React and Material UI.
- **Backend**: REST API using Node.js, Express, and MongoDB.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (or a hosted MongoDB solution like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

### Steps: 
Clone the repository
```   
git clone https://github.com/<your-username>/rule-engine-app.git
cd rule-engine-app


Step 2: Backend Setup
Go to the backend directory:

   

cd backend
Install the backend dependencies:

   

npm install
Create a .env file in the backend folder with the following environment variables:

makefile

MONGO_URI=<your-mongodb-connection-string>
PORT=5002
Start the backend server:

   

npm start
Step 3: Frontend Setup
Go to the frontend directory:

   

cd ../frontend
Install the frontend dependencies:

   

npm install
Create a .env file in the frontend folder with the following content (replace <API_URL> with your backend URL):

makefile

REACT_APP_API_URL=<your-backend-url>
Start the frontend:

   

npm start
Backend API Endpoints
1. Create Rule
Endpoint: POST /api/rules/create
Payload:
json

{
  "name": "Age and Salary Rule",
  "ruleString": "age > 30 AND salary > 50000"
}
2. Combine Rules
Endpoint: POST /api/rules/combine
Payload:
json

{
  "rules": ["age > 30 AND salary > 50000", "experience > 5 OR department = 'Sales'"]
}
3. Evaluate Rule
Endpoint: POST /api/rules/evaluate
Payload:
json

{
  "ruleAST": { /* AST for combined rules */ },
  "data": { "age": 35, "salary": 45000, "experience": 5 }
}
4. Create User
Endpoint: POST /api/users/create
Payload:
json

{
  "name": "John Doe",
  "age": 30,
  "salary": 50000,
  "department": "Sales",
  "experience": 5
}
5. Get All Users
Endpoint: GET /api/users
6. Update Rule
Endpoint: PUT /api/rules/:id
Payload:
json

{
  "name": "Updated Rule",
  "ruleString": "age > 40 AND salary > 60000"
}
Running the Application
Backend: The backend will run on port 5002 (or as defined in .env).
   

cd backend
npm start
Frontend: The frontend will run on port 3000 (or as defined in .env).
   

cd frontend
npm start
Environment Variables
Both the backend and frontend require environment variables to work correctly:

Backend (backend/.env):

makefile

MONGO_URI=<your-mongodb-uri>
PORT=5002
Frontend (frontend/.env):

arduino

REACT_APP_API_URL=https://your-backend-url.onrender.com






