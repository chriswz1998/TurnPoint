import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from '@/auth/login.tsx'
import { AuthProvider } from '@/context/AuthContext.tsx'
import PrivateRoute from '@/components/PrivateRout.tsx'
import Layout from '@/layout/layout.tsx'
import UploadFile from '@/upload-file'
import Dashboard from '@/dashboard'
import TestPage from '@/test'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/UploadFile" element={<UploadFile />} />
              <Route path="/Search" element={<UploadFile />} />
              <Route path="/Report" element={<UploadFile />} />
              <Route path="/Settings" element={<UploadFile />} />
              <Route path="/TestPage" element={<TestPage />} />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
