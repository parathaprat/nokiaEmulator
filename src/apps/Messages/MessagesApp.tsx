import { useEffect, useState } from 'react';
import type { NokiaAppProps } from '../../types/app.types';
import type { NokiaKeyAction } from '../../types/input.types';
import { useInput } from '../../core/InputContext';
import { MOCK_MESSAGES, type Message } from './mockData';

type ScreenType = 'inbox' | 'detail' | 'options';

export function MessagesApp({ setSoftkeys, goBack }: NokiaAppProps) {
  const { registerKeyHandler, unregisterKeyHandler } = useInput();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('inbox');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [optionsIndex, setOptionsIndex] = useState(0);

  const optionsItems = ['Reply', 'Delete', 'Back'];

  // Set softkeys based on current screen
  useEffect(() => {
    if (currentScreen === 'inbox') {
      setSoftkeys('Options', 'Back');
    } else if (currentScreen === 'detail') {
      setSoftkeys('', 'Back');
    } else if (currentScreen === 'options') {
      setSoftkeys('Select', 'Back');
    }
  }, [currentScreen, setSoftkeys]);

  // Register key handler
  useEffect(() => {
    const handleKey = (action: NokiaKeyAction) => {
      if (currentScreen === 'inbox') {
        switch (action) {
          case 'UP':
            setSelectedIndex((prev) => 
              prev > 0 ? prev - 1 : MOCK_MESSAGES.length - 1
            );
            break;
          case 'DOWN':
            setSelectedIndex((prev) => 
              prev < MOCK_MESSAGES.length - 1 ? prev + 1 : 0
            );
            break;
          case 'SELECT':
            setSelectedMessage(MOCK_MESSAGES[selectedIndex]);
            setCurrentScreen('detail');
            break;
          case 'SOFT_LEFT':
            setCurrentScreen('options');
            setOptionsIndex(0);
            break;
          case 'SOFT_RIGHT':
          case 'BACK':
            goBack();
            break;
        }
      } else if (currentScreen === 'detail') {
        switch (action) {
          case 'SOFT_RIGHT':
          case 'BACK':
            setCurrentScreen('inbox');
            setSelectedMessage(null);
            break;
        }
      } else if (currentScreen === 'options') {
        switch (action) {
          case 'UP':
            setOptionsIndex((prev) => 
              prev > 0 ? prev - 1 : optionsItems.length - 1
            );
            break;
          case 'DOWN':
            setOptionsIndex((prev) => 
              prev < optionsItems.length - 1 ? prev + 1 : 0
            );
            break;
          case 'SELECT':
          case 'SOFT_LEFT':
            // Handle option selection
            if (optionsItems[optionsIndex] === 'Back') {
              setCurrentScreen('inbox');
            }
            // Reply and Delete would be implemented here
            break;
          case 'SOFT_RIGHT':
          case 'BACK':
            setCurrentScreen('inbox');
            break;
        }
      }
    };

    registerKeyHandler(handleKey);

    return () => {
      unregisterKeyHandler(handleKey);
    };
  }, [currentScreen, selectedIndex, optionsIndex, registerKeyHandler, unregisterKeyHandler, goBack]);

  return (
    <div className="flex flex-col h-full p-2 text-xs">
      {currentScreen === 'inbox' && (
        <>
          <div className="font-bold mb-2">Messages</div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_MESSAGES.map((message, index) => (
              <div
                key={message.id}
                className={`mb-2 p-1 ${
                  index === selectedIndex ? 'bg-[#0f380f] text-[#9ca89c]' : ''
                }`}
              >
                <div className="font-bold">
                  {index === selectedIndex ? '> ' : '  '}
                  {message.sender}
                </div>
                <div className="ml-3 truncate">{message.preview}</div>
                <div className="ml-3 text-[10px]">{message.timestamp}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {currentScreen === 'detail' && selectedMessage && (
        <>
          <div className="font-bold mb-2">{selectedMessage.sender}</div>
          <div className="text-[10px] mb-2">{selectedMessage.timestamp}</div>
          <div className="flex-1 overflow-y-auto">
            <div className="whitespace-pre-wrap">{selectedMessage.content}</div>
          </div>
        </>
      )}

      {currentScreen === 'options' && (
        <>
          <div className="font-bold mb-2">Options</div>
          <div className="flex-1 overflow-y-auto">
            {optionsItems.map((item, index) => (
              <div
                key={item}
                className={`mb-1 p-1 ${
                  index === optionsIndex ? 'bg-[#0f380f] text-[#9ca89c]' : ''
                }`}
              >
                {index === optionsIndex ? '> ' : '  '}
                {item}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
