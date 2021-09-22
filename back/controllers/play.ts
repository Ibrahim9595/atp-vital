import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameModel, GameState } from "../models/game-model";
import { ServerState } from "../models/server-state";

export const Play =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    state: ServerState
  ) =>
  async (change: any) => {
    const playerAndTeamAndNextPlayer = state.getPlayerAndTeamAndNextPlayer(
      socket.id
    );
    if (playerAndTeamAndNextPlayer !== null) {
      const {
        team,
        player: { userId },
        nextPlayer: { userId: nextUserId },
      } = playerAndTeamAndNextPlayer;

      const game: GameState = await GameModel.findOneQuery({
        team,
      });

      if (game.currentPlayer === userId) {
        await GameModel.update(
          {
            gameBoard: { ...game.gameBoard, ...change },
            currentPlayer: nextUserId,
          },
          { team }
        );

        io.to(team).emit("played", {
          ...game,
          gameBoard: { ...game.gameBoard, ...change },
          currentPlayer: nextUserId,
        });
      } else {
        io.to(team).emit("played", game);
      }
    }
  };
