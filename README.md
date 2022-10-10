# mysic API

## Get all songs
```
https://api-ibambe.onrender.com/api/all/songs
```

## Features

1. User can sign up
2. User can sign in
3. User can stream music

## API endpoints

1. `POST /api/signup`: Creates a new user
2. `POST /api/signin`: Logs in a user
3. `GET /api/all/songs`: Gets songs as JSON file

## Body Payload Specification

Signup expects

```js
{
    username: string,
    email: string,
    password: string
}
```

Signin expects

```js
{
    email: string,
    password: string
}
```

## Tools

- NodeJS/Express: Server
- MongoDB: Storage
- JWT: Token based authentication
- bcryptjs: Password security
- winston: Logs


## Available scripts

- `start`: Starts the server with node
- `start:dev`: Starts the server in watch mode

## Contribution Guidelines 🏗

Want to add your inputs to the repo? We invite you to contribute.

Head to [CONTRIBUTING.md](https://github.com/amos-kibet/mysic-api/blob/main/CONTRIBUTING.md) to start contributing.
