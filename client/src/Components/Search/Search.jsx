import { useState } from "react";

const Search = ({ employees }) => {

  const [searchQuery, setSearchQuery] = useState("");

  const [employee, setEmployee] = useState("");

return (
  <div>
    <input
      label="Employee-Name">
    </input>
    <ul>
      <li>{ employee.name }</li>
    </ul>
  </div>
)
}

export default Search;


