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

app.listen(8800, () => {
  console.log('connected to backend')
})
