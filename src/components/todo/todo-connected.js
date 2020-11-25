import React, { useContext, useEffect, useState } from 'react';
import TodoForm from './formHooks';
import TodoList from './list.js';
import usePagination from '../../components/hooks/usePagenation';
import { SettingContext } from '../../context/setting.js';
import Pages from '../pagenation/pagenation';
import Setting from '../../context/settingEditor';

import './todo.scss';
import useAjax from '../hooks/useAjax';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  const { getItemsP } = usePagination(setList);
  const [getFunc, postFunc, putFunc, deletingFunc] = useAjax(total, setTotal);

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
  };
  const siteContext = useContext(SettingContext);

  // useEffect(_getTodoItems, []);

  useEffect(() => {
    setPage(1);
    _getTodoItems();
  }, []);

  useEffect(() => {
    getItemsP(siteContext.numberOfItems, page, total);
  }, [page]);
  useEffect(() => {
    getItemsP(siteContext.numberOfItems, page, total);
  }, [total]);
  useEffect(() => {
    getItemsP(siteContext.numberOfItems, page, total);
  }, [siteContext.isDisplayed]);
  useEffect(() => {
    if (siteContext.sorted === 'difficulty') {
      let newTotal = total.sort((a, b) => {
        return a.difficulty - b.difficulty;
      });
      setTotal(newTotal);
    }
    getItemsP(siteContext.numberOfItems, page, total);
  }, [siteContext.sorted]);

  useEffect(() => {
    let newTotal = total.filter((item) => !item.complete);
    setTotal(newTotal);

    getItemsP(siteContext.numberOfItems, page, total);
    setPage(1);
  }, [siteContext.isDisplayed]);
  return (
    <>
      <header>
        <h2>
          There are {total.filter((item) => !item.complete).length} Items To
          Complete
        </h2>
      </header>

      <section className="todo">
        <div>
          <TodoForm handleSubmit={_addItem} list={total} />
        </div>

        <div>
          <TodoList
            setList={setList}
            list={list}
            handleComplete={putFunc}
            handleDelete={deletingTask}
          />
          <Pages changePage={setPage} list={total} />
        </div>
      </section>
      <Setting />
    </>
  );
};

export default ToDo;
