import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    profilePicture: null, // Placeholder for profile picture file
  });

  const [file, setFile] = useState(null); // To store the selected file
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user data from an API (you can replace this with a real call)
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getUserData', { withCredentials: true });
        setUserData({
          username: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          profilePicture: response.data.profilePicture,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file in state
    }
  };

  const handleSave = async () => {
    // Upload the selected file along with other user data to the server
    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('username', userData.username);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);

    try {
      const response = await axios.post('http://localhost:3001/api/uploadProfilePicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile picture saved!');
      setUserData(prevData => ({
        ...prevData,
        profilePicture: response.data.profilePicture // Update the profile picture after saving
      }));
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Error uploading profile picture');
    }
  };

  const handleExit = () => {
    navigate('/home');  // Navigate back to the homepage
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content shadow-lg">
        <h1>Profile</h1>

        <div className="profile-details">
          <div className="name-section">
            <div className="name">
              <strong>First Name:</strong> {userData.firstName}
            </div>
            <div className="name">
              <strong>Last Name:</strong> {userData.lastName}
            </div>
          </div>

          <div className="username-section">
            <strong>Username:</strong> {userData.username}
          </div>

          <div className="profile-picture-section">
            {userData.profilePicture ? (
              <img
                src={`http://localhost:3001/uploads/${userData.profilePicture}`}
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              <div>No Profile Picture</div>
            )}

            {/* Input to allow user to select a new profile picture */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>

          <div className="button-section">
            <button className="btn-save" onClick={handleSave}>Save</button>
            <button className="btn-exit" onClick={handleExit}>Exit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
