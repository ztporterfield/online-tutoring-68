import React, { useState, useEffect } from 'react';
import profileImage from '../profile.jpg';
import "../App.css";
import axios from 'axios';

const StudentEditProfile = () => {
    const [student, setStudent] = useState({
        name: ""
      });
      const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const fetchStudentData = async ()=>{
        try{
            const res = await axios.get("http://localhost:8800/students/44")
            console.log(res)
            const studentData = res.data;
            // Set the fetched data into the state
            setStudent({
          firstname: studentData.FirstName || "",
          lastname: studentData.LastName || ""
            });
            console.log("Student Data:", studentData);
      }catch(err){
        console.log(err)
      }
    }
    fetchStudentData()
},[])
const handleSaveChanges = async () => {
  try {
    // Create an object with the data to be sent to the backend
    const updatedData = {
      FirstName: student.firstname,
      LastName: student.lastname,
    };

    // Send a PUT request to update the tutor's data in the database
    const response = await axios.put("http://localhost:8800/users/44", updatedData);
    console.log(updatedData)
    // Handle the response, e.g., show a success message
    console.log("Data updated successfully:", response.data);
  } catch (error) {
    // Handle any errors, e.g., show an error message
    console.error("Error updating data:", error);
  }
};
const handleFileChange = (event) => {
  // Set the selected file when the input value changes
  setSelectedFile(event.target.files[0]);
};

const handleUploadFile = async () => {
  try {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', selectedFile);

      // Send a POST request to upload the selected file to the server
      const response = await axios.post("http://localhost:8800/upload-profile-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response, e.g., show a success message
      console.log("File uploaded successfully:", response.data);

      // You can update the profile image in your state or UI as needed
    } else {
      console.log("No file selected.");
    }
  } catch (error) {
    // Handle any errors, e.g., show an error message
    console.error("Error uploading file:", error);
  }
};

return (
    <div>
      <aside className="sidemenu">
        <div className="side-menu-button">
          <h1>Home</h1>
          <h1>Calendar</h1>
          <h1>{student.firstname} {student.lastname}</h1>
          <div className="profile-container">
            <img src={profileImage} alt="Profile" width="50" height="50" />
          </div>
          
        </div>
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
      </aside>
      {/* Name input */}
      <div className="input-container">
        <label htmlFor="firstname">First Name: {student.firstname} </label>
        

        <input type="text" placeholder="First name" name="firstname" required/>
        <label htmlFor="lastname">Last Name: {student.lastname} </label>
        <input type="text" placeholder="Last name" name="lastname" required/>
      </div>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
    
  );
};
  export default StudentEditProfile;