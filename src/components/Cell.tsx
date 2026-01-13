import { Cell } from "../utils/types";

interface CellProps {
  value: Cell;
  onClick: () => void;
  disabled: boolean;
  qValue?: number | null;
  showQValue?: boolean;
}

export function CellComponent({
  value,
  onClick,
  disabled,
  qValue = null,
  showQValue = false,
}: CellProps) {
  const getCellColor = (): string => {
    if (value === "X") return "bg-blue-400";
    if (value === "O") return "bg-pink-400";
    return "bg-gray-200";
  };

  return (
    <button
      className="aspect-square bg-white/20 hover:bg-white/30 rounded-xl flex flex-col 
                 items-center justify-center text-6xl font-bold transition-all 
                 disabled:cursor-not-allowed border-2 border-white/30 relative"
      onClick={onClick}
      disabled={disabled}
    >
      <span className={getCellColor()}>{value}</span>
      {showQValue && qValue !== null && !value && (
        <span className="absolute bottom-1 text-xs text-purple-300 font-normal">
          {qValue.toFixed(2)}
        </span>
      )}
    </button>
  );
}
