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
import SettingsPage from './pages/SettingsPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CandidateForm from './pages/Interviewer/InterviewOverview/CandidateFrom';
import CompanyDetail from './pages/Company/CompanyNew/CompanyDetail';
import CompanyRegister from './pages/Company/CompanyNew/CompanyRegister';
import InterviewOverview from './pages/Interviewer/InterviewOverview/interviewOverview';
import CandidateDetails from './pages/Interviewer/InterviewOverview/candidateDetail';
import InterviewFormat from './pages/Interviewer/InterviewOverview/InterviewFormat';
import RealTimeNotes from './pages/Interviewer/InterviewOverview/realtimenotes';
import ScoringSystem from './pages/Interviewer/InterviewOverview/scoringsystem';
import InterviewHistory from './pages/Interviewer/InterviewOverview/interviewhistory';
import PostInterviewActions from './pages/Interviewer/InterviewOverview/postinterviewaction';
import IntegrationTools from './pages/Interviewer/InterviewOverview/integrationtools';
import CandidateManagement from './pages/SuperAdmin/superadminoverview/CandidateProfileManagement/CandidateManagement';
import CompanyManagement from './pages/SuperAdmin/superadminoverview/companymanagment/CompanyManagement';
import InterviewManagement from './pages/SuperAdmin/superadminoverview/InterviewManagement/InterviewManagement';
import JobPostingManagement from './pages/SuperAdmin/superadminoverview/JobPostingManagement/JobPostingManagement';
import UserManagement from './pages/SuperAdmin/superadminoverview/UserManagement';
import DashboardAnalytics from './pages/SuperAdmin/superadminoverview/DashboardAnalytics/dashboardanalytics';
import FeedbackModeration from './pages/SuperAdmin/superadminoverview/FeedbackModeration/feedbackmoderation';
import SystemSettings from './pages/SuperAdmin/superadminoverview/SystemSettings/systemsettings';
import SuperAdminProfile from './pages/SuperAdmin/SuperAdminProfile/SuperAdminProfile';
import SuperAdminAllUser from './pages/SuperAdmin/SuperAdminAllUser/SuperAdminAllUser';
import CompanyCandidateProfile from './pages/Company/CompanyCandidate/CompanyCandidateProfile';
import ApplicationDetailPage from './pages/Company/CompanyNotification/ApplicationDetailPage';
import NotificationsPage from './pages/Company/CompanyNotification/NotificationsPage';
import SuperAdminAllCompanies from './pages/SuperAdmin/SuperAdminAllCompanies/SuperAdminAllCompanies';
import SuperAdminCompaniesProfile from './pages/SuperAdmin/SuperAdminCompaniesProfile/SuperAdminCompaniesProfile';
import SuperAdminCompaniesJobs from './pages/SuperAdmin/SuperAdminCompaniesJobs/SuperAdminCompaniesJobs';

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
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
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
          <Route path="candidate-profile" element={<CompanyCandidateProfile />} />
          <Route path='interviewers' element={<CompanyInterviewers />} />
          <Route path='report' element={<CompanyReport />} />
          <Route path='job-posts' element={<CompanyJobPosts />} />
          <Route path='create-job-post' element={<CompanyCreateJobPost />} />
          <Route path='chat-with-superadmin' element={<CompanyChatWithSuperAdmin />} />
          <Route path='setting' element={<SettingsPage />} />
          <Route path='profile' element={<CompanyProfile />} />
          <Route path='a' element={<AppContact />} />
          <Route path="applications/:applicationId" element={<ApplicationDetailPage />} />
          <Route path="notifications" element={<NotificationsPage />} />

          <Route path='candidatefrom' element={<CandidateForm />} />
          <Route path='CompanyDetail' element={<CompanyDetail />} />
          <Route path='CompanyRegister' element={<CompanyRegister />} />
          <Route path='InterviewOverview' element={<InterviewOverview />} />
          <Route path='CandidateDetails' element={<CandidateDetails />} />
          <Route path='InterviewFormate' element={<InterviewFormat />} />
          <Route path='RealTimeNotes' element={<RealTimeNotes />} />
          <Route path='ScoringSystem' element={<ScoringSystem />} />
          <Route path='InterviewHistory' element={<InterviewHistory />} />
          <Route path='PostInterviewAction' element={<PostInterviewActions />} />
          <Route path='IntegrationTools' element={<IntegrationTools />} />
          <Route path='CandidateManagement' element={<CandidateManagement />} />
          <Route path='CompanyManagement' element={<CompanyManagement />} />
          <Route path='InterviewManagement' element={<InterviewManagement />} />
          <Route path='JobPostingManagement' element={<JobPostingManagement />} />
          <Route path='UserManagement' element={< UserManagement />} />
          <Route path='DashboardAnalytics' element={<DashboardAnalytics />} />
          <Route path='FeedbackModeration' element={<FeedbackModeration />} />
          <Route path='SystemSettings' element={<SystemSettings />} />


        </Route>

        {/* Super Admin Routes */}
        <Route path="/superadmin" element={
          <SuperAdminWrapper>
            <SuperAdmin />
          </SuperAdminWrapper>
        }>
          <Route path='dashboard' element={<SuperAdminDashBoard />} />
          <Route path='profile' element={<SuperAdminProfile />} />
          <Route path='allCompanies' element={<SuperAdminAllCompanies />} />
          <Route path='companiesProfile/:id' element={<SuperAdminCompaniesProfile />} />
          <Route path='companiesJobs/:id/jobs' element={<SuperAdminCompaniesJobs />} />
          <Route path='setting' element={<SettingsPage />} />
          <Route path='a' element={<AppContact />} />

          <Route path='CandidateManagement' element={<CandidateManagement />} />
          <Route path='CompanyManagement' element={<CompanyManagement />} />
          <Route path='InterviewManagement' element={<InterviewManagement />} />
          <Route path='JobPostingManagement' element={<JobPostingManagement />} />
          <Route path='DashboardAnalytics' element={<DashboardAnalytics />} />
          <Route path='FeedbackModeration' element={<FeedbackModeration />} />
          <Route path='SystemSettings' element={<SystemSettings />} />
          <Route path='UserManagement' element={<UserManagement />} />
          <Route path='alluser' element={<SuperAdminAllUser />} />


        </Route>

        {/* Interviewer Routes */}
        <Route path="/interviewer" element={
          <InterviewerWrapper>
            <Interviewer />
          </InterviewerWrapper>
        }>
          <Route path='dashboard' element={<InterviewerDashBoard />} />
          <Route path='a' element={<AppContact />} />

          <Route path='InterviewOverview' element={<InterviewOverview />} />
          <Route path='CandidateDetails' element={<CandidateDetails />} />
          <Route path='InterviewFormate' element={<InterviewFormat />} />
          <Route path='RealTimeNotes' element={<RealTimeNotes />} />
          <Route path='ScoringSystem' element={<ScoringSystem />} />
          <Route path='InterviewHistory' element={<InterviewHistory />} />
          <Route path='PostInterviewActions' element={<PostInterviewActions />} />
          <Route path='IntegrationTools' element={<IntegrationTools />} />


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
          <Route path='setting' element={<SettingsPage />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path='a' element={<AppContact />} />
        </Route>

      </Routes>
    </>

  )
}

export default App
