import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameModel } from "../models/game-model";
import { ServerState } from "../models/server-state";

export const StartGame =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    state: ServerState
  ) =>
  async ({ userId, team }: { userId: number; team: number }) => {
    const added = state.addPlayer(
      { socketId: socket.id, userId },
      `team${team}`
    );

    if (added) {
      const game = await GameModel.findOneQuery({ team: `team${team}` });
      socket.join(`team${team}`);
      io.to(`team${team}`).emit("game-started", game);
    } else {
      console.log("Error");
      socket.emit("error", "Wrong team");
    }
  };
