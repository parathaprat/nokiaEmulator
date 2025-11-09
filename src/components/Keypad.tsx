import React from 'react';
import type { NokiaKeyAction } from '../types/input.types';

interface KeypadProps {
  onKeyPress: (action: NokiaKeyAction) => void;
}

const KeypadComponent: React.FC<KeypadProps> = ({ onKeyPress }) => {
  const handleButtonClick = (action: NokiaKeyAction) => {
    onKeyPress(action);
  };

  return (
    <div className="keypad-container p-2 flex flex-col gap-2">
      {/* Directional Pad */}
      <div className="directional-pad grid grid-cols-3 grid-rows-3 gap-1 w-24 mx-auto">
        <div className="col-start-2">
          <button
            className="keypad-btn directional-btn"
            onClick={() => handleButtonClick('UP')}
            aria-label="Up"
          >
            ▲
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button
            className="keypad-btn directional-btn"
            onClick={() => handleButtonClick('LEFT')}
            aria-label="Left"
          >
            ◀
          </button>
        </div>
        <div className="col-start-2 row-start-2">
          <button
            className="keypad-btn select-btn"
            onClick={() => handleButtonClick('SELECT')}
            aria-label="Select"
          >
            ●
          </button>
        </div>
        <div className="col-start-3 row-start-2">
          <button
            className="keypad-btn directional-btn"
            onClick={() => handleButtonClick('RIGHT')}
            aria-label="Right"
          >
            ▶
          </button>
        </div>
        <div className="col-start-2 row-start-3">
          <button
            className="keypad-btn directional-btn"
            onClick={() => handleButtonClick('DOWN')}
            aria-label="Down"
          >
            ▼
          </button>
        </div>
      </div>

      {/* Numeric Keypad */}
      <div className="numeric-pad grid grid-cols-3 gap-1.5 w-40 mx-auto">
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_1')}
          aria-label="1"
        >
          1
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_2')}
          aria-label="2"
        >
          2<span className="sub-text">ABC</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_3')}
          aria-label="3"
        >
          3<span className="sub-text">DEF</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_4')}
          aria-label="4"
        >
          4<span className="sub-text">GHI</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_5')}
          aria-label="5"
        >
          5<span className="sub-text">JKL</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_6')}
          aria-label="6"
        >
          6<span className="sub-text">MNO</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_7')}
          aria-label="7"
        >
          7<span className="sub-text">PQRS</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_8')}
          aria-label="8"
        >
          8<span className="sub-text">TUV</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_9')}
          aria-label="9"
        >
          9<span className="sub-text">WXYZ</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('STAR')}
          aria-label="Star"
        >
          *<span className="sub-text">+</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('DIGIT_0')}
          aria-label="0"
        >
          0<span className="sub-text">_</span>
        </button>
        <button
          className="keypad-btn numeric-btn"
          onClick={() => handleButtonClick('HASH')}
          aria-label="Hash"
        >
          #
        </button>
      </div>

      {/* Function Buttons */}
      <div className="function-buttons flex justify-center gap-3 mt-1">
        <button
          className="keypad-btn function-btn call-btn"
          onClick={() => handleButtonClick('CALL')}
          aria-label="Call"
        >
          📞
        </button>
        <button
          className="keypad-btn function-btn clear-btn"
          onClick={() => handleButtonClick('BACK')}
          aria-label="Clear"
        >
          C
        </button>
        <button
          className="keypad-btn function-btn end-btn"
          onClick={() => handleButtonClick('END')}
          aria-label="End"
        >
          📵
        </button>
      </div>

      <style>{`
        .keypad-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #e6e6e6, #c0c0c0);
          border: 1px solid #999;
          border-radius: 50%;
          box-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.2),
            inset 0 1px 2px rgba(255, 255, 255, 0.5);
          cursor: pointer;
          font-weight: 600;
          color: #333;
          transition: all 0.1s ease;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .keypad-btn:focus-visible {
          outline: 3px solid #4a9eff;
          outline-offset: 3px;
          z-index: 10;
        }

        .keypad-btn:active {
          background: linear-gradient(145deg, #c0c0c0, #a0a0a0);
          box-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.3),
            inset 0 2px 4px rgba(0, 0, 0, 0.2);
          transform: translateY(1px);
        }

        .directional-btn,
        .select-btn {
          width: 28px;
          height: 28px;
          font-size: 14px;
        }

        .select-btn {
          background: linear-gradient(145deg, #d0d0d0, #b0b0b0);
          font-size: 18px;
        }

        .numeric-btn {
          width: 48px;
          height: 48px;
          font-size: 18px;
          line-height: 1;
        }

        .sub-text {
          font-size: 8px;
          color: #666;
          margin-top: 2px;
          font-weight: 400;
        }

        .function-btn {
          width: 42px;
          height: 42px;
          font-size: 16px;
        }

        .call-btn {
          background: linear-gradient(145deg, #90ee90, #70ce70);
        }

        .call-btn:active {
          background: linear-gradient(145deg, #70ce70, #50ae50);
        }

        .end-btn {
          background: linear-gradient(145deg, #ff6b6b, #e05555);
        }

        .end-btn:active {
          background: linear-gradient(145deg, #e05555, #c03535);
        }

        .clear-btn {
          font-size: 20px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

// Memoize Keypad component for performance optimization
export const Keypad = React.memo(KeypadComponent);
