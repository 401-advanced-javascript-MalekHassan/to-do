import React, { useEffect, useState } from 'react';
import axios from 'axios';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

export default function useAjax(list, cb) {
  // const [list, setList] = useState([]);

  const getFunc = () => {
    axios({
      method: 'get',
      url: todoAPI,
      // responseType: 'stream'
    })
      .then((data) => {
        // console.log(data.data.results);
        cb([...data.data.results]);
        // setList(data.data.results)
      })
      .catch(console.error);
  };

  const postFunc = (item) => {
    item.due = new Date();

    axios({
      method: 'post',
      url: todoAPI,
      data: item,
    })
      .then((savedItem) => {
        console.log('logggggggg', savedItem.data);
        cb([...list, savedItem.data]);
      })
      .catch(console.error);
  };

  const putFunc = (id) => {
    // console.log('fffffffffffffffff',item);
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;
      axios.put(url, item).then((savedItem) => {
        console.log('testttttttt', savedItem.data);
        cb(
          list.filter((listItem) =>
            listItem._id === item._id ? savedItem.data : listItem
          )
        );
      });
    }
  };

  const deletingFunc = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      let url = `${todoAPI}/${id}`;

      axios.delete(url).then((savedItem) => {
        console.log('delete  -->', savedItem);
        cb(list.filter((item) => item._id != id));
      });
    }
  };

  return [getFunc, postFunc, putFunc, deletingFunc];
}
