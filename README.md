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

## MoSCow Criteria

### Must requirements

1. The system shall provide the lecturer with the ability to create a new lecture entry. The system shall create a new lecture URL for each lecture entry.
1. The system shall provide the audience member with the ability to access the feedback page via a given lecture URL.
1. The system shall provide the audience member with the ability to write feedback for the lecturer.
1. The system shall provide the lecturer with the ability to display a list of their lecture entries.
1. The system shall provide the lecturer with the ability to display the feedback for each of his/her own lectures.

### Should requirements

1. The system should provide the lecturer with the ability to log into their lecturer account.
1. The system should provide the lecturer with the ability to receive an average rating on predefined aspects.
1. The system should provide a QR code corresponding to the lecture URL. The system should provide the audience member with the ability to rate the lecturer on predefined aspects.

### Could requirements

1. The system could provide the lecturer with the ability to display the total average ratings.
1. The system could provide the administrator with the ability to display the feedback and ratings of all lecturers.

### Won’t requirements

1. The system will not be compatible with any existing appointment management tools used by the ÖH.

## Authors

- **Damisch Elias** - _Coordinator_
- **Falter Lisa** - _Lead Designer_
- **Fasching Alexander** - _Lead Developer_
