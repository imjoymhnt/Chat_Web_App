const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const router = require("./router");
const { addUser, removeUser, getUsersInRoom, getUser } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
corsOptions = {
  cors: true,
  origins: ["http://localhost:3000"],
};
const io = socketio(server, corsOptions);

io.on("connection", (socket) => {
  // console.log("We have a new connection!!");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
  });

  socket.on("disconnect", () => {
    console.log("User has left!!");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server is runnig on ${PORT}`));
