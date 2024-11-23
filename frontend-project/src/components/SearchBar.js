import React from 'react';

const SearchBar = ({ setSearch, setCategory, category }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Search by title"
        className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleSearch}
      />
      <select
        value={category}
        onChange={handleCategoryChange}
        className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

export default SearchBar;
