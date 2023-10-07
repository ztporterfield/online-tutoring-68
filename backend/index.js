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
    req.body.Bio,
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

// query parameters: ID
// body parameters: all student attributes except ID, Email, and IsTutor
app.put('/students/:id', (req, res) => {
  const q =
    'update Students natural join Users set FirstName=?,LastName=?,HashedPassword=?,HoursCompleted=?,ProfilePictureID=? where ID=?;'
  const values = [
    req.body.FirstName,
    req.body.LastName,
    req.body.HashedPassword,
    req.body.HoursCompleted,
    req.body.ProfilePictureID,
    req.params.id,
  ]
  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    return res.status(200).send(data)
  })
})

// query parameters: none
// body parameters: all attributes associated with tutors
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
      return res.status(200).send(data2)
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

// parameters: Email and HashedPassword
// returns: all Users attributes from database
//          returns 1 user
app.get('/users/:Email/:HashedPassword', (req, res) => {
  const q =
    'select * from Users where Email=? and HashedPassword=cast(? as binary(16));'
  const values = [req.params.Email, req.params.HashedPassword]
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err)
    // if no tuples in result
    if (data.length == 0) return res.status(404).send('user not found')
    else if (data.length != 1)
      return res.status(404).send('error, multiple users with same email')
    else return res.status(200).send(data[0])
  })
})

// parameters: ID
// returns: Users natural join Students attributes
//          returns 1 user
app.get('/students/:id', (req, res) => {
  const q = 'select * from Users natural join Students where ID=?;'
  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).send(err)
    if (data.length == 0) return res.status(404).send('user not found')
    else if (data.length != 1)
      // if you get this something is wrong with the schema
      return res.status(404).send('error, multiple users with same ID')
    return res.status(200).send(data[0])
  })
})

// parameters: ID
// returns: Users natural join Tutors attributes
//          returns 1 user
app.get('/tutors/:id', (req, res) => {
  const q = 'select * from Users natural join Tutors where ID=?;'
  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).send(err)
    if (data.length == 0) return res.status(404).send('user not found')
    else if (data.length != 1)
      // if you get this something is wrong with the schema
      return res.status(404).send('error, multiple users with same ID')
    return res.status(200).send(data[0])
  })
})

// parameters: StudentID
// returns: StudentID, TutorID, tutor Bio, tutor Subject, tutor available hours
app.get('/students/favorites_list/:StudentID', (req, res) => {
  const q =
    'select StudentID,TutorID,Bio,Subject,AvailableHoursStart,AvailableHoursEnd from FavoritesList join Tutors on TutorID=ID where StudentID=?;'
  db.query(q, req.params.StudentID, (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
})

// parameters: StudentID, TutorID
// returns: sql message, status code 200 on success, 500 on failure
app.post('/students/favorites_list/:StudentID/:TutorID', (req, res) => {
  const q = 'insert into FavoritesList values (?);'
  db.query(q, [[req.params.StudentID, req.params.TutorID]], (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
})

// parameters: StudentID, TutorID
// returns: sql message, status code 200 on success, 500 on failure
app.delete('/students/favorites_list/:StudentID/:TutorID', (req, res) => {
  const q = 'delete from FavoritesList where StudentID=? and TutorID=?;'
  db.query(q, [req.params.StudentID, req.params.TutorID], (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
})

app.listen(8800, () => {
  console.log('connected to backend')
})
