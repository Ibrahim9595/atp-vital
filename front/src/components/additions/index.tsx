import { CoinContainerProps } from "../../utils";
import { CoinContainer } from "../coin-container";
import "./index.css";

interface AdditionProps {
  title: string;
  color: string;
  container1: Omit<CoinContainerProps, "radius" | "position">;
  container2?: Omit<CoinContainerProps, "radius" | "position">;
}

export const Addition = ({
  title,
  container1,
  container2,
  color,
}: AdditionProps) => (
  <div className="addition-wrapper" style={{ backgroundColor: color }}>
    <p className="title">{title}</p>
    <div className="coin-containers-row">
      <CoinContainer
        id={container1.id}
        onValueChange={container1.onValueChange}
        value={container1.value}
        title={container1.title}
        invert={container1.invert}
        radius={20}
        bolder={true}
        position="bottom"
      />
      {container2 && (
        <CoinContainer
          id={container2.id}
          onValueChange={container2.onValueChange}
          value={container2.value}
          title={container2.title}
          invert={container2.invert}
          radius={20}
          bolder={true}
          position="bottom"
        />
      )}
    </div>
  </div>
);
