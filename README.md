Rule Engine with AST
This project is a simple 3-tier rule engine application designed to determine user eligibility based on attributes such as age, department, salary, experience, etc. The system uses Abstract Syntax Trees (ASTs) to represent conditional rules and allows for the dynamic creation, combination, and evaluation of these rules.

Table of Contents
Technologies Used
Project Structure
Features
Installation
Backend API Endpoints
Running the Application
Environment Variables
License
Technologies Used
Node.js
Express.js
React.js
MongoDB
Mongoose
Axios
Material UI
Project Structure
scss
 
rule-engine-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   ├── index.js
│   └── .env (Environment variables)
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env (Environment variables for frontend)
│   ├── package.json
│   └── README.md
│
└── README.md
Features
Rule Creation: Create rules with logical operators (AND, OR) and conditions.
Rule Combination: Combine multiple rules into a single AST for complex decision-making.
Rule Evaluation: Evaluate rules against user data to determine eligibility.
User Management: Create and manage user data for rule evaluation.
UI: Simple user-friendly interface built using React and Material UI.
Backend: REST API using Node.js, Express, and MongoDB.
Installation
Prerequisites
Node.js
MongoDB (or a hosted MongoDB solution like MongoDB Atlas)
Git
Step 1: Clone the repository
bash

git clone https://github.com/<your-username>/rule-engine-app.git
cd rule-engine-app
Step 2: Backend Setup
Go to the backend directory:

bash
 
cd backend
Install the backend dependencies:

bash
 
npm install
Create a .env file in the backend folder with the following environment variables:

bash
 
MONGO_URI=<your-mongodb-connection-string>
PORT=5002
Start the backend server:

bash
 
npm start
Step 3: Frontend Setup
Go to the frontend directory:

bash
 
cd ../frontend
Install the frontend dependencies:

bash
 
npm install
Create a .env file in the frontend folder with the following content (replace <API_URL> with your backend URL):

bash
 
REACT_APP_API_URL=<your-backend-url>
Start the frontend:

bash
 
npm start
Backend API Endpoints
1. Create Rule
POST /api/rules/create
Payload:
json
 
{
  "name": "Age and Salary Rule",
  "ruleString": "age > 30 AND salary > 50000"
}
2. Combine Rules
POST /api/rules/combine
Payload:
json
 
{
  "rules": ["age > 30 AND salary > 50000", "experience > 5 OR department = 'Sales'"]
}
3. Evaluate Rule
POST /api/rules/evaluate
Payload:
json
 
{
  "ruleAST": { /* AST for combined rules */ },
  "data": { "age": 35, "salary": 45000, "experience": 5 }
}
4. Create User
POST /api/users/create
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
GET /api/users
6. Update Rule
PUT /api/rules/:id
Payload:
json
 
{
  "name": "Updated Rule",
  "ruleString": "age > 40 AND salary > 60000"
}
Running the Application
Backend: The backend will run on port 5002 (or as defined in .env).

bash
 
cd backend
npm start
Frontend: The frontend will run on port 3000 (or as defined in .env).

bash
 
cd frontend
npm start
Environment Variables
Both the backend and frontend require environment variables to work correctly:

Backend (backend/.env)
bash
 
MONGO_URI=<your-mongodb-uri>
PORT=5002
Frontend (frontend/.env)
bash
 
REACT_APP_API_URL=https://your-backend-url.onrender.com
