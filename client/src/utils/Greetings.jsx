import { useSelector } from 'react-redux';
import React from 'react'

const Greetings = () => {
const user = useSelector((state) => state.user.user)
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = hours < 12 ? 'Morning' : hours < 17 ? 'Afternoon' : 'Evening';
  return (
    <div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-white">Good {timeOfDay}, {user.name}</h1>

    </div>
  )
}

export default Greetings