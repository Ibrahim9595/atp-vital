import { GameBoardState, ValueChange } from "../../utils";
import { Addition } from "../additions";
import { CoinContainer } from "../coin-container";
import { DotSpacer } from "../dot-spacer";
import "./index.css";

interface GameProps {
  boardState: GameBoardState;
  onValueChange: (changes: ValueChange[]) => void;
}

export const Game = ({ boardState, onValueChange }: GameProps) => {
  return (
    <div className="game">
      <div className="wrapper">
        <div className="row-wrapper">
          <div className="row-left">
            <div className="production">
              <span className="title">Production</span>

              <div className="row">
                <CoinContainer
                  id="stockOfMaterials"
                  position="top"
                  title="Stock of materials"
                  value={boardState.stockOfMaterials}
                  radius={40}
                  onValueChange={onValueChange}
                />
                <DotSpacer dotsCount={10} />
                <CoinContainer
                  id="manufacturing"
                  position="bottom"
                  title="Manufacturing"
                  value={boardState.manufacturing}
                  radius={40}
                  onValueChange={onValueChange}
                />
                <DotSpacer dotsCount={5} />
                <CoinContainer
                  id="assembly"
                  position="bottom"
                  title="Assembly"
                  value={boardState.assembly}
                  radius={40}
                  onValueChange={onValueChange}
                />
                <DotSpacer dotsCount={5} />
                <CoinContainer
                  id="stock"
                  position="top"
                  title="Stock"
                  value={boardState.stock}
                  radius={40}
                  onValueChange={onValueChange}
                />
                <DotSpacer dotsCount={8} />
              </div>
            </div>
            <div className="cash-out">
              <div className="row">
                <DotSpacer dotsCount={12} />
                <CoinContainer
                  id="cash"
                  position="bottom"
                  title="Cash"
                  value={boardState.cash}
                  radius={40}
                  onValueChange={onValueChange}
                />
                <DotSpacer dotsCount={12} />

                <CoinContainer
                  id="accounts"
                  position="bottom"
                  title="Accounts"
                  value={boardState.accounts}
                  radius={40}
                  onValueChange={onValueChange}
                />
                <DotSpacer dotsCount={15} />
              </div>
            </div>
          </div>
          <div className="row-right">
            <div className="production-out">
              <CoinContainer
                id="goodsSold"
                position="top"
                title="Goods sold"
                value={boardState.goodsSold}
                radius={40}
                onValueChange={onValueChange}
              />
            </div>
            <div className="cash-in">
              <CoinContainer
                id="RMP"
                position="bottom"
                title="RMP"
                value={boardState.RMP}
                radius={40}
                onValueChange={onValueChange}
              />
            </div>
          </div>
        </div>
        <div className="bottom-wrapper">
          <Addition
            title="OWNERS"
            container1={{
              id: "dividends",
              title: "Dividends",
              value: boardState.dividends,
              onValueChange,
            }}
            container2={{
              id: "equity",
              title: "Equity",
              value: boardState.equity,
              onValueChange,
            }}
            color="#DA2C74"
          />
          <Addition
            title="LENDERS"
            container1={{
              id: "interest",
              title: "Interest",
              value: boardState.interest,
              onValueChange,
            }}
            container2={{
              id: "liabilities",
              title: "Liabilities",
              value: boardState.liabilities,
              onValueChange,
              invert: true,
            }}
            color="#CB58A2"
          />
          <Addition
            title="THE COMMUNITY"
            container1={{
              id: "taxes",
              title: "Taxes",
              value: boardState.taxes,
              onValueChange,
            }}
            color="#CB58A2"
          />
        </div>
      </div>
    </div>
  );
};
