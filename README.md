# Todo App - User-Specific Tasks

A Node.js/Express todo application with user authentication where each user has their own private todo list.

## Features

✅ **User Authentication** - Sign up and login functionality
✅ **User-Specific Todos** - Each user sees only their own tasks
✅ **CRUD Operations** - Create, Read, Update, Delete todos
✅ **Security** - Users cannot access other users' todos
✅ **Responsive Design** - Works on desktop and mobile
✅ **MongoDB Database** - Persistent data storage

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS Templates
- **Database**: MongoDB
- **Authentication**: Session-based with user context
- **Styling**: CSS3 with responsive design

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
MONGOURI=your_mongodb_connection_string
PORT=8004
```

## Running Locally

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Visit `http://localhost:8004` in your browser.

## Project Structure

```
├── controller/        # Request handlers
├── Database/          # Database connection
├── model/            # MongoDB schemas
├── routes/           # API routes
├── views/            # EJS templates
├── context/          # User context management
├── index.js          # Main server file
└── package.json      # Dependencies
```

## Usage

1. **Sign Up**: Create a new account at `/signup`
2. **Login**: Log in with your credentials
3. **Add Todo**: Enter title and description, click "Add Task"
4. **Mark Complete**: Check the checkbox to mark a task as done
5. **Edit Todo**: Click the edit icon to modify a task
6. **Delete Todo**: Click the × button to remove a task
7. **Logout**: Click the logout button to sign out

## Deployment

### Render.com (Recommended)

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

Quick steps:
1. Push to GitHub
2. Sign up at [Render.com](https://render.com)
3. Connect your GitHub repository
4. Add `MONGOURI` environment variable
5. Deploy

## API Endpoints

- `GET /` - Home page
- `GET /signup` - Signup page
- `GET /login` - Login page
- `POST /user/signup` - Create new user
- `POST /usersLogin` - User login
- `GET /logout` - Logout user
- `GET /todo` - Get all todos for logged-in user
- `POST /addtodo` - Create new todo
- `POST /deletetodo/:id` - Delete a todo
- `POST /updatetodo/:id` - Update todo completion status
- `GET /edit-todo/:id` - Edit todo page
- `POST /edit-todo/:id` - Update todo details

## Security Features

- MongoDB ObjectId used for user-todo relationship
- User authorization checks on all todo operations
- User context prevents unauthorized access
- Password stored in database (consider hashing in production)

## Future Enhancements

- Add password hashing with bcryptjs
- Implement JWT authentication
- Add email verification
- Add todo categories/tags
- Add due dates
- Implement reminders
- Add collaboration features

## License

ISC

## Author

Akenne Dev
