import React, { useState, useEffect } from 'react';
import UseForm from '../hooks/useForm';

export default function TodoForm(props) {
  const [handleSubmit, handleInputChange] = UseForm(handelUseForm);

  function handelUseForm(item) {
    console.log('handelUseForm,,,,,');
    props.handleSubmit(item);
  }
  return (
    <>
      <h3>Add Item</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>To Do Item</span>
          <input
            name="text"
            placeholder="Add To Do List Item"
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Difficulty Rating</span>
          <input
            defaultValue="1"
            type="range"
            min="1"
            max="5"
            name="difficulty"
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Assigned To</span>
          <input
            type="text"
            name="assignee"
            placeholder="Assigned To"
            onChange={handleInputChange}
          />
        </label>
        <button id="ezbotplz">Add Item</button>
      </form>
    </>
  );
}
