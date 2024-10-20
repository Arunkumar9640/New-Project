import React, { useEffect, useState } from "react";
import "./reactApiProject.css";

const ReactApiMain = () => {
  const [search, setSearch] = useState({ searchTerm: "", names: [] });
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setSearch({ searchTerm: "", names: data }));
  }, []);

  return (
    <div
      style={{
        background: "violet",
        padding: "1rem",
        fontFamily: "sans-serif",
      }}
    >
      <input
        style={{
          padding: "10px",
          width: "250px",
          border: "none",
          borderRadius: "10PX",
        }}
        type="text"
        value={search.searchTerm}
        onChange={(e) => setSearch({ ...search, searchTerm: e.target.value })}
        placeholder="Search"
      />
      <ul>
        {search.names
          .filter((names) =>
            names.username.toLocaleLowerCase().includes(search.searchTerm.toLocaleLowerCase())
          )
          .map((user) => (
            <li key={Math.random()}>{user.username}</li>
          ))}
      </ul>
    </div>
  );
};

export default ReactApiMain;
