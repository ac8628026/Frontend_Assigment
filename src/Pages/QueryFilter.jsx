import { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const QueryFilter = () => {
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');
  const [isOperationDropdownOpen, setIsOperationDropdownOpen] = useState(false);

  const attributes = ['container_id', 'container_name', 'span_id', 'body'];
  const operations = ['=', '!=', 'IN', 'NOT IN'];

  const inputRef = useRef(null);

  const handleInputFocus = () => {
    if (!selectedAttribute) {
      setIsDropdownOpen(true);
    }
  };

  const handleAttributeClick = (attribute) => {
    setSelectedAttribute(attribute);
    setIsDropdownOpen(false);
    setIsOperationDropdownOpen(true);
    setSearchInput('');
  };

  const handleOperationClick = (operation) => {
    setSelectedOperation(operation);
    setIsOperationDropdownOpen(false);
    setSearchInput('');
    inputRef.current.focus(); // Refocus the input after selecting an operation
  };

  const handleValueSubmit = (e) => {
    e.preventDefault();
    if (selectedAttribute && selectedOperation && searchInput) {
      setSearch([...search, `${selectedAttribute} ${selectedOperation} ${searchInput}`]);
      setSearchInput('');
      setSelectedAttribute('');
      setSelectedOperation('');
      setIsDropdownOpen(true); // Ensure dropdown opens again for new input
      inputRef.current.focus(); // Refocus the input after submitting the value
    }
  };

  const removeAttribute = (attribute) => {
    setSearch(search.filter(item => item !== attribute));
  };

  const filteredAttributes = attributes.filter(attribute =>
    attribute.toLowerCase().includes(searchInput.toLowerCase())
  );

  // useEffect(() => {
  //   if (selectedAttribute || selectedOperation) {
  //     setIsDropdownOpen(false);
  //   } else {
  //     setIsDropdownOpen(true);
  //   }
  // }, [selectedAttribute, selectedOperation]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Query Filter Builder</h1>
      <div className="relative">
        <div className="flex flex-wrap border p-0 w-full border-gray-400 h-10 rounded-lg">
          <div className='flex bg-white items-center'>
            {search.map((attribute, index) => (
              <span
                key={index}
                className="text-gray-800 mx-1 p-2 border border-gray-500 h-7 rounded flex items-center"
              >
                {attribute}
                <button
                  className="ml-2 text-gray-500"
                  onClick={() => removeAttribute(attribute)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            ref={inputRef}
            className="border-0 flex-grow rounded-lg focus:outline-none"
            placeholder={selectedOperation ? "Enter value" : selectedAttribute ? "Select operation" : "Search"}
            value={searchInput}
            onFocus={handleInputFocus}
            onChange={(e) => setSearchInput(e.target.value)}
            onBlur={() => setIsDropdownOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && selectedOperation) {
                handleValueSubmit(e);
              }
            }}
          />
        </div>
        {isDropdownOpen && !selectedAttribute && (
          <ul className="absolute border mt-1 w-full bg-white shadow-lg rounded z-10">
            {filteredAttributes.length > 0 ? (
              filteredAttributes.map((attribute, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onMouseDown={() => handleAttributeClick(attribute)}
                >
                  {attribute}
                </li>
              ))
            ) : (
              <li className="p-2">No attributes found</li>
            )}
          </ul>
        )}
        {isOperationDropdownOpen && (
          <ul className="absolute border mt-1 w-full bg-white shadow-lg rounded z-10">
            {operations.map((operation, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onMouseDown={() => handleOperationClick(operation)}
              >
                {operation}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default QueryFilter;
