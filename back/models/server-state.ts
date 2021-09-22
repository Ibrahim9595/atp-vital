export interface Player {
  userId: number;
  socketId: string;
}

export interface IServerState {
  team1: Player[];
  team2: Player[];
}

export class ServerState {
  private static instance: ServerState | null = null;

  private state: IServerState;

  private constructor() {
    this.state = {
      team1: [],
      team2: [],
    };
  }

  addPlayer(player: Player, team: string) {
    const selectedTeam = this.state[team as keyof IServerState];
    const oldPlayer = selectedTeam.find(
      (el: Player) => el.userId === player.userId
    );

    if (
      selectedTeam &&
      (selectedTeam.length === 2 || oldPlayer) &&
      ![1, 2, 3, 4].includes(player.userId)
    )
      return false;

    selectedTeam.push(player);

    return true;
  }

  getPlayerAndTeamAndNextPlayer(socketId: string) {
    const userInTeam1 = this.state.team1.find((el) => el.socketId === socketId);
    const userInTeam2 = this.state.team2.find((el) => el.socketId === socketId);

    if (userInTeam1)
      return {
        team: "team1",
        player: userInTeam1,
        nextPlayer: this.state.team1.find((el) => el.socketId !== socketId) || {
          userId: userInTeam1.userId === 1 ? 2 : 1,
          socketId: null,
        },
      };
    else if (userInTeam2)
      return {
        team: "team2",
        player: userInTeam2,
        nextPlayer: this.state.team2.find((el) => el.socketId !== socketId) || {
          userId: userInTeam2.userId === 3 ? 4 : 3,
          socketId: null,
        },
      };
    else return null;
  }

  removePlayer(socketId: string) {
    const team1Index = this.state.team1.findIndex(
      (el) => el.socketId === socketId
    );
    const team2Index = this.state.team2.findIndex(
      (el) => el.socketId === socketId
    );
    if (team1Index !== -1) this.state.team1.splice(team1Index, 1);
    if (team2Index !== -1) this.state.team2.splice(team2Index, 1);
  }

  getSate() {
    return {
      team1: this.state.team1.map((el) => ({ userId: el.userId })),
      team2: this.state.team2.map((el) => ({ userId: el.userId })),
    };
  }

  static getInstance() {
    if (this.instance === null) {
      this.instance = new ServerState();
    }

    return this.instance;
  }
}
