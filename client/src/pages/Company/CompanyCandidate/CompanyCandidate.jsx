import React, { useState } from 'react';

const candidateList = [
    {
        id: 1,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '+1 555-123-4567',
        tagline: 'Passionate full-stack developer with a love for clean code',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
        jobs: [
            {
                title: 'Frontend Developer',
                company: 'Acme Corp',
                duration: 'Jan 2020 - Present'
            },
            {
                title: 'Full Stack Engineer',
                company: 'Beta Ltd',
                duration: 'Mar 2018 - Dec 2019'
            }
        ],
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        status: 'Active',
        lastActive: '2 days ago'
    },
    {
        id: 2,
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 555-987-6543',
        tagline: 'UI/UX designer who brings user-centric visions to life',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Wireframing', 'UX Writing'],
        jobs: [],
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        status: 'New',
        lastActive: 'Just now'
    }
];

const CandidateCard = ({ isOpen, candidate, onClose }) => {
    if (!isOpen || !candidate) return null;

    const { name, email, phone, tagline, skills, jobs, avatar, status, lastActive } = candidate;

    return (
        <>
            <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Header */}
                        <div className="modal-header px-3 py-4">
                            <h5 className="modal-title">Full Application</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body px-3">
                            <div className="d-flex flex-column flex-md-row align-items-start mt-2">
                                <div className="mb-3 mb-md-0 me-md-4 text-center">
                                    <img
                                        src={avatar || 'https://via.placeholder.com/80'}
                                        alt={name}
                                        className="rounded-circle border"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    />
                                </div>

                                <div className="flex-grow-1 w-100">
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                                        <div className="mb-2 mb-md-0">
                                            <h4 className="card-title mb-1 fw-bold">{name}</h4>
                                            <span className={`badge rounded-pill bg-opacity-10 text-${status === 'Active' ? 'success' : 'info'} bg-${status === 'Active' ? 'success' : 'info'}`}>
                                                {status} • {lastActive}
                                            </span>
                                        </div>
                                        <div className="dropdown">
                                            <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                Actions
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><button className="dropdown-item">View Full Profile</button></li>
                                                <li><button className="dropdown-item">Send Message</button></li>
                                                <li><button className="dropdown-item">Shortlist</button></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="dropdown-item text-danger">Reject Candidate</button></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <p className="card-text text-muted mb-3 d-flex align-items-center">
                                        <i className="ti ti-user me-2 flex-shrink-0"></i>
                                        {tagline || 'No tagline available'}
                                    </p>

                                    <div className="row mb-3">
                                        <div className="col-12 col-md-6 mb-2 mb-md-0">
                                            <div className="d-flex align-items-center text-muted">
                                                <i className="ti ti-mail me-2 flex-shrink-0"></i>
                                                <small className="text-truncate">{email}</small>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="d-flex align-items-center text-muted">
                                                <i className="ti ti-phone me-2 flex-shrink-0"></i>
                                                <small>{phone}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="d-flex align-items-center mb-2">
                                            <i className="ti ti-code me-2 text-primary"></i>
                                            <span className="fw-bold">Technical Skills</span>
                                        </h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {skills?.length ? skills.map((skill, idx) => (
                                                <span key={idx} className="badge bg-primary bg-opacity-10 text-primary fw-normal py-2 px-3">
                                                    {skill}
                                                </span>
                                            )) : (
                                                <span className="text-muted">No skills listed</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h6 className="d-flex align-items-center mb-2">
                                            <i className="ti ti-briefcase me-2 text-primary"></i>
                                            <span className="fw-bold">Work Experience</span>
                                        </h6>
                                        {jobs?.length > 0 ? (
                                            <ul className="list-unstyled mb-0">
                                                {jobs.map((job, idx) => (
                                                    <li key={idx} className="mb-2">
                                                        <div className="d-flex flex-column flex-md-row justify-content-between">
                                                            <span className="fw-medium">{job.title} • {job.company}</span>
                                                            <small className="text-muted">{job.duration}</small>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="d-flex align-items-center text-muted">
                                                <i className="ti ti-mood-sad me-2"></i>
                                                <span>No work experience added yet</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer bg-transparent border-top-0 d-flex flex-column flex-md-row justify-content-between align-items-center p-3 gap-2">
                                <button className="btn btn-sm btn-outline-primary w-100 w-md-auto">
                                    View Full Profile
                                </button>
                                <button className="btn btn-sm btn-outline-primary w-100 w-md-auto">
                                    Send Message
                                </button>
                                <div className="d-flex gap-2 w-100 w-md-auto">
                                    <button className="btn btn-sm btn-success flex-grow-1">Shortlist</button>
                                    <button className="btn btn-sm btn-danger flex-grow-1">Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const CompanyCandidate = ({ isLoading = false }) => {
    const [isCandidateApplicationOpen, setIsCandidateApplicationOpen] = useState(false)
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleViewCandidate = (candidate) => {
        setIsCandidateApplicationOpen(true);
        setSelectedCandidate(candidate);
    };

    const handleModalClose = () => {
        setIsCandidateApplicationOpen(false);
        setSelectedCandidate(null);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const candidateListPerPage = 10;


    // Pagination logic
    const indexOfLastCandidateList = currentPage * candidateListPerPage;
    const indexOfFirstCandidateList = indexOfLastCandidateList - candidateListPerPage;
    const currentCandidateList = candidateList.slice(indexOfFirstCandidateList, indexOfLastCandidateList);
    const totalPages = Math.ceil(candidateList.length / candidateListPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container-fluid">
                <div className="container py-3 py-md-4">
                    {/* Header */}
                    <div className="d-flex flex-column justify-content-between align-items-stretch mb-4 gap-3">
                        <div className="mb-3 mb-md-0">
                            <h2 className="fw-bold mb-1">Candidate Profiles</h2>
                            <p className="text-muted mb-0">Find and manage your candidates</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row gap-3 w-100 w-md-auto">
                            <div className="position-relative flex-grow-1">
                                <input
                                    type="text"
                                    className="form-control form-control-sm ps-5"
                                    placeholder="Search candidates..."
                                />
                                <i className="ti ti-search position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                            </div>
                            <select className="form-select form-select-sm w-auto">
                                <option>All Statuses</option>
                                <option>Active</option>
                                <option>New</option>
                                <option>Interviewing</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="d-none d-sm-table-cell">Applied For</th>
                                            <th>Name</th>
                                            <th className="d-none d-md-table-cell">Email</th>
                                            <th className="d-none d-lg-table-cell">Phone</th>
                                            <th>Resume</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">
                                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                                        <div className="spinner-border spinner-border-sm" role="status"></div>
                                                        <span>Loading candidates...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : currentCandidateList.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4 text-muted">
                                                    No candidates found. Add your first candidate.
                                                </td>
                                            </tr>
                                        ) : (
                                            currentCandidateList.map((candidate) => (
                                                <tr key={candidate.id}>
                                                    <td className="d-none d-sm-table-cell">{candidate.appliedFor || <span className="text-muted">N/A</span>}</td>
                                                    <td>{candidate.name}</td>
                                                    <td className="d-none d-md-table-cell">{candidate.email}</td>
                                                    <td className="d-none d-lg-table-cell">{candidate.phone}</td>
                                                    <td>
                                                        {candidate.resumeUrl ? (
                                                            <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-nowrap">
                                                                View Resume
                                                            </a>
                                                        ) : (
                                                            <span className="text-muted">No resume</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleViewCandidate(candidate)}>
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Expanded View */}

                    {isCandidateApplicationOpen && selectedCandidate && (
                        <CandidateCard
                            isOpen={isCandidateApplicationOpen}
                            candidate={selectedCandidate}
                            onClose={handleModalClose}
                        />
                    )}



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
                </div>
            </div>
        </>
    );
};

export default CompanyCandidate;
