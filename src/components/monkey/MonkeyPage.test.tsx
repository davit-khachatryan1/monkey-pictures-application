import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MonkeysPage from './MonkeyPage';
import { trpc } from '../../utils/trpc';

const mockMonkeys = [
  { id: 1, description: 'Monkey 1', url: 'https://example.com/monkey1.jpg', createdAt: new Date() },
  { id: 2, description: 'Monkey 2', url: 'https://example.com/monkey2.jpg', createdAt: new Date() },
];

vi.mock('../../utils/trpc', () => {
  const mockRefetch = vi.fn();
  const mockMutateAsync = vi.fn().mockResolvedValue({});

  return {
    trpc: {
      monkey: {
        list: {
          useQuery: vi.fn(() => ({
            data: { monkeys: mockMonkeys, hasNextPage: false },
            isLoading: false,
            refetch: mockRefetch,
          })),
        },
        delete: {
          useMutation: vi.fn(() => ({
            mutateAsync: mockMutateAsync,
          })),
        },
      },
    },
  };
});

describe('MonkeysPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the MonkeysPage and list of monkeys', async () => {
    render(<MonkeysPage />);

    expect(screen.getByText('Monkey Pictures')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Monkey 1')).toBeInTheDocument();
      expect(screen.getByText('Monkey 2')).toBeInTheDocument();
    });
  });

  it('should open and close the modal when "Add Monkey" button is clicked', () => {
    render(<MonkeysPage />);

    const addButton = screen.getByText('Add Monkey');
    fireEvent.click(addButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call delete mutation when delete button is clicked', async () => {
    render(<MonkeysPage />);

    await waitFor(() => {
      expect(screen.getByText('Monkey 1')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'x' });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(trpc.monkey.delete.useMutation().mutateAsync).toHaveBeenCalledWith({ id: 1 });
    });
  });

  it('should load more monkeys when "Load More" button is clicked', async () => {
    const mockRefetch = vi.fn();
    trpc.monkey.list.useQuery.mockReturnValue({
      data: { monkeys: mockMonkeys, hasNextPage: true },
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<MonkeysPage />);

    const loadMoreButton = screen.getByText('Load More');
    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});

