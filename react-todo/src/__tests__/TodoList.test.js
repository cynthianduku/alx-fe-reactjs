import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import TodoList from '../components/TodoList';

test('renders initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

test('adds a new todo', () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText('Add a new todo');
  const addButton = screen.getByText('Add', { selector: 'button' });

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  expect(screen.getByText('New Task')).toBeInTheDocument();
});

test('toggles a todo', () => {
  render(<TodoList />);
  const todo = screen.getByText('Learn React');
  fireEvent.click(todo);
  expect(todo).toHaveStyle('text-decoration: line-through');
});

test('deletes a todo', () => {
  render(<TodoList />);
  const todoItem = screen.getByText('Write Tests').closest('li');
  const deleteButton = within(todoItem).getByText('Delete', { selector: 'button' });

  fireEvent.click(deleteButton);
  expect(screen.queryByText('Write Tests')).not.toBeInTheDocument();
});
