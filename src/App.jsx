import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from '../utils/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './components/Login'
import Attendance from './components/Attendance'
import AddCustomer from './components/AddCustomer'
import MealRequest from './components/MealRequest'
import CheckRecord from './components/CheckRecord'
import DuePage from './components/DuePage'
import MealManagePage from './components/MealManage'
import PaymentPage from './components/PaymentSend'
import PaymentManagement from './components/PaymentVerification'
import ChangePassword from './components/ChangePassword'
import ViewAttendance from './components/ViewAttendance'
import CashPayment from './components/CashPayment'
import ViewProfile from './components/ViewProfile'



const App = () => {
  return (
    <div>
      <Navbar />
      
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />

          {/* User Protected Routes */}
          
          <Route path='/ViewAttendance' element={
            <ProtectedRoute allowedRoles={['user']}>
              <ViewAttendance />
            </ProtectedRoute>
          } />
          <Route path='/SendPayment' element={
            <ProtectedRoute allowedRoles={['user']}>
              <PaymentPage />
            </ProtectedRoute>
          } />
          <Route path='/ChangePassword' element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <ChangePassword />
            </ProtectedRoute>
          } />
          <Route path='/MealRequest' element={
            <ProtectedRoute allowedRoles={['user']}>
              <MealRequest />
            </ProtectedRoute>
          } />

          {/* Admin Protected Routes */}
          <Route path='/ViewProfile' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ViewProfile />
            </ProtectedRoute>
          } />
          <Route path='/Attendance' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Attendance />
            </ProtectedRoute>
          } />
          <Route path='/AddCustomer' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddCustomer />
            </ProtectedRoute>
          } />
          
          <Route path='/CheckRecord' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CheckRecord />
            </ProtectedRoute>
          } />
          <Route path='/Due' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DuePage />
            </ProtectedRoute>
          } />
          <Route path='/MealManage' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MealManagePage />
            </ProtectedRoute>
          } />
          <Route path='/VerifyPayment' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PaymentManagement />
            </ProtectedRoute>
          } />
          <Route path='/CashPayment' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CashPayment />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default App
