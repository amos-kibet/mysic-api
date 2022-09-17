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
- winston/morgan: Logs
- Joi: Validations

## Available scripts

- `start`: Starts the server with node
- `start:dev`: Starts the server in watch mode

## Getting started

You can either fork this repository or clone it by starting your terminal, then change the directory to where you would like to save it and run

```sh
git clone https://github.com/amos-kibet/mysic-api.git
```

Change to the newly downloaded directory with

```sh
cd mysic-api
```

Rename the file named `.env.example` to `.env` and update the variable values with valid ones

Install the required dependencies with

```sh
npm install
```

Start the app with

```sh
npm start
```

You can also start it in watch mode with

```sh
npm run start:dev
```
