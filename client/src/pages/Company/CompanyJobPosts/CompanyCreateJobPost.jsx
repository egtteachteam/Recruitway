// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const CompanyCreateJobPost = () => {

//     const [jobPost, setJobPost] = useState({
//         title: '',
//         company: '',
//         status: 'Active',
//         location: '',
//         salaryRange: '',
//         employmentType: 'Full-time',
//         experienceRequired: '',
//         postedDate: '',
//         applicantsCount: '',
//         description: '',
//         requirements: [],
//         skills: []
//     });

//     const [newRequirement, setNewRequirement] = useState('');
//     const [newSkill, setNewSkill] = useState('');

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setJobPost({ ...jobPost, [name]: value });
//     };

//     const handleAddRequirement = () => {
//         if (newRequirement.trim()) {
//             setJobPost({
//                 ...jobPost,
//                 requirements: [...jobPost.requirements, newRequirement.trim()]
//             });
//             setNewRequirement('');
//         }
//     };

//     const handleAddSkill = () => {
//         if (newSkill.trim()) {
//             setJobPost({
//                 ...jobPost,
//                 skills: [...jobPost.skills, newSkill.trim()]
//             });
//             setNewSkill('');
//         }
//     };

//     const handleRemoveRequirement = (index) => {
//         const updatedRequirements = [...jobPost.requirements];
//         updatedRequirements.splice(index, 1);
//         setJobPost({ ...jobPost, requirements: updatedRequirements });
//     };

//     const handleRemoveSkill = (index) => {
//         const updatedSkills = [...jobPost.skills];
//         updatedSkills.splice(index, 1);
//         setJobPost({ ...jobPost, skills: updatedSkills });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Job Post Submitted:', jobPost);
//         alert('Job post submitted successfully!');
//     };

//     return (
//         <div className="container-fluid">
//             <div className="container py-3 py-md-4">
//                 <h2 className="mb-4">Post a New Job</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="row">
//                         <div className="col-md-6 mb-3">
//                             <label htmlFor="title" className="form-label">Job Title</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="title"
//                                 name="title"
//                                 value={jobPost.title}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-6 mb-3">
//                             <label htmlFor="company" className="form-label">Company</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="company"
//                                 name="company"
//                                 value={jobPost.company}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-md-4 mb-3">
//                             <label htmlFor="status" className="form-label">Status</label>
//                             <select
//                                 className="form-select"
//                                 id="status"
//                                 name="status"
//                                 value={jobPost.status}
//                                 onChange={handleInputChange}
//                                 required
//                             >
//                                 <option value="Active">Active</option>
//                                 <option value="Inactive">Inactive</option>
//                                 <option value="Draft">Draft</option>
//                             </select>
//                         </div>
//                         <div className="col-md-4 mb-3">
//                             <label htmlFor="location" className="form-label">Location</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="location"
//                                 name="location"
//                                 value={jobPost.location}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4 mb-3">
//                             <label htmlFor="salaryRange" className="form-label">Salary Range</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="salaryRange"
//                                 name="salaryRange"
//                                 value={jobPost.salaryRange}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-md-4 mb-3">
//                             <label htmlFor="employmentType" className="form-label">Employment Type</label>
//                             <select
//                                 className="form-select"
//                                 id="employmentType"
//                                 name="employmentType"
//                                 value={jobPost.employmentType}
//                                 onChange={handleInputChange}
//                                 required
//                             >
//                                 <option value="Full-time">Full-time</option>
//                                 <option value="Part-time">Part-time</option>
//                                 <option value="Contract">Contract</option>
//                                 <option value="Internship">Internship</option>
//                             </select>
//                         </div>
//                         <div className="col-md-4 mb-3">
//                             <label htmlFor="experienceRequired" className="form-label">Experience Required</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="experienceRequired"
//                                 name="experienceRequired"
//                                 value={jobPost.experienceRequired}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4 mb-3">
//                             <label htmlFor="postedDate" className="form-label">Posted Date</label>
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 id="postedDate"
//                                 name="postedDate"
//                                 value={jobPost.postedDate}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="description" className="form-label">Job Description</label>
//                         <textarea
//                             className="form-control"
//                             id="description"
//                             name="description"
//                             rows="5"
//                             value={jobPost.description}
//                             onChange={handleInputChange}
//                             required
//                         ></textarea>
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Requirements</label>
//                         <div className="input-group mb-2">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={newRequirement}
//                                 onChange={(e) => setNewRequirement(e.target.value)}
//                                 placeholder="Add a requirement"
//                             />
//                             <button
//                                 className="btn btn-outline-primary"
//                                 type="button"
//                                 onClick={handleAddRequirement}
//                             >
//                                 Add
//                             </button>
//                         </div>
//                         <div className="d-flex flex-wrap gap-2">
//                             {jobPost.requirements.map((req, index) => (
//                                 <span key={index} className="badge bg-primary">
//                                     {req}
//                                     <button
//                                         type="button"
//                                         className="ms-2 btn-close btn-close-danger fs-1"
//                                         aria-label="Close"
//                                         onClick={() => handleRemoveRequirement(index)}
//                                     ></button>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Skills</label>
//                         <div className="input-group mb-2">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={newSkill}
//                                 onChange={(e) => setNewSkill(e.target.value)}
//                                 placeholder="Add a skill"
//                             />
//                             <button
//                                 className="btn btn-outline-primary"
//                                 type="button"
//                                 onClick={handleAddSkill}
//                             >
//                                 Add
//                             </button>
//                         </div>
//                         <div className="d-flex flex-wrap gap-2">
//                             {jobPost.skills.map((skill, index) => (
//                                 <span key={index} className="badge bg-primary">
//                                     {skill}
//                                     <button
//                                         type="button"
//                                         className="ms-2 btn-close btn-close-danger fs-1"
//                                         aria-label="Close"
//                                         onClick={() => handleRemoveSkill(index)}
//                                     ></button>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//                         <button type="submit" className="btn btn-primary me-md-2">Submit Job Post</button>
//                         <Link to="/company/job-posts" type="button" className="btn btn-outline-danger">Cancel</Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CompanyCreateJobPost;




