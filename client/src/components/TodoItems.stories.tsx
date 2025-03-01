import { StoryFn, Meta } from '@storybook/react';
import TodoItem, { TodoItemProps } from './TodoItems';
import { JSX } from 'react/jsx-runtime';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
} as Meta;

const Template: StoryFn<TodoItemProps> = (args: JSX.IntrinsicAttributes & TodoItemProps) => <TodoItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '1',
  text: 'Learn GraphQL',
  completed: false,
  onToggle: (id: string) => console.log(`Toggled todo with id: ${id}`),
};

export const Completed = Template.bind({});
Completed.args = {
  id: '2',
  text: 'Build a TODO app',
  completed: true,
  onToggle: (id: string) => console.log(`Toggled todo with id: ${id}`),
};
