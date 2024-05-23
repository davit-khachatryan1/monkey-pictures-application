import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { trpc } from '~/utils/trpc';
import CreateMonkeyForm from './CreateMonkeyForm';

vi.mock('~/utils/trpc', () => ({
  trpc: {
    monkey: {
      create: {
        useMutation: vi.fn(() => ({
          mutateAsync: vi.fn(),
        })),
      },
    },
  },
}));

describe('CreateMonkeyForm', () => {
  it('should render the form fields', () => {
    render(<CreateMonkeyForm onSuccess={vi.fn()} />);

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create monkey/i })).toBeInTheDocument();
  });

  it('should call mutateAsync and onSuccess on form submission', async () => {
    const mutateAsync = vi.fn().mockResolvedValue({});
    const onSuccess = vi.fn();
    (trpc.monkey.create.useMutation as any).mockReturnValue({ mutateAsync });

    render(<CreateMonkeyForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/url/i), { target: { value: 'https://example.com' } });
    
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /create monkey/i }));
    });

    expect(mutateAsync).toHaveBeenCalledWith({ description: 'Test Description', url: 'https://example.com' });
    expect(onSuccess).toHaveBeenCalled();
  });

  it('should clear the form fields after submission', async () => {
    const mutateAsync = vi.fn().mockResolvedValue({});
    const onSuccess = vi.fn();
    (trpc.monkey.create.useMutation as any).mockReturnValue({ mutateAsync });

    render(<CreateMonkeyForm onSuccess={onSuccess} />);

    const descriptionInput = screen.getByLabelText(/description/i);
    const urlInput = screen.getByLabelText(/url/i);

    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /create monkey/i }));
    });

    expect(descriptionInput).toHaveValue('');
    expect(urlInput).toHaveValue('');
  });
});
