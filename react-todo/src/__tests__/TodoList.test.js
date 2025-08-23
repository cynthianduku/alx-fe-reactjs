import { render, screen, fireEvent, within } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo', () => {
    render(<TodoList />);
    const todo = screen.getByText('Learn React');
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: none');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const todo = screen.getByText('Write Tests');
    const todoItem = todo.closest('li'); // get the parent <li>
    const deleteButton = within(todoItem).getByText('Delete'); // find Delete within this <li>
    fireEvent.click(deleteButton);
    expect(todo).not.toBeInTheDocument();
  });
});
