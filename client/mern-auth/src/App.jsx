import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {

  const [formData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
  })


  const hanldeInputChange = (e) => {
    const { name, value } = e.target;
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    console.log(formData)
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5252/api/register", {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new error(`HTTP Error! status: ${response.status}`)
      }

      const data = await response.json();
      console.log("user register successfully", data)
    } catch (error) {
      console.log("Could not signup", error)
    }

  }


  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input
          type="name"
          placeholder='Name'
          name='name'
          value={formData.name}
          onChange={hanldeInputChange}
        />

        <input style={{ margin: '10px' }}
          type="email"
          placeholder=' Email'
          name='email'
          value={formData.email}
          onChange={hanldeInputChange}
        />

        <input
          type="password"
          placeholder=' Password'
          name='password'
          value={formData.password}
          onChange={hanldeInputChange}
        />

        <div>
          <button type='submit'>Signup</button>
        </div>
      </form>
    </>
  )
}

export default App
