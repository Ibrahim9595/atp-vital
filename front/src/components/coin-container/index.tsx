import { useState } from "react";
import { ConnectDragSource, useDrag, useDrop } from "react-dnd";
import {
  CoinContainerProps,
  DraggableTypes,
  DraggedItem,
  DroppedTarget,
} from "../../utils";
import "./index.css";

interface CoinProps {
  radius: number;
  value: number;
  invert?: boolean;
  dragRef?: ConnectDragSource;
  isAbsolute?: boolean;
  isDragging?: boolean;
  dragValueChanged?: (value: number) => void;
}

const getBackgroundColor = (value: number, invert?: boolean) =>
  value === 0 ? "#939393" : invert ? "#000000" : "white";

const Coin = ({
  radius,
  invert,
  value,
  dragRef,
  isAbsolute,
  isDragging,
  dragValueChanged,
}: CoinProps) => {
  const handleDragStart = (value: number) => (e: any) => {
    e.stopPropagation();
    if (dragValueChanged) dragValueChanged(value);
  };
  return (
    <div
      onMouseDown={handleDragStart(value)}
      ref={dragRef}
      className="coin-container"
      style={{
        position: isAbsolute ? "absolute" : "relative",
        zIndex: isDragging ? -1 : 2,
        width: `${radius}px`,
        height: `${radius}px`,
        backgroundColor: getBackgroundColor(value, invert),
        color: invert ? "white" : "black",
        opacity: value === 0 ? 0.25 : 1,
      }}
    >
      <span onMouseDown={handleDragStart(1)}>{value > 0 ? value : ""}</span>
    </div>
  );
};

export const CoinContainer = ({
  id,
  title,
  radius,
  value,
  bolder,
  invert,
  position,
  onValueChange,
}: CoinContainerProps) => {
  const [draggedValue, setDraggedValue] = useState(0);
  const [hoveredValue, setHoveredValue] = useState(0);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DraggableTypes.Coin,
    drop: () => ({ id, value }),
    hover: (item: DraggedItem) => {
      setHoveredValue(item.value);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DraggableTypes.Coin,
      item: { id, value: draggedValue },
      end: (item, monitor) => {
        setDraggedValue(0);
        const dropResult = monitor.getDropResult<DroppedTarget>();
        if (item && dropResult && item.id !== dropResult.id) {
          onValueChange([
            {
              id: dropResult.id,
              value: item.value,
              op: "+",
            },
            {
              id: item.id,
              value: item.value,
              op: "-",
            },
          ]);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [draggedValue]
  );

  return (
    <div
      ref={drop}
      className="coin-container-wrapper"
      style={{ width: `${radius * 2.2}px` }}
    >
      <span
        className="coin-container-title title-top"
        style={{
          fontWeight: bolder ? "bold" : "normal",
          fontSize: radius > 20 ? "12px" : "10px",
        }}
      >
        {position === "top" ? title : ""}
      </span>
      <div style={{ position: "relative" }}>
        <Coin
          value={
            canDrop && isOver
              ? value + hoveredValue - draggedValue
              : value - draggedValue
          }
          invert={invert}
          radius={radius}
          dragValueChanged={setDraggedValue}
        />
        {draggedValue > 0 && (
          <Coin
            value={draggedValue}
            invert={invert}
            radius={radius}
            dragRef={drag}
            isDragging={isDragging}
            isAbsolute={true}
          />
        )}
      </div>
      <span
        className="coin-container-title"
        style={{
          fontWeight: bolder ? "bold" : "normal",
          fontSize: radius > 20 ? "12px" : "10px",
        }}
      >
        {position === "bottom" ? title : ""}
      </span>
    </div>
  );
};
