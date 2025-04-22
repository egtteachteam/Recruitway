import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../context/auth-context';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        profilePicture: null,
        fullname: "John Doe",
        headline: "Senior Software Engineer | React Specialist",
        location: "San Francisco, CA",
        phone: "+1 (555) 123-4567",
        summary: "Experienced software engineer with 5+ years of expertise in front-end development...",
        experience: [
            {
                title: "Senior Frontend Developer",
                company: "Tech Solutions Inc.",
                location: "San Francisco, CA",
                startDate: "2020-01",
                endDate: "Present",
                description: "Led a team of 5 developers to build enterprise-level React applications..."
            }
        ],
        education: [
            {
                degree: "Master of Computer Science",
                institution: "Stanford University",
                year: "2018"
            }
        ],
        skills: [
            { skills: "React" },
            { skills: "JavaScript" },
            { skills: "TypeScript" }
        ],
        certifications: [
            {
                certificates: "AWS Certified Developer - Associate",
                issuer: "Amazon Web Services",
                year: "2021"
            }
        ],
        languages: [
            { languages: "English" },
            { languages: "Spanish" }
        ],
        projects: [
            {
                projects: "E-commerce Platform",
                description: "Built a full-stack e-commerce solution...",
                year: "2021"
            }
        ],
        socialMedia: {
            linkedin: "abc",
            twitter: "abc",
            facebook: "abc"
        },
        resume: null
    });

    const { server } = useAuthContext()
    const token = localStorage.getItem("token")

    const [editMode, setEditMode] = useState(false);
    const [activeSection, setActiveSection] = useState('summary');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
    const [preview, setPreview] = useState('');
    const [previewResume, setPreviewResume] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialMediaChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [name]: value
            }
        }));
    };

    const handleArrayChange = (arrayName, index, field, value) => {
        setProfile(prev => {
            const updatedArray = [...prev[arrayName]];
            updatedArray[index] = { ...updatedArray[index], [field]: value };
            return { ...prev, [arrayName]: updatedArray };
        });
    };

    const addNewItem = (arrayName, template) => {
        setProfile(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], template]
        }));
    };

    const removeItem = (arrayName, index) => {
        setProfile(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    const handleFileChangenew = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (!file) {
            setProfile((prev) => ({ ...prev, [name]: null }));
            return;
        }

        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        const allowedTypesMap = {
            resume: [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
            profilePicture: [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/webp',
            ]
        };

        const allowedTypes = allowedTypesMap[name];

        if (!allowedTypes.includes(file.type)) {
            const errorText =
                name === 'resume'
                    ? 'Only PDF, DOC, and DOCX formats are allowed for resumes.'
                    : 'Only JPG, JPEG, PNG, and WEBP formats are allowed for profile pictures.';

            setSubmitMessage({ text: errorText, type: 'error' });
            setProfile((prev) => ({ ...prev, [name]: null }));
            return;
        }

        if (file.size > maxSizeInBytes) {
            setSubmitMessage({ text: 'File size should be less than 5MB.', type: 'error' });
            setProfile((prev) => ({ ...prev, [name]: null }));
            return;
        }

        setProfile((prev) => ({ ...prev, [name]: file }));
        setSubmitMessage({ text: '', type: '' });
    };

    // Preview for profile picture
    useEffect(() => {
        if (!profile.profilePicture) {
            setPreview('');
            return;
        }

        const objectUrl = URL.createObjectURL(profile.profilePicture);
        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [profile.profilePicture]);

    // Preview for resume
    useEffect(() => {
        const resume = profile.resume;

        if (!resume || !(resume instanceof File)) {
            setPreviewResume('');
            return;
        }

        const objectUrl = URL.createObjectURL(resume);
        setPreviewResume(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [profile.resume]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage({ type: '', text: '' });

        try {
            const formData = new FormData();

            // Append simple fields
            formData.append('fullname', profile.fullname);
            formData.append('headline', profile.headline);
            formData.append('location', profile.location);
            formData.append('phone', profile.phone);
            formData.append('summary', profile.summary);

            // Append nested objects (stringify them)
            formData.append('socialMedia', JSON.stringify(profile.socialMedia));

            // Append arrays (stringify them)
            formData.append('experience', JSON.stringify(profile.experience));
            formData.append('education', JSON.stringify(profile.education));
            formData.append('skills', JSON.stringify(profile.skills));
            formData.append('certifications', JSON.stringify(profile.certifications));
            formData.append('languages', JSON.stringify(profile.languages));
            formData.append('projects', JSON.stringify(profile.projects));

            // Append files if they exist
            if (profile.profilePicture) {
                formData.append('profilePicture', profile.profilePicture);
            }
            if (profile.resume) {
                formData.append('resume', profile.resume);
            }

            const response = await axios.post(
                `${server}/api/v1/candidate/createprofile`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setSubmitMessage({ type: 'success', text: 'Profile updated successfully!' });
            setEditMode(false);
        } catch (error) {
            setSubmitMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update profile. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="container">
                {/* Form wrapper */}
                <form onSubmit={editMode ? handleSubmit : (e) => e.preventDefault()}>
                    {/* Submit message */}
                    {submitMessage.text && (
                        <div className={`alert alert-${submitMessage.type === 'success' ? 'success' : 'danger'} mt-3`}>
                            {submitMessage.text}
                        </div>
                    )}

                    {/* Profile Header */}
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-start gap-3">
                                        <div className="d-flex flex-column align-items-center text-center mb-4">
                                            <div className="position-relative mb-3">
                                                <img
                                                    src={preview || profile.profilePicture || '/images/logos/user-pic.png'}
                                                    alt="Company Logo"
                                                    className="img-fluid rounded-circle border border-4 border-light"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                {
                                                    editMode && (
                                                        <label
                                                            htmlFor="logo"
                                                            className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle cursor-pointer hover-bg-primary"
                                                            style={{ transform: 'translate(25%, 25%)' }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                className="bi bi-camera"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                                                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                                            </svg>
                                                            <input
                                                                id="logo"
                                                                type="file"
                                                                name='profilePicture'
                                                                accept="image/*"
                                                                onChange={handleFileChangenew}
                                                                className="visually-hidden"
                                                            />
                                                        </label>
                                                    )
                                                }
                                            </div>
                                            {
                                                editMode && (
                                                    <p className="text-muted small">Click on the camera icon to change your Profile Picture</p>
                                                )
                                            }
                                        </div>
                                        <div className="w-100 text-md-start">
                                            {editMode ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        name="fullname"
                                                        value={profile.fullname}
                                                        onChange={handleInputChange}
                                                        className="form-control form-control-lg mb-2"
                                                        placeholder='Full Name'
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        name="headline"
                                                        value={profile.headline}
                                                        onChange={handleInputChange}
                                                        className="form-control mb-2"
                                                        placeholder='Headline'
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={profile.location}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder='Location'
                                                        required
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <h1 className="mb-2">{profile.fullname}</h1>
                                                    <h2 className="h4 text-muted mb-2">{profile.headline}</h2>
                                                    <p className="text-muted mb-0">{profile.location}</p>
                                                </>
                                            )}
                                        </div>
                                        <div className="mt-3 mt-md-0 d-flex flex-column flex-sm-row gap-2">
                                            <button
                                                type={editMode ? "submit" : "button"}
                                                className={`btn ${editMode ? 'btn-success' : 'btn-primary'}`}
                                                style={{
                                                    backgroundColor: !editMode && '#5D87FF',
                                                    borderColor: !editMode && '#5D87FF'
                                                }}
                                                onClick={!editMode ? (e) => {
                                                    e.preventDefault();
                                                    setEditMode(true);
                                                } : undefined}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="ti ti-user-edit me-2"></i>
                                                        {editMode ? 'Save Profile' : 'Edit Profile'}
                                                    </>
                                                )}
                                            </button>

                                            {!editMode && (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    style={{ backgroundColor: '#5D87FF', borderColor: '#5D87FF' }}
                                                >
                                                    <i className="ti ti-download me-2"></i>
                                                    Download Resume
                                                </button>
                                            )}

                                            {editMode && (
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                        setEditMode(false);
                                                        setSubmitMessage({ type: '', text: '' });
                                                    }}
                                                    disabled={isSubmitting}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            {/* Contact Information */}
                            <div className="card shadow-sm mb-4">
                                <div className="card-body">
                                    <h3 className="h5 card-title border-bottom pb-3 mb-3">Contact Information</h3>
                                    {editMode ? (
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label">Phone:</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={profile.phone}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">LinkedIn:</label>
                                                <input
                                                    type="text"
                                                    name="linkedin"
                                                    value={profile.socialMedia.linkedin}
                                                    onChange={handleSocialMediaChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Twitter:</label>
                                                <input
                                                    type="text"
                                                    name="twitter"
                                                    value={profile.socialMedia.twitter}
                                                    onChange={handleSocialMediaChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-0">
                                                <label className="form-label">Facebook:</label>
                                                <input
                                                    type="text"
                                                    name="facebook"
                                                    value={profile.socialMedia.facebook}
                                                    onChange={handleSocialMediaChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="d-flex align-items-center mb-3">
                                                <i className="ti ti-phone text-muted me-2"></i>
                                                {profile.phone}
                                            </p>
                                            <p className="d-flex align-items-center mb-3">
                                                <i className="ti ti-brand-linkedin text-muted me-2"></i>
                                                {profile.socialMedia.linkedin !== "abc" ? profile.socialMedia.linkedin : "Not provided"}
                                            </p>
                                            <p className="d-flex align-items-center mb-3">
                                                <i className="ti ti-brand-twitter text-muted me-2"></i>
                                                {profile.socialMedia.twitter !== "abc" ? profile.socialMedia.twitter : "Not provided"}
                                            </p>
                                            <p className="d-flex align-items-center mb-0">
                                                <i className="ti ti-brand-facebook text-muted me-2"></i>
                                                {profile.socialMedia.facebook !== "abc" ? profile.socialMedia.facebook : "Not provided"}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="card shadow-sm mb-4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                        <h3 className="h5 mb-0">Skills</h3>
                                        {editMode && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-primary"
                                                style={{ backgroundColor: '#5D87FF', borderColor: '#5D87FF' }}
                                                onClick={() => addNewItem('skills', { skills: '' })}
                                            >
                                                <i className="ti ti-plus"></i>
                                            </button>
                                        )}
                                    </div>
                                    <ul className="list-unstyled mb-0">
                                        {profile.skills.map((skill, index) => (
                                            <li key={index} className="mb-2">
                                                {editMode ? (
                                                    <div className="d-flex gap-2 align-items-center mb-2">
                                                        <input
                                                            type="text"
                                                            value={skill.skills}
                                                            onChange={(e) => handleArrayChange('skills', index, 'skills', e.target.value)}
                                                            className="form-control form-control-sm"
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => removeItem('skills', index)}
                                                        >
                                                            <i className="ti ti-x"></i>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex justify-content-between">
                                                        <span>{skill.skills}</span>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                        <h3 className="h5 mb-0">Languages</h3>
                                        {editMode && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-primary"
                                                style={{ backgroundColor: '#5D87FF', borderColor: '#5D87FF' }}
                                                onClick={() => addNewItem('languages', { languages: '' })}
                                            >
                                                <i className="ti ti-plus"></i>
                                            </button>
                                        )}
                                    </div>
                                    <ul className="list-unstyled mb-0">
                                        {profile.languages.map((language, index) => (
                                            <li key={index} className="mb-2">
                                                {editMode ? (
                                                    <div className="d-flex gap-2 align-items-center mb-2">
                                                        <input
                                                            type="text"
                                                            value={language.languages}
                                                            onChange={(e) => handleArrayChange('languages', index, 'languages', e.target.value)}
                                                            className="form-control form-control-sm"
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => removeItem('languages', index)}
                                                        >
                                                            <i className="ti ti-x"></i>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex justify-content-between">
                                                        <span>{language.languages}</span>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-lg-8">
                            {/* Navigation */}
                            <div className="card shadow-sm mb-4">
                                <div className="card-body p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${activeSection === 'summary' ? 'active' : ''}`}
                                                style={activeSection === 'summary' ? { backgroundColor: '#5D87FF' } : {}}
                                                onClick={() => setActiveSection('summary')}
                                            >
                                                Summary
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                                                style={activeSection === 'experience' ? { backgroundColor: '#5D87FF' } : {}}
                                                onClick={() => setActiveSection('experience')}
                                            >
                                                Experience
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
                                                style={activeSection === 'education' ? { backgroundColor: '#5D87FF' } : {}}
                                                onClick={() => setActiveSection('education')}
                                            >
                                                Education
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                                                style={activeSection === 'projects' ? { backgroundColor: '#5D87FF' } : {}}
                                                onClick={() => setActiveSection('projects')}
                                            >
                                                Projects
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
                                                style={activeSection === 'certifications' ? { backgroundColor: '#5D87FF' } : {}}
                                                onClick={() => setActiveSection('certifications')}
                                            >
                                                Certifications
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${activeSection === 'resume' ? 'active' : ''}`}
                                                style={activeSection === 'resume' ? { backgroundColor: '#5D87FF' } : {}}
                                                onClick={() => setActiveSection('resume')}
                                            >
                                                Resume
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Active Section Content */}
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    {/* Summary Section */}
                                    {activeSection === 'summary' && (
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                                <h3 className="h5 mb-0">Professional Summary</h3>
                                            </div>
                                            {editMode ? (
                                                <textarea
                                                    name="summary"
                                                    value={profile.summary}
                                                    onChange={handleInputChange}
                                                    rows="6"
                                                    className="form-control"
                                                    required
                                                />
                                            ) : (
                                                <p className="mb-0">{profile.summary}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Experience Section */}
                                    {activeSection === 'experience' && (
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                                <h3 className="h5 mb-0">Work Experience</h3>
                                                {editMode && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary"
                                                        style={{ backgroundColor: '#5D87FF', borderColor: '#5D87FF' }}
                                                        onClick={() => addNewItem('experience', {
                                                            title: '',
                                                            company: '',
                                                            location: '',
                                                            startDate: '',
                                                            endDate: '',
                                                            description: ''
                                                        })}
                                                    >
                                                        <i className="ti ti-plus me-1"></i>
                                                        Add Experience
                                                    </button>
                                                )}
                                            </div>
                                            {profile.experience.map((exp, index) => (
                                                <div key={index} className="mb-4 pb-3 border-bottom">
                                                    {editMode ? (
                                                        <div className="bg-light p-3 rounded mb-3">
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Job Title</label>
                                                                    <input
                                                                        type="text"
                                                                        value={exp.title}
                                                                        onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Company</label>
                                                                    <input
                                                                        type="text"
                                                                        value={exp.company}
                                                                        onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Location</label>
                                                                    <input
                                                                        type="text"
                                                                        value={exp.location}
                                                                        onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Start Date</label>
                                                                    <input
                                                                        type="text"
                                                                        value={exp.startDate}
                                                                        onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                                                                        placeholder="YYYY-MM"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">End Date</label>
                                                                    <input
                                                                        type="text"
                                                                        value={exp.endDate}
                                                                        onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                                                                        placeholder="YYYY-MM or Present"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Description</label>
                                                                <textarea
                                                                    value={exp.description}
                                                                    onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                                                                    rows="4"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => removeItem('experience', index)}
                                                            >
                                                                <i className="ti ti-trash me-1"></i>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h4 className="h5 mb-1">{exp.title}</h4>
                                                            <h5 className="h6 text-muted mb-2">{exp.company} • {exp.location}</h5>
                                                            <p className="text-muted small mb-2">
                                                                {exp.startDate} - {exp.endDate}
                                                            </p>
                                                            <p className="mb-0">{exp.description}</p>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Education Section */}
                                    {activeSection === 'education' && (
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                                <h3 className="h5 mb-0">Education</h3>
                                                {editMode && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary"
                                                        style={{ backgroundColor: '#5D87FF', borderColor: '#5D87FF' }}
                                                        onClick={() => addNewItem('education', {
                                                            degree: '',
                                                            institution: '',
                                                            year: ''
                                                        })}
                                                    >
                                                        <i className="ti ti-plus me-1"></i>
                                                        Add Education
                                                    </button>
                                                )}
                                            </div>
                                            {profile.education.map((edu, index) => (
                                                <div key={index} className="mb-4 pb-3 border-bottom">
                                                    {editMode ? (
                                                        <div className="bg-light p-3 rounded mb-3">
                                                            <div className="row g-3">
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Degree</label>
                                                                    <input
                                                                        type="text"
                                                                        value={edu.degree}
                                                                        onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Institution</label>
                                                                    <input
                                                                        type="text"
                                                                        value={edu.institution}
                                                                        onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Year</label>
                                                                    <input
                                                                        type="text"
                                                                        value={edu.year}
                                                                        onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger mt-3"
                                                                onClick={() => removeItem('education', index)}
                                                            >
                                                                <i className="ti ti-trash me-1"></i>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h4 className="h5 mb-1">{edu.degree}</h4>
                                                            <h5 className="h6 text-muted mb-2">{edu.institution}</h5>
                                                            <p className="text-muted small mb-0">{edu.year}</p>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Projects Section */}
                                    {activeSection === 'projects' && (
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                                <h3 className="h5 mb-0">Projects</h3>
                                                {editMode && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary"
                                                        style={{ backgroundColor: '#5D87FF', borderColor: '#5D87FF' }}
                                                        onClick={() => addNewItem('projects', {
                                                            projects: '',
                                                            description: '',
                                                            year: ''
                                                        })}
                                                    >
                                                        <i className="ti ti-plus me-1"></i>
                                                        Add Project
                                                    </button>
                                                )}
                                            </div>
                                            {profile.projects.map((project, index) => (
                                                <div key={index} className="mb-4 pb-3 border-bottom">
                                                    {editMode ? (
                                                        <div className="bg-light p-3 rounded mb-3">
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-md-8">
                                                                    <label className="form-label">Project Name</label>
                                                                    <input
                                                                        type="text"
                                                                        value={project.projects}
                                                                        onChange={(e) => handleArrayChange('projects', index, 'projects', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Year</label>
                                                                    <input
                                                                        type="text"
                                                                        value={project.year}
                                                                        onChange={(e) => handleArrayChange('projects', index, 'year', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Description</label>
                                                                <textarea
                                                                    value={project.description}
                                                                    onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                                                                    rows="4"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => removeItem('projects', index)}
                                                            >
                                                                <i className="ti ti-trash me-1"></i>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h4 className="h5 mb-1">{project.projects}</h4>
                                                            <p className="text-muted small mb-2">{project.year}</p>
                                                            <p className="mb-0">{project.description}</p>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Certifications Section */}
                                    {activeSection === 'certifications' && (
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                                <h3 className="h5 mb-0">Certifications</h3>
                                                {editMode && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary"
                                                        style={{ backgroundColor: '#5D87FF', borderColor: '#5D87FF' }}
                                                        onClick={() => addNewItem('certifications', {
                                                            certificates: '',
                                                            issuer: '',
                                                            year: ''
                                                        })}
                                                    >
                                                        <i className="ti ti-plus me-1"></i>
                                                        Add Certification
                                                    </button>
                                                )}
                                            </div>
                                            {profile.certifications.map((cert, index) => (
                                                <div key={index} className="mb-4 pb-3 border-bottom">
                                                    {editMode ? (
                                                        <div className="bg-light p-3 rounded mb-3">
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Certification Name</label>
                                                                    <input
                                                                        type="text"
                                                                        value={cert.certificates}
                                                                        onChange={(e) => handleArrayChange('certifications', index, 'certificates', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Issuing Organization</label>
                                                                    <input
                                                                        type="text"
                                                                        value={cert.issuer}
                                                                        onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label className="form-label">Year</label>
                                                                <input
                                                                    type="text"
                                                                    value={cert.year}
                                                                    onChange={(e) => handleArrayChange('certifications', index, 'year', e.target.value)}
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger mt-3"
                                                                onClick={() => removeItem('certifications', index)}
                                                            >
                                                                <i className="ti ti-trash me-1"></i>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h4 className="h5 mb-1">{cert.certificates}</h4>
                                                            <h5 className="h6 text-muted mb-2">{cert.issuer}</h5>
                                                            <p className="text-muted small mb-0">{cert.year}</p>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Resume Section */}
                                    {activeSection === 'resume' && (
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                                <h3 className="h5 mb-0">Resume</h3>
                                            </div>

                                            {/* If no resume uploaded yet */}
                                            {!profile.resume && editMode && (
                                                <div>
                                                    <p>No resume uploaded yet.</p>
                                                    <label className="btn btn-sm btn-primary mb-0" style={{ cursor: 'pointer' }}>
                                                        <i className="ti ti-upload me-1"></i> Upload Resume
                                                        <input
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            name='resume'
                                                            style={{ display: 'none' }}
                                                            onChange={handleFileChangenew}
                                                        />
                                                    </label>
                                                </div>
                                            )}

                                            {/* If resume is uploaded */}
                                            {profile.resume && (
                                                <div className="bg-light p-3 rounded d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                                    <div className="mb-3 mb-md-0">
                                                        <p className="mb-1"><strong>Uploaded File:</strong></p>
                                                        <a href={previewResume} target="_blank">View Resume</a>
                                                    </div>
                                                    <div className="d-flex gap-2">
                                                        <a
                                                            href={profile.resume ? previewResume : profile.resume?.url}
                                                            download
                                                            className="btn btn-outline-secondary btn-sm"
                                                        >
                                                            <i className="ti ti-download me-1"></i>
                                                            Download
                                                        </a>

                                                        {editMode && (
                                                            <label className="btn btn-sm btn-primary mb-0" style={{ cursor: 'pointer' }}>
                                                                <i className="ti ti-edit me-1"></i> Change Resume
                                                                <input
                                                                    type="file"
                                                                    accept=".pdf,.doc,.docx"
                                                                    name='resume'
                                                                    style={{ display: 'none' }}
                                                                    onChange={handleFileChangenew}
                                                                />
                                                            </label>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;