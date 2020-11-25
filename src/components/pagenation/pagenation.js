import React, { useContext } from 'react';
import { SettingContext } from '../../context/setting';
import Pagination from 'react-bootstrap/Pagination';

export default function Pages(props) {
  const { numberOfItems } = useContext(SettingContext);
  const { changePage, list } = props;
  let numberOfPages;
  if (list) {
    numberOfPages = Math.ceil(list.length / numberOfItems);
  } else {
    numberOfPages = 1;
  }
  let items = [];
  for (let number = 1; number <= numberOfPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={(e) => changePage(e.target.firstChild.data)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return <Pagination size="sm">{items}</Pagination>;
}
