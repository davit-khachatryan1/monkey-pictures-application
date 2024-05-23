import React from 'react';

interface Monkey {
  id: number;
  description: string;
  url: string;
  createdAt: Date;
}

interface MonkeyListProps {
  monkeys: Monkey[];
  onDelete: (id: number) => void;
}

const MonkeyList: React.FC<MonkeyListProps> = ({ monkeys, onDelete }) => {
  return (
    <div className="flex gap-20 flex-wrap items-center">
      {monkeys.map((monkey) => (
        <div
          key={monkey.id}
          className="relative flex flex-col border border-gray-300 p-4 m-4 max-w-md bg-gray-700 rounded-lg shadow-lg "
          style={{ width: '200px', height: '300px' }}
        >
          <div className="h-1/2 w-full ">
            <img
              src={monkey.url}
              alt={monkey.description}
              className="w-full rounded-lg w-full h-full object-cover"
            />
          </div>
          <p className="mt-2 text-sm text-white overflow-hidden overflow-ellipsis whitespace-nowrap mb-10">
            {monkey.description}
          </p>
          <button
            onClick={() => onDelete(monkey.id)}
            className="absolute bottom-2 right-2 max-w-[40px] bg-red-600 text-white border border-red-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-4 py-2 mt-2"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

// {monkeys.map((monkey) => (
//   <div
//     key={monkey.id}
//     className="relative border border-gray-300 p-4 m-4 w-full max-w-md bg-gray-700 rounded-lg shadow-lg"
//   >
//     <div className="h-1/2 w-full ">
//       <img
//         src={monkey.url}
//         alt={monkey.description}
//         className="w-full rounded-lg w-full h-full object-cover"
//       />
//     </div>
//     <p className="mt-2 text-sm text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
//       {monkey.description}
//     </p>
//     <button
//       onClick={() => onDelete(monkey.id)}
//       className="absolute bottom-2 right-2 text-red-600 hover:text-red-800 text-xl"
//     >
//       ×
//     </button>
//   </div>
// ))}

export default MonkeyList;
