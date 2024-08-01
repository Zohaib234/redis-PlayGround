# Redis-PlayGround

This project demonstrates CRUD operations using Redis and MongoDB in a Node.js Express application. The application follows the MVC pattern and includes caching responses in Redis to improve performance.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/redis-PlayGround.git
    cd redis-PlayGround
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start MongoDB:**
    Ensure MongoDB is running on your local machine. You can start MongoDB using:
    ```sh
    mongod
    ```

4. **Configure Redis:**
    Make sure Redis is installed and running on your local machine. You can start Redis using:
    ```sh
    redis-server
    ```

5. **Run the application:**
    ```sh
    npm start
    ```

## Usage

- The server will start on `http://localhost:3000`.
- Use tools like Postman or cURL to interact with the API.

## Project Structure

redis-PlayGround/
├── node_modules/
├── src/
│ ├── controllers/
│ │ └── studentController.js
│ ├── models/
│ │ └── student.js
│ ├── routes/
│ │ └── studentRoutes.js
│ ├── middleware/
│ │ └── connect_redis.js
│ ├── app.js
│ └── server.js
├── package.json
└── README.md

## Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database.
Mongoose: MongoDB object modeling tool.
Redis: In-memory data structure store.
Redis Client: Used to interact with Redis from Node.js.
MVC Pattern: Architectural pattern for separating concerns.

## License
This project is licensed under the MIT License.