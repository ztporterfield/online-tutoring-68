import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
})

// modify tutor, everything but ID, Email, and IsTutor
// query parameters: ID
// body parameters: tutor colums except ID, Email, and IsTutor
app.put('/tutors/:id', (req, res) => {
  const q =
    'update Tutors natural join Users set bio=?,Subject=?,AvailableHoursStart=?,AvailableHoursEnd=?,FirstName=?, LastName=?,HashedPassword=?, HoursCompleted=?,ProfilePictureID=? where ID=?;'
  const values = [
    req.body.bio,
    req.body.Subject,
    req.body.AvailableHoursStart,
    req.body.AvailableHoursEnd,
    req.body.FirstName,
    req.body.LastName,
    req.body.HashedPassword,
    req.body.HoursCompleted,
    req.body.ProfilePictureID,
    req.params.id,
  ]
  db.query(q, values, (err, data) => {
    if (err) return res.json(err)
    return res.json('tutor has been updated')
  })
})

app.listen(8800, () => {
  console.log('connected to backend')
})
