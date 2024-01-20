# EduRate: Feedback Tool

## Introduction

Welcome to the EduRate...
The web application "EduRate" aims to enable speakers to easily obtain feedback from the audience by first creating an entry for the respective event and then retrieving a QR code that takes the audience to a rating page.
The application only runs locally for the time being: To start the application, it is necessary to start the server (server.js) with the command "npm start". The React frontend runs with "Vite" and can be started with the command "npm run dev". Finally, the console displays the localhost URL under which the web pages can be called up in the browser.

## How to install and run EduRate

After cloning the repository on your local machine, run:

```
npm install
```

then navigate to /backend and do the same:

```
cd backend
npm install
```

For the Database connection, create a file called .env.local in /backend and copy following code to it:

```ruby
MONGODB_URI=
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

To start the react app run:

```
npm run dev
```

To start the backend server run from the backend directory:

```
npm start
```

You can now connect to EduRate via http://localhost:5173/eduRate/login

## How to use EduRate

## Authors

- **Damisch Elias** - _Coordinator_
- **Falter Lisa** - _Lead Designer_
- **Fasching Alexander** - _Lead Developer_
