import React, { useEffect, useState } from 'react';
import TodoForm from './formHooks';
import TodoList from './list.js';

import './todo.scss';
import useAjax from '../hooks/useAjax';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [getFunc, postFunc, putFunc, deletingFunc] = useAjax(list, setList);

  console.log('hi');

  const _addItem = (item) => {
    postFunc(item);
  };

  const _toggleComplete = (id) => {
    putFunc(id);
  };

  const _getTodoItems = () => {
    getFunc();
  };
  const deletingTask = (id) => {
    deletingFunc(id);
    console.log('deleteeeeeeeee', id);
  };

  useEffect(_getTodoItems, []);

  return (
    <>
      <header>
        <h2>
          There are {list.filter((item) => !item.complete).length} Items To
          Complete
        </h2>
      </header>

      <section className="todo">
        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={putFunc}
            handleDelete={deletingTask}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
