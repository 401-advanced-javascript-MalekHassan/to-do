import React, { useState } from 'react';

export const SettingContext = React.createContext();

export default function SettingProvider(props) {
  const [isDisplayed, setIsDisplayed] = useState(true);
  const [numberOfItems, setNumberOfItems] = useState(3);
  const [sorted, setSorted] = useState('');

  const state = {
    isDisplayed,
    numberOfItems,
    sorted,
    setIsDisplayed,
    setNumberOfItems,
    setSorted,
  };
  return (
    <SettingContext.Provider value={state}>
      {props.children}
    </SettingContext.Provider>
  );
}