// import { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';

// const CompanyCreateJobPost = ({ editMode = true }) => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     // Initialize state with all fields
//     const [jobPost, setJobPost] = useState({
//         title: '',
//         company: '',
//         status: 'Active',
//         location: {
//             city: '',
//             state: '',
//             country: '',
//             remote: false,
//             hybrid: false,
//             onsite: true
//         },
//         salaryRange: {
//             min: '',
//             max: '',
//             currency: 'USD',
//             isPublic: true
//         },
//         employmentType: 'Full-time',
//         experienceRequired: {
//             level: '',
//             years: ''
//         },
//         postedDate: new Date().toISOString().split('T')[0],
//         expirationDate: '',
//         applicantsCount: 0,
//         description: '',
//         responsibilities: [],
//         requirements: {
//             education: [],
//             items: []
//         },
//         skills: [],
//         benefits: [],
//         contactInfo: {
//             name: '',
//             email: '',
//             phone: ''
//         },
//         applicationProcess: {
//             url: '',
//             instructions: '',
//             deadline: ''
//         },
//         department: '',
//         industry: '',
//         visaSponsorship: false,
//         relocationAssistance: false,
//         tags: [],
//         isFeatured: false
//     });

//     const [newRequirement, setNewRequirement] = useState('');
//     const [newSkill, setNewSkill] = useState('');
//     const [newBenefit, setNewBenefit] = useState('');
//     const [newTag, setNewTag] = useState('');
//     const [newResponsibility, setNewResponsibility] = useState('');

//     // Fetch job post data if in edit mode
//     useEffect(() => {
//         if (editMode && id) {
//             // Replace with your API call to fetch the job post
//             const fetchJobPost = async () => {
//                 try {
//                     // const response = await fetch(`/api/job-posts/${id}`);
//                     // const data = await response.json();
//                     // setJobPost(data);

