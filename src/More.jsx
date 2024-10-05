import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const More = () => {
  const location = useLocation(); // Get the location object
  const user = location.state?.user// Access the user data from state

  if (!user) {
    return <p>No user found!</p>; // Handle case where no user is found
  }

  return (
    <div style={detailStyle}>
      <h1>User ID: {user.id}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Body:</strong> {user.body}</p>
      <Link to="/">
        <button style={buttonStyle}>Go Back</button>
      </Link>
    </div>
  );
};

// Styling for detail view
const detailStyle = {
  padding: "20px",
  textAlign: "center",
};

const buttonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default More;
