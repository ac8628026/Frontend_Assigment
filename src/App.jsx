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
    <div className="flex flex-col items-center ">
      <div className="mb-3 mt-3 ">
        <button
          className={`px-5 mx-3 py-3 rounded-lg font-semibold transition-all ${
            activeComponent === 'PipelineBuilder'
              ? 'bg-black text-white'
              : 'bg-white text-black  shadow-lg hover:bg-slate-100 hover:text-gray-500'
          }`}
          onClick={() => setActiveComponent('PipelineBuilder')}
        >
          Pipeline Builder
        </button>
        <button
          className={`px-5 mx-3 py-3 rounded-lg font-semibold transition-all ${
            activeComponent === 'QueryFilter'
              ? 'bg-black text-white'
              : 'bg-white text-black shadow-lg hover:bg-slate-100 hover:text-gray-500'
          }`}
          onClick={() => setActiveComponent('QueryFilter')}
        >
          Query Filter
        </button>
      </div>
      <div className="w-full h-full">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;