# ToDo App

This's a simple ToDo app writing in JavaScript with Nodejs, express, MongoDB, Vite + React and Socket.io.

# Cloning git repository

To download this project, clone the repository using Git.

```bash
git clone https://github.com/Yumiko0828/todo-app.git
```

## Installing dependencies

The project has a Back-end (`~/server`) and a Front-end (`~/client`).

```bash
cd <client or server> # To change de directory

npm install # If you're using NPM.
yarn install # If you're using YARN.
pnpm install # If you're using PNPM.
```

## Configuration

Rename `~/server/.env.example` to `~/server/.env` and enter your MongoDB URI, it should look like this:

```env
MONGODB_URI=<URI>
```

## Start app in development mode

First the Back-end.

```bash
cd server
npm run dev
```

Then the Front-end (in other terminal).

```bash
cd client
npm run dev
```

Check the output in your terminal.

## Start app in production mode

The Back-end.

```bash
npm start
```

To Build the Front-end.

```bash
cd client
npm run build
npm preview # To see a preview
```

# License

This project is licensed under the MIT license.
