import { useState, useRef, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

// Move attributes and operations outside of the component
// Move attributes and operations outside of the component
const attributes_basic = ['container_id', 'container_name', 'span_id', 'body'];
const operations = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte'];



function createStringxOperations(attribute) {
  const ret=[]
  for (let i = 0; i < operations.length; i++) {
    ret.push(`${attribute} ${operations[i]}`);
  }
  return ret
}
const QueryFilter = () => {
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const [attributes, setAttributes] = useState(attributes_basic);
  const [filteredAttributes, setFilteredAttributes] = useState(attributes.filter(attribute =>
    attribute.toLowerCase().includes(searchInput.toLowerCase())
  ));
  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAttributeClick = (attribute) => {
    console.log(attribute);
    const myArry=attribute.split(" ")
    console.log(myArry)
    console.log(myArry.length,attribute)
    if (!search.includes(attribute) && myArry.length==3) {
        setSearch([...search, attribute]);
        setIsDropdownOpen(false);
        setSearchInput('')
        console.log(searchInput)
    }
    else if(myArry.length===2 && searchInput.split(" ").length===2){
      alert(`Please enter value of query`+` ${myArry[0]}` + ` ${myArry[1]}`);
    }
    else if(myArry.length===1 && attribute!=""){
      console.log(`${attribute}`)
      console.log(createStringxOperations(attribute));
      setFilteredAttributes(createStringxOperations(attribute));
    }
    setSearchInput(attribute);
  };


  const removeAttribute = (attribute) => {
    setSearch(search.filter(item => item !== attribute));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Query Filter Builder</h1>
      <div className="relative" ref={inputRef}>
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
            className="border-0 flex-grow rounded-lg focus:outline-none"
            placeholder="Search"
            value={searchInput}
            onFocus={handleInputFocus}
            onChange={(e) => {
              setSearchInput(e.target.value);
              
            }}
            onClick={handleInputFocus}
            onKeyDown={(e) => {
              handleInputFocus();
              if (searchInput.split()===1){
                setSearchInput(createStringxOperations(e.target.value))
              }  
              if (e.key === 'Enter') {
                handleAttributeClick(searchInput);
              }
            }}
          />
        </div>
        {isDropdownOpen && (
          <ul className="absolute border mt-1 w-full bg-white shadow-lg rounded z-10">
            {filteredAttributes.length > 0 ? (
              filteredAttributes.map((attribute, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>{
                    setSearchInput(attribute)
                    handleAttributeClick(attribute)
                  }}
                  
                >
                  {attribute}
                </li>
              ))
            ) : (
              <li className="p-2" onClick={()=>handleAttributeClick(searchInput)} 
              
              >{searchInput}</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QueryFilter;
