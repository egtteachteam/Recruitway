import { Toaster } from 'react-hot-toast'
import './App.css'
import Login from './pages/login'
import Register from './pages/Register'
import { Navigate, Route, Routes } from 'react-router-dom';
import AppContact from './pages/AppContact';
import WaitingReply from './pages/WaitingReply';
import Company from './layout/Company/Company';
import CompanyWrapper from './wrapper/CompanyWrapper';
import SuperAdminWrapper from './wrapper/SuperAdminWrapper';
import SuperAdmin from './layout/SuperAdmin/SuperAdmin';
import InterviewerWrapper from './wrapper/InterviewerWrapper';
import Interviewer from './layout/Interviewer/Interviewer';
import IntervieweeWrapper from './wrapper/IntervieweeWrapper';
import Interviewee from './layout/Interviewee/Interviewee';
import UserWrapper from './wrapper/UserWrapper';
import User from './layout/User/User';
import CompanyDashBoard from './pages/Company/CompanyDashBoard/CompanyDashBoard';
import SuperAdminDashBoard from './pages/SuperAdmin/SuperAdminDashBoard/SuperAdminDashBoard';
import InterviewerDashBoard from './pages/Interviewer/InterviewerDashBoard/InterviewerDashBoard';
import IntervieweeDashBoard from './pages/Interviewee/IntervieweeDashBoard/IntervieweeDashBoard';
import UserDashBoard from './pages/User/UserDashBoard/UserDashBoard';
import CompanyCandidate from './pages/Company/CompanyCandidate/CompanyCandidate';
import CompanyInterviewers from './pages/Company/CompanyInterviewers/CompanyInterviewers';
import CompanyReport from './pages/Company/CompanyReport/CompanyReport';
import CompanyJobPosts from './pages/Company/CompanyJobPosts/CompanyJobPosts';
import CompanyCreateJobPost from './pages/Company/CompanyJobPosts/CompanyCreateJobPost';
import CompanyChatWithSuperAdmin from './pages/Company/CompanyChatWithSuperAdmin/CompanyChatWithSuperAdmin';
import CompanyProfile from './pages/Company/CompanyProfile/CompanyProfile';
import Dashboard from './pages/Interview/Dashboard';
import Candidates from './pages/Interview/Candidates';
import InterviewSession from './pages/Interview/InterviewSession';
import CandidateInterview from './pages/Interview/CandidateInterview';
import AIInterview from './pages/Interview/AIInterview';
import DashboardHTML from './pages/Interview/DashboardHTML';
import OpenAiTest from './pages/Interview/OpenAiTest';
import SendLinkModal from './pages/Interview/SendLinkModal';
import Test from './pages/Interview/Test';
import UserJobs from './pages/User/UserJobs/UserJobs';
import UserJobsApplied from './pages/User/UserJobsApplied/UserJobsApplied';
import UserShortlisted from './pages/User/UserShortlisted/UserShortlisted';
import UserProfile from './pages/User/UserProfile/UserProfile';
import Profile from './pages/Profile';
import Form from './pages/User/UserProfile/Form';

function App() {

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerClassName="toast-container fixed-top d-flex justify-content-center"
        containerStyle={{
          zIndex: 99999999,
          width: '100%',
          maxWidth: '360px',
          margin: '0 auto',
          padding: '1rem',
        }}
        toastOptions={{
          duration: 5000,
          style: {
            background: 'linear-gradient(135deg, #1e1e2f, #2e2e3e)',
            color: '#f0f0f0',
            fontSize: '15px',
            padding: '14px 24px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            fontFamily: "'Inter', 'Poppins', sans-serif",
            fontWeight: 500,
            letterSpacing: '0.4px',
            transition: 'all 0.3s ease-in-out',
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              color: '#fff',
            },
            icon: '✅',
            className: 'toast-success',
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
              color: '#fff',
            },
            icon: '❌',
            className: 'toast-error',
          },
          info: {
            style: {
              background: 'linear-gradient(135deg, #2196f3, #6dd5fa)',
              color: '#fff',
            },
            icon: 'ℹ️',
            className: 'toast-info',
          },
        }}
      />

      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/waitingReply' element={<WaitingReply />} />
        <Route path='/profile' element={<Profile />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/interview/:id" element={<InterviewSession />} />
        <Route path="/candidate-interview/:id" element={<CandidateInterview />} />
        <Route path="/ai-interview/:id" element={<AIInterview />} />
        <Route path="/dashboardHTML" element={<DashboardHTML />} />
        <Route path="/openAitest" element={<OpenAiTest />} />
        <Route path="/sendlinkmodel" element={<SendLinkModal />} />
        <Route path="/test" element={<Test />} />

        {/* Company Routes */}
        <Route path="/company" element={
          <CompanyWrapper>
            <Company />
          </CompanyWrapper>
        }>
          <Route path='dashboard' element={<CompanyDashBoard />} />
          <Route path='candidates' element={<CompanyCandidate />} />
          <Route path='interviewers' element={<CompanyInterviewers />} />
          <Route path='report' element={<CompanyReport />} />
          <Route path='job-posts' element={<CompanyJobPosts />} />
          <Route path='create-job-post' element={<CompanyCreateJobPost />} />
          <Route path='chat-with-superadmin' element={<CompanyChatWithSuperAdmin />} />
          <Route path='profile' element={<CompanyProfile />} />
          <Route path='a' element={<AppContact />} />
        </Route>

        {/* Super Admin Routes */}
        <Route path="/superadmin" element={
          <SuperAdminWrapper>
            <SuperAdmin />
          </SuperAdminWrapper>
        }>
          <Route path='dashboard' element={<SuperAdminDashBoard />} />
          <Route path='a' element={<AppContact />} />
        </Route>

        {/* Interviewer Routes */}
        <Route path="/interviewer" element={
          <InterviewerWrapper>
            <Interviewer />
          </InterviewerWrapper>
        }>
          <Route path='dashboard' element={<InterviewerDashBoard />} />
          <Route path='a' element={<AppContact />} />
        </Route>

        {/* Interviewee Routes */}
        <Route path="/interviewee" element={
          <IntervieweeWrapper>
            <Interviewee />
          </IntervieweeWrapper>
        }>
          <Route path='dashboard' element={<IntervieweeDashBoard />} />
          <Route path='a' element={<AppContact />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={
          <UserWrapper>
            <User />
          </UserWrapper>
        }>
          <Route path='dashboard' element={<UserDashBoard />} />
          <Route path='jobs' element={<UserJobs />} />
          <Route path='jobs-applied' element={<UserJobsApplied />} />
          <Route path='shortlisted' element={<UserShortlisted />} />
          {/* <Route path='profile' element={<Form />} /> */}
          <Route path='profile' element={<UserProfile />} />
          <Route path='a' element={<AppContact />} />
        </Route>

      </Routes>
    </>

  )
}

export default App
