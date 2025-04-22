import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CompanyCreateJobPost = () => {

    const [jobPost, setJobPost] = useState({
        title: '',
        company: '',
        status: 'Active',
        location: '',
        salaryRange: '',
        employmentType: 'Full-time',
        experienceRequired: '',
        postedDate: '',
        applicantsCount: '',
        description: '',
        requirements: [],
        skills: []
    });

    const [newRequirement, setNewRequirement] = useState('');
    const [newSkill, setNewSkill] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobPost({ ...jobPost, [name]: value });
    };

    const handleAddRequirement = () => {
        if (newRequirement.trim()) {
            setJobPost({
                ...jobPost,
                requirements: [...jobPost.requirements, newRequirement.trim()]
            });
            setNewRequirement('');
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setJobPost({
                ...jobPost,
                skills: [...jobPost.skills, newSkill.trim()]
            });
            setNewSkill('');
        }
    };

    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...jobPost.requirements];
        updatedRequirements.splice(index, 1);
        setJobPost({ ...jobPost, requirements: updatedRequirements });
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = [...jobPost.skills];
        updatedSkills.splice(index, 1);
        setJobPost({ ...jobPost, skills: updatedSkills });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Job Post Submitted:', jobPost);
        alert('Job post submitted successfully!');
    };

    return (
        <div className="container-fluid">
            <div className="container py-3 py-md-4">
                <h2 className="mb-4">Post a New Job</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="title" className="form-label">Job Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={jobPost.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="company" className="form-label">Company</label>
                            <input
                                type="text"
                                className="form-control"
                                id="company"
                                name="company"
                                value={jobPost.company}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                className="form-select"
                                id="status"
                                name="status"
                                value={jobPost.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                id="location"
                                name="location"
                                value={jobPost.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="salaryRange" className="form-label">Salary Range</label>
                            <input
                                type="text"
                                className="form-control"
                                id="salaryRange"
                                name="salaryRange"
                                value={jobPost.salaryRange}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="employmentType" className="form-label">Employment Type</label>
                            <select
                                className="form-select"
                                id="employmentType"
                                name="employmentType"
                                value={jobPost.employmentType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="experienceRequired" className="form-label">Experience Required</label>
                            <input
                                type="text"
                                className="form-control"
                                id="experienceRequired"
                                name="experienceRequired"
                                value={jobPost.experienceRequired}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="postedDate" className="form-label">Posted Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="postedDate"
                                name="postedDate"
                                value={jobPost.postedDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Job Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="5"
                            value={jobPost.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Requirements</label>
                        <div className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                value={newRequirement}
                                onChange={(e) => setNewRequirement(e.target.value)}
                                placeholder="Add a requirement"
                            />
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={handleAddRequirement}
                            >
                                Add
                            </button>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            {jobPost.requirements.map((req, index) => (
                                <span key={index} className="badge bg-primary">
                                    {req}
                                    <button
                                        type="button"
                                        className="ms-2 btn-close btn-close-danger fs-1"
                                        aria-label="Close"
                                        onClick={() => handleRemoveRequirement(index)}
                                    ></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Skills</label>
                        <div className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a skill"
                            />
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={handleAddSkill}
                            >
                                Add
                            </button>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            {jobPost.skills.map((skill, index) => (
                                <span key={index} className="badge bg-primary">
                                    {skill}
                                    <button
                                        type="button"
                                        className="ms-2 btn-close btn-close-danger fs-1"
                                        aria-label="Close"
                                        onClick={() => handleRemoveSkill(index)}
                                    ></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" className="btn btn-primary me-md-2">Submit Job Post</button>
                        <Link to="/company/job-posts" type="button" className="btn btn-outline-danger">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyCreateJobPost;