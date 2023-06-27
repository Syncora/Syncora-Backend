# Syncora-Backend
## Getting started
To get started with the Syncora-Backend, you need to have Node.js installed. You can download Node.js from the official website or click [here](https://nodejs.org/).

Once you have Node.js installed, you can clone this repository:
```
git clone https://github.com/Syncora/Syncora-Backend
cd syncora-backend
```

### Setting up MySQL database

1. **Install MySQL**

   Make sure you have MySQL installed on your machine. If not, you can download and install it from the official MySQL website or click [here](https://dev.mysql.com/downloads/).

2. **Run the setup.shell file**
3. **Update the .env file**
Open the `.env` file in a text editor and replace the values for `SQL_USERNAME` and `SQL_PASSWORD` with the appropriate MySQL credentials you created earlier when installing mysql.



# Dev
## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for building APIs
- TBD: Database management system (e.g., MongoDB, PostgreSQL, MySQL)

## API Endpoints
- User Management:
  - `POST /api/user`: Register a new user or create a guest user if no credentials are provided.
  - `POST /api/login`: Authenticate a user and generate an access token. For guest users, a temporary access token can be generated without requiring any credentials.
  - `GET /api/user/:id`: Get user profile by ID. This endpoint can return user details for registered users and generic details for guest users.

- Trivia Management:
  - `POST /api/trivia`: Create a new trivia game
  - `GET /api/trivia`: Get a list of active trivia games
  - `GET /api/trivia/:id`: Get trivia game details by ID
  - `DELETE /api/trivia/:id`: Delete a trivia game and all associated data by ID
- Trivia Session Management:
  - `POST /api/trivia/:id/start`: Start a trivia session for the specified trivia game ID
  - `POST /api/trivia/:id/join`: Join an existing trivia session by trivia game ID
  - `POST /api/trivia/:id/join/invite-code`: Join an existing trivia session by trivia game invite code
  - `POST /api/trivia/:id/answer`: Submit an answer for the current question in the trivia session
  - `GET /api/trivia/:id/question`: Get the current question for the trivia session
  - `GET /api/trivia/:id/scoreboard`: Get the scoreboard for the trivia session
  - `POST /api/trivia/:id/next`: Move to the next question in the trivia session
  - `POST /api/trivia/:id/end`: End the trivia session and calculate final scores


## Authentication
Syncora-Backend uses JSON Web Tokens (JWT) for user authentication.

## Database Schema
### User Schema
The user schema represents the structure of user data stored in the database. Note that a user can create and host a trivia game, while a guest can only join.
- `id`: Unique identifier for the user
- `type`: Whether its a user or guest
- `username`: User's username or display name
- `password`: Encrypted password for authentication
- `createdAt`: Timestamp for when the user account was created
- `updatedAt`: Timestamp for when the user account was last updated
- `avatar`: URL or file path to the user's profile picture
- `ownedTrivias`: Array of UUIDS representing the trivias owned/created by the user
For example:

```javascript
{
  id: 'user123',
  type: 'user',
  username: 'john_doe',
  password: 'hashedPassword123',
  createdAt: '2023-06-01T10:00:00.000Z',
  updatedAt: '2023-06-03T15:30:00.000Z',
  avatar: 'path/to/avatar',
  ownedTrivias: ['c769a982-8d43-4a36-a2b6-3c8c1e3f6b99', '61e09a25-6c23-48ed-8f41-2ff2fd045dc7', '2e7f3c34-79c2-4939-8e72-b2397dd5a48d']
}
```

### Guest Schema
The guest schema represents the structure of guest data temporarily stored. Note that a user can create and host a trivia game, while a guest can only join.
- `id`: Unique identifier for the guest
- `type`: Whether its a user or guest
- `username`: Guest's display name
For example:
```javascript
{
  id: 'guest123',
  type: 'guest',
  username: 'john_doe'
}
```

### Trivia Game Schema
The trivia game schema represents the structure of a trivia game stored in the database. This schema defines the format of the trivia game data that is persisted in the database.
- `id`: Unique identifier for the trivia game
- `title`: Title or name of the trivia game
- `category`: Category or theme of the trivia game
- `questions`: Array of trivia questions associated with the game
  - `id`: Unique identifier for the question
  - `timeLimit`: The time limit, in seconds, for how long the question is available to be answered
  - `text`: Text of the question
  - `options`: Array of possible answer options
  - `correctAnswer`: Index of the correct answer option
For example:

```javascript
{
  id: 'trivia123',
  title: 'Movie Trivia',
  category: 'Entertainment',
  questions: [
    {
      id: 'question1',
      timeLimit: 30,
      text: 'Who directed the movie "Inception"?',
      options: ['Christopher Nolan', 'Martin Scorsese', 'Steven Spielberg', 'Quentin Tarantino'],
      correctAnswer: 0
    },
    {
      id: 'question2',
      timeLimit: 30,
      text: 'Which actor played the character Iron Man in the Marvel Cinematic Universe?',
      options: ['Robert Downey Jr.', 'Chris Evans', 'Chris Hemsworth', 'Mark Ruffalo'],
      correctAnswer: 0
    },
    // Additional question objects...
  ]
}
```

### Trivia Session Schema
The trivia session schema represents the structure of a trivia session that is active and stored locally in memory. This schema defines the format of the trivia session data during the live session when players are connected and playing the game.
- `id`: Unqiue identifier for the trivia session
- `status`: The current status of the trivia session (e.g., "pending", "ongoing", "paused", "ended")
- `triviaGame`: Reference to the trivia game being played (using the Trivia Game Schema)
- `currentQuestionIndex`: The index of the current question being presented in the trivia session
- `players`: Array of connected players with their IDs, names, and scores
  - `id`: Unique identifier for the user
  - `username`: User's username or display name
  - `score`: User's current score for the trivia session
  - `isConnected`: A boolean flag indicating whether the user is currently connected to the trivia session
- `isPublic`: A boolean flag indicating whether the trivia game is publicly accessible or requires an invitation code to join
- `inviteCode`: A unique code or token that can be used to join a private trivia game
- `createdAt`: A timestamp when the session was created at
- `startedAt`: A timestamp when the session was started at
- `endedAt`: A timestamp when the session was ended at
- `host`: The ID of the user who is hosting the trivia session
- `hostSocket`: The WebSocket server address for the host user


For example:

```javascript
{
  "id": "session123",
  "status": "ongoing",
  "triviaGame": {
    "id": "trivia456",
    "title": "Movie Trivia",
    "category": "Entertainment",
    "questions": [
      {
        "id": "question1",
        "text": "Who directed the movie \"Inception\"?",
        "options": ["Christopher Nolan", "Martin Scorsese", "Steven Spielberg", "Quentin Tarantino"],
        "correctAnswer": 0
      },
      {
        "id": "question2",
        "text": "Which actor played the character Iron Man in the Marvel Cinematic Universe?",
        "options": ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"],
        "correctAnswer": 0
      }
    ]
  },
  "currentQuestionIndex": 0,
  "players": [
    {
      "id": "user123",
      "username": "Player1",
      "score": 0,
      "isConnected": true
    },
    {
      "id": "user456",
      "username": "Guest1",
      "score": 0,
      "isConnected": true
    }
  ],
  "isPublic": true,
  "inviteCode": "",
  "createdAt": "2023-06-05T10:30:00Z",
  "startedAt": "2023-06-05T10:32:00Z",
  "endedAt": null,
  "host": "user123",
  "hostSocket": "ws://localhost:3000"
}

```
