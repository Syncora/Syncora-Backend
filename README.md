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

### Trivia Schema
The trivia schema represents the structure of trivia game data stored in the database.
- `id`: Unique identifier for the trivia game
- `title`: Title or name of the trivia game
- `category`: Category or theme of the trivia game
- `questions`: Array of trivia questions associated with the game
  - `id`: Unique identifier for the question
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
      text: 'Who directed the movie "Inception"?',
      options: ['Christopher Nolan', 'Martin Scorsese', 'Steven Spielberg', 'Quentin Tarantino'],
      correctAnswer: 0
    },
    {
      id: 'question2',
      text: 'Which actor played the character Iron Man in the Marvel Cinematic Universe?',
      options: ['Robert Downey Jr.', 'Chris Evans', 'Chris Hemsworth', 'Mark Ruffalo'],
      correctAnswer: 0
    },
    // Additional question objects...
  ]
}
```
