import React from "react";

export default function Filters({ sortBySelect, setSortBySelect, filter, setFilter, setSortBy }) {
  return (
    <div className="filters">
      <input
        className="filters__input"
        placeholder="Filter by text..."
        type="text"
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
      />
      <select
        className="filters__select"
        value={sortBySelect}
        onChange={({ target }) => {
          setSortBySelect(target.value);
          setSortBy({
            [target.value]: "asc",
          });
        }}
        name="sort"
      >
        <option value="id">Id</option>
        <option value="like">Like</option>
        <option value="dislike">Dislike</option>
      </select>
    </div>
  );
}
