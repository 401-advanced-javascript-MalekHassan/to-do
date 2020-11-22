// import React, { useState, useEffect } from 'react';
// import TodoForm from './form.js';
// import TodoList from './list.js';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import './todo.scss';

export default function TodoHock() {
  const [list, setList] = useState([]);
  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let lists = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      setList(lists);
    }
  };
  useEffect(() => {
    let lists = [
      {
        _id: 1,
        complete: false,
        text: 'Clean the Kitchen',
        difficulty: 3,
        assignee: 'Person A',
      },
      {
        _id: 2,
        complete: false,
        text: 'Do the Laundry',
        difficulty: 2,
        assignee: 'Person A',
      },
      {
        _id: 3,
        complete: false,
        text: 'Walk the Dog',
        difficulty: 4,
        assignee: 'Person B',
      },
      {
        _id: 4,
        complete: true,
        text: 'Do Homework',
        difficulty: 3,
        assignee: 'Person C',
      },
      {
        _id: 5,
        complete: false,
        text: 'Take a Nap',
        difficulty: 1,
        assignee: 'Person B',
      },
    ];

    setList(lists);
  }, []);

  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar>
        <Navbar
          bg="dark"
          variant="dark"
          style={{ width: '90%', margin: '0 auto', marginTop: '10px' }}
        >
          <Navbar.Brand href="#home">
            To Do List Manager {list.filter((item) => !item.complete).length}
          </Navbar.Brand>
        </Navbar>
      </header>
      <section className="todo" style={{ marginLeft: '70px' }}>
        <div>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <TodoForm handleSubmit={addItem} />
            </Card.Body>
          </Card>
        </div>
        <div>
          <TodoList list={list} handleComplete={toggleComplete} />
        </div>
      </section>
    </>
  );
}
