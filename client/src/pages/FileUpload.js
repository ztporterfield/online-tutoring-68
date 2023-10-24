import React from 'react'
import axios from 'axios'

function FileUpload() {
  const [file, setFile] = React.useState()
  const handleFile = (e) => {
    setFile(e.target.files[0])
  }
  const handleUpload = () => {
    const formData = new FormData()
    formData.append('image', file)
    axios.put('http://localhost:8800/users/profile_picture/40', formData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  return (
    <div className='container'>
      <input type="file" onChange={handleFile} />
      <button onClick={handleUpload}>upload</button>
    </div>
  )
}

export default FileUpload