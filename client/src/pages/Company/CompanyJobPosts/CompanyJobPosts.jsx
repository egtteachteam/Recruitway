import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const jobList = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA (Remote)',
        salary: '$120,000 - $150,000',
        type: 'Full-time',
        experience: '5+ years',
        posted: '2 days ago',
        description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces and implementing features using React and TypeScript.',
        requirements: [
            '5+ years of experience with JavaScript/TypeScript',
            'Strong proficiency in React and Redux',
            'Experience with modern frontend build pipelines',
            'Familiarity with RESTful APIs',
            'Knowledge of modern authorization mechanisms'
        ],
        skills: ['React', 'TypeScript', 'Redux', 'JavaScript', 'HTML/CSS'],
        applicants: 24,
        status: 'Active'
    },
    {
        id: 2,
        title: 'UX/UI Designer',
        company: 'Creative Solutions LLC',
        location: 'New York, NY (Hybrid)',
        salary: '$90,000 - $110,000',
        type: 'Full-time',
        experience: '3+ years',
        posted: '1 week ago',
        description: 'Join our design team to create beautiful, intuitive interfaces for our products. You will work closely with product managers and engineers to deliver exceptional user experiences.',
        requirements: [
            '3+ years of UX/UI design experience',
            'Portfolio demonstrating design skills',
            'Proficiency in Figma or Sketch',
            'Understanding of user-centered design',
            'Experience with design systems'
        ],
        skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Wireframing'],
        applicants: 15,
        status: 'Active'
    }
];

