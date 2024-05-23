import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonkeyList from './MonkeyList';
import { describe, it, expect, vi } from 'vitest';

const monkeys = [
  {
    id: 1,
    description: 'Monkey 1',
    url: 'https://example.com/monkey1.jpg',
    createdAt: new Date(),
  },
  {
    id: 2,
    description: 'Monkey 2',
    url: 'https://example.com/monkey2.jpg',
    createdAt: new Date(),
  },
];

describe('MonkeyList', () => {
  it('should render a list of monkeys', () => {
    render(<MonkeyList monkeys={monkeys} onDelete={vi.fn()} />);

    monkeys.forEach((monkey) => {
      expect(screen.getByText(monkey.description)).toBeInTheDocument();
      expect(screen.getByAltText(monkey.description)).toBeInTheDocument();
    });
  });

  it('should call onDelete when the delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<MonkeyList monkeys={monkeys} onDelete={onDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: 'x' });

    deleteButtons.forEach((button, index) => {
      fireEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(monkeys[index].id);
    });
  });
});
