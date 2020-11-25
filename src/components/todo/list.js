import React, { useEffect, useContext } from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
import { SettingContext } from '../../context/setting';
import Card from 'react-bootstrap/Card';

export default function TodoList(props) {
  let { list, handleComplete, handleDelete } = props;
  const { isDisplayed } = useContext(SettingContext);
  if (!isDisplayed) {
    list = list.filter((item) => !item.complete);
  }
  useEffect(() => {});
  return (
    <ul>
      {list.map((item) => (
        <Card
          className={`complete-${item.complete.toString()}`}
          key={item._id}
          id="listing"
          style={{
            margin: '10px',
            boxShadow: '5px 5px 8px 5px #D6EBE8',
            width: '500px',
          }}
        >
          <Card.Body>
            <div id="containHead">
              <div>
                <span id="content" onClick={() => handleComplete(item._id)}>
                  {item.complete ? 'completed' : 'pending'}
                </span>
                <strong style={{ marginRight: '200px' }}>
                  {' '}
                  {item.assignee}{' '}
                </strong>
              </div>
              <button id="xButton" onClick={() => handleDelete(item._id)}>
                x
              </button>
            </div>
            <br></br>
            <hr></hr>
            {item.text}
            <br></br>
            <strong> Difficulty: {item.difficulty} </strong>
          </Card.Body>
        </Card>
      ))}
    </ul>
  );
}