const JobPostCard = ({ isOpen, job, onClose }) => {
    const {
        title,
        company,
        location,
        salary,
        type,
        experience,
        posted,
        description,
        requirements,
        skills,
        applicants,
        status
    } = job;

    return (
        <>
            <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Header */}
                        <div className="modal-header px-3 py-4">
                            <h5 className="modal-title">Full Job Post</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body px-3">
                            <div className="card mb-4 border-0 shadow-sm hover-shadow transition-all">
                                <div className="card-body p-3 p-md-4">
                                    {/* Job Header */}
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <h4 className="card-title mb-1 fw-bold">{title}</h4>
                                            <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                                                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
                                                    {company}
                                                </span>
                                                <span className={`badge rounded-pill ${status === 'Active' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${status === 'Active' ? 'success' : 'secondary'} fw-normal`}>
                                                    {status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Actions
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                {/* <li><button className="dropdown-item">View Details</button></li> */}
                                                <li><button className="dropdown-item">Edit Post</button></li>
                                                <li><button className="dropdown-item">View Applicants</button></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="dropdown-item text-danger">Close Post</button></li>
                                                <li><button className="dropdown-item text-danger">Delete Post</button></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Job Meta */}
                                    <div className="row mb-3">
                                        <div className="col-12 col-md-6 mb-2 mb-md-0">
                                            <div className="d-flex align-items-center text-muted mb-2">
                                                <i className="ti ti-building me-2 flex-shrink-0"></i>
                                                <small>{location}</small>
                                            </div>
                                            <div className="d-flex align-items-center text-muted">
                                                <i className="ti ti-currency-dollar me-2 flex-shrink-0"></i>
                                                <small>{salary}</small>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="d-flex align-items-center text-muted mb-2">
                                                <i className="ti ti-briefcase me-2 flex-shrink-0"></i>
                                                <small>{type}</small>
                                            </div>
                                            <div className="d-flex align-items-center text-muted">
                                                <i className="ti ti-user me-2 flex-shrink-0"></i>
                                                <small>{experience} experience</small>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Posted Date and Applicants */}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center text-muted">
                                            <i className="ti ti-calendar-event me-2 flex-shrink-0"></i>
                                            <small>Posted: {posted}</small>
                                        </div>
                                        <div className="d-flex align-items-center text-muted">
                                            <small>{applicants} applicants</small>
                                        </div>
                                    </div>

                                    {/* Job Description */}
                                    <div className="mb-3">
                                        <h6 className="fw-bold mb-2">Job Description</h6>
                                        <p className="text-muted mb-0">{description}</p>
                                    </div>

                                    {/* Requirements */}
                                    <div className="mb-3">
                                        <h6 className="fw-bold mb-2">Requirements</h6>
                                        <ul className="text-muted mb-0 ps-3">
                                            {requirements.map((req, idx) => (
                                                <li key={idx}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-3">
                                        <h6 className="fw-bold mb-2">Skills</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {skills?.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="badge bg-primary bg-opacity-10 text-primary fw-normal py-2 px-3"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="card-footer bg-transparent border-top-0 d-flex flex-column flex-md-row justify-content-between align-items-center p-3 gap-2">
                                    <div className="d-flex gap-2 w-100 w-md-auto">
                                        <button className="btn btn-sm btn-outline-primary flex-grow-1">
                                            View Applicants
                                        </button>
                                        <button className="btn btn-sm btn-secondary flex-grow-1">
                                            Edit Post
                                        </button>
                                        <button className="btn btn-sm btn-danger flex-grow-1">
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const CompanyJobPosts = ({ isLoading = false }) => {
    const [jobPostOpen, setJobPostOpen] = useState(false)
    const [selectedJobPost, setSelectedJobPost] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const jobListPerPage = 10;

    const handleViewJobPost = (jobpost) => {
        setJobPostOpen(true);
        setSelectedJobPost(jobpost);
    };

    const handleModalClose = () => {
        setJobPostOpen(false);
        setSelectedJobPost(null);
    };

    // Pagination logic
    const indexOfLastJobList = currentPage * jobListPerPage;
    const indexOfFirstJobList = indexOfLastJobList - jobListPerPage;
    const currentJobList = jobList.slice(indexOfFirstJobList, indexOfLastJobList);
    const totalPages = Math.ceil(jobList.length / jobListPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid">
            <div className="container py-3 py-md-4">
                {/* Header */}
                <div className="d-flex flex-column justify-content-between align-items-stretch mb-4 gap-3">
                    <div className="mb-3 mb-md-0">
                        <h2 className="fw-bold mb-1">Job Posts</h2>
                        <p className="text-muted mb-0">Manage your current job openings</p>
                    </div>
                    <div className="d-flex flex-column flex-md-row gap-3 w-100 w-md-auto">
                        <div className="position-relative flex-grow-1">
                            <input
                                type="text"
                                className="form-control form-control-sm ps-5"
                                placeholder="Search jobs..."
                            />
                            <i className="ti ti-search position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                        </div>
                        <select className="form-select form-select-sm w-auto">
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Draft</option>
                            <option>Closed</option>
                        </select>
                        <Link to="/company/create-job-post" className="btn btn-sm btn-primary">
                            Create New Job
                        </Link>
                    </div>
                </div>

                {/* Table */}
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="d-none d-sm-table-cell">Title</th>
                                        <th>Location</th>
                                        <th className="d-none d-md-table-cell">Experience</th>
                                        <th className="d-none d-lg-table-cell">Posted</th>
                                        <th>Status</th>
                                        <th>Action</th>
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
                                    ) : currentJobList.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-muted">
                                                No Job found. Add your first Job.
                                            </td>
                                        </tr>
                                    ) : (
                                        currentJobList.map((job) => (
                                            <tr key={job.id}>
                                                <td className="d-none d-sm-table-cell">{job.title || <span className="text-muted">N/A</span>}</td>
                                                <td>{job.location}</td>
                                                <td className="d-none d-md-table-cell">{job.experience}</td>
                                                <td className="d-none d-lg-table-cell">{job.posted}</td>
                                                <td className="">{job.status}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleViewJobPost(job)}>
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
                {jobPostOpen && selectedJobPost && (
                    <JobPostCard
                        isOpen={jobPostOpen}
                        job={selectedJobPost}
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
    );
};

export default CompanyJobPosts;