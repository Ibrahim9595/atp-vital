import { DB } from "../Database";

const db = async () => {
  return (await DB.connect()).collection("game");
};

const InitProject = async () => {
  const conn = await db();
  await conn.insertMany([
    {
      currentPlayer: 2,
      team: "team1",
      gameBoard: {
        stockOfMaterials: 6,
        manufacturing: 18,
        assembly: 16,
        stock: 1,
        goodsSold: 24,
        cash: 2,
        accounts: 12,
        RMP: 61,
        dividends: 0,
        equity: 1,
        interest: 6,
        liabilities: 59,
        taxes: 2,
      },
      updated_at: 1632350266244,
    },
    {
      currentPlayer: 3,
      gameBoard: {
        stockOfMaterials: 8,
        manufacturing: 5,
        assembly: 10,
        stock: 19,
        goodsSold: 24,
        cash: 10,
        accounts: 2,
        RMP: 60,
        dividends: 1,
        equity: 1,
        interest: 6,
        liabilities: 60,
        taxes: 2,
      },
      team: "team2",
      updated_at: 1632350045119,
    },
  ]);
};

InitProject().then(console.log).catch(console.error);
