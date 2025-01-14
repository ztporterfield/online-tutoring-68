import { InputGroup, Form, Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TutorSearchPage = () => {
  let navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [tutors, setTutors] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8800/tutors')
      .catch((err) => {
        if (err.response) console.log(err.response)
        else console.log(err)
      })
      .then((res) => setTutors(res.data))
  })
  return (
    <div>
      <Container>
        <Form>
          <InputGroup>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or subject"
              style={{ margin: 'auto', width: '100%' }}
            />
          </InputGroup>
        </Form>
        <Table style={{ margin: 'auto', width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Tutor</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {tutors
              .filter((tutor) => {
                let matchSubject = tutor.Subject.toLowerCase().includes(
                  search.toLowerCase(),
                )
                let matchNameInorder = (tutor.FirstName + ' ' + tutor.LastName)
                  .toLowerCase()
                  .includes(search.toLowerCase())
                let matchNameReverse = (tutor.LastName + ' ' + tutor.FirstName)
                  .toLowerCase()
                  .includes(search.toLowerCase())
                if (matchSubject || matchNameInorder || matchNameReverse)
                  return tutor
              })
              .map((tutor) => (
                <tr
                  key={tutor.ID}
                  onClick={() => navigate('/tutor/' + tutor.ID)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{tutor.FirstName + ' ' + tutor.LastName}</td>
                  <td>{tutor.Subject}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default TutorSearchPage
