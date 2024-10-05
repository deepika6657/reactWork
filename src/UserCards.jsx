import React, { useEffect, useState } from 'react';

// Dummy API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/users'; // Replace with actual API if needed

const UserCards = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 10;

  // Fetch data from dummy API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle Read More click to show full user details
  const handleReadMore = (user) => {
    setSelectedUser(user);
  };

  // Handle pagination next/previous buttons
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>User Cards</h1>
      <div className="container">
        {currentUsers.map((user) => (
          <div className="card" key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <button onClick={() => handleReadMore(user)}>Read More</button>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="pagination">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(users.length / usersPerPage)}>
          Next
        </button>
      </div>

      {/* Modal or section to show full user details */}
      {selectedUser && (
        <div className="user-details" style={{ border: '1px solid #333', padding: '20px', marginTop: '20px' }}>
          <h2>{selectedUser.name}</h2>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone:</strong> {selectedUser.phone}</p>
          <p><strong>Website:</strong> {selectedUser.website}</p>
          <p><strong>Company:</strong> {selectedUser.company.name}</p>
          <p><strong>Address:</strong> {`${selectedUser.address.street}, ${selectedUser.address.city}`}</p>
          <button onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserCards;