//                     // Mock data for demonstration
//                     setJobPost({
//                         title: 'Senior React Developer',
//                         company: 'Tech Corp Inc.',
//                         status: 'Active',
//                         location: {
//                             city: 'San Francisco',
//                             state: 'CA',
//                             country: 'USA',
//                             remote: true,
//                             hybrid: false,
//                             onsite: false
//                         },
//                         salaryRange: {
//                             min: '120000',
//                             max: '150000',
//                             currency: 'USD',
//                             isPublic: true
//                         },
//                         employmentType: 'Full-time',
//                         experienceRequired: {
//                             level: 'Senior',
//                             years: '5+'
//                         },
//                         postedDate: '2023-05-15',
//                         expirationDate: '2023-06-30',
//                         applicantsCount: 24,
//                         description: 'We are looking for an experienced React developer...',
//                         responsibilities: [
//                             'Develop new user-facing features',
//                             'Build reusable components and front-end libraries'
//                         ],
//                         requirements: {
//                             education: ['Bachelor'],
//                             items: [
//                                 '5+ years of React experience',
//                                 'Proficient in TypeScript'
//                             ]
//                         },
//                         skills: ['React', 'TypeScript', 'Redux'],
//                         benefits: ['Health Insurance', '401k Matching', 'Flexible PTO'],
//                         contactInfo: {
//                             name: 'John Doe',
//                             email: 'hr@techcorp.com',
//                             phone: '(555) 123-4567'
//                         },
//                         applicationProcess: {
//                             url: 'https://techcorp.com/careers/apply',
//                             instructions: 'Submit your resume and portfolio',
//                             deadline: '2023-06-30'
//                         },
//                         department: 'Engineering',
//                         industry: 'Technology',
//                         visaSponsorship: true,
//                         relocationAssistance: false,
//                         tags: ['Frontend', 'Remote'],
//                         isFeatured: true
//                     });
//                 } catch (error) {
//                     console.error('Error fetching job post:', error);
//                 }
//             };

//             fetchJobPost();
//         }
//     }, [editMode, id]);

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         // Handle nested objects
//         if (name.includes('.')) {
//             const [parent, child] = name.split('.');
//             setJobPost(prev => ({
//                 ...prev,
//                 [parent]: {
//                     ...prev[parent],
//                     [child]: type === 'checkbox' ? checked : value
//                 }
//             }));
//         } else {
//             setJobPost(prev => ({
//                 ...prev,
//                 [name]: type === 'checkbox' ? checked : value
//             }));
//         }
//     };

//     const handleAddItem = (field, value, setValue, subField = null) => {
//         if (!value.trim()) return;

//         if (subField) {
//             setJobPost(prev => ({
//                 ...prev,
//                 [field]: {
//                     ...prev[field],
//                     [subField]: [...prev[field][subField], value]
//                 }
//             }));
//         } else {
//             setJobPost(prev => ({
//                 ...prev,
//                 [field]: [...prev[field], value]
//             }));
//         }

//         setValue('');
//     };

