import React from 'react';
import TodoList from './components/TodoList';
import MainHeader from '_components/MainHeader';

interface Props {}

const List = (props: Props) => {
  return (
    <>
      <MainHeader title="Your todos" />
      <TodoList />
    </>
  );
};

export default List;
