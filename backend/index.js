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
    if (err) return res.status(400).send(err)
    return res.json(data)
  })
})

app.post('/tutors', (req, res) => {
  const createUserQuery =
    'insert into Users (Email,FirstName,LastName,HashedPassword,HoursCompleted,ProfilePictureID,IsTutor) values (?);'
  const createTutorQuery =
    'insert into Tutors (ID,Bio,Subject,AvailableHoursStart,AvailableHoursEnd) values (?);'
  const createUserValues = [
    req.body.Email,
    req.body.FirstName,
    req.body.LastName,
    req.body.HashedPassword,
    req.body.HoursCompleted,
    req.body.ProfilePictureID,
    req.body.IsTutor,
  ]
  db.query(createUserQuery, [createUserValues], (err, data) => {
    if (err) return res.json(err)
    const createTutorValues = [
      data.insertId,
      req.body.Bio,
      req.body.Subject,
      req.body.AvailableHoursStart,
      req.body.AvailableHoursEnd,
    ]
    db.query(createTutorQuery, [createTutorValues], (err, data2) => {
      if (err) return res.json(err)
      return res.json(data2)
    })
  })
})

// body: Email, FirstName, LastName, HashedPassword, HoursCompleted, ProfilePictureID, IsTutor
//       IsTutor is 1 or 0; 1 if IsTutor=true, 0 if IsTutor=false
// returns: on success - the data returned by mysql with status code 201
//          on error - the error is sent with status code 400
app.post('/students', (req, res) => {
  const createUserQuery =
    'insert into Users (Email,FirstName,LastName,HashedPassword,HoursCompleted,ProfilePictureID,IsTutor) values (?);'
  const createStudentQuery = 'insert into Students (ID) values (?);'
  const createUserValues = [
    req.body.Email,
    req.body.FirstName,
    req.body.LastName,
    req.body.HashedPassword,
    req.body.HoursCompleted,
    req.body.ProfilePictureID,
    req.body.IsTutor,
  ]
  db.query(createUserQuery, [createUserValues], (err, data) => {
    if (err) return res.status(400).send(err)
    const createStudentValues = [data.insertId]
    db.query(createStudentQuery, [createStudentValues], (err, data2) => {
      if (err) return res.status(400).send(err)
      res.status(201).send(data2)
    })
  })
})

// parameters: Email
// returns: user attributes from database
app.get('/users/:Email', (req, res) => {
  const q = 'select * from Users where Email=?;'
  db.query(q, req.params.Email, (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
})

// parameters: ID
// returns: User natural join Student attributes
app.get('/users/students/:id', (req, res) => {
  const q = 'select * from Users natural join Students where id=?;'
  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(404).send(err)
    return res.status(200).send(data)
  })
})

// parameters: ID
// returns: User natural join Tutor attributes
app.get('/users/tutors/:id', (req, res) => {
  const q = 'select * from Users natural join Tutors where id=?;'
  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(404).send(err)
    return res.status(200).send(data)
  })
})

app.listen(8800, () => {
  console.log('connected to backend')
})