//     const handleRemoveItem = (field, index, subField = null) => {
//         if (subField) {
//             setJobPost(prev => ({
//                 ...prev,
//                 [field]: {
//                     ...prev[field],
//                     [subField]: prev[field][subField].filter((_, i) => i !== index)
//                 }
//             }));
//         } else {
//             setJobPost(prev => ({
//                 ...prev,
//                 [field]: prev[field].filter((_, i) => i !== index)
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             if (editMode) {
//                 // Update existing job post
//                 // await fetch(`/api/job-posts/${id}`, {
//                 //     method: 'PUT',
//                 //     headers: { 'Content-Type': 'application/json' },
//                 //     body: JSON.stringify(jobPost)
//                 // });
//                 console.log('Job post updated:', jobPost);
//             } else {
//                 // Create new job post
//                 // await fetch('/api/job-posts', {
//                 //     method: 'POST',
//                 //     headers: { 'Content-Type': 'application/json' },
//                 //     body: JSON.stringify(jobPost)
//                 // });
//                 console.log('Job post created:', jobPost);
//             }

//             navigate('/company/job-posts');
//         } catch (error) {
//             console.error('Error saving job post:', error);
//         }
//     };

//     return (
//         <div className="container-fluid">
//             <div className="container py-3 py-md-4">
//                 <h2 className="mb-4">{editMode ? 'Edit Job Post' : 'Post a New Job'}</h2>
//                 <form onSubmit={handleSubmit}>
//                     {/* Basic Information Section */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Basic Information</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-6 mb-3">
//                                     <label htmlFor="title" className="form-label">Job Title*</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="title"
//                                         name="title"
//                                         value={jobPost.title}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <label htmlFor="company" className="form-label">Company*</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="company"
//                                         name="company"
//                                         value={jobPost.company}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <div className="row">
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="status" className="form-label">Status*</label>
//                                     <select
//                                         className="form-select"
//                                         id="status"
//                                         name="status"
//                                         value={jobPost.status}
//                                         onChange={handleInputChange}
//                                         required
//                                     >
//                                         <option value="Active">Active</option>
//                                         <option value="Inactive">Inactive</option>
//                                         <option value="Draft">Draft</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="employmentType" className="form-label">Employment Type*</label>
//                                     <select
//                                         className="form-select"
//                                         id="employmentType"
//                                         name="employmentType"
//                                         value={jobPost.employmentType}
//                                         onChange={handleInputChange}
//                                         required
//                                     >
//                                         <option value="Full-time">Full-time</option>
//                                         <option value="Part-time">Part-time</option>
//                                         <option value="Contract">Contract</option>
//                                         <option value="Internship">Internship</option>
//                                         <option value="Temporary">Temporary</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="department" className="form-label">Department</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="department"
//                                         name="department"
//                                         value={jobPost.department}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Location Section */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Location Information</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="location.city" className="form-label">City</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="location.city"
//                                         name="location.city"
//                                         value={jobPost.location.city}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="location.state" className="form-label">State/Province</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="location.state"
//                                         name="location.state"
//                                         value={jobPost.location.state}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="location.country" className="form-label">Country</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="location.country"
//                                         name="location.country"
//                                         value={jobPost.location.country}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-4 mb-3">
//                                     <div className="form-check">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="location.remote"
//                                             name="location.remote"
//                                             checked={jobPost.location.remote}
//                                             onChange={handleInputChange}
//                                         />
//                                         <label className="form-check-label" htmlFor="location.remote">
//                                             Remote Work Available
//                                         </label>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <div className="form-check">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="location.hybrid"
//                                             name="location.hybrid"
//                                             checked={jobPost.location.hybrid}
//                                             onChange={handleInputChange}
//                                         />
//                                         <label className="form-check-label" htmlFor="location.hybrid">
//                                             Hybrid Work Option
//                                         </label>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <div className="form-check">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="location.onsite"
//                                             name="location.onsite"
//                                             checked={jobPost.location.onsite}
//                                             onChange={handleInputChange}
//                                         />
//                                         <label className="form-check-label" htmlFor="location.onsite">
//                                             On-site Required
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Salary Information */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Salary Information</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-3 mb-3">
//                                     <label htmlFor="salaryRange.min" className="form-label">Minimum Salary</label>
//                                     <input
//                                         type="number"
//                                         className="form-control"
//                                         id="salaryRange.min"
//                                         name="salaryRange.min"
//                                         value={jobPost.salaryRange.min}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-3 mb-3">
//                                     <label htmlFor="salaryRange.max" className="form-label">Maximum Salary</label>
//                                     <input
//                                         type="number"
//                                         className="form-control"
//                                         id="salaryRange.max"
//                                         name="salaryRange.max"
//                                         value={jobPost.salaryRange.max}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-3 mb-3">
//                                     <label htmlFor="salaryRange.currency" className="form-label">Currency</label>
//                                     <select
//                                         className="form-select"
//                                         id="salaryRange.currency"
//                                         name="salaryRange.currency"
//                                         value={jobPost.salaryRange.currency}
//                                         onChange={handleInputChange}
//                                     >
//                                         <option value="USD">USD ($)</option>
//                                         <option value="EUR">EUR (€)</option>
//                                         <option value="GBP">GBP (£)</option>
//                                         <option value="CAD">CAD ($)</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-md-3 mb-3 d-flex align-items-end">
//                                     <div className="form-check">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="salaryRange.isPublic"
//                                             name="salaryRange.isPublic"
//                                             checked={jobPost.salaryRange.isPublic}
//                                             onChange={handleInputChange}
//                                         />
//                                         <label className="form-check-label" htmlFor="salaryRange.isPublic">
//                                             Show Salary in Posting
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Experience & Dates */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Experience & Dates</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="experienceRequired.level" className="form-label">Experience Level</label>
//                                     <select
//                                         className="form-select"
//                                         id="experienceRequired.level"
//                                         name="experienceRequired.level"
//                                         value={jobPost.experienceRequired.level}
//                                         onChange={handleInputChange}
//                                     >
//                                         <option value="">Select Level</option>
//                                         <option value="Entry">Entry Level</option>
//                                         <option value="Mid">Mid Level</option>
//                                         <option value="Senior">Senior Level</option>
//                                         <option value="Executive">Executive</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="experienceRequired.years" className="form-label">Years of Experience</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="experienceRequired.years"
//                                         name="experienceRequired.years"
//                                         value={jobPost.experienceRequired.years}
//                                         onChange={handleInputChange}
//                                         placeholder="e.g. 3-5 years"
//                                     />
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="industry" className="form-label">Industry</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="industry"
//                                         name="industry"
//                                         value={jobPost.industry}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="postedDate" className="form-label">Posted Date*</label>
//                                     <input
//                                         type="date"
//                                         className="form-control"
//                                         id="postedDate"
//                                         name="postedDate"
//                                         value={jobPost.postedDate}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
//                                     <input
//                                         type="date"
//                                         className="form-control"
//                                         id="expirationDate"
//                                         name="expirationDate"
//                                         value={jobPost.expirationDate}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <div className="row">
//                                         <div className="col-6">
//                                             <div className="form-check">
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     id="visaSponsorship"
//                                                     name="visaSponsorship"
//                                                     checked={jobPost.visaSponsorship}
//                                                     onChange={handleInputChange}
//                                                 />
//                                                 <label className="form-check-label" htmlFor="visaSponsorship">
//                                                     Visa Sponsorship
//                                                 </label>
//                                             </div>
//                                         </div>
//                                         <div className="col-6">
//                                             <div className="form-check">
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     id="relocationAssistance"
//                                                     name="relocationAssistance"
//                                                     checked={jobPost.relocationAssistance}
//                                                     onChange={handleInputChange}
//                                                 />
//                                                 <label className="form-check-label" htmlFor="relocationAssistance">
//                                                     Relocation Assistance
//                                                 </label>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Job Description */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Job Description</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="mb-3">
//                                 <label htmlFor="description" className="form-label">Description*</label>
//                                 <textarea
//                                     className="form-control"
//                                     id="description"
//                                     name="description"
//                                     rows="5"
//                                     value={jobPost.description}
//                                     onChange={handleInputChange}
//                                     required
//                                 ></textarea>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Responsibilities */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Responsibilities</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="mb-3">
//                                 <div className="input-group mb-2">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         value={newResponsibility}
//                                         onChange={(e) => setNewResponsibility(e.target.value)}
//                                         placeholder="Add a responsibility"
//                                     />
//                                     <button
//                                         className="btn btn-outline-primary"
//                                         type="button"
//                                         onClick={() => handleAddItem('responsibilities', newResponsibility, setNewResponsibility)}
//                                     >
//                                         Add
//                                     </button>
//                                 </div>
//                                 <ul className="list-group">
//                                     {jobPost.responsibilities.map((item, index) => (
//                                         <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                                             {item}
//                                             <button
//                                                 type="button"
//                                                 className="btn btn-sm btn-outline-danger"
//                                                 onClick={() => handleRemoveItem('responsibilities', index)}
//                                             >
//                                                 Remove
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Requirements */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Requirements</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="mb-3">
//                                 <label className="form-label">Education Requirements</label>
//                                 <div className="mb-3">
//                                     <div className="form-check form-check-inline">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="education-high-school"
//                                             name="requirements.education"
//                                             value="High School"
//                                             checked={jobPost.requirements.education.includes('High School')}
//                                             onChange={(e) => {
//                                                 if (e.target.checked) {
//                                                     handleAddItem('requirements', 'High School', () => {}, 'education');
//                                                 } else {
//                                                     const index = jobPost.requirements.education.indexOf('High School');
//                                                     if (index !== -1) {
//                                                         handleRemoveItem('requirements', index, 'education');
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                         <label className="form-check-label" htmlFor="education-high-school">High School</label>
//                                     </div>
//                                     <div className="form-check form-check-inline">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="education-bachelor"
//                                             name="requirements.education"
//                                             value="Bachelor"
//                                             checked={jobPost.requirements.education.includes('Bachelor')}
//                                             onChange={(e) => {
//                                                 if (e.target.checked) {
//                                                     handleAddItem('requirements', 'Bachelor', () => {}, 'education');
//                                                 } else {
//                                                     const index = jobPost.requirements.education.indexOf('Bachelor');
//                                                     if (index !== -1) {
//                                                         handleRemoveItem('requirements', index, 'education');
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                         <label className="form-check-label" htmlFor="education-bachelor">Bachelor's Degree</label>
//                                     </div>
//                                     <div className="form-check form-check-inline">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="education-master"
//                                             name="requirements.education"
//                                             value="Master"
//                                             checked={jobPost.requirements.education.includes('Master')}
//                                             onChange={(e) => {
//                                                 if (e.target.checked) {
//                                                     handleAddItem('requirements', 'Master', () => {}, 'education');
//                                                 } else {
//                                                     const index = jobPost.requirements.education.indexOf('Master');
//                                                     if (index !== -1) {
//                                                         handleRemoveItem('requirements', index, 'education');
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                         <label className="form-check-label" htmlFor="education-master">Master's Degree</label>
//                                     </div>
//                                     <div className="form-check form-check-inline">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="education-phd"
//                                             name="requirements.education"
//                                             value="PhD"
//                                             checked={jobPost.requirements.education.includes('PhD')}
//                                             onChange={(e) => {
//                                                 if (e.target.checked) {
//                                                     handleAddItem('requirements', 'PhD', () => {}, 'education');
//                                                 } else {
//                                                     const index = jobPost.requirements.education.indexOf('PhD');
//                                                     if (index !== -1) {
//                                                         handleRemoveItem('requirements', index, 'education');
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                         <label className="form-check-label" htmlFor="education-phd">PhD</label>
//                                     </div>
//                                 </div>

//                                 <label className="form-label">Other Requirements</label>
//                                 <div className="input-group mb-2">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         value={newRequirement}
//                                         onChange={(e) => setNewRequirement(e.target.value)}
//                                         placeholder="Add a requirement"
//                                     />
//                                     <button
//                                         className="btn btn-outline-primary"
//                                         type="button"
//                                         onClick={() => handleAddItem('requirements', newRequirement, setNewRequirement, 'items')}
//                                     >
//                                         Add
//                                     </button>
//                                 </div>
//                                 <ul className="list-group">
//                                     {jobPost.requirements.items.map((item, index) => (
//                                         <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                                             {item}
//                                             <button
//                                                 type="button"
//                                                 className="btn btn-sm btn-outline-danger"
//                                                 onClick={() => handleRemoveItem('requirements', index, 'items')}
//                                             >
//                                                 Remove
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Skills */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Skills</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="mb-3">
//                                 <div className="input-group mb-2">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         value={newSkill}
//                                         onChange={(e) => setNewSkill(e.target.value)}
//                                         placeholder="Add a skill"
//                                     />
//                                     <button
//                                         className="btn btn-outline-primary"
//                                         type="button"
//                                         onClick={() => handleAddItem('skills', newSkill, setNewSkill)}
//                                     >
//                                         Add
//                                     </button>
//                                 </div>
//                                 <div className="d-flex flex-wrap gap-2">
//                                     {jobPost.skills.map((skill, index) => (
//                                         <span key={index} className="badge bg-primary">
//                                             {skill}
//                                             <button
//                                                 type="button"
//                                                 className="ms-2 btn-close btn-close-white"
//                                                 aria-label="Close"
//                                                 onClick={() => handleRemoveItem('skills', index)}
//                                             ></button>
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Benefits */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Benefits</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="mb-3">
//                                 <div className="input-group mb-2">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         value={newBenefit}
//                                         onChange={(e) => setNewBenefit(e.target.value)}
//                                         placeholder="Add a benefit"
//                                     />
//                                     <button
//                                         className="btn btn-outline-primary"
//                                         type="button"
//                                         onClick={() => handleAddItem('benefits', newBenefit, setNewBenefit)}
//                                     >
//                                         Add
//                                     </button>
//                                 </div>
//                                 <div className="d-flex flex-wrap gap-2">
//                                     {jobPost.benefits.map((benefit, index) => (
//                                         <span key={index} className="badge bg-success">
//                                             {benefit}
//                                             <button
//                                                 type="button"
//                                                 className="ms-2 btn-close btn-close-white"
//                                                 aria-label="Close"
//                                                 onClick={() => handleRemoveItem('benefits', index)}
//                                             ></button>
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Application Process */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Application Process</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-6 mb-3">
//                                     <label htmlFor="applicationProcess.url" className="form-label">Application URL</label>
//                                     <input
//                                         type="url"
//                                         className="form-control"
//                                         id="applicationProcess.url"
//                                         name="applicationProcess.url"
//                                         value={jobPost.applicationProcess.url}
//                                         onChange={handleInputChange}
//                                         placeholder="https://example.com/apply"
//                                     />
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <label htmlFor="applicationProcess.deadline" className="form-label">Application Deadline</label>
//                                     <input
//                                         type="date"
//                                         className="form-control"
//                                         id="applicationProcess.deadline"
//                                         name="applicationProcess.deadline"
//                                         value={jobPost.applicationProcess.deadline}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="applicationProcess.instructions" className="form-label">Application Instructions</label>
//                                 <textarea
//                                     className="form-control"
//                                     id="applicationProcess.instructions"
//                                     name="applicationProcess.instructions"
//                                     rows="3"
//                                     value={jobPost.applicationProcess.instructions}
//                                     onChange={handleInputChange}
//                                 ></textarea>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Contact Information */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Contact Information</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="contactInfo.name" className="form-label">Contact Name</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="contactInfo.name"
//                                         name="contactInfo.name"
//                                         value={jobPost.contactInfo.name}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="contactInfo.email" className="form-label">Contact Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         id="contactInfo.email"
//                                         name="contactInfo.email"
//                                         value={jobPost.contactInfo.email}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <label htmlFor="contactInfo.phone" className="form-label">Contact Phone</label>
//                                     <input
//                                         type="tel"
//                                         className="form-control"
//                                         id="contactInfo.phone"
//                                         name="contactInfo.phone"
//                                         value={jobPost.contactInfo.phone}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Additional Options */}
//                     <div className="card mb-4">
//                         <div className="card-header bg-light">
//                             <h5>Additional Options</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-6 mb-3">
//                                     <label className="form-label">Tags</label>
//                                     <div className="input-group mb-2">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={newTag}
//                                             onChange={(e) => setNewTag(e.target.value)}
//                                             placeholder="Add a tag (e.g., Remote, Tech)"
//                                         />
//                                         <button
//                                             className="btn btn-outline-secondary"
//                                             type="button"
//                                             onClick={() => handleAddItem('tags', newTag, setNewTag)}
//                                         >
//                                             Add
//                                         </button>
//                                     </div>
//                                     <div className="d-flex flex-wrap gap-2">
//                                         {jobPost.tags.map((tag, index) => (
//                                             <span key={index} className="badge bg-info">
//                                                 {tag}
//                                                 <button
//                                                     type="button"
//                                                     className="ms-2 btn-close btn-close-white"
//                                                     aria-label="Close"
//                                                     onClick={() => handleRemoveItem('tags', index)}
//                                                 ></button>
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6 mb-3">
//                                     <div className="form-check form-switch mb-3">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="isFeatured"
//                                             name="isFeatured"
//                                             checked={jobPost.isFeatured}
//                                             onChange={handleInputChange}
//                                         />
//                                         <label className="form-check-label" htmlFor="isFeatured">
//                                             Featured Job Posting
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Form Actions */}
//                     <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//                         <button type="submit" className="btn btn-primary me-md-2">
//                             {editMode ? 'Update Job Post' : 'Submit Job Post'}
//                         </button>
//                         <Link to="/company/job-posts" type="button" className="btn btn-outline-danger">
//                             Cancel
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CompanyCreateJobPost;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/auth-context';
import toast from 'react-hot-toast';

