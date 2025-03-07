import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe("Todo component", () => {

  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  const mockTodo = {
    _id: '1',
    text: 'test todo',
    done: false,
  };

  beforeEach(() => {
    mockDelete.mockClear();
    mockComplete.mockClear();
  });

  it('should render a todo correctly', () => {
    render(<Todo todo={mockTodo} completeTodo={mockComplete} deleteTodo={mockDelete} />);

    expect(screen.getByText('test todo')).toBeDefined();
    expect(screen.getByText('This todo is not done')).toBeDefined();
    expect(screen.getByText('Delete')).toBeDefined();
    expect(screen.getByText('Set as done')).toBeDefined();
  });

  it('should call onDelete when delete btn is clicked', async () => {
    const user = userEvent.setup();
    render(<Todo todo={mockTodo} completeTodo={mockComplete} deleteTodo={mockDelete} />);

    await user.click(screen.getByRole('button', { name: /Delete/i }));

    expect(mockDelete).toHaveBeenCalled();
  });

  it('should call onComplete when Set as done btn is clicked', async () => {
    const user = userEvent.setup();
    render(<Todo todo={mockTodo} completeTodo={mockComplete} deleteTodo={mockDelete} />);

    await user.click(screen.getByRole('button', { name: /Set as done/i }));

    expect(mockComplete).toHaveBeenCalled();
  });
});
