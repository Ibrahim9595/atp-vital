import "./index.css";

interface DotSpacerProps {
  dotsCount: number;
}

export const DotSpacer = ({ dotsCount }: DotSpacerProps) => (
  <div className="dot-spacer-wrapper">
    {new Array(dotsCount).fill(0).map((_, i) => (
      <div className="dot" key={i}></div>
    ))}
  </div>
);
