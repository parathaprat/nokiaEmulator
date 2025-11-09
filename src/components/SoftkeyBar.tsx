import { useInput } from '../core/InputContext';

interface SoftkeyBarProps {
  leftLabel?: string;
  rightLabel?: string;
}

export function SoftkeyBar({ leftLabel, rightLabel }: SoftkeyBarProps) {
  const { dispatchInput } = useInput();

  const handleLeftClick = () => {
    if (leftLabel) {
      dispatchInput('SOFT_LEFT');
    }
  };

  const handleRightClick = () => {
    if (rightLabel) {
      dispatchInput('SOFT_RIGHT');
    }
  };

  return (
    <div 
      className="flex justify-between items-center px-2 py-1 text-xs font-mono" 
      role="navigation" 
      aria-label="Softkey buttons"
    >
      <button
        onClick={handleLeftClick}
        disabled={!leftLabel}
        className="cursor-pointer hover:underline disabled:cursor-default disabled:opacity-50"
        aria-label={leftLabel ? `Left softkey: ${leftLabel}` : 'Left softkey'}
      >
        {leftLabel || ''}
      </button>
      <button
        onClick={handleRightClick}
        disabled={!rightLabel}
        className="cursor-pointer hover:underline disabled:cursor-default disabled:opacity-50"
        aria-label={rightLabel ? `Right softkey: ${rightLabel}` : 'Right softkey'}
      >
        {rightLabel || ''}
      </button>
    </div>
  );
}
