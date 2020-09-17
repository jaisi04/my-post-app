import React from "react";
import "./style.css";

const tableHeaders = ["No", "User Id", "Title", "Description"];

const Posts = ({
  posts,
  page: currentPage,
  pages,
  filterKey,
  error,
  updateField,
  toggleUser,
  updatePage
}) => {
  return (
    <div className="postWrapper">
      <button className="logout" onClick={() => toggleUser()}>
        Logout
      </button>
      <p>List Of Posts!</p>
      <div className="filterWrapper">
        <label className="no-margin">Filter data as per title: </label>
        <input
          className="filter"
          type="text"
          name="filterKey"
          value={filterKey}
          onChange={updateField}
        />
        {pages.length && (
          <React.Fragment>
            <span>Page:</span>
            <select onChange={updatePage}>
              {pages.map(page => (
                <option key={page} selected={page === currentPage}>
                  {page}
                </option>
              ))}
            </select>
          </React.Fragment>
        )}
      </div>
      {posts.length ? (
        <React.Fragment>
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map(({ id, userId, title, body }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{userId}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        <p>Fetching posts!...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Posts;
