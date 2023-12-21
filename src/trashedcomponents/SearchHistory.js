// SearchHistory.js
import React from 'react';

const SearchHistory = ({ history, onHistoryClick }) => (
  <div>
    <h1>Search History</h1>
    <table>
      <thead>
        <tr>
          <th>Meal</th>
          <th>Thumbnail</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item, index) => (
          <tr key={index} onClick={() => onHistoryClick(index)}>
            <td>{item.name}</td>
            <td>
              <img src={item.thumbnail} alt={item.name} width="50" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SearchHistory;
