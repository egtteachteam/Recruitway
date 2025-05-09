import React, { useEffect, useState } from 'react';
import { useSuperAdminContext } from '../../../context/superadmin-context';
import SuperAdminSendInterviewLinkModal from './SuperAdminSendInterviewLinkModal';
import { useNavigate } from 'react-router-dom';

const SuperAdminAllInterviews = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('upcoming');
    const [searchTerm, setSearchTerm] = useState('');
    const { isLoading, getAllInterviews, interviewes, markAsCancelled } = useSuperAdminContext();
    const [currentPage, setCurrentPage] = useState(1);
    const interviewesPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);

    console.log(interviewes);


    useEffect(() => {
        getAllInterviews();
    }, []);

    // Get current date and time
    const now = new Date();
    const today = now.toISOString().split('T')[0];  // Current date in yyyy-mm-dd format
    const sevenDaysLater = new Date(now);
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    // Function to calculate days between two dates
    const calculateDaysDifference = (interviewDate) => {
        const interviewDateTime = new Date(interviewDate);
        const timeDiff = interviewDateTime - now;  // Difference in milliseconds
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));  // Convert milliseconds to days
    };

    // Sort interviews based on the days difference
    const sortedInterviews = interviewes.sort((a, b) => {
        const daysDiffA = calculateDaysDifference(a.start);  // Days difference for interview A
        const daysDiffB = calculateDaysDifference(b.start);  // Days difference for interview B

        return daysDiffA - daysDiffB;  // Sort interviews by closest to today
    });

    // Filter interviews based on active tab
    const filteredInterviews = sortedInterviews.filter(interview => {
        const interviewDate = interview.start.split('T')[0]; // Get the interview date in yyyy-mm-dd format
        const interviewDateTime = new Date(interview.start); // Full date with time

        // First filter by tab
        let matchesTab = false;

        if (activeTab === 'upcoming') {
            // Upcoming interviews: From today to 7 days later, and not completed
            matchesTab = interviewDateTime >= now && interviewDateTime <= sevenDaysLater && interview.status !== 'completed' && interview.status !== "cancelled";
        } else if (activeTab === 'today') {
            // Today's interviews: Only interviews happening today, and not completed
            matchesTab = interviewDate === today && interview.status !== 'completed' && interview.status !== "cancelled";
        } else if (activeTab === 'overdue') {
            // Overdue interviews: Past interviews (before today) that are not completed or cancelled
            matchesTab = interviewDateTime < now && interview.status !== 'completed';
        } else if (activeTab === 'completed') {
            // Completed interviews: Only completed interviews
            matchesTab = interview.status === 'completed';
        }

        // Then filter by search term
        const matchesSearch =
            interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.interviewerName.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
    });

    // Counts for badges
    const upcomingCount = interviewes.filter(i => {
        const interviewDateTime = new Date(i.start);
        return interviewDateTime >= now && interviewDateTime <= sevenDaysLater && i.status !== 'completed' && i.status !== "cancelled";
    }).length;

    const todayCount = interviewes.filter(i => {
        const interviewDate = i.start.split('T')[0];
        return interviewDate === today && i.status !== 'completed';
    }).length;

    const overdueCount = interviewes.filter(i => {
        const interviewDateTime = new Date(i.start);
        return interviewDateTime < now && i.status !== 'completed';
    }).length;

    const completedCount = interviewes.filter(i => i.status === 'completed').length;

    const indexOfLastInterviewes = currentPage * interviewesPerPage;
    const indexOfFirstInterviewes = indexOfLastInterviewes - interviewesPerPage;
    const currentInterviewesList = filteredInterviews?.slice(indexOfFirstInterviewes, indexOfLastInterviewes);
    const totalPages = Math.ceil(filteredInterviews?.length / interviewesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSendLink = (interview) => {
        setSelectedInterview(interview);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedInterview(null);
    };

    const handleViewApplicants = (jobId) => navigate(`/superadmin/jobs/${jobId}/viewallapplicants`);

    if (isLoading) {
        return (
            <div className="container-fluid">
                <div className="container py-5">
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* <SuperAdminConnectZoomButton /> */}
            <div className="container-fluid">
                <div className="container">
                    <h1 className="mb-4">Interview Management</h1>

                    {/* Tabs Navigation */}
                    <div className="d-flex gap-2 flex-wrap">
                        <button
                            className={`btn btn-sm ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Upcoming (7 days)
                            <span className="badge bg-secondary ms-2">{upcomingCount}</span>
                        </button>
                        <button
                            className={`btn btn-sm ${activeTab === 'today' ? 'btn-success' : 'btn-outline-success'} d-flex align-items-center`}
                            onClick={() => setActiveTab('today')}
                        >
                            Today's Interviews
                            <span className="badge bg-success ms-2">{todayCount}</span>
                        </button>
                        <button
                            className={`btn btn-sm ${activeTab === 'overdue' ? 'btn-warning' : 'btn-outline-warning'} d-flex align-items-center`}
                            onClick={() => setActiveTab('overdue')}
                        >
                            Overdue
                            <span className="badge bg-warning ms-2">{overdueCount}</span>
                        </button>
                        <button
                            className={`btn btn-sm ${activeTab === 'completed' ? 'btn-danger' : 'btn-outline-danger'} d-flex align-items-center`}
                            onClick={() => setActiveTab('completed')}
                        >
                            Completed
                            <span className="badge bg-danger ms-2">{completedCount}</span>
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="p-3 rounded mb-3 mt-3">
                        <div className="row g-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Search ${activeTab} interviews...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Interviews Table */}
                    <div className="table-responsive">
                        {/* Desktop Table (hidden on mobile) */}
                        <table className="table table-striped table-hover d-none d-lg-table">
                            <thead className="table-light">
                                <tr>
                                    <th style={{ minWidth: '180px' }}>Candidate</th>
                                    <th style={{ minWidth: '150px' }}>Job Title</th>
                                    <th style={{ minWidth: '120px' }}>Interviewer</th>
                                    <th style={{ minWidth: '150px' }}>Date & Time</th>
                                    <th style={{ minWidth: '120px' }}>Status</th>
                                    <th style={{ minWidth: '250px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentInterviewesList.length > 0 ? (
                                    currentInterviewesList.map((interview) => {
                                        const interviewDate = new Date(interview.start);
                                        const interviewEndDate = new Date(interview.end);
                                        const isOverdue = activeTab === 'overdue';

                                        return (
                                            <tr key={interview._id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={interview.profilePicture || '/default-avatar.jpg'}
                                                            alt={interview.candidateName}
                                                            className="rounded-circle me-2"
                                                            width="32"
                                                            height="32"
                                                        />
                                                        <div>
                                                            <div>{interview.candidateName}</div>
                                                            <small className="text-muted">{interview.companyName}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{interview.jobTitle}</td>
                                                <td>{interview.interviewerName.length > 20 ? `${interview.interviewerName.slice(0, 20)}...` : interview.interviewerName}</td>
                                                <td>
                                                    <div>
                                                        {interviewDate.toLocaleDateString()}
                                                        <br />
                                                        <small className={`text-muted ${isOverdue ? 'text-danger' : ''}`}>
                                                            {interviewDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                                                            {interviewEndDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge ${interview.status === 'scheduled' ? 'bg-info' :
                                                        interview.status === 'completed' ? 'bg-success' :
                                                            interview.status === 'cancelled' ? 'bg-danger' : 'bg-warning text-dark'
                                                        }`}>
                                                        {interview.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {activeTab === 'upcoming' && (
                                                            interview.status === "cancelled" ? (
                                                                <button className="btn btn-sm btn-success" onClick={() => handleViewApplicants(interview.jobId)}>
                                                                    Reschedule
                                                                </button>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        className="btn btn-sm btn-outline-primary"
                                                                        style={{ width: "100px" }}
                                                                        onClick={() => handleSendLink(interview)}
                                                                    >
                                                                        {interview.isLinkSent ? 'ReSend Link' : 'Send Link'}
                                                                    </button>
                                                                    <button className="btn btn-sm btn-success" onClick={() => handleViewApplicants(interview.jobId)}>
                                                                        Reschedule
                                                                    </button>
                                                                    {interview.status !== "cancelled" && (
                                                                        <button className="btn btn-sm btn-danger" onClick={() => markAsCancelled(interview._id)}>
                                                                            Cancel
                                                                        </button>
                                                                    )}
                                                                </>
                                                            )
                                                        )}
                                                        {activeTab === 'today' && interview.status === 'scheduled' && (
                                                            <>
                                                                <a href={interview.startLink} target='_blank' rel="noreferrer" className="btn btn-sm btn-success">
                                                                    Start
                                                                </a>
                                                                <a href={interview.joinLink} target='_blank' rel="noreferrer" className="btn btn-sm btn-outline-primary">
                                                                    Join
                                                                </a>
                                                            </>
                                                        )}
                                                        {activeTab === 'overdue' && (
                                                            <>
                                                                {interview.status !== "cancelled" && (
                                                                    <button className="btn btn-sm btn-danger" onClick={() => markAsCancelled(interview._id)}>
                                                                        Cancel
                                                                    </button>
                                                                )}
                                                                <button className="btn btn-sm btn-success" onClick={() => handleViewApplicants(interview.jobId)}>
                                                                    Reschedule
                                                                </button>
                                                            </>
                                                        )}
                                                        {activeTab === 'completed' && (
                                                            <button className="btn btn-sm btn-success">
                                                                Get Report
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4">
                                            No interviews found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Tablet/Mobile Cards (hidden on desktop) */}
                        <div className="d-lg-none">
                            {currentInterviewesList.length > 0 ? (
                                currentInterviewesList.map((interview) => {
                                    const interviewDate = new Date(interview.start);
                                    const interviewEndDate = new Date(interview.end);
                                    const isOverdue = activeTab === 'overdue';

                                    return (
                                        <div key={interview._id} className="card mb-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={interview.profilePicture || '/default-avatar.jpg'}
                                                            alt={interview.candidateName}
                                                            className="rounded-circle me-2"
                                                            width="40"
                                                            height="40"
                                                        />
                                                        <div>
                                                            <h6 className="mb-0">{interview.candidateName}</h6>
                                                            <small className="text-muted">{interview.companyName}</small>
                                                        </div>
                                                    </div>
                                                    <span className={`badge ${interview.status === 'scheduled' ? 'bg-info' :
                                                        interview.status === 'completed' ? 'bg-success' :
                                                            interview.status === 'cancelled' ? 'bg-danger' : 'bg-warning text-dark'
                                                        }`}>
                                                        {interview.status}
                                                    </span>
                                                </div>

                                                <div className="mb-2">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="bi bi-briefcase me-2"></i>
                                                        <span>{interview.jobTitle}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="bi bi-person-badge me-2"></i>
                                                        <span>{interview.interviewerName}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="bi bi-calendar me-2"></i>
                                                        <span>{interviewDate.toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="bi bi-clock me-2"></i>
                                                        <span className={isOverdue ? 'text-danger' : ''}>
                                                            {interviewDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                                                            {interviewEndDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-wrap gap-2">
                                                    {activeTab === 'upcoming' && (
                                                        interview.status === "cancelled" ? (
                                                            <button className="btn btn-sm btn-success flex-grow-1" onClick={() => handleViewApplicants(interview.jobId)}>
                                                                Reschedule
                                                            </button>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    className="btn btn-sm btn-outline-primary flex-grow-1"
                                                                    onClick={() => handleSendLink(interview)}
                                                                >
                                                                    {interview.isLinkSent ? 'ReSend' : 'Send Link'}
                                                                </button>
                                                                <button className="btn btn-sm btn-success flex-grow-1" onClick={() => handleViewApplicants(interview.jobId)}>
                                                                    Reschedule
                                                                </button>
                                                                {interview.status !== "cancelled" && (
                                                                    <button className="btn btn-sm btn-danger flex-grow-1" onClick={() => markAsCancelled(interview._id)}>
                                                                        Cancel
                                                                    </button>
                                                                )}
                                                            </>
                                                        )
                                                    )}

                                                    {activeTab === 'today' && interview.status === 'scheduled' && (
                                                        <>
                                                            <a href={interview.startLink} target='_blank' rel="noreferrer" className="btn btn-sm btn-success flex-grow-1">
                                                                Start
                                                            </a>
                                                            <a href={interview.joinLink} target='_blank' rel="noreferrer" className="btn btn-sm btn-outline-primary flex-grow-1">
                                                                Join
                                                            </a>
                                                        </>
                                                    )}

                                                    {activeTab === 'overdue' && (
                                                        <>
                                                            {interview.status !== "cancelled" && (
                                                                <button className="btn btn-sm btn-danger flex-grow-1" onClick={() => markAsCancelled(interview._id)}>
                                                                    Cancel
                                                                </button>
                                                            )}
                                                            <button className="btn btn-sm btn-success flex-grow-1" onClick={() => handleViewApplicants(interview.jobId)}>
                                                                Reschedule
                                                            </button>
                                                        </>
                                                    )}

                                                    {activeTab === 'completed' && (
                                                        <button className="btn btn-sm btn-success flex-grow-1">
                                                            Report
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-4">
                                    No interviews found matching your criteria
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    <nav aria-label="Page navigation" className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(pageNum)}>
                                            {pageNum}
                                        </button>
                                    </li>
                                );
                            })}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {isModalOpen && selectedInterview && (
                        <SuperAdminSendInterviewLinkModal
                            isOpen={isModalOpen}
                            interview={selectedInterview}
                            onClose={handleModalClose}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default SuperAdminAllInterviews;