import { useParams, useNavigate } from 'react-router-dom';
import { useSuperAdminContext } from '../../../context/superadmin-context';
import { useEffect } from 'react';

const ViewApplicantPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { getApplicantsProfile, applicantProfile: applicant } = useSuperAdminContext()

    useEffect(() => {
        getApplicantsProfile(id)
    }, [])

    // Sample data - in real app you'd fetch this based on ID
    // const applicant = {
    //     _id: "app123",
    //     name: "John Doe",
    //     email: "john.doe@example.com",
    //     phone: "+1 (555) 123-4567",
    //     appliedDate: "2025-04-15T10:30:00.000Z",
    //     status: "Under Review",
    //     job: {
    //         title: "Front-End Developer",
    //         id: "job123"
    //     },
    //     resume: "/path/to/resume.pdf",
    //     coverLetter: "I'm excited to apply for this position...",
    //     experience: [
    //         {
    //             company: "Tech Corp",
    //             position: "Front-End Dev",
    //             duration: "2 years"
    //         }
    //     ],
    //     education: [
    //         {
    //             institution: "State University",
    //             degree: "BS Computer Science"
    //         }
    //     ],
    //     skills: ["React", "JavaScript", "CSS"],
    //     messages: [
    //         {
    //             id: "msg1",
    //             sender: "Admin",
    //             content: "We've received your application",
    //             date: "2025-04-16T09:15:00.000Z"
    //         }
    //     ]
    // };

    const handleChangeStatus = (newStatus) => {
        console.log(`Changing status to ${newStatus}`);
        // API call would go here
    };

    const handleSendMessage = (message) => {
        console.log(`Sending message: ${message}`);
        // API call would go here
    };

    return (
        // <div className="container-fluid bg-light">
        //     <div className="container py-5">
        //         {/* Back Button */}
        //         <button
        //             onClick={() => navigate(-1)}
        //             className="btn btn-outline-secondary mb-4"
        //         >
        //             <i className="bi bi-arrow-left me-2"></i> Back to Applicants
        //         </button>

        //         {/* Applicant Header */}
        //         <div className="card shadow-sm mb-4">
        //             <div className="card-body">
        //                 <div className="d-flex justify-content-between align-items-center">
        //                     <div>
        //                         <h1 className="h3 mb-1">{applicant.name}</h1>
        //                         <p className="text-muted mb-2">Applied for: {applicant.job.title}</p>
        //                         <span className={`badge ${applicant.status === 'New' ? 'bg-primary' :
        //                             applicant.status === 'Under Review' ? 'bg-info' :
        //                                 applicant.status === 'Rejected' ? 'bg-danger' : 'bg-success'
        //                             }`}>
        //                             {applicant.status}
        //                         </span>
        //                     </div>
        //                     <div className="dropdown">
        //                         <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        //                             Change Status
        //                         </button>
        //                         <ul className="dropdown-menu">
        //                             <li><button className="dropdown-item" onClick={() => handleChangeStatus('New')}>New</button></li>
        //                             <li><button className="dropdown-item" onClick={() => handleChangeStatus('Under Review')}>Under Review</button></li>
        //                             <li><button className="dropdown-item" onClick={() => handleChangeStatus('Interview')}>Interview</button></li>
        //                             <li><button className="dropdown-item" onClick={() => handleChangeStatus('Rejected')}>Rejected</button></li>
        //                             <li><button className="dropdown-item" onClick={() => handleChangeStatus('Hired')}>Hired</button></li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="row">
        //             {/* Main Applicant Info */}
        //             <div className="col-lg-8">
        //                 <div className="card shadow-sm mb-4">
        //                     <div className="card-body">
        //                         <h2 className="h5 mb-4">Application Details</h2>

        //                         <div className="row mb-4">
        //                             <div className="col-md-6">
        //                                 <h3 className="h6">Contact Information</h3>
        //                                 <ul className="list-unstyled">
        //                                     <li className="mb-2"><i className="bi bi-envelope me-2"></i>{applicant.email}</li>
        //                                     <li className="mb-2"><i className="bi bi-phone me-2"></i>{applicant.phone}</li>
        //                                     <li><i className="bi bi-calendar me-2"></i>Applied: {applicant.appliedDate}</li>
        //                                 </ul>
        //                             </div>
        //                             <div className="col-md-6">
        //                                 <h3 className="h6">Documents</h3>
        //                                 <div className="d-flex gap-2">
        //                                     <a href={applicant.resume} className="btn btn-outline-primary btn-sm">
        //                                         <i className="bi bi-file-earmark-pdf me-1"></i> View Resume
        //                                     </a>
        //                                     {applicant.coverLetter && (
        //                                         <button className="btn btn-outline-secondary btn-sm">
        //                                             <i className="bi bi-file-earmark-text me-1"></i> View Cover Letter
        //                                         </button>
        //                                     )}
        //                                 </div>
        //                             </div>
        //                         </div>

        //                         {/* Experience */}
        //                         <div className="mb-4">
        //                             <h3 className="h5 mb-3">Professional Experience</h3>
        //                             {applicant.experience.length > 0 ? (
        //                                 <ul className="list-group list-group-flush">
        //                                     {applicant.experience.map((exp, i) => (
        //                                         <li key={i} className="list-group-item">
        //                                             <h4 className="h6 mb-1">{exp.position}</h4>
        //                                             <p className="mb-1">{exp.company}</p>
        //                                             <small className="text-muted">{exp.duration}</small>
        //                                         </li>
        //                                     ))}
        //                                 </ul>
        //                             ) : (
        //                                 <p className="text-muted">No experience listed</p>
        //                             )}
        //                         </div>

        //                         {/* Education */}
        //                         <div className="mb-4">
        //                             <h3 className="h5 mb-3">Education</h3>
        //                             {applicant.education.length > 0 ? (
        //                                 <ul className="list-group list-group-flush">
        //                                     {applicant.education.map((edu, i) => (
        //                                         <li key={i} className="list-group-item">
        //                                             <h4 className="h6 mb-1">{edu.degree}</h4>
        //                                             <p className="mb-0">{edu.institution}</p>
        //                                         </li>
        //                                     ))}
        //                                 </ul>
        //                             ) : (
        //                                 <p className="text-muted">No education listed</p>
        //                             )}
        //                         </div>

        //                         {/* Skills */}
        //                         <div>
        //                             <h3 className="h5 mb-3">Skills</h3>
        //                             <div className="d-flex flex-wrap gap-2">
        //                                 {applicant.skills.map((skill, i) => (
        //                                     <span key={i} className="badge bg-light text-dark">{skill}</span>
        //                                 ))}
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 {/* Messages */}
        //                 <div className="card shadow-sm">
        //                     <div className="card-body">
        //                         <h2 className="h5 mb-4">Communication</h2>

        //                         <div className="mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        //                             {applicant.messages.map(msg => (
        //                                 <div key={msg.id} className="mb-3">
        //                                     <div className={`d-flex ${msg.sender === 'Admin' ? 'justify-content-end' : ''}`}>
        //                                         <div className={`p-3 rounded ${msg.sender === 'Admin' ? 'bg-primary text-white' : 'bg-light'}`}>
        //                                             <div className="d-flex justify-content-between small mb-1">
        //                                                 <span>{msg.sender}</span>
        //                                                 <span>{msg.date}</span>
        //                                             </div>
        //                                             <p className="mb-0">{msg.content}</p>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             ))}
        //                         </div>

        //                         <form onSubmit={(e) => {
        //                             e.preventDefault();
        //                             const message = e.target.message.value;
        //                             handleSendMessage(message);
        //                             e.target.reset();
        //                         }}>
        //                             <div className="input-group">
        //                                 <input
        //                                     type="text"
        //                                     name="message"
        //                                     className="form-control"
        //                                     placeholder="Type your message..."
        //                                     required
        //                                 />
        //                                 <button className="btn btn-primary" type="submit">
        //                                     <i className="bi bi-send"></i> Send
        //                                 </button>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Sidebar */}
        //             <div className="col-lg-4">
        //                 <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
        //                     <div className="card-body">
        //                         <h3 className="h5 mb-4">Admin Actions</h3>

        //                         <button className="btn btn-primary w-100 mb-2">
        //                             <i className="bi bi-calendar-check me-1"></i> Schedule Interview
        //                         </button>
        //                         <button className="btn btn-success w-100 mb-2">
        //                             <i className="bi bi-check-circle me-1"></i> Mark as Hired
        //                         </button>
        //                         <button className="btn btn-danger w-100 mb-2">
        //                             <i className="bi bi-x-circle me-1"></i> Reject Application
        //                         </button>
        //                         <button className="btn btn-outline-secondary w-100">
        //                             <i className="bi bi-download me-1"></i> Download Documents
        //                         </button>

        //                         <hr className="my-4" />

        //                         <h4 className="h6 mb-3">Quick Notes</h4>
        //                         <textarea className="form-control mb-2" rows="3" placeholder="Add private notes..."></textarea>
        //                         <button className="btn btn-sm btn-outline-primary w-100">Save Notes</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <>
            <div className="container-fluid bg-light">
                <div className="container py-5">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-sm btn-outline-secondary mb-4"
                    >
                        <i className="bi bi-arrow-left me-2"></i> Back to Applicants
                    </button>

                    {/* Applicant Header */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={applicant.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(applicant.fullname)}&background=random`}
                                        alt={applicant.fullname}
                                        className="rounded-circle object-fit-cover me-3"
                                        style={{ width: "80px", height: "80px" }}
                                    />
                                    <div>
                                        <h1 className="h3 mb-1">{applicant.fullname}</h1>
                                        <p className="text-muted mb-2">{applicant.headline}</p>
                                        <p className="text-muted mb-2"><i className="bi bi-geo-alt me-1"></i>{applicant.location}</p>
                                        <span className="badge bg-primary">
                                            Active {new Date(applicant.lastActive).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Main Applicant Info */}
                        <div className="col-lg-8">
                            <div className="card shadow-sm mb-4">
                                <div className="card-body">
                                    <h2 className="h5 mb-4">Candidate Details</h2>

                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <h3 className="h6">Contact Information</h3>
                                            <ul className="list-unstyled">
                                                <li className="mb-2"><a href={`mailto:${applicant.email}`}><i className="bi bi-envelope me-2"></i>{applicant.email}</a></li>
                                                <li className="mb-2"><a href={`tel:${applicant.phone}`}><i className="bi bi-phone me-2"></i>{applicant.phone}</a></li>
                                                <li className="mb-2"><i className="bi bi-calendar me-2"></i>DOB: {new Date(applicant.dob).toLocaleDateString()}</li>
                                                <li className="mb-2"><i className="bi bi-gender-ambiguous me-2"></i>{applicant.gender}</li>
                                                <li className="d-flex gap-2 mt-3">
                                                    {applicant?.socialMedia?.linkedin && (
                                                        <a href={applicant.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                                                            <i className="bi bi-linkedin fs-5"></i>
                                                        </a>
                                                    )}
                                                    {applicant?.socialMedia?.twitter && (
                                                        <a href={applicant.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                                                            <i className="bi bi-twitter fs-5"></i>
                                                        </a>
                                                    )}
                                                    {applicant?.socialMedia?.facebook && (
                                                        <a href={applicant.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                                            <i className="bi bi-facebook fs-5"></i>
                                                        </a>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <h3 className="h6">Documents</h3>
                                            <div className="d-flex flex-column gap-2">
                                                <a href={applicant.resume} className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                                                    <i className="bi bi-file-earmark-pdf me-1"></i> View Resume
                                                </a>
                                                <button className="btn btn-outline-secondary btn-sm">
                                                    <i className="bi bi-download me-1"></i> Download Resume
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="mb-4">
                                        <h3 className="h5 mb-3">Professional Summary</h3>
                                        <p>{applicant?.summary || "No summary provided"}</p>
                                    </div>

                                    {/* Experience */}
                                    <div className="mb-4">
                                        <h3 className="h5 mb-3">Professional Experience</h3>
                                        {applicant?.experience?.length > 0 ? (
                                            <div className="list-group">
                                                {applicant?.experience?.map((exp, i) => (
                                                    <div key={i} className="list-group-item border-0 p-0 mb-3">
                                                        <h4 className="h6 mb-1">{exp.title}</h4>
                                                        <p className="mb-1 fw-medium">{exp.company} • {exp.location}</p>
                                                        <p className="text-muted small mb-1">
                                                            {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                                                        </p>
                                                        <p className="mb-0">{exp.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted">No experience listed</p>
                                        )}
                                    </div>

                                    {/* Education */}
                                    <div className="mb-4">
                                        <h3 className="h5 mb-3">Education</h3>
                                        {applicant?.education?.length > 0 ? (
                                            <div className="list-group">
                                                {applicant?.education?.map((edu, i) => (
                                                    <div key={i} className="list-group-item border-0 p-0 mb-2">
                                                        <h4 className="h6 mb-1">{edu.degree}</h4>
                                                        <p className="mb-1">{edu.institution}</p>
                                                        <p className="text-muted small mb-0">Completed: {edu.year}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted">No education listed</p>
                                        )}
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-4">
                                        <h3 className="h5 mb-3">Skills</h3>
                                        <div className="d-flex flex-wrap gap-2">
                                            {applicant?.skills?.map((skillObj, i) => (
                                                <span key={i} className="badge bg-primary bg-opacity-10 text-primary">
                                                    {skillObj?.skills}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Certifications */}
                                    <div className="mb-4">
                                        <h3 className="h5 mb-3">Certifications</h3>
                                        {applicant?.certifications?.length > 0 ? (
                                            <div className="list-group">
                                                {applicant?.certifications?.map((cert, i) => (
                                                    <div key={i} className="list-group-item border-0 p-0 mb-2">
                                                        <h4 className="h6 mb-1">{cert.certificates}</h4>
                                                        <p className="mb-1">{cert.issuer}</p>
                                                        <p className="text-muted small mb-0">Year: {cert.year}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted">No certifications listed</p>
                                        )}
                                    </div>

                                    {/* Projects */}
                                    <div className="mb-4">
                                        <h3 className="h5 mb-3">Projects</h3>
                                        {applicant?.projects?.length > 0 ? (
                                            <div className="list-group">
                                                {applicant?.projects?.map((project, i) => (
                                                    <div key={i} className="list-group-item border-0 p-0 mb-2">
                                                        <h4 className="h6 mb-1">{project.projects}</h4>
                                                        <p className="mb-1">{project.description}</p>
                                                        <p className="text-muted small mb-0">Year: {project.year}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted">No projects listed</p>
                                        )}
                                    </div>

                                    {/* Languages */}
                                    <div>
                                        <h3 className="h5 mb-3">Languages</h3>
                                        <div className="d-flex flex-wrap gap-2">
                                            {applicant?.languages?.map((lang, i) => (
                                                <span key={i} className="badge bg-secondary bg-opacity-10 text-secondary">
                                                    {lang?.languages}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm sticky-top" style={{ top: '100px', zIndex: "2" }}>
                                <div className="card-body">
                                    <h3 className="h5 mb-4">Admin Actions</h3>

                                    <button className="btn btn-primary w-100 mb-2">
                                        <i className="bi bi-calendar-check me-1"></i> Schedule Interview
                                    </button>
                                    <button className="btn btn-success w-100 mb-2" onClick={() => handleChangeStatus('Hired')}>
                                        <i className="bi bi-check-circle me-1"></i> Mark as Hired
                                    </button>
                                    <button className="btn btn-danger w-100 mb-2" onClick={() => handleChangeStatus('Rejected')}>
                                        <i className="bi bi-x-circle me-1"></i> Reject Application
                                    </button>
                                    <a href={applicant.resume} download className="btn btn-outline-secondary w-100 mb-2">
                                        <i className="bi bi-download me-1"></i> Download Resume
                                    </a>

                                    <hr className="my-4" />

                                    <h4 className="h6 mb-3">Quick Notes</h4>
                                    <textarea className="form-control mb-2" rows="3" placeholder="Add private notes..."></textarea>
                                    <button className="btn btn-sm btn-outline-primary w-100">Save Notes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewApplicantPage;