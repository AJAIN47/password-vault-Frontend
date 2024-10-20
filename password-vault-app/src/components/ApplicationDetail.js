import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ApplicationDetail = () => {
  const { id } = useParams();  // Get the application ID from the route
  const [application, setApplication] = useState(null);

  useEffect(() => {
    // Fetch individual application details based on the ID
    fetch(`http://localhost:5001/application/${id}`)
      .then((response) => response.json())
      .then((data) => setApplication(data))
      .catch((error) => console.error('Error fetching application details:', error));
  }, [id]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Application Detail</h1>
      <p><strong>Name:</strong> {application.name}</p>
      <p><strong>Username:</strong> {application.username}</p>
      <p><strong>Password:</strong> {application.password}</p>
    </div>
  );
};

export default ApplicationDetail;
