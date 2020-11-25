import React, { useEffect, useState } from 'react';
import TodoForm from './formHooks';
import TodoList from './list.js';
import usePagination from '../../hooks/usePagintaion.js';
import { SettingContext } from '../../context/setting.js';
import Pages from '../pagination/pagination.js';
import Setting from '../setting/setting-editor.js';

import './todo.scss';
import useAjax from '../hooks/useAjax';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useStat([]);
  const [page,setPage]= useState(1);
  const {getItemsP} = usePagination{todoAPI , setList,list}
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
    const siteContext = useContext(SettingContext);


  useEffect(()=>{
    setPage(1)
    _getTodoItems
  }, [])

  useEffect(() => {
  _getTodoItems(siteContext.numberOfItems,page,total)
  }, [page])
   useEffect(() => {
    getItemsP(siteContext.numberOfItems,page,total)
   }, [total])
   useEffect(() => {
    if (siteContext.sorted === 'difficulty') {
      let newTotal = total.sort((a, b) => {
        return a.difficulty - b.difficulty;
      });
      setTotal(newTotal);
    }
    getItemsP(siteContext.numberOfItems, page, total);
  }, [siteContext.sorted]);
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
          <Pages changePage={setPage} list={total}/>
        </div>
        <Setting/>
      </section>
    </>
  );
};

export default ToDo;
