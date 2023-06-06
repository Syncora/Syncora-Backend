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
  - `POST /api/trivia/:id/join/invite-code`: Join an existing trivia game by invite code
  - `POST /api/trivia/:id/answer`: Submit an answer for a trivia question
  - `DELETE /api/trivia/:id`: Delete a trivia game and all associated data by ID


## Authentication
Syncora-Backend uses JSON Web Tokens (JWT) for user authentication.

## Database Schema
### User Schema
The user schema represents the structure of user data stored in the database.
- `id`: Unique identifier for the user
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
  username: 'john_doe',
  password: 'hashedPassword123',
  createdAt: '2023-06-01T10:00:00.000Z',
  updatedAt: '2023-06-03T15:30:00.000Z',
  avatar: 'path/to/avatar',
  ownedTrivias: ['c769a982-8d43-4a36-a2b6-3c8c1e3f6b99', '61e09a25-6c23-48ed-8f41-2ff2fd045dc7', '2e7f3c34-79c2-4939-8e72-b2397dd5a48d']
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
  - `isHost`: A boolean flag indicating whether the user is the host of the trivia session
  - `isConnected`: A boolean flag indicating whether the user is currently connected to the trivia session
- `isPublic`: A boolean flag indicating whether the trivia game is publicly accessible or requires an invitation code to join
- `inviteCode`: A unique code or token that can be used to join a private trivia game
- `createdAt`: A timestamp when the session was created at
- `startedAt`: A timestamp when the session was started at


For example:

```javascript
{
  id: 'session123',
  status: 'ongoing',
  triviaGame: {
    id: 'trivia456',
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
      }
    ]
  },
  currentQuestionIndex: 1,
  players: [
    {
      id: 'player123',
      username: 'john_doe',
      score: 10,
      isHost: true,
      isConnected: true
    },
    {
      id: 'player456',
      username: 'jane_smith',
      score: 5,
      isHost: false,
      isConnected: true
    }
  ],
  isPublic: false,
  inviteCode: 'ABC123',
  createdAt: '2023-06-05T12:00:00.000Z',
  startedAt: '2023-06-05T12:10:00.000Z',
  endedAt: ''
}
```
