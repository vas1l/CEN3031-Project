import React, { useState } from 'react';



const SignUp = () => {
  const [userId, setUserId] = useState(''); // New state for user-created ID, email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch('/api/signup', {
        method: 'POST', // Send a POST request
        headers: {
          'Content-Type': 'application/json', // Set the datatype in the request (JSON)
        },
        body: JSON.stringify({ userId, email, password }), // Send userId along with email and password
      });
      if (response.ok) {
        // Handle successful sign-up (e.g., redirect or show success message)
      } else {
        // Handle sign-up error
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };
};