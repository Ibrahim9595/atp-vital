import { Server } from "socket.io";
import { Play } from "./controllers/play";
import { StartGame } from "./controllers/start-game";
import { ServerState } from "./models/server-state";

const io = new Server({
  cors: {
    allowedHeaders: "*",
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  const state = ServerState.getInstance();
  socket.on("start-game", StartGame(io, socket, state));
  socket.on("play", Play(io, socket, state));
  socket.on("disconnect", () => {
    state.removePlayer(socket.id);
  });
});

io.listen(5000);
