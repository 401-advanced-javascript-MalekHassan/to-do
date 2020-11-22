import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.list.map((item) => (
          <ListGroup.Item
            action
            variant="danger"
            className={`complete-${item.complete.toString()}`}
            key={item._id}
            id="listing"
            style={{
              background: ' rgba(255, 192, 203, 0)',
              padding: '0px',
              marginLeft: '5px',
            }}
          >
            <span onClick={() => this.props.handleComplete(item._id)}>
              {item.text}
            </span>
          </ListGroup.Item>
        ))}
      </ul>
    );
  }
}

export default TodoList;
