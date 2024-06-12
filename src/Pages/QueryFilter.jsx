import  { useState } from 'react';
import 'tailwindcss/tailwind.css';

const QueryFilter = () => {
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const attributes = ['container_id', 'container_name', 'span_id', 'body'];

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  const handleAttributeClick = (attribute) => {
    if (!search.includes(attribute)) {
      setSearch([...search, attribute]);
    }
    setSearchInput('');
    setIsDropdownOpen(false);
  };

  const removeAttribute = (attribute) => {
    setSearch(search.filter(item => item !== attribute));
  };

  const filteredAttributes = attributes.filter(attribute =>
    attribute.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Query Filter Builder</h1>
      <div className="relative">
        <div className="flex flex-wrap border p-2 rounded w-full">
          {search.map((attribute, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 p-1 m-1 rounded flex items-center"
            >
              {attribute}
              <button
                className="ml-2 text-red-500"
                onClick={() => removeAttribute(attribute)}
              >
                &times;
              </button>
            </span>
          ))}
          <input
            type="text"
            className="border-0 flex-grow"
            placeholder="Search"
            value={searchInput}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {isDropdownOpen && (
          <ul className="absolute border mt-1 w-full bg-white shadow-lg rounded z-10">
            {filteredAttributes.length > 0 ? (
              filteredAttributes.map((attribute, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleAttributeClick(attribute)}
                >
                  {attribute}
                </li>
              ))
            ) : (
              <li className="p-2">No attributes found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default QueryFilter;
