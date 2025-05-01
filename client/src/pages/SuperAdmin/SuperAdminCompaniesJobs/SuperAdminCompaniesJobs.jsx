import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SuperAdminCompaniesJobs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        type: 'All',
        location: 'All'
    });

    useEffect(() => {
        // Simulate API fetch
        const fetchData = async () => {
            try {
                // Mock company data
                const mockCompany = {
                    id: 1,
                    name: 'TechSphere Solutions',
                    logo: 'https://via.placeholder.com/150/007bff/ffffff?text=TS'
                };

                // Mock jobs data
                const mockJobs = [
                    {
                        id: 1,
                        title: 'Senior Frontend Developer',
                        type: 'Full-time',
                        location: 'Remote',
                        salary: '$120,000 - $150,000',
                        posted: '2 days ago',
                        description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces and implementing features for our web applications.',
                        requirements: [
                            '5+ years of experience with React',
                            'Strong JavaScript/TypeScript skills',
                            'Experience with modern CSS frameworks',
                            'Familiarity with RESTful APIs'
                        ]
                    },
                    {
                        id: 2,
                        title: 'UX/UI Designer',
                        type: 'Full-time',
                        location: 'San Francisco, CA',
                        salary: '$100,000 - $130,000',
                        posted: '1 week ago',
                        description: 'Join our design team to create beautiful, intuitive user experiences for our products. You will work closely with product managers and engineers.',
                        requirements: [
                            'Portfolio demonstrating UI/UX skills',
                            '3+ years of design experience',
                            'Proficiency with Figma or Sketch',
                            'Understanding of user-centered design'
                        ]
                    },
                    // Add more mock jobs
                ];

                setTimeout(() => {
                    setCompany(mockCompany);
                    setJobs(mockJobs);
                    setLoading(false);
                }, 800);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.description.toLowerCase().includes(filters.search.toLowerCase());
        const matchesType = filters.type === 'All' || job.type === filters.type;
        const matchesLocation = filters.location === 'All' || job.location === filters.location;
        return matchesSearch && matchesType && matchesLocation;
    });

    if (loading) {
        return (
            <>
                <div className="container-fluid">
                    <div className="container py-5">
                        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                            <div className="text-center">
                                <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading jobs...</p>
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
                <div className="container py-5">
                    <div className="bg-light min-vh-100">
                        {/* Header */}
                        <div className="bg-white shadow-sm">
                            <div className="container py-4">
                                <div className="d-flex align-items-center">
                                    <button
                                        className="btn btn-outline-secondary me-3"
                                        onClick={() => navigate(-1)}
                                    >
                                        <i className="bi bi-arrow-left"></i> Back to Company
                                    </button>
                                    <img
                                        src={company.logo}
                                        alt={`${company.name} logo`}
                                        className="rounded-circle me-3"
                                        width="50"
                                        height="50"
                                    />
                                    <h1 className="h4 mb-0">Jobs at {company.name}</h1>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="container py-4">
                            <div className="card shadow-sm mb-4">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0">
                                                    <i className="bi bi-search text-muted"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0"
                                                    placeholder="Search jobs..."
                                                    value={filters.search}
                                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <select
                                                className="form-select"
                                                value={filters.type}
                                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                            >
                                                <option value="All">All Types</option>
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Internship">Internship</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <select
                                                className="form-select"
                                                value={filters.location}
                                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                            >
                                                <option value="All">All Locations</option>
                                                <option value="Remote">Remote</option>
                                                <option value="San Francisco, CA">San Francisco</option>
                                                <option value="New York, NY">New York</option>
                                                <option value="Austin, TX">Austin</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Jobs List */}
                            <div className="row">
                                <div className="col-lg-8">
                                    {filteredJobs.length > 0 ? (
                                        filteredJobs.map(job => (
                                            <div key={job.id} className="card shadow-sm mb-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h3 className="h5 mb-1">{job.title}</h3>
                                                            <div className="d-flex gap-3 text-muted small mb-3">
                                                                <span><i className="bi bi-briefcase me-1"></i> {job.type}</span>
                                                                <span><i className="bi bi-geo-alt me-1"></i> {job.location}</span>
                                                                <span><i className="bi bi-cash-stack me-1"></i> {job.salary}</span>
                                                                <span><i className="bi bi-clock me-1"></i> {job.posted}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="btn btn-primary align-self-start"
                                                            onClick={() => navigate(`/companies/${id}/jobs/${job.id}`)}
                                                        >
                                                            Apply Now
                                                        </button>
                                                    </div>
                                                    <p className="text-muted mb-3">{job.description}</p>
                                                    <div className="mb-3">
                                                        <h6 className="small fw-bold mb-2">Requirements:</h6>
                                                        <ul className="list-unstyled">
                                                            {job.requirements.map((req, i) => (
                                                                <li key={i} className="d-flex align-items-start mb-1">
                                                                    <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                                                                    <span>{req}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <button
                                                        className="btn btn-link text-decoration-none p-0"
                                                        onClick={() => navigate(`/companies/${id}/jobs/${job.id}`)}
                                                    >
                                                        View full job details <i className="bi bi-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="card shadow-sm">
                                            <div className="card-body text-center py-5">
                                                <i className="bi bi-briefcase display-4 text-muted mb-3"></i>
                                                <h3 className="h4 mb-3">No jobs found</h3>
                                                <p className="text-muted mb-4">Try adjusting your search filters</p>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => setFilters({
                                                        search: '',
                                                        type: 'All',
                                                        location: 'All'
                                                    })}
                                                >
                                                    Reset Filters
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="col-lg-4">
                                    <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center mb-4">
                                                <img
                                                    src={company.logo}
                                                    alt={`${company.name} logo`}
                                                    className="rounded-circle me-3"
                                                    width="60"
                                                    height="60"
                                                />
                                                <div>
                                                    <h5 className="mb-0">{company.name}</h5>
                                                    <small className="text-muted">
                                                        <i className="bi bi-briefcase me-1"></i> {jobs.length} open positions
                                                    </small>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-outline-primary w-100 mb-3"
                                                onClick={() => navigate(`/companies/${id}`)}
                                            >
                                                <i className="bi bi-building me-1"></i> View Company Profile
                                            </button>
                                            <div className="alert alert-info">
                                                <div className="d-flex">
                                                    <i className="bi bi-info-circle-fill me-2"></i>
                                                    <div>
                                                        <h6 className="alert-heading mb-1">Create Job Alert</h6>
                                                        <p className="small mb-0">Get notified when new jobs are posted</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-sm mb-2"
                                                        placeholder="Your email"
                                                    />
                                                    <button className="btn btn-sm btn-info w-100">Create Alert</button>
                                                </div>
                                            </div>
                                        </div>
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

export default SuperAdminCompaniesJobs;