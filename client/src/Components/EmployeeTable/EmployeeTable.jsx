import { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {
  // sort name, position, level, brand by ascending
  // or descending order
  const [sortOrder, setSortOrder] = useState("asc");
  // filter input content by name, position, level
  const [filterType, setFilterType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedEmployees = employees.slice().sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSortClick = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredEmployees = sortedEmployees.filter((employee) => {
    switch (filterType) {
      case "name":
        return employee.name.toLowerCase().includes(searchQuery.toLowerCase());
      case "position":
        return employee.position.toLowerCase().includes(searchQuery.toLowerCase());
      case "level":
        return employee.level.toLowerCase().includes(searchQuery.toLowerCase());
      default:
        return searchQuery === "";
    }
  });

  const handelFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="SearchBar">
        <form>
          <h2>Search:</h2>
          <input
            type="search"
            onChange={handleSearchQueryChange}
            value={searchQuery}
          />
          <select value={filterType} onChange={handelFilterTypeChange}>
            <option value="name">Name</option>
            <option value="position">Position</option>
            <option value="level">Level</option>
          </select>
        </form>
      </div>
      <div className="EmployeeTable">
        <table>
          <thead>
            <tr>
              <th onClick={handleSortClick}>
                Name {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th onClick={handleSortClick}>
                Level {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th onClick={handleSortClick}>
                Position {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th onClick={handleSortClick}>
                Brand {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>{employee.brand}</td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeTable;
