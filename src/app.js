import React from 'react';
import SettingProvider from './context/setting.js';
import ToDo from './components/todo/todo-connected';

export default function App() {
  return (
    <>
      <SettingProvider>
        <ToDo />
      </SettingProvider>
    </>
  );
}
