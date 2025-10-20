
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Register, Chat } from './pages'
import { SideNav } from './components/SideNav'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <SideNav/>   behöver Auth */}
        <Routes>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/chat' element={
            <ProtectedRoute>
              <Chat/>
            </ProtectedRoute>  
          }/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
