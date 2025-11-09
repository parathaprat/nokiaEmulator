import { useEffect, useState } from 'react';
import type { NokiaAppProps } from '../../types/app.types';
import type { NokiaKeyAction } from '../../types/input.types';
import { useInput } from '../../core/InputContext';
import { MOCK_CONTACTS, type Contact } from './mockData';

type ScreenType = 'list' | 'detail';

export function ContactsApp({ setSoftkeys, goBack }: NokiaAppProps) {
  const { registerKeyHandler, unregisterKeyHandler } = useInput();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('list');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Set softkeys based on current screen
  useEffect(() => {
    if (currentScreen === 'list') {
      setSoftkeys('View', 'Back');
    } else if (currentScreen === 'detail') {
      setSoftkeys('', 'Back');
    }
  }, [currentScreen, setSoftkeys]);

  // Register key handler
  useEffect(() => {
    const handleKey = (action: NokiaKeyAction) => {
      if (currentScreen === 'list') {
        switch (action) {
          case 'UP':
            setSelectedIndex((prev) => 
              prev > 0 ? prev - 1 : MOCK_CONTACTS.length - 1
            );
            break;
          case 'DOWN':
            setSelectedIndex((prev) => 
              prev < MOCK_CONTACTS.length - 1 ? prev + 1 : 0
            );
            break;
          case 'SELECT':
          case 'SOFT_LEFT':
            setSelectedContact(MOCK_CONTACTS[selectedIndex]);
            setCurrentScreen('detail');
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
            setCurrentScreen('list');
            setSelectedContact(null);
            break;
        }
      }
    };

    registerKeyHandler(handleKey);

    return () => {
      unregisterKeyHandler(handleKey);
    };
  }, [currentScreen, selectedIndex, registerKeyHandler, unregisterKeyHandler, goBack]);

  return (
    <div className="flex flex-col h-full p-2 text-xs">
      {currentScreen === 'list' && (
        <>
          <div className="font-bold mb-2">Contacts</div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_CONTACTS.map((contact, index) => (
              <div
                key={contact.id}
                className={`mb-1 p-1 ${
                  index === selectedIndex ? 'bg-[#0f380f] text-[#9ca89c]' : ''
                }`}
              >
                {index === selectedIndex ? '> ' : '  '}
                {contact.name}
              </div>
            ))}
          </div>
        </>
      )}

      {currentScreen === 'detail' && selectedContact && (
        <>
          <div className="font-bold mb-2">{selectedContact.name}</div>
          <div className="flex-1 overflow-y-auto">
            <div className="mb-2">
              <div className="font-bold">Phone:</div>
              <div className="ml-2">{selectedContact.phone}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
