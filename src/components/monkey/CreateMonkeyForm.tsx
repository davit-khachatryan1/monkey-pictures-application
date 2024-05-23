import React, { useState } from 'react';
import { trpc } from '../../utils/trpc';

interface CreateMonkeyFormProps {
  onSuccess: () => void;
}

const CreateMonkeyForm: React.FC<CreateMonkeyFormProps> = ({ onSuccess }) => {
  const [description, setDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const createMonkey = trpc.monkey.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMonkey.mutateAsync({ description, url });
    setDescription('');
    setUrl('');
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-700 flex flex-col gap-5 justify-between items-center p-6 rounded-lg"
    >
      <div className="flex gap-5 flex-col w-full">
        <label className="text-white" htmlFor="description">
          Description
        </label>
        <input
          id="description"
          type="text"
          className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900 text-white w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={3}
          maxLength={2000}
        />
      </div>
      <div className="flex gap-5 flex-col w-full">
        <label className="text-white" htmlFor="url">
          URL
        </label>
        <input
          id="url"
          type="url"
          className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900 text-white w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          minLength={3}
          maxLength={500}
        />
      </div>
      <button
        type="submit"
        className="bg-gray-600 text-white border border-gray-500 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded px-4 py-2 mt-4"
      >
        Create Monkey
      </button>
    </form>
  );
};

export default CreateMonkeyForm;
