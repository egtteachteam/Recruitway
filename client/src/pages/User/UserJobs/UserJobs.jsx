import React, { useState } from 'react';

const UserJobs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);

    // Sample job data
    const jobs = [
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
            title: 'Backend Engineer',
            company: 'Data Systems LLC',
            location: 'New York, NY (Hybrid)',
            salary: '$110,000 - $140,000',
            type: 'Full-time',
            experience: '4+ years',
            posted: '1 week ago',
            description: 'Seeking a Backend Engineer to develop and maintain our server infrastructure and APIs.',
            requirements: [
                'Experience with Node.js and Python',
                'Knowledge of database systems',
                'Understanding of cloud services'
            ],
            skills: ['Node.js', 'Python', 'SQL', 'AWS'],
            applicants: 18,
            status: 'Active'
        },
        {
            id: 3,
            title: 'UX Designer',
            company: 'Creative Minds Co.',
            location: 'Remote',
            salary: '$90,000 - $120,000',
            type: 'Contract',
            experience: '3+ years',
            posted: '3 days ago',
            description: 'Looking for a talented UX Designer to create beautiful and functional user experiences.',
            requirements: [
                'Portfolio of design work',
                'Experience with Figma or Sketch',
                'Understanding of user research methods'
            ],
            skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
            applicants: 12,
            status: 'Active'
        }
    ];

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleViewJob = (job) => {
        setSelectedJob(job);
    };

    if (selectedJob) {
        return (
            <>
                <div className="container-fluid">
                    <div className="container mt-4">
                        <button
                            className="btn btn-sm btn-primary mb-3"
                            onClick={() => setSelectedJob(null)}
                        >
                            Back to Jobs
                        </button>

                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h2>{selectedJob.title}</h2>
                                <h5>{selectedJob.company}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <p><strong>Location:</strong> {selectedJob.location}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p><strong>Salary:</strong> {selectedJob.salary}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p><strong>Type:</strong> {selectedJob.type}</p>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <h5>Job Description</h5>
                                    <p>{selectedJob.description}</p>
                                </div>

                                <div className="mb-3">
                                    <h5>Requirements</h5>
                                    <ul>
                                        {selectedJob.requirements.map((req, index) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-3">
                                    <h5>Skills</h5>
                                    <div className="d-flex flex-wrap gap-2">
                                        {selectedJob.skills.map((skill, index) => (
                                            <span key={index} className="badge bg-primary">{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <p><small className="text-muted">Posted: {selectedJob.posted}</small></p>
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <span className={`badge ${selectedJob.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {selectedJob.status}
                                        </span>
                                        <span className="ms-2 text-muted">{selectedJob.applicants} applicants</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <button className="btn btn-primary">Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container-fluid">
                <div className="container mt-4">
                    <h1 className="mb-4">Available Jobs</h1>

                    {/* Search Bar */}
                    <div className="mb-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search jobs by title, company, location or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="button">
                                <i className="bi bi-search"></i> Search
                            </button>
                        </div>
                    </div>

                    {/* Jobs List */}
                    <div className="row">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map(job => (
                                <div key={job.id} className="col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h4 className="card-title">{job.title}</h4>
                                            <h5 className="card-subtitle mb-2 text-muted">{job.company}</h5>
                                            <div className="row mt-3">
                                                <div className="col-12 col-md-6 mb-2 mb-md-0">
                                                    <p className="mb-0">
                                                        <i className="bi bi-geo-alt me-2"></i> {job.location}
                                                    </p>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <p className="mb-0">
                                                        <i className="bi bi-cash me-2"></i> {job.salary}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="my-3">
                                                <span className="badge bg-info me-2">{job.type}</span>
                                                <span className="badge bg-warning">{job.experience} experience</span>
                                            </div>
                                            <p className="card-text text-truncate">{job.description}</p>
                                            <div className="d-flex flex-wrap gap-2 mb-3">
                                                {job.skills.slice(0, 4).map((skill, index) => (
                                                    <span key={index} className="badge bg-secondary">{skill}</span>
                                                ))}
                                                {job.skills.length > 4 && (
                                                    <span className="badge bg-light text-dark">+{job.skills.length - 4} more</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="card-footer bg-transparent">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <small className="text-muted">Posted {job.posted}</small>
                                                    <span className={`badge ms-2 ${job.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                                        {job.status}
                                                    </span>
                                                </div>
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => handleViewJob(job)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <div className="alert alert-info">
                                    No jobs found matching your search criteria.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserJobs;