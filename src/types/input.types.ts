/**
 * Nokia 3310 Key Actions
 * Represents all possible key inputs on the Nokia 3310 device
 */
export type NokiaKeyAction =
  | 'UP'
  | 'DOWN'
  | 'LEFT'
  | 'RIGHT'
  | 'SELECT'
  | 'SOFT_LEFT'
  | 'SOFT_RIGHT'
  | 'BACK'
  | 'CALL'
  | 'END'
  | 'DIGIT_0'
  | 'DIGIT_1'
  | 'DIGIT_2'
  | 'DIGIT_3'
  | 'DIGIT_4'
  | 'DIGIT_5'
  | 'DIGIT_6'
  | 'DIGIT_7'
  | 'DIGIT_8'
  | 'DIGIT_9'
  | 'STAR'
  | 'HASH';

/**
 * Key handler function type
 * Returns true if the handler consumed the input, false otherwise
 */
export type KeyHandler = (action: NokiaKeyAction) => boolean | void;

/**
 * Input Context interface
 * Provides centralized input event dispatching
 */
export interface InputContextValue {
  dispatchInput: (action: NokiaKeyAction) => void;
  registerKeyHandler: (handler: KeyHandler) => void;
  unregisterKeyHandler: (handler: KeyHandler) => void;
}
