import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host:"",
  user:"",
  password:"",
  database:"",
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint to add appointments
app.post("/Appointments/add", (req,res)=>{
  const {StudentID, TutorID, AppointmentDate, StartTime, EndTime, Subject, AppointmentNotes, MeetingLink} = req.body;

  const q = "INSERT INTO Appointments (ID ,StudentID, TutorID, AppointmentDate, StartTime, EndTime, Subject, AppointmentNotes, MeetingLink) VALUES (?)"
  const values = [ID ,StudentID, TutorID, AppointmentDate, StartTime, EndTime, Subject, AppointmentNotes, MeetingLink]
  
  db.query(q, [values], (err,data)=>{
    if(err) return res.json(err)
    console.log('Appointment added successfully');
    return res.json("appointment has added")
  })
})

//to show all the appointments
app.get("/Appointments", (req,res)=>{
  const q = "SELECT * FROM Appointments"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

// Endpoint to delete an appointment by appointment Id
app.delete("/appointments/:id", (req, res) => {
  const appointmentId = req.params.id;

  const q = "DELETE FROM Appointments WHERE ID = ?";

  db.query(q, [appointmentId], (err, data) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return res.status(500).json({ error: 'Error deleting appointment' });
    }

    console.log('Appointment deleted successfully');
    return res.json({ success: true });
  });
});

// Endpoint to get an appointment by appointment Id
app.get("/appointments/:id", (req, res) => {
  const appointmentId = req.params.id;

  const q = "SELECT StudentID, TutorID, AppointmentDate, StartTime, EndTime, Subject, AppointmentNotes, MeetingLink FROM Appointments WHERE ID = ?";

  db.query(q, [appointmentId], (err, data) => {
    if (err) {
      console.error('Error in getting the appointment:', err);
      return res.status(500).json({ error: 'Error in selecting the appointment' });
    }

    console.log('the selected Appointment');
    //return res.json({ success: true });
    return res.json(data);
  });
});

// Endpoint to select an tutor appointment
// get appointments by tutor ID
app.get("/appointments/tutor/:id", (req, res) => {
  const TutorID = req.params.id;

  const q = "SELECT ID, StudentID, AppointmentDate, StartTime, EndTime, Subject, AppointmentNotes, MeetingLink FROM Appointments WHERE TutorID = ?";

  db.query(q, [TutorID], (err, data) => {
    if (err) {
      console.error('Error in getting the appointment:', err);
      return res.status(500).json({ error: 'Error in the appointment' });
    }

    console.log('the Appointment');
    //return res.json({ success: true });
    return res.json(data);
  });
});

// Endpoint to delete from tutor appointment
// delete appointment by tutors ID
app.delete("/appointments/tutor/:id", (req, res) => {
  const TutorID = req.params.id;

  const q = "DELETE FROM Appointments WHERE TutorID = ?";

  db.query(q, [TutorID], (err, data) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return res.status(500).json({ error: 'Error deleting appointment' });
    }

    console.log('Appointment deleted successfully');
    return res.json({ success: true });
  });
});

// Endpoint to select an student appointment
// get appointments by student ID
app.get("/appointments/student/:id", (req, res) => {
  const StudentID = req.params.id;

  const q = "SELECT ID, TutorID, AppointmentDate, StartTime, EndTime, Subject, AppointmentNotes, MeetingLink FROM Appointments WHERE StudentID = ?";

  db.query(q, [StudentID], (err, data) => {
    if (err) {
      console.error('Error in getting the appointment:', err);
      return res.status(500).json({ error: 'Error in the appointment' });
    }

    console.log('the Appointment');
    return res.json(data);
  });
});

// Endpoint to delete from student appointment
// delete appointment by student ID
app.delete("/appointments/student/:id", (req, res) => {
  const StudentID = req.params.id;

  const q = "DELETE FROM Appointments WHERE StudentID = ?";

  db.query(q, [StudentID], (err, data) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return res.status(500).json({ error: 'Error deleting appointment' });
    }

    console.log('Appointment deleted successfully');
    return res.json({ success: true });
  });
});

app.listen(8800, () => {
  console.log('connected to backend!')
})
