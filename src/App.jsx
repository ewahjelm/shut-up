
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {Login, Register, Chat} from './pages'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/chat' element={ <Chat/> }/>
          <Route/>
        </Routes>
      </Router>
    </>
  )
}

export default App
