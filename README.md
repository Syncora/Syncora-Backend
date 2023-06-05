# Syncora-Backend

## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for building APIs
- TBD: Database management system (e.g., MongoDB, PostgreSQL, MySQL)

## API Endpoints
- User Management:
  - `POST /api/users`: Register a new user
  - `POST /api/login`: Authenticate a user and generate an access token
  - `GET /api/users/:id`: Get user profile by ID

- Trivia Management:
  - `POST /api/trivia`: Create a new trivia game
  - `GET /api/trivia`: Get a list of active trivia games
  - `GET /api/trivia/:id`: Get trivia game details by ID
  - `POST /api/trivia/:id/join`: Join an existing trivia game by ID
  - `POST /api/trivia/:id/answer`: Submit an answer for a trivia question
  - `DELETE /api/trivia/:id`: Delete a trivia game and all associated data by ID


## Authentication
Syncora-Backend uses JSON Web Tokens (JWT) for user authentication.
