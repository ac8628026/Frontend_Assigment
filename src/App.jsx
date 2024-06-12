import  { useState } from 'react';
import PipelineBuilder from './Pages/PipelineBuilder';
import QueryFilter from './Pages/QueryFilter';

function App() {
  const [activeComponent, setActiveComponent] = useState('PipelineBuilder');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'PipelineBuilder':
        return <PipelineBuilder />;
      case 'QueryFilter':
        return <QueryFilter />;
      default:
        return <PipelineBuilder />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-3">
        <button
          className="px-4 py-2 m-2 bg-blue-500 text-white rounded"
          onClick={() => setActiveComponent('PipelineBuilder')}
        >
          Pipeline Builder
        </button>
        <button
          className="px-4 py-2 m-2 bg-blue-500 text-white rounded"
          onClick={() => setActiveComponent('QueryFilter')}
        >
          Query Filter
        </button>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