const CompanyCreateJobPost = () => {
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        type: 'Full-time',
        experience: '',
        description: '',
        requirements: [''],
        skills: [''],
        status: 'Active'
    });

    const { server, token } = useAuthContext()

    const jobTypes = [
        'Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship',
        'Freelance', 'Seasonal', 'Volunteer', 'Apprenticeship',
        'Remote', 'Hybrid', 'On-site', 'Consultant'
    ];

    const experienceLevels = [
        'Entry Level', '1-2 years', '2-3 years', '3-5 years',
        '5+ years', '8+ years', '10+ years', 'Executive'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData(prev => ({ ...prev, [name]: value }));
    };

    const handleRequirementChange = (index, value) => {
        const newRequirements = [...jobData.requirements];
        newRequirements[index] = value;
        setJobData(prev => ({ ...prev, requirements: newRequirements }));
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...jobData.skills];
        newSkills[index] = value;
        setJobData(prev => ({ ...prev, skills: newSkills }));
    };

    const addRequirement = () => {
        setJobData(prev => ({ ...prev, requirements: [...prev.requirements, ''] }));
    };

    const removeRequirement = (index) => {
        const newRequirements = jobData.requirements.filter((_, i) => i !== index);
        setJobData(prev => ({ ...prev, requirements: newRequirements }));
    };

    const addSkill = () => {
        setJobData(prev => ({ ...prev, skills: [...prev.skills, ''] }));
    };

    const removeSkill = (index) => {
        const newSkills = jobData.skills.filter((_, i) => i !== index);
        setJobData(prev => ({ ...prev, skills: newSkills }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${server}/api/v1/company/create-job-post`,
                jobData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }
            )
            toast.success(response.data.message);
            navigate('/company/job-posts');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-lg">
                                <div className="card-header bg-primary text-white py-3">
                                    <h2 className="h4 mb-0 text-white">
                                        <i className="bi bi-file-earmark-plus me-2"></i>Create New Job Post
                                    </h2>
                                    <p className="mb-0">
                                        <i className="bi bi-megaphone me-2"></i>Fill in the details to attract top talent
                                    </p>
                                </div>
                                <div className="card-body p-4 p-md-5">
                                    <form onSubmit={handleSubmit}>
                                        {/* Basic Information Section */}
                                        <div className="mb-4">
                                            <h3 className="h5 mb-3 text-primary">Basic Information</h3>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="title" className="form-label">Job Title*</label>
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        value={jobData.title}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="e.g. Senior Frontend Developer"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="company" className="form-label">Company Name*</label>
                                                    <input
                                                        type="text"
                                                        id="company"
                                                        name="company"
                                                        value={jobData.company}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="Your company name"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="location" className="form-label">Location*</label>
                                                    <input
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        value={jobData.location}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="e.g. San Francisco, CA (Remote)"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="salary" className="form-label">Salary Range*</label>
                                                    <input
                                                        type="text"
                                                        id="salary"
                                                        name="salary"
                                                        value={jobData.salary}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="e.g. $120,000 - $150,000"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="type" className="form-label">Job Type*</label>
                                                    <select
                                                        id="type"
                                                        name="type"
                                                        value={jobData.type}
                                                        onChange={handleChange}
                                                        className="form-select"
                                                        required
                                                    >
                                                        {jobTypes.map((type) => (
                                                            <option key={type} value={type}>{type}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="experience" className="form-label">Experience Level*</label>
                                                    <select
                                                        id="experience"
                                                        name="experience"
                                                        value={jobData.experience}
                                                        onChange={handleChange}
                                                        className="form-select"
                                                        required
                                                    >
                                                        <option value="">Select experience level</option>
                                                        {experienceLevels.map((level) => (
                                                            <option key={level} value={level}>{level}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Job Description Section */}
                                        <div className="mb-4">
                                            <h3 className="h5 mb-3 text-primary">Job Description</h3>
                                            <label htmlFor="description" className="form-label">Detailed Description*</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={jobData.description}
                                                onChange={handleChange}
                                                className="form-control"
                                                rows="6"
                                                placeholder="Describe the role, responsibilities, and what makes your company great to work for..."
                                                required
                                            />
                                        </div>

                                        {/* Requirements Section */}
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h3 className="h5 text-primary">Requirements</h3>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={addRequirement}
                                                >
                                                    <i className="bi bi-plus"></i> Add Requirement
                                                </button>
                                            </div>
                                            {jobData.requirements.map((req, index) => (
                                                <div key={index} className="d-flex mb-2 align-items-center">
                                                    <input
                                                        type="text"
                                                        value={req}
                                                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                                                        className="form-control me-2"
                                                        placeholder={`Requirement #${index + 1}`}
                                                        required
                                                    />
                                                    {jobData.requirements.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger"
                                                            onClick={() => removeRequirement(index)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Skills Section */}
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h3 className="h5 text-primary">Required Skills</h3>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={addSkill}
                                                >
                                                    <i className="bi bi-plus"></i> Add Skill
                                                </button>
                                            </div>
                                            <div className="d-flex flex-wrap gap-2">
                                                {jobData.skills.map((skill, index) => (
                                                    <div key={index} className="d-flex align-items-center bg-light rounded p-2">
                                                        <input
                                                            type="text"
                                                            value={skill}
                                                            onChange={(e) => handleSkillChange(index, e.target.value)}
                                                            className="form-control form-control-sm border-0 bg-transparent"
                                                            placeholder="Skill"
                                                            required
                                                        />
                                                        {jobData.skills.length > 1 && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-link text-danger p-0 ms-1"
                                                                onClick={() => removeSkill(index)}
                                                            >
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Status Section */}
                                        <div className="mb-4">
                                            <h3 className="h5 mb-3 text-primary">Post Status</h3>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="status"
                                                    checked={jobData.status === 'Active'}
                                                    onChange={(e) => setJobData(prev => ({
                                                        ...prev,
                                                        status: e.target.checked ? 'Active' : 'Inactive'
                                                    }))}
                                                />
                                                <label className="form-check-label" htmlFor="status">
                                                    {jobData.status === 'Active' ? 'Active (Visible to candidates)' : 'Inactive (Hidden from candidates)'}
                                                </label>
                                            </div>
                                        </div>

                                        {/* Form Actions */}
                                        <div className="d-flex justify-content-end gap-3 mt-5">
                                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => navigate('/jobs')}>
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary btn-sm px-4">
                                                Post Job
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyCreateJobPost;