import React from 'react';
import { Checkbox, Text } from '@mantine/core';

export interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle }) => {
  return (
    <Checkbox
      checked={completed}
      onChange={() => onToggle(id)}
      label={<Text style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</Text>}
    />
  );
};

export default TodoItem;
