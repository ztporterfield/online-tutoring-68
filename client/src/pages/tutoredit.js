import React, { useState, useEffect } from 'react';
import profileImage from '../profile.jpg';
import "../App.css";
import axios from 'axios';

const TutorEditProfile = () => {
  const [tutor, setTutor] = useState({
    bio: "",
    email: "",
    password: "",
    courses: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const fetchTutorData = async ()=>{
      try{
        const res = await axios.get("http://localhost:8800/tutors/1")
        console.log(res)
        const tutorData = res.data;
        // Set the fetched data into the state
        setTutor({
          bio: tutorData.Bio || "",
          email: tutorData.Email || "",
          courses: tutorData.Subject || "",
          firstname: tutorData.FirstName || "",
          lastname: tutorData.LastName || "",
          hourstart: tutorData.AvailableHoursStart || "",
          hourend: tutorData.AvailableHoursEnd || ""
 
        });
        console.log("Tutor Data:", tutorData);
        console.log("Bio:", tutorData.bio);
      }catch(err){
        console.log(err)
      }
    }
    fetchTutorData()
  },[])
  const handleSaveChanges = async () => {
    try {
      // Create an object with the data to be sent to the backend
      const updatedData = {
        Bio: tutor.bio,
        Email: tutor.email,
        Password: tutor.password, // You should hash the password before sending it
        Subject: tutor.courses,
        FirstName: tutor.firstname,
        LastName: tutor.lastname,
        AvailableHoursStart: tutor.hourstart,
        AvailableHoursEnd: tutor.hourend,
      };
  
      // Send a PUT request to update the tutor's data in the database
      const tutorId = 23; // Replace with the actual tutor ID
      const response = await axios.post(`http://localhost:8800/tutors/23`, updatedData);
      
      // Handle the response, e.g., show a success message
      console.log("Data updated successfully:", response.data);
  
      // Trigger a page refresh to load the updated data
      window.location.reload();
    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error("Error updating data:", error);
    }
  };
  
  
  const handleFileChange = (event) => {
    // Set the selected file when the input value changes
    setSelectedFile(event.target.files[0]);
  };
  const [file, setFile] = useState();
  const handleUploadFile = () => {
    
        const formData = new FormData();
        formData.append('image', file);
        axios.post('http://localhost:8800/upload')
        .then(res => console.log(res))
        .catch(err => console.log(err));
        
  };
  // Generate arrays for hours, minutes, and AM/PM options
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  const amPmOptions = ['AM', 'PM'];

  return (
    <div>
      <aside className="sidemenu">
        <div className="side-menu-button">
          <h1>Home</h1>
          <h1>Calendar</h1>
          <h1>{tutor.firstname} {tutor.lastname}</h1>
          <div className="profile-container">
            <img src={profileImage} alt="Profile" width="50" height="50" />
            <label htmlFor="profileImage" >Profile Picture:</label>
            <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button onClick={handleUploadFile}>Upload</button>
          </div>
        </div>
      </aside>

      {/* Bio input */}
      <div className="input-container">
        <label htmlFor="bio">Bio: {tutor.bio}</label>

        <input type="text" placeholder="Bio" name="bio" required/>
      </div>

      {/* Email input */}
      <div className="input-container">
        <label htmlFor="email">Email: {tutor.email}</label>
        <input type="text" placeholder="Email" name="email" required />
      </div>

      {/* Password input */}
      <div className="input-container">
        <label htmlFor="password">Password: Can't display for security reason</label>
        <input type="text" placeholder="Password" name="password" required />
      </div>

      {/* Courses input */}
      <div className="input-container">
        <label htmlFor="courses">Courses: {tutor.courses}</label>
        <input type="text" placeholder="Courses" name="courses" required />
      </div>
      <label htmlFor="hourstart">Available from: {tutor.hourstart}</label>
      <label htmlFor="hourend" style={{ display: 'block' }}>Available to: {tutor.hourend}</label>


      {/* Availability input */}
      <div className="availability-container">
      <label htmlFor="availability">Availability:</label>
        <div className="availability-inputs">
          <label htmlFor="from-time">From: </label>
          <select name="from-time-hour">
            
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span>:</span>
          <select name="from-time-minute">
            
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
          <select name="from-time-am-pm">
            {amPmOptions.map((amPm) => (
              <option key={amPm} value={amPm}>
                {amPm}
              </option>
            ))}
          </select>
        </div>
        <div className="availability-inputs">
          <label htmlFor="to-time">To: </label>
          <select name="to-time-hour">
            
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span>:</span>
          <select name="to-time-minute">
            
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
          <select name="to-time-am-pm">
            {amPmOptions.map((amPm) => (
              <option key={amPm} value={amPm}>
                {amPm}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Save Changes button */}
      <button type="submit" onClick={handleSaveChanges}>Save Changes</button>
    </div>
    
  );
  

};

export default TutorEditProfile;