import React, { useState } from 'react';

const SuperAdminAllUser = () => {
    const [activeTab, setActiveTab] = useState('company');
    const [showProfile, setShowProfile] = useState(false);
    const [currentProfile, setCurrentProfile] = useState(null);
    const [profileType, setProfileType] = useState('');

    // Sample data
    const companies = [
        { id: 1, name: 'Tech Corp', industry: 'Technology', location: 'San Francisco', employees: 500 },
        { id: 2, name: 'Design Studio', industry: 'Creative', location: 'New York', employees: 50 },
        { id: 3, name: 'Marketing Pros', industry: 'Marketing', location: 'Chicago', employees: 120 }
    ];

    const interviewers = [
        { id: 1, name: 'John Smith', role: 'HR Manager', experience: '5 years', skills: 'Interviewing, Recruitment' },
        { id: 2, name: 'Sarah Johnson', role: 'Tech Lead', experience: '8 years', skills: 'Technical Interviews' },
        { id: 3, name: 'Mike Brown', role: 'Senior Developer', experience: '6 years', skills: 'Coding Tests' }
    ];

    const candidates = [
        { id: 1, name: 'Alex Turner', status: 'Active', skills: 'React, Node.js', appliedFor: 'Frontend Developer' },
        { id: 2, name: 'Emily Clark', status: 'Hired', skills: 'Python, Django', appliedFor: 'Backend Developer' },
        { id: 3, name: 'David Wilson', status: 'Interviewing', skills: 'Java, Spring', appliedFor: 'Full Stack Developer' }
    ];

    const handleViewProfile = (profile, type) => {
        setCurrentProfile(profile);
        setProfileType(type);
        setShowProfile(true);
    };

    const handleCloseProfile = () => {
        setShowProfile(false);
        setCurrentProfile(null);
    };

    const renderTable = () => {
        switch (activeTab) {
            case 'company':
                return (
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Industry</th>
                                <th>Location</th>
                                <th>Employees</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => (
                                <tr key={company.id}>
                                    <td>{company.id}</td>
                                    <td>{company.name}</td>
                                    <td>{company.industry}</td>
                                    <td>{company.location}</td>
                                    <td>{company.employees}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleViewProfile(company, 'company')}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'interviewer':
                return (
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Experience</th>
                                <th>Skills</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviewers.map(interviewer => (
                                <tr key={interviewer.id}>
                                    <td>{interviewer.id}</td>
                                    <td>{interviewer.name}</td>
                                    <td>{interviewer.role}</td>
                                    <td>{interviewer.experience}</td>
                                    <td>{interviewer.skills}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleViewProfile(interviewer, 'interviewer')}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'candidate':
                return (
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Skills</th>
                                <th>Applied For</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <tr key={candidate.id}>
                                    <td>{candidate.id}</td>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.status}</td>
                                    <td>{candidate.skills}</td>
                                    <td>{candidate.appliedFor}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleViewProfile(candidate, 'candidate')}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    const renderProfileModal = () => {
        if (!currentProfile) return null;

        return (
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {profileType === 'company' && 'Company Profile'}
                                {profileType === 'interviewer' && 'Interviewer Profile'}
                                {profileType === 'candidate' && 'Candidate Profile'}
                            </h5>
                            <button type="button" className="btn-close" onClick={handleCloseProfile}></button>
                        </div>
                        <div className="modal-body">
                            {profileType === 'company' && (
                                <div>
                                    <h4>{currentProfile.name}</h4>
                                    <p><strong>Industry:</strong> {currentProfile.industry}</p>
                                    <p><strong>Location:</strong> {currentProfile.location}</p>
                                    <p><strong>Employees:</strong> {currentProfile.employees}</p>
                                </div>
                            )}
                            {profileType === 'interviewer' && (
                                <div>
                                    <h4>{currentProfile.name}</h4>
                                    <p><strong>Role:</strong> {currentProfile.role}</p>
                                    <p><strong>Experience:</strong> {currentProfile.experience}</p>
                                    <p><strong>Skills:</strong> {currentProfile.skills}</p>
                                </div>
                            )}
                            {profileType === 'candidate' && (
                                <div>
                                    <h4>{currentProfile.name}</h4>
                                    <p><strong>Status:</strong> {currentProfile.status}</p>
                                    <p><strong>Skills:</strong> {currentProfile.skills}</p>
                                    <p><strong>Applied For:</strong> {currentProfile.appliedFor}</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseProfile}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">User Management</h2>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'company' ? 'active' : ''}`}
                        onClick={() => setActiveTab('company')}
                    >
                        Companies
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'interviewer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('interviewer')}
                    >
                        Interviewers
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'candidate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('candidate')}
                    >
                        Candidates
                    </button>
                </li>
            </ul>

            <div className="tab-content mt-3">
                {renderTable()}
            </div>

            {showProfile && renderProfileModal()}
        </div>
    );
};

export default SuperAdminAllUser;