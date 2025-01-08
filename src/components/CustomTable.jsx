import React, { useState, useEffect } from "react";

function CustomTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // New state for rows per page

  const fetchData = async (page = 1, searchQuery = "", rows = rowsPerPage) => {
    try {
      const response = await fetch(
        `/api/?paginate=${rows}&search=${searchQuery}&page=${page}`
      );

      if (!response.ok) {
        console.error("API Error:", response.status, response.statusText);
        return;
      }

      const text = await response.text();
      console.log("Raw Response:", text);

      const result = JSON.parse(text);
      console.log("Parsed Result:", result);

      setData(result.data);
      setCurrentPage(result.current_page);
      setTotalPages(result.last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [rowsPerPage]); // Refetch data when rowsPerPage changes

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchData(1, e.target.value);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
  };

  const changePage = (newPage) => {
    fetchData(newPage, search);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Rows per Page:
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Email Verified At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.email_verified_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomTable;
