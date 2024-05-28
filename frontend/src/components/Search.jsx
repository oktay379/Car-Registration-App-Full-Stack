import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { car } = useContext(userContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleFilter = (value) => {
    const filteredData = car.filter((c) => c.plate.includes(value));
    setData(filteredData);
  };

  const handleSearch = () => {
    if (data.length > 0) {
        const id = data[0]._id;
        navigate(`/car/${id}`);
        setSearchValue(""); 
        setData([]); 
    } else {
        navigate('/NotFound');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        handleSearch();
        setSearchValue(""); 
        setData([]); 
    }
  };

  return (
    <>
      <div className="flex justify-start bg-gray-100" style={{marginLeft: "3rem"}}>
      <div className="flex items-center bg-gray-100 shadow-md rounded-full p-1">
        <IoSearch className="text-gray-500 ml-1 mr-3" size={20} />
        <input
          type="text"
          placeholder="Plaka Ara..."
          className="bg-transparent outline-none flex-grow w-80"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleFilter(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
          onClick={handleSearch}
        >
          Ara
        </button>
      </div>
    </div>
    </>
  );
};

export default Search;
