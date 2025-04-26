import { Link } from 'react-router-dom';

const SuperAdminSidebar = () => {
    return (
        <aside className="left-sidebar px-1">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between mt-3">
                    <Link to="company/dashboard" className="text-nowrap logo-img">
                        <img src="/images/logos/logo.webp" className="light-logo" width="150" alt="Company Logo" />
                    </Link>
                    <div className="close-btn d-lg-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>

                <nav className="sidebar-nav mt-5" data-simplebar>
                    <ul id="sidebarnav">
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/dashboard" aria-expanded="false">
                                <span><i className="ti ti-layout-dashboard"></i></span>
                                <span className="hide-menu">Dashboard</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/CandidateManagement" aria-expanded="false">
                                <span><i className="ti ti-layout-dashboard"></i></span>
                                <span className="hide-menu">Candidate Management</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/CompanyManagement" aria-expanded="false">
                                <span><i className="ti ti-users"></i></span>
                                <span className="hide-menu">Company Management</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/interviewers" aria-expanded="false">
                                <span><i className="ti ti-user-check"></i></span>
                                <span className="hide-menu">Interviewers</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/InterviewManagement" aria-expanded="false">
                                <span><i className="ti ti-user"></i></span>
                                <span className="hide-menu">Interview Management</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/JobPostingManagement" aria-expanded="false">
                                <span><i className="ti ti-briefcase"></i></span>
                                <span className="hide-menu">JobPosting Management</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/UserManagement" aria-expanded="false">
                                <span><i className="ti ti-user-check"></i></span>
                                <span className="hide-menu">User Management</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/DashboardAnalytics" aria-expanded="false">
                                <span><i className="ti ti-briefcase"></i></span>
                                <span className="hide-menu">Dashboard Analytics</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/FeedbackModeration" aria-expanded="false">
                                <span><i className="ti ti-briefcase"></i></span>
                                <span className="hide-menu">Feedback Moderation</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/SystemSettings" aria-expanded="false">
                                <span><i className="ti ti-briefcase"></i></span>
                                <span className="hide-menu">System Settings</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/superadmin/alluser" aria-expanded="false">
                                <span><i className="ti ti-briefcase"></i></span>
                                <span className="hide-menu">System Settings</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default SuperAdminSidebar;