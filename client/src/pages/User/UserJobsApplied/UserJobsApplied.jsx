import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserJobsApplied = () => {
    const [applications, setApplications] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const mockApplications = [
                    {
                        id: 1,
                        jobId: 101,
                        title: 'Senior Frontend Developer',
                        company: 'Tech Innovations Inc.',
                        appliedDate: '2023-05-15',
                        status: 'under-review', // under-review, shortlisted, rejected, hired
                        statusDate: '2023-05-18',
                        notes: 'Technical interview scheduled for next week',
                        jobDetails: {
                            location: 'San Francisco, CA (Remote)',
                            salary: '$120,000 - $150,000',
                            type: 'Full-time'
                        }
                    },
                    {
                        id: 2,
                        jobId: 202,
                        title: 'Backend Engineer',
                        company: 'Data Systems LLC',
                        appliedDate: '2023-05-10',
                        status: 'shortlisted',
                        statusDate: '2023-05-12',
                        notes: 'Waiting for final interview confirmation',
                        jobDetails: {
                            location: 'New York, NY (Hybrid)',
                            salary: '$110,000 - $140,000',
                            type: 'Full-time'
                        }
                    },
                    {
                        id: 3,
                        jobId: 303,
                        title: 'UX Designer',
                        company: 'Creative Minds Co.',
                        appliedDate: '2023-04-28',
                        status: 'rejected',
                        statusDate: '2023-05-05',
                        notes: 'Position filled internally',
                        jobDetails: {
                            location: 'Remote',
                            salary: '$90,000 - $120,000',
                            type: 'Contract'
                        }
                    }
                ];

                setApplications(mockApplications);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const filteredApplications = applications.filter(app =>
        filterStatus === 'all' || app.status === filterStatus
    );

    const getStatusBadge = (status) => {
        const statusMap = {
            'under-review': { class: 'bg-info', text: 'Under Review' },
            'shortlisted': { class: 'bg-primary', text: 'Shortlisted' },
            'rejected': { class: 'bg-danger', text: 'Not Selected' },
            'hired': { class: 'bg-success', text: 'Hired' }
        };
        return (
            <span className={`badge ${statusMap[status]?.class || 'bg-secondary'}`}>
                {statusMap[status]?.text || status}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleViewJob = (jobId) => {
        navigate(`/jobs/${jobId}`);
    };

    if (isLoading) {
        return (
            <>
                <div className="container-fluid">
                    <div className="container mt-5 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading your applications...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container-fluid">
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Your Job Applications</h1>
                        <div className="d-flex align-items-center">
                            <span className="me-2">Filter:</span>
                            <select
                                className="form-select form-select-sm w-auto"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Applications</option>
                                <option value="under-review">Under Review</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="rejected">Not Selected</option>
                                <option value="hired">Hired</option>
                            </select>
                        </div>
                    </div>

                    {filteredApplications.length === 0 ? (
                        <div className="card">
                            <div className="card-body text-center py-5">
                                <i className="bi bi-briefcase display-4 text-muted mb-3"></i>
                                <h3 className="text-muted">
                                    {filterStatus === 'all'
                                        ? "You haven't applied to any jobs yet"
                                        : `No ${filterStatus.replace('-', ' ')} applications`}
                                </h3>
                                <p className="text-muted">
                                    {filterStatus === 'all'
                                        ? "Browse available jobs and apply to see them here."
                                        : "Your applications with this status will appear here."}
                                </p>
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={() => navigate('/user/jobs')}
                                >
                                    Browse Jobs
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="list-group">
                            {filteredApplications.map((application) => (
                                <div key={application.id} className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <div className="mb-2">
                                            <h5 className="mb-1">{application.title}</h5>
                                            <p className="mb-1">
                                                <strong>{application.company}</strong> • {application.jobDetails.location}
                                            </p>
                                            <small className="text-muted">
                                                Applied on {formatDate(application.appliedDate)} •
                                                {application.jobDetails.type} • {application.jobDetails.salary}
                                            </small>
                                        </div>
                                        <div className="text-end">
                                            {getStatusBadge(application.status)}
                                            <div className="mt-2">
                                                <small className="text-muted">
                                                    Updated: {formatDate(application.statusDate)}
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 d-flex justify-content-between align-items-center">
                                        <div>
                                            {application.notes && (
                                                <div className="alert alert-light p-2 mb-0">
                                                    <small>
                                                        <i className="bi bi-info-circle me-1"></i>
                                                        {application.notes}
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleViewJob(application.jobId)}
                                            >
                                                View Job
                                            </button>
                                            <button className="btn btn-sm btn-outline-secondary">
                                                Withdraw
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredApplications.length > 0 && (
                        <div className="mt-4 text-center">
                            <p className="text-muted">
                                Showing {filteredApplications.length} of {applications.length} applications
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserJobsApplied;