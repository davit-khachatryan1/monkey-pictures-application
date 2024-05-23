import React from 'react';
import MonkeysPage from '~/components/monkey/MonkeyPage';

const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-800 py-8">
      <MonkeysPage />
    </div>
  );
};

export default IndexPage;
