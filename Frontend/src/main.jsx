import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import './index.css'
import LoginPage from "./Components/LoginPage/LoginPage"
import SignupPage from './Components/Signup/Signup'
import OAuthSuccess from './Components/OAuth/OAuth'
import HomePage from './Components/Home/Home'
import AboutPage from './Components/About/About'
import Layout,{ProtectedLayout} from './Components/Layout/Layout'
import ContactUs from "./Components/Contact/Contact"
import ProfilePage from "./Components/Profile/Profile"
import ReportForm from "./Components/ReportForm/ReportForm"
import QrScanner from './Components/QrScanner/QrScanner'
import IssueSearch from './Components/Issue/SearchIssue'
import StaffDashboard from './Components/Staff_Section/Dashboard'
import AdminDashboard from './Components/AdminDashboard/AdminDashoard'
import AssignIssuesPage from './Components/AdminDashboard/AssignIssue'
import ChatPage from "./Components/ChatFeature/ChatPage"
import { SocketProvider } from './Context/SocketContext'
import LeadRequestsPage from './Components/AdminDashboard/ApproveRequest'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<HomePage />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/oauth-success' element={<OAuthSuccess />} />    // backend will redirect me to this page then this page will redirect me to login/home page based on success/failure
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route element = {<ProtectedLayout/>}>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/report' element={<ReportForm />} />
        <Route path='/qrscanner' element={<QrScanner />} />
        <Route path='/issuesearch' element={<IssueSearch />} />
        <Route path='/staff/issue' element={<StaffDashboard />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/assign' element={<AssignIssuesPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/issues/:issueId/chat" element={<SocketProvider><ChatPage /></SocketProvider>} />
        <Route path="/request" element={<LeadRequestsPage/>}/>
      </Route>
    </Route>

  )
)


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
