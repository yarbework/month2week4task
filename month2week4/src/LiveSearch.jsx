import React, { useState, useEffect, useMemo, useCallback } from "react";

function LiveSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  //applying useEffect
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  //applying useMemo
  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query, users]
  );
  //applying useCallBack
  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div>
      <h1>Live Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search users..."
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default LiveSearch;
