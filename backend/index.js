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

app.get("/", (req,res)=>{
  res.json("hello this is backend")
})

// Endpoint to add appointments
app.post("/Appointments", (req,res)=>{
  const {ID ,StudentID, TutorID, AppointmentDate, StartTime, EndTime, Subject, AppointmentNotes, MeetingLink} = req.body;

  const q = "INSERT INTO Appointments (ID ,StudentID, TutorID, AppointmentDate, StartTime, EndTime, Subject, AppointmentNotes, MeetingLink) VALUES (?)"
  const values = [ID ,StudentID, TutorID, AppointmentDate, StartTime, EndTime, Subject, AppointmentNotes, MeetingLink]
  
  db.query(q, [values], (err,data)=>{
    if(err) return res.json(err)
    console.log('Appointment added successfully');
    return res.json(data)
  })
})


//show the appointments
app.get("/Appointments", (req,res)=>{
  const q = "SELECT * FROM Appointments"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })

})


// Endpoint to delete an appointment
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


app.listen(8800, () => {
  console.log('connected to backend!')
})
