import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OtpLogin from './OtpLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
     <h1 className='heading'> Login With Phone </h1>
      <OtpLogin></OtpLogin>
    </div>
  )
}

export default App
