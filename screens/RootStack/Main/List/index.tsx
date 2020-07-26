import React from 'react';
import TodoList from './components/TodoList';
import MainHeader from '_components/MainHeader';
import { View } from 'react-native';

const List = () => {
  return (
    <View>
      <MainHeader title="Your todos" />
      <TodoList />
    </View>
  );
};

export default List;
