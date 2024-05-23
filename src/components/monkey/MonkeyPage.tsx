import React, { useState, useEffect } from 'react';
import { trpc } from '../../utils/trpc';
import CreateMonkeyForm from './CreateMonkeyForm';
import MonkeyList from './MonkeyList';

interface Monkey {
  id: number;
  description: string;
  url: string;
  createdAt: Date;
}

interface MonkeyListResponse {
  monkeys: Monkey[];
  hasNextPage: boolean;
}

const MonkeysPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [monkeys, setMonkeys] = useState<Monkey[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const deleteMonkey = trpc.monkey.delete.useMutation();

  const {
    data,
    isLoading: isFetching,
    refetch,
  } = trpc.monkey.list.useQuery<MonkeyListResponse>(
    { page, limit: 2 },
    { enabled: false },
  );

  const combineAndRemoveDuplicates = (
    existingMonkeys: Monkey[],
    newMonkeys: Monkey[],
  ): Monkey[] => {
    const uniqueMonkeysMap = new Map(
      [...existingMonkeys, ...newMonkeys].map((monkey) => [monkey.id, monkey]),
    );
    return Array.from(uniqueMonkeysMap.values());
  };

  useEffect(() => {
    if (data) {
      setMonkeys((prev) => combineAndRemoveDuplicates(prev, data.monkeys));
      setHasNextPage(data.hasNextPage);
      setIsLoading(false);
    }
  }, [data]);

  const handleDelete = async (id: number) => {
    await deleteMonkey.mutateAsync({ id });
    setMonkeys((prev) => prev.filter((monkey) => monkey.id !== id));
    refetch();
  };

  const handleOpenModal = (): void => setModalOpen(true);
  const handleCloseModal = (): void => setModalOpen(false);

  const handleLoadMore = (): void => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <div className="flex flex-col bg-gray-800 py-8 text-center gap-4">
      <div className="flex justify-end pr-8">
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white text-center border border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2"
        >
          Add Monkey
        </button>
      </div>
      <h1 className="text-4xl text-center font-bold text-white">
        Monkey Pictures
      </h1>
      {isFetching && page === 1 ? (
        'Loading...'
      ) : monkeys.length > 0 ? (
        <MonkeyList monkeys={monkeys} onDelete={handleDelete} />
      ) : (
        "You still don't have any saved monkeys."
      )}
      {hasNextPage && (
        <button
          onClick={handleLoadMore}
          className="bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2 mt-4 mx-auto"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-700 rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-1 right-3 text-red-600 hover:text-gray-900 text-3xl"
            >
              ×
            </button>
            <CreateMonkeyForm
              onSuccess={() => {
                setPage(1);
                setMonkeys([]);
                setIsLoading(true);
                refetch();
                handleCloseModal();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MonkeysPage;