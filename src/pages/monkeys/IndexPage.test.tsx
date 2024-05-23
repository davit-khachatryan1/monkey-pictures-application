import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import IndexPage from './index';

// Mock the MonkeysPage component
vi.mock('~/components/monkey/MonkeyPage', () => {
  return {
    default: () => <div>MonkeysPage Component</div>,
  };
});

// Mock the trpc provider
const mockTrpc = {
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  useContext: vi.fn(),
  useUtils: vi.fn(() => ({
    queryClient: {
      invalidateQueries: vi.fn(),
    },
  })),
};

vi.mock('~/utils/trpc', () => ({
  trpc: {
    ...mockTrpc,
    post: {
      list: {
        useInfiniteQuery: vi.fn(() => ({
          data: { pages: [{ posts: [] }] },
          fetchNextPage: vi.fn(),
          hasNextPage: true,
        })),
      },
    },
  },
}));

describe('IndexPage', () => {
  it('should render the IndexPage with MonkeysPage', () => {
    render(<IndexPage />);

    // Check if MonkeysPage component is rendered
    expect(screen.getByText('MonkeysPage Component')).toBeInTheDocument();
  });
});
