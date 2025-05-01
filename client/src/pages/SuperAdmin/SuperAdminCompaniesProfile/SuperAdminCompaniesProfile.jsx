import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SuperAdminCompaniesProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        // Simulate API fetch
        const fetchCompany = async () => {
            try {
                // Mock data - in real app you would fetch by ID
                const mockCompany = {
                    id: 1,
                    name: 'TechSphere Solutions',
                    logo: 'https://via.placeholder.com/150/007bff/ffffff?text=TS',
                    cover: 'https://via.placeholder.com/1200x400/007bff/ffffff?text=TechSphere',
                    industry: 'Technology',
                    location: 'San Francisco, CA',
                    description: 'Innovative technology solutions for the digital age. We specialize in AI, cloud computing, and cybersecurity.',
                    website: 'https://techsphere.example.com',
                    employees: '500-1000',
                    founded: 2015,
                    rating: 4.8,
                    reviews: 125,
                    jobsCount: 24,
                    about: 'TechSphere Solutions is a leading technology company dedicated to transforming businesses through innovative digital solutions. With a team of over 800 professionals across 3 continents, we help companies navigate the digital landscape.',
                    culture: 'We foster a culture of innovation, collaboration, and continuous learning. Our employees enjoy flexible work arrangements, professional development opportunities, and a vibrant work environment.',
                    benefits: ['Competitive salaries', 'Health insurance', '401(k) matching', 'Flexible PTO', 'Remote work options', 'Professional development budget'],
                    photos: [
                        'https://via.placeholder.com/400x300/007bff/ffffff?text=Office+1',
                        'https://via.placeholder.com/400x300/007bff/ffffff?text=Team+2',
                        'https://via.placeholder.com/400x300/007bff/ffffff?text=Event+3'
                    ]
                };

                setTimeout(() => {
                    setCompany(mockCompany);
                    setLoading(false);
                }, 800);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchCompany();
    }, [id]);

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
                                <p className="mt-3 text-muted">Loading company profile...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!company) {
        return (
            <>
                <div className="container-fluid">
                    <div className="container py-5">
                        <div className="container py-5 text-center">
                            <div className="bg-white rounded-3 p-5 shadow-sm">
                                <i className="bi bi-building-x display-1 text-muted mb-4"></i>
                                <h3 className="mb-3">Company not found</h3>
                                <p className="text-muted mb-4">The company you're looking for doesn't exist or may have been removed</p>
                                <button
                                    className="btn btn-primary px-4"
                                    onClick={() => navigate('/companies')}
                                >
                                    Browse Companies
                                </button>
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
                        {/* Cover Photo */}
                        <div
                            className="bg-dark position-relative"
                            style={{
                                height: '400px',
                                backgroundImage: `url(${company.cover})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white py-4">
                                <div className="container">
                                    <div className="d-flex align-items-end">
                                        <img
                                            src={company.logo}
                                            alt={`${company.name} logo`}
                                            className="rounded-circle border border-4 border-white shadow-lg me-4"
                                            width="120"
                                            height="120"
                                        />
                                        <div>
                                            <h1 className="display-5 fw-bold mb-1">{company.name}</h1>
                                            <div className="d-flex align-items-center gap-4 mb-3">
                                                <span>
                                                    <i className="bi bi-geo-alt-fill me-1"></i>
                                                    {company.location}
                                                </span>
                                                <span>
                                                    <i className="bi bi-building me-1"></i>
                                                    {company.industry}
                                                </span>
                                                <span className="badge bg-success bg-opacity-25 text-success">
                                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                                    {company.rating} ({company.reviews} reviews)
                                                </span>
                                            </div>
                                            <div className="d-flex gap-3">
                                                <button
                                                    className="btn btn-primary rounded-pill px-4"
                                                    onClick={() => navigate(`/companies/${company.id}/jobs`)}
                                                >
                                                    <i className="bi bi-briefcase-fill me-1"></i> View {company.jobsCount} Jobs
                                                </button>
                                                <a
                                                    href={company.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-light rounded-pill px-4"
                                                >
                                                    <i className="bi bi-globe me-1"></i> Website
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-4 mb-4 mb-lg-0">
                                    <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                                        <div className="card-body">
                                            <h5 className="card-title mb-4">Company Details</h5>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="text-muted">Industry</span>
                                                    <span>{company.industry}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="text-muted">Location</span>
                                                    <span>{company.location}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="text-muted">Founded</span>
                                                    <span>{company.founded}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="text-muted">Employees</span>
                                                    <span>{company.employees}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="text-muted">Open Jobs</span>
                                                    <span className="badge bg-primary rounded-pill">{company.jobsCount}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8">
                                    <div className="card shadow-sm mb-4">
                                        <div className="card-header bg-white">
                                            <ul className="nav nav-tabs card-header-tabs">
                                                <li className="nav-item">
                                                    <button
                                                        className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                                                        onClick={() => setActiveTab('about')}
                                                    >
                                                        About
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                        className={`nav-link ${activeTab === 'culture' ? 'active' : ''}`}
                                                        onClick={() => setActiveTab('culture')}
                                                    >
                                                        Culture
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                        className={`nav-link ${activeTab === 'benefits' ? 'active' : ''}`}
                                                        onClick={() => setActiveTab('benefits')}
                                                    >
                                                        Benefits
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                        className={`nav-link ${activeTab === 'photos' ? 'active' : ''}`}
                                                        onClick={() => setActiveTab('photos')}
                                                    >
                                                        Photos
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-body">
                                            {activeTab === 'about' && (
                                                <div>
                                                    <h5 className="mb-3">About {company.name}</h5>
                                                    <p className="text-muted">{company.about}</p>
                                                </div>
                                            )}
                                            {activeTab === 'culture' && (
                                                <div>
                                                    <h5 className="mb-3">Our Culture</h5>
                                                    <p className="text-muted">{company.culture}</p>
                                                </div>
                                            )}
                                            {activeTab === 'benefits' && (
                                                <div>
                                                    <h5 className="mb-3">Employee Benefits</h5>
                                                    <div className="row">
                                                        {company.benefits.map((benefit, index) => (
                                                            <div key={index} className="col-md-6 mb-2">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                                    <span>{benefit}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {activeTab === 'photos' && (
                                                <div>
                                                    <h5 className="mb-3">Life at {company.name}</h5>
                                                    <div className="row g-3">
                                                        {company.photos.map((photo, index) => (
                                                            <div key={index} className="col-md-4">
                                                                <img
                                                                    src={photo}
                                                                    alt={`Company photo ${index + 1}`}
                                                                    className="img-fluid rounded shadow-sm"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h5 className="mb-0">Open Positions</h5>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => navigate(`/companies/${company.id}/jobs`)}
                                                >
                                                    View All Jobs
                                                </button>
                                            </div>

                                            {/* Sample job listings - in real app you would fetch these */}
                                            <div className="list-group list-group-flush">
                                                <div className="list-group-item py-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h6 className="mb-1">Senior Frontend Developer</h6>
                                                            <div className="d-flex gap-3 text-muted small mb-2">
                                                                <span><i className="bi bi-briefcase me-1"></i> Full-time</span>
                                                                <span><i className="bi bi-geo-alt me-1"></i> Remote</span>
                                                                <span><i className="bi bi-cash-stack me-1"></i> $120k - $150k</span>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-sm btn-outline-primary align-self-center">
                                                            Apply Now
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="list-group-item py-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h6 className="mb-1">UX/UI Designer</h6>
                                                            <div className="d-flex gap-3 text-muted small mb-2">
                                                                <span><i className="bi bi-briefcase me-1"></i> Full-time</span>
                                                                <span><i className="bi bi-geo-alt me-1"></i> San Francisco</span>
                                                                <span><i className="bi bi-cash-stack me-1"></i> $100k - $130k</span>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-sm btn-outline-primary align-self-center">
                                                            Apply Now
                                                        </button>
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
            </div>
        </>
    );
};

export default SuperAdminCompaniesProfile;