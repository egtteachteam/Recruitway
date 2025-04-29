import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteConfirmaton from '../../../components/DeleteConfirmaton';
import { useCompanyContext } from '../../../context/company-context';
import formatDateToRelative from '../../../Helper/dateFormatter';

// const JobPostCard = ({ isOpen, job, onClose }) => {
//     // const { title, company, location, salary, type, experience, posted, description, requirements, skills, applicants, status } = job;

//     // const [editMode, setEditMode] = useState(false)

//     // console.log(editMode);

//     const { title, company, location, salary, type, experience, posted, description, requirements, skills, applicants, status } = job;

//     // Set up controlled state for editing
//     const [editMode, setEditMode] = useState(false);
//     const [editedJob, setEditedJob] = useState({
//         title,
//         company,
//         location,
//         salary,
//         type,
//         experience,
//         posted,
//         description,
//         requirements,
//         skills,
//         status,
//     });

//     const handleEditModeToggle = () => {
//         setEditMode(!editMode);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditedJob((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSave = () => {
//         // Logic for saving the updated job, e.g., make API call here
//         setEditMode(false);
//     };

//     const handleCancel = () => {
//         // Reset the edited job data to the original job data
//         setEditedJob({
//             title,
//             company,
//             location,
//             salary,
//             type,
//             experience,
//             posted,
//             description,
//             requirements,
//             skills,
//             status,
//         });
//         setEditMode(false);
//     };

//     // if (editMode) {
//     //     return (
//     //         <>
//     //             <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//     //                 <div className="modal-dialog modal-lg">
//     //                     <div className="modal-content">
//     //                         {/* Header */}
//     //                         <div className="modal-header px-3 py-4">
//     //                             <h5 className="modal-title">Full Job Post</h5>
//     //                             <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
//     //                         </div>

//     //                         {/* Body */}
//     //                         <div className="modal-body px-3">
//     //                             <div className="card mb-4 border-0 shadow-sm hover-shadow transition-all">
//     //                                 <div className="card-body p-3 p-md-4">
//     //                                     {/* Job Header */}
//     //                                     <div className="d-flex justify-content-between align-items-start mb-3">
//     //                                         <div>
//     //                                             <h4 className="card-title mb-1 fw-bold">
//     //                                                 <input
//     //                                                     type="text"
//     //                                                     value={title}
//     //                                                     onChange={(e) => setTitle(e.target.value)}
//     //                                                     className="form-control"
//     //                                                 />
//     //                                             </h4>
//     //                                             <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
//     //                                                 <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
//     //                                                     <input
//     //                                                         type="text"
//     //                                                         value={company}
//     //                                                         onChange={(e) => setCompany(e.target.value)}
//     //                                                         className="form-control"
//     //                                                     />
//     //                                                 </span>
//     //                                                 <span className={`badge rounded-pill ${status === 'Active' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${status === 'Active' ? 'success' : 'secondary'} fw-normal`}>
//     //                                                     <input
//     //                                                         type="text"
//     //                                                         value={status}
//     //                                                         onChange={(e) => setStatus(e.target.value)}
//     //                                                         className="form-control"
//     //                                                     />
//     //                                                 </span>
//     //                                             </div>
//     //                                         </div>
//     //                                     </div>

//     //                                     {/* Job Meta */}
//     //                                     <div className="row mb-3">
//     //                                         <div className="col-12 col-md-6 mb-2 mb-md-0">
//     //                                             <div className="d-flex align-items-center text-muted mb-2">
//     //                                                 <i className="ti ti-building me-2 flex-shrink-0"></i>
//     //                                                 <input
//     //                                                     type="text"
//     //                                                     value={location}
//     //                                                     onChange={(e) => setLocation(e.target.value)}
//     //                                                     className="form-control"
//     //                                                 />
//     //                                             </div>
//     //                                             <div className="d-flex align-items-center text-muted">
//     //                                                 <i className="ti ti-currency-dollar me-2 flex-shrink-0"></i>
//     //                                                 <input
//     //                                                     type="text"
//     //                                                     value={salary}
//     //                                                     onChange={(e) => setSalary(e.target.value)}
//     //                                                     className="form-control"
//     //                                                 />
//     //                                             </div>
//     //                                         </div>
//     //                                         <div className="col-12 col-md-6">
//     //                                             <div className="d-flex align-items-center text-muted mb-2">
//     //                                                 <i className="ti ti-briefcase me-2 flex-shrink-0"></i>
//     //                                                 <input
//     //                                                     type="text"
//     //                                                     value={type}
//     //                                                     onChange={(e) => setType(e.target.value)}
//     //                                                     className="form-control"
//     //                                                 />
//     //                                             </div>
//     //                                             <div className="d-flex align-items-center text-muted">
//     //                                                 <i className="ti ti-user me-2 flex-shrink-0"></i>
//     //                                                 <input
//     //                                                     type="text"
//     //                                                     value={experience}
//     //                                                     onChange={(e) => setExperience(e.target.value)}
//     //                                                     className="form-control"
//     //                                                 />
//     //                                             </div>
//     //                                         </div>
//     //                                     </div>

//     //                                     {/* Posted Date and Applicants */}
//     //                                     <div className="d-flex justify-content-between align-items-center mb-3">
//     //                                         <div className="d-flex align-items-center text-muted">
//     //                                             <i className="ti ti-calendar-event me-2 flex-shrink-0"></i>
//     //                                             <input
//     //                                                 type="text"
//     //                                                 value={posted}
//     //                                                 onChange={(e) => setPosted(e.target.value)}
//     //                                                 className="form-control"
//     //                                             />
//     //                                         </div>
//     //                                     </div>

//     //                                     {/* Job Description */}
//     //                                     <div className="mb-3">
//     //                                         <h6 className="fw-bold mb-2">Job Description</h6>
//     //                                         <textarea
//     //                                             value={description}
//     //                                             onChange={(e) => setDescription(e.target.value)}
//     //                                             className="form-control"
//     //                                             rows="4"
//     //                                         />
//     //                                     </div>

//     //                                     {/* Requirements */}
//     //                                     <div className="mb-3">
//     //                                         <h6 className="fw-bold mb-2">Requirements</h6>
//     //                                         <ul className="text-muted mb-0 ps-3">
//     //                                             {requirements.map((req, idx) => (
//     //                                                 <li key={idx}>
//     //                                                     <input
//     //                                                         type="text"
//     //                                                         value={req}
//     //                                                         onChange={(e) => handleRequirementsChange(e, idx)}
//     //                                                         className="form-control"
//     //                                                     />
//     //                                                 </li>
//     //                                             ))}
//     //                                         </ul>
//     //                                     </div>

//     //                                     {/* Skills */}
//     //                                     <div className="mb-3">
//     //                                         <h6 className="fw-bold mb-2">Skills</h6>
//     //                                         <div className="d-flex flex-wrap gap-2">
//     //                                             {skills?.map((skill, idx) => (
//     //                                                 <span key={idx} className="badge bg-primary bg-opacity-10 text-primary fw-normal py-2 px-3">
//     //                                                     <input
//     //                                                         type="text"
//     //                                                         value={skill}
//     //                                                         onChange={(e) => handleSkillsChange(e, idx)}
//     //                                                         className="form-control"
//     //                                                     />
//     //                                                 </span>
//     //                                             ))}
//     //                                         </div>
//     //                                     </div>
//     //                                 </div>

//     //                                 {/* Footer Actions */}
//     //                                 <div className="card-footer bg-transparent border-top-0 d-flex flex-column flex-md-row justify-content-between align-items-center p-3 gap-2">
//     //                                     <div className="d-flex gap-2 w-100 w-md-auto">
//     //                                         <button className="btn btn-sm btn-outline-primary flex-grow-1">
//     //                                             Save
//     //                                         </button>
//     //                                         <button className="btn btn-sm btn-danger flex-grow-1">
//     //                                             Cancel
//     //                                         </button>
//     //                                     </div>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </>
//     //     )
//     // }

//     if (editMode) {
//         return (
//             <>
//                 <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                     <div className="modal-dialog modal-lg">
//                         <div className="modal-content">
//                             {/* Header */}
//                             <div className="modal-header px-3 py-4">
//                                 <h5 className="modal-title">Edit Job Post</h5>
//                                 <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
//                             </div>

//                             {/* Body */}
//                             <div className="modal-body px-3">
//                                 <div className="card mb-4 border-0 shadow-sm hover-shadow transition-all">
//                                     <div className="card-body p-3 p-md-4">
//                                         {/* Job Header */}
//                                         <div className="d-flex justify-content-between align-items-start mb-3">
//                                             <div>
//                                                 <h4 className="card-title mb-1 fw-bold">
//                                                     <input
//                                                         type="text"
//                                                         value={editedJob.title}
//                                                         onChange={handleChange}
//                                                         name="title"
//                                                         className="form-control"
//                                                     />
//                                                 </h4>
//                                                 <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
//                                                     <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
//                                                         <input
//                                                             type="text"
//                                                             value={editedJob.company}
//                                                             onChange={handleChange}
//                                                             name="company"
//                                                             className="form-control"
//                                                         />
//                                                     </span>
//                                                     <span
//                                                         className={`badge rounded-pill ${editedJob.status === 'Active' ? 'bg-success' : 'bg-secondary'
//                                                             } bg-opacity-10 text-${editedJob.status === 'Active' ? 'success' : 'secondary'} fw-normal`}
//                                                     >
//                                                         <input
//                                                             type="text"
//                                                             value={editedJob.status}
//                                                             onChange={handleChange}
//                                                             name="status"
//                                                             className="form-control"
//                                                         />
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Job Meta */}
//                                         <div className="row mb-3">
//                                             <div className="col-12 col-md-6 mb-2 mb-md-0">
//                                                 <div className="d-flex align-items-center text-muted mb-2">
//                                                     <i className="ti ti-building me-2 flex-shrink-0"></i>
//                                                     <input
//                                                         type="text"
//                                                         value={editedJob.location}
//                                                         onChange={handleChange}
//                                                         name="location"
//                                                         className="form-control"
//                                                     />
//                                                 </div>
//                                                 <div className="d-flex align-items-center text-muted">
//                                                     <i className="ti ti-currency-dollar me-2 flex-shrink-0"></i>
//                                                     <input
//                                                         type="text"
//                                                         value={editedJob.salary}
//                                                         onChange={handleChange}
//                                                         name="salary"
//                                                         className="form-control"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-12 col-md-6">
//                                                 <div className="d-flex align-items-center text-muted mb-2">
//                                                     <i className="ti ti-briefcase me-2 flex-shrink-0"></i>
//                                                     <input
//                                                         type="text"
//                                                         value={editedJob.type}
//                                                         onChange={handleChange}
//                                                         name="type"
//                                                         className="form-control"
//                                                     />
//                                                 </div>
//                                                 <div className="d-flex align-items-center text-muted">
//                                                     <i className="ti ti-user me-2 flex-shrink-0"></i>
//                                                     <input
//                                                         type="text"
//                                                         value={editedJob.experience}
//                                                         onChange={handleChange}
//                                                         name="experience"
//                                                         className="form-control"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Job Description */}
//                                         <div className="mb-3">
//                                             <h6 className="fw-bold mb-2">Job Description</h6>
//                                             <textarea
//                                                 value={editedJob.description}
//                                                 onChange={handleChange}
//                                                 name="description"
//                                                 className="form-control"
//                                                 rows="4"
//                                             />
//                                         </div>

//                                         {/* Requirements */}
//                                         <div className="mb-3">
//                                             <h6 className="fw-bold mb-2">Requirements</h6>
//                                             <ul className="text-muted mb-0 ps-3">
//                                                 {editedJob.requirements.map((req, idx) => (
//                                                     <li key={idx}>
//                                                         <input
//                                                             type="text"
//                                                             value={req}
//                                                             onChange={(e) => handleRequirementsChange(e, idx)}
//                                                             className="form-control"
//                                                         />
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>

//                                         {/* Skills */}
//                                         <div className="mb-3">
//                                             <h6 className="fw-bold mb-2">Skills</h6>
//                                             <div className="d-flex flex-wrap gap-2">
//                                                 {editedJob.skills.map((skill, idx) => (
//                                                     <span key={idx} className="badge bg-primary bg-opacity-10 text-primary fw-normal py-2 px-3">
//                                                         <input
//                                                             type="text"
//                                                             value={skill}
//                                                             onChange={(e) => handleSkillsChange(e, idx)}
//                                                             className="form-control"
//                                                         />
//                                                     </span>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Footer Actions */}
//                                     <div className="card-footer bg-transparent border-top-0 d-flex flex-column flex-md-row justify-content-between align-items-center p-3 gap-2">
//                                         <div className="d-flex gap-2 w-100 w-md-auto">
//                                             <button className="btn btn-sm btn-outline-primary flex-grow-1" onClick={handleSave}>
//                                                 Save
//                                             </button>
//                                             <button className="btn btn-sm btn-danger flex-grow-1" onClick={handleCancel}>
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }


//     return (
//         <>
//             <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                 <div className="modal-dialog modal-lg">
//                     <div className="modal-content">
//                         {/* Header */}
//                         <div className="modal-header px-3 py-4">
//                             <h5 className="modal-title">Full Job Post</h5>
//                             <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
//                         </div>

//                         {/* Body */}
//                         <div className="modal-body px-3">
//                             <div className="card mb-4 border-0 shadow-sm hover-shadow transition-all">
//                                 <div className="card-body p-3 p-md-4">
//                                     {/* Job Header */}
//                                     <div className="d-flex justify-content-between align-items-start mb-3">
//                                         <div>
//                                             <h4 className="card-title mb-1 fw-bold">{title}</h4>
//                                             <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
//                                                 <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
//                                                     {company}
//                                                 </span>
//                                                 <span className={`badge rounded-pill ${status === 'Active' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${status === 'Active' ? 'success' : 'secondary'} fw-normal`}>
//                                                     {status}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="dropdown">
//                                             <button
//                                                 className="btn btn-sm btn-outline-secondary dropdown-toggle"
//                                                 type="button"
//                                                 data-bs-toggle="dropdown"
//                                                 aria-expanded="false"
//                                             >
//                                                 Actions
//                                             </button>
//                                             <ul className="dropdown-menu dropdown-menu-end">
//                                                 <li><button className="dropdown-item btn btn-sm" onClick={() => setEditMode(true)}>Edit Post</button></li>
//                                                 <li><button className="dropdown-item btn btn-sm">View Applicants</button></li>
//                                                 <li><hr className="dropdown-divider" /></li>
//                                                 <li><button className="dropdown-item btn btn-sm text-danger">Close Post</button></li>
//                                                 <li><button className="dropdown-item btn btn-sm text-danger">Delete Post</button></li>
//                                             </ul>
//                                         </div>
//                                     </div>

//                                     {/* Job Meta */}
//                                     <div className="row mb-3">
//                                         <div className="col-12 col-md-6 mb-2 mb-md-0">
//                                             <div className="d-flex align-items-center text-muted mb-2">
//                                                 <i className="ti ti-building me-2 flex-shrink-0"></i>
//                                                 <small>{location}</small>
//                                             </div>
//                                             <div className="d-flex align-items-center text-muted">
//                                                 <i className="ti ti-currency-dollar me-2 flex-shrink-0"></i>
//                                                 <small>{salary}</small>
//                                             </div>
//                                         </div>
//                                         <div className="col-12 col-md-6">
//                                             <div className="d-flex align-items-center text-muted mb-2">
//                                                 <i className="ti ti-briefcase me-2 flex-shrink-0"></i>
//                                                 <small>{type}</small>
//                                             </div>
//                                             <div className="d-flex align-items-center text-muted">
//                                                 <i className="ti ti-user me-2 flex-shrink-0"></i>
//                                                 <small>{experience} experience</small>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Posted Date and Applicants */}
//                                     <div className="d-flex justify-content-between align-items-center mb-3">
//                                         <div className="d-flex align-items-center text-muted">
//                                             <i className="ti ti-calendar-event me-2 flex-shrink-0"></i>
//                                             <small>Posted: {posted}</small>
//                                         </div>
//                                         <div className="d-flex align-items-center text-muted">
//                                             <small>{applicants} applicants</small>
//                                         </div>
//                                     </div>

//                                     {/* Job Description */}
//                                     <div className="mb-3">
//                                         <h6 className="fw-bold mb-2">Job Description</h6>
//                                         <p className="text-muted mb-0">{description}</p>
//                                     </div>

//                                     {/* Requirements */}
//                                     <div className="mb-3">
//                                         <h6 className="fw-bold mb-2">Requirements</h6>
//                                         <ul className="text-muted mb-0 ps-3">
//                                             {requirements.map((req, idx) => (
//                                                 <li key={idx}>{req}</li>
//                                             ))}
//                                         </ul>
//                                     </div>

//                                     {/* Skills */}
//                                     <div className="mb-3">
//                                         <h6 className="fw-bold mb-2">Skills</h6>
//                                         <div className="d-flex flex-wrap gap-2">
//                                             {skills?.map((skill, idx) => (
//                                                 <span
//                                                     key={idx}
//                                                     className="badge bg-primary bg-opacity-10 text-primary fw-normal py-2 px-3"
//                                                 >
//                                                     {skill}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Footer Actions */}
//                                 <div className="card-footer bg-transparent border-top-0 d-flex flex-column flex-md-row justify-content-between align-items-center p-3 gap-2">
//                                     <div className="d-flex gap-2 w-100 w-md-auto">
//                                         <button className="btn btn-sm btn-outline-primary flex-grow-1">
//                                             View Applicants
//                                         </button>
//                                         <button className="btn btn-sm btn-secondary flex-grow-1" onClick={() => setEditMode(true)}>
//                                             Edit Post
//                                         </button>
//                                         <button className="btn btn-sm btn-danger flex-grow-1">
//                                             Delete Post
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };






// const jobList = [
//     {
//         id: '1',
//         title: 'Senior Frontend Engineer',
//         company: 'BrightSoft Solutions',
//         status: 'Active',
//         location: {
//             city: 'New York',
//             state: 'NY',
//             country: 'USA',
//             remote: false,
//             hybrid: true,
//             onsite: true
//         },
//         salaryRange: {
//             min: '95000',
//             max: '115000',
//             currency: 'USD',
//             isPublic: true
//         },
//         type: 'Full-time',
//         experience: {
//             level: 'Mid',
//             years: '3+'
//         },
//         posted: '2023-10-20',
//         applicants: 12,
//         description: 'Join our team to build interactive UIs using React.',
//         responsibilities: [
//             'Implement responsive design',
//             'Write clean and maintainable code'
//         ],
//         requirements: {
//             education: ['Bachelor'],
//             items: ['3+ years with React', 'Familiarity with REST APIs']
//         },
//         skills: ['React', 'CSS', 'HTML'],
//         benefits: ['Dental insurance', 'Flexible hours'],
//         contactInfo: {
//             name: 'Emily Carter',
//             email: 'jobs@brightsoft.com',
//             phone: '(212) 456-7890'
//         },
//         applicationProcess: {
//             url: '',
//             instructions: 'Apply online through our portal.',
//             deadline: '2023-12-15'
//         },
//         department: 'Engineering',
//         industry: 'Software',
//         visaSponsorship: false,
//         relocationAssistance: true,
//         tags: ['Frontend', 'Hybrid']
//     },
//     {
//         id: '2',
//         title: 'Backend Developer',
//         company: 'CodeNest Ltd.',
//         status: 'Closed',
//         location: {
//             city: 'Austin',
//             state: 'TX',
//             country: 'USA',
//             remote: true,
//             hybrid: false,
//             onsite: false
//         },
//         salaryRange: {
//             min: '100000',
//             max: '130000',
//             currency: 'USD',
//             isPublic: false
//         },
//         type: 'Contract',
//         experience: {
//             level: 'Mid',
//             years: '4+'
//         },
//         posted: '2023-08-05',
//         applicants: 37,
//         description: 'Work on scalable microservices with Node.js.',
//         responsibilities: [
//             'Create RESTful APIs',
//             'Optimize database queries'
//         ],
//         requirements: {
//             education: ['Bachelor'],
//             items: ['Experience with PostgreSQL', 'Proficient in Node.js']
//         },
//         skills: ['Node.js', 'PostgreSQL', 'Docker'],
//         benefits: ['Remote work', 'Tech stipend'],
//         contactInfo: {
//             name: 'Sam Wilson',
//             email: 'devjobs@codenest.io',
//             phone: '(737) 987-1234'
//         },
//         applicationProcess: {
//             url: '',
//             instructions: 'Submit your GitHub and resume.',
//             deadline: '2023-09-30'
//         },
//         department: 'Backend',
//         industry: 'IT Services',
//         visaSponsorship: false,
//         relocationAssistance: false,
//         tags: ['Backend', 'Remote']
//     },
//     {
//         id: '3',
//         title: 'UI/UX Designer',
//         company: 'Designify Studio',
//         status: 'Active',
//         location: {
//             city: 'Seattle',
//             state: 'WA',
//             country: 'USA',
//             remote: false,
//             hybrid: true,
//             onsite: true
//         },
//         salaryRange: {
//             min: '80000',
//             max: '95000',
//             currency: 'USD',
//             isPublic: true
//         },
//         type: 'Full-time',
//         experience: {
//             level: 'Junior',
//             years: '1-2'
//         },
//         posted: '2023-11-01',
//         applicants: 18,
//         description: 'Design user-centered interfaces and improve user experience.',
//         responsibilities: [
//             'Create wireframes and prototypes',
//             'Collaborate with frontend devs'
//         ],
//         requirements: {
//             education: ['Bachelor', 'Diploma'],
//             items: ['Figma/Sketch proficiency', 'Portfolio of past projects']
//         },
//         skills: ['Figma', 'Sketch', 'Adobe XD'],
//         benefits: ['Paid vacation', 'Stock options'],
//         contactInfo: {
//             name: 'Lena Michaels',
//             email: 'hr@designify.com',
//             phone: '(206) 321-1122'
//         },
//         applicationProcess: {
//             url: '',
//             instructions: 'Send portfolio and resume.',
//             deadline: '2024-01-10'
//         },
//         department: 'Design',
//         industry: 'Creative',
//         visaSponsorship: false,
//         relocationAssistance: true,
//         tags: ['Design', 'UI/UX']
//     },
//     {
//         id: '4',
//         title: 'DevOps Engineer',
//         company: 'InfraTech Corp.',
//         status: 'Active',
//         location: {
//             city: 'Denver',
//             state: 'CO',
//             country: 'USA',
//             remote: true,
//             hybrid: false,
//             onsite: false
//         },
//         salaryRange: {
//             min: '110000',
//             max: '140000',
//             currency: 'USD',
//             isPublic: true
//         },
//         type: 'Full-time',
//         experience: {
//             level: 'Senior',
//             years: '6+'
//         },
//         posted: '2023-09-12',
//         applicants: 9,
//         description: 'Lead CI/CD processes and infrastructure automation.',
//         responsibilities: [
//             'Maintain pipelines and deployment tools',
//             'Ensure high availability and scalability'
//         ],
//         requirements: {
//             education: ['Bachelor'],
//             items: ['AWS Certified', 'Experience with Jenkins and Docker']
//         },
//         skills: ['AWS', 'Docker', 'Terraform'],
//         benefits: ['Health, Dental', 'Remote allowance'],
//         contactInfo: {
//             name: 'Devon Park',
//             email: 'infra@infratech.com',
//             phone: '(303) 654-7890'
//         },
//         applicationProcess: {
//             url: '',
//             instructions: 'Complete DevOps assessment online.',
//             deadline: '2023-12-20'
//         },
//         department: 'DevOps',
//         industry: 'Cloud Services',
//         visaSponsorship: true,
//         relocationAssistance: false,
//         tags: ['DevOps', 'Cloud', 'Remote']
//     },
//     {
//         id: '5',
//         title: 'Product Manager',
//         company: 'NextWave AI',
//         status: 'Active',
//         location: {
//             city: 'Boston',
//             state: 'MA',
//             country: 'USA',
//             remote: false,
//             hybrid: true,
//             onsite: true
//         },
//         salaryRange: {
//             min: '105000',
//             max: '130000',
//             currency: 'USD',
//             isPublic: true
//         },
//         type: 'Full-time',
//         experience: {
//             level: 'Mid-Senior',
//             years: '5+'
//         },
//         posted: '2023-10-01',
//         applicants: 14,
//         description: 'Drive product vision and collaborate with stakeholders.',
//         responsibilities: [
//             'Define product roadmap',
//             'Coordinate with engineering teams'
//         ],
//         requirements: {
//             education: ['Bachelor', 'MBA'],
//             items: ['Experience in agile methodologies', 'Excellent communication skills']
//         },
//         skills: ['Agile', 'Product Roadmapping', 'Data Analysis'],
//         benefits: ['Stock options', 'Fitness reimbursement'],
//         contactInfo: {
//             name: 'Nina Jacobs',
//             email: 'pmjobs@nextwave.ai',
//             phone: '(617) 345-1010'
//         },
//         applicationProcess: {
//             url: '',
//             instructions: 'Submit resume and case study.',
//             deadline: '2023-11-30'
//         },
//         department: 'Product',
//         industry: 'Artificial Intelligence',
//         visaSponsorship: false,
//         relocationAssistance: true,
//         tags: ['Product', 'Management', 'AI']
//     }
// ]

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const JobPostCard = ({ isOpen, singleJob, onClose }) => {
//     const navigate = useNavigate();
//     const [editMode, setEditMode] = useState(false);
//     const [showActions, setShowActions] = useState(false);

//     const [job, setJob] = useState(() => {
//         if (singleJob) {
//             return singleJob;
//         }
//         return {
//             id: '1',
//             title: 'Senior React Developer',
//             company: 'Tech Innovations Inc.',
//             status: 'Active',
//             location: {
//                 city: 'San Francisco',
//                 state: 'CA',
//                 country: 'USA',
//                 remote: true,
//                 hybrid: false,
//                 onsite: false
//             },
//             salaryRange: {
//                 min: '120000',
//                 max: '150000',
//                 currency: 'USD',
//                 isPublic: true
//             },
//             type: 'Full-time',
//             experience: {
//                 level: 'Senior',
//                 years: '5+'
//             },
//             posted: '2023-05-15',
//             applicants: 24,
//             description: 'We are looking for an experienced React developer...',
//             responsibilities: [
//                 'Develop new user-facing features',
//                 'Build reusable components and front-end libraries'
//             ],
//             requirements: {
//                 education: ['Bachelor'],
//                 items: [
//                     '5+ years of professional experience with React',
//                     'Strong proficiency in JavaScript'
//                 ]
//             },
//             skills: ['React', 'JavaScript', 'TypeScript'],
//             benefits: ['Health insurance', '401(k) matching'],
//             contactInfo: {
//                 name: 'John Doe',
//                 email: 'hr@techinnovations.com',
//                 phone: '(555) 123-4567'
//             },
//             applicationProcess: {
//                 url: '',
//                 instructions: 'Send resume to hr@techinnovations.com',
//                 deadline: '2023-06-30'
//             },
//             department: 'Engineering',
//             industry: 'Technology',
//             visaSponsorship: true,
//             relocationAssistance: false,
//             tags: ['Frontend', 'Remote']
//         };
//     });

//     // State for new items being added
//     const [newResponsibility, setNewResponsibility] = useState('');
//     const [newRequirement, setNewRequirement] = useState('');
//     const [newSkill, setNewSkill] = useState('');
//     const [newBenefit, setNewBenefit] = useState('');

//     // Toggle edit mode
//     const handleEdit = () => {
//         setEditMode(!editMode);
//     };

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         if (name.includes('.')) {
//             const [parent, child] = name.split('.');
//             setJob(prev => ({
//                 ...prev,
//                 [parent]: {
//                     ...prev[parent],
//                     [child]: type === 'checkbox' ? checked : value
//                 }
//             }));
//         } else {
//             setJob(prev => ({
//                 ...prev,
//                 [name]: type === 'checkbox' ? checked : value
//             }));
//         }
//     };

//     // Add items to arrays
//     const handleAddItem = (field, value, setValue, subField = null) => {
//         if (!value.trim()) return;

//         if (subField) {
//             setJob(prev => ({
//                 ...prev,
//                 [field]: {
//                     ...prev[field],
//                     [subField]: [...prev[field][subField], value]
//                 }
//             }));
//         } else {
//             setJob(prev => ({
//                 ...prev,
//                 [field]: [...prev[field], value]
//             }));
//         }

//         setValue('');
//     };

//     // Remove items from arrays
//     const handleRemoveItem = (field, index, subField = null) => {
//         if (subField) {
//             setJob(prev => ({
//                 ...prev,
//                 [field]: {
//                     ...prev[field],
//                     [subField]: prev[field][subField].filter((_, i) => i !== index)
//                 }
//             }));
//         } else {
//             setJob(prev => ({
//                 ...prev,
//                 [field]: prev[field].filter((_, i) => i !== index)
//             }));
//         }
//     };

//     // Save changes
//     const handleSave = async () => {
//         try {
//             // Replace with your API call
//             // if (id) {
//             //   await updateJobPost(job);
//             // } else {
//             //   await createJobPost(job);
//             // }
//             console.log('Job post saved:', job);
//             setEditMode(false);
//         } catch (error) {
//             console.error('Error saving job post:', error);
//         }
//     };

//     // Format date for display
//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     // Format location for display
//     const formatLocation = () => {
//         const { city, state, country, remote } = job.location;
//         let location = '';
//         if (city) location += city;
//         if (state) location += `, ${state}`;
//         if (country) location += `, ${country}`;
//         if (remote) location += ' (Remote)';
//         return location;
//     };

//     // Format salary for display
//     const formatSalary = () => {
//         const { min, max, currency, isPublic } = job.salaryRange;
//         if (!isPublic) return 'Salary not disclosed';

//         let salary = '';
//         if (min) salary += `${currency}${min}`;
//         if (max) salary += ` - ${currency}${max}`;
//         return salary + ' per year';
//     };

//     const handleDeletePost = () => { }

//     if (editMode) {
//         return (
//             <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                 <div className="modal-dialog modal-lg">
//                     <div className="modal-content">
//                         <div className="modal-header px-3 py-4">
//                             <h5 className="modal-title">Full Job Post</h5>
//                             <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
//                         </div>

//                         {/* Body */}
//                         <div className="modal-body px-3">
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <button
//                                     className="btn btn-outline-danger btn-sm"
//                                     onClick={() => setEditMode(false)}
//                                 >
//                                     <i className="ti ti-arrow-left me-2"></i> Cancel Edit
//                                 </button>
//                                 <h2 className="mb-0">Edit Job Post</h2>
//                                 <button
//                                     className="btn btn-primary btn-sm"
//                                     onClick={handleSave}
//                                 >
//                                     <i className="ti ti-check me-2"></i> Save Changes
//                                 </button>
//                             </div>

//                             {/* Edit Form */}
//                             <div className="card border-0 shadow-sm">
//                                 <div className="card-body p-3 p-md-4">
//                                     {/* Basic Information */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Basic Information</h5>
//                                         <div className="row">
//                                             <div className="col-md-6 mb-3">
//                                                 <label htmlFor="title" className="form-label">Job Title*</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="title"
//                                                     name="title"
//                                                     value={job.title}
//                                                     onChange={handleInputChange}
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="col-md-6 mb-3">
//                                                 <label htmlFor="company" className="form-label">Company*</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="company"
//                                                     name="company"
//                                                     value={job.company}
//                                                     onChange={handleInputChange}
//                                                     required
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-md-4 mb-3">
//                                                 <label htmlFor="status" className="form-label">Status*</label>
//                                                 <select
//                                                     className="form-select"
//                                                     id="status"
//                                                     name="status"
//                                                     value={job.status}
//                                                     onChange={handleInputChange}
//                                                     required
//                                                 >
//                                                     <option value="Active">Active</option>
//                                                     <option value="Inactive">Inactive</option>
//                                                     <option value="Closed">Closed</option>
//                                                 </select>
//                                             </div>
//                                             <div className="col-md-4 mb-3">
//                                                 <label htmlFor="type" className="form-label">Employment Type*</label>
//                                                 <select
//                                                     className="form-select"
//                                                     id="type"
//                                                     name="type"
//                                                     value={job.type}
//                                                     onChange={handleInputChange}
//                                                     required
//                                                 >
//                                                     <option value="Full-time">Full-time</option>
//                                                     <option value="Part-time">Part-time</option>
//                                                     <option value="Contract">Contract</option>
//                                                     <option value="Internship">Internship</option>
//                                                 </select>
//                                             </div>
//                                             <div className="col-md-4 mb-3">
//                                                 <label htmlFor="department" className="form-label">Department</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="department"
//                                                     name="department"
//                                                     value={job.department}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Location Information */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Location Information</h5>
//                                         <div className="row">
//                                             <div className="col-md-4 mb-3">
//                                                 <label htmlFor="location.city" className="form-label">City</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="location.city"
//                                                     name="location.city"
//                                                     value={job.location.city}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                             <div className="col-md-4 mb-3">
//                                                 <label htmlFor="location.state" className="form-label">State/Province</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="location.state"
//                                                     name="location.state"
//                                                     value={job.location.state}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                             <div className="col-md-4 mb-3">
//                                                 <label htmlFor="location.country" className="form-label">Country</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="location.country"
//                                                     name="location.country"
//                                                     value={job.location.country}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-md-4 mb-3">
//                                                 <div className="form-check">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id="location.remote"
//                                                         name="location.remote"
//                                                         checked={job.location.remote}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                     <label className="form-check-label" htmlFor="location.remote">
//                                                         Remote Work Available
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4 mb-3">
//                                                 <div className="form-check">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id="location.hybrid"
//                                                         name="location.hybrid"
//                                                         checked={job.location.hybrid}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                     <label className="form-check-label" htmlFor="location.hybrid">
//                                                         Hybrid Work Option
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4 mb-3">
//                                                 <div className="form-check">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id="location.onsite"
//                                                         name="location.onsite"
//                                                         checked={job.location.onsite}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                     <label className="form-check-label" htmlFor="location.onsite">
//                                                         On-site Required
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Salary Information */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Salary Information</h5>
//                                         <div className="row">
//                                             <div className="col-md-3 mb-3">
//                                                 <label htmlFor="salaryRange.min" className="form-label">Minimum Salary</label>
//                                                 <input
//                                                     type="number"
//                                                     className="form-control"
//                                                     id="salaryRange.min"
//                                                     name="salaryRange.min"
//                                                     value={job.salaryRange.min}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                             <div className="col-md-3 mb-3">
//                                                 <label htmlFor="salaryRange.max" className="form-label">Maximum Salary</label>
//                                                 <input
//                                                     type="number"
//                                                     className="form-control"
//                                                     id="salaryRange.max"
//                                                     name="salaryRange.max"
//                                                     value={job.salaryRange.max}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                             <div className="col-md-3 mb-3">
//                                                 <label htmlFor="salaryRange.currency" className="form-label">Currency</label>
//                                                 <select
//                                                     className="form-select"
//                                                     id="salaryRange.currency"
//                                                     name="salaryRange.currency"
//                                                     value={job.salaryRange.currency}
//                                                     onChange={handleInputChange}
//                                                 >
//                                                     <option value="USD">USD ($)</option>
//                                                     <option value="EUR">EUR (€)</option>
//                                                     <option value="GBP">GBP (£)</option>
//                                                 </select>
//                                             </div>
//                                             <div className="col-md-3 mb-3 d-flex align-items-end">
//                                                 <div className="form-check">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id="salaryRange.isPublic"
//                                                         name="salaryRange.isPublic"
//                                                         checked={job.salaryRange.isPublic}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                     <label className="form-check-label" htmlFor="salaryRange.isPublic">
//                                                         Show Salary in Posting
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Experience & Requirements */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Experience & Requirements</h5>
//                                         <div className="row">
//                                             <div className="col-md-6 mb-3">
//                                                 <label htmlFor="experience.level" className="form-label">Experience Level</label>
//                                                 <select
//                                                     className="form-select"
//                                                     id="experience.level"
//                                                     name="experience.level"
//                                                     value={job.experience.level}
//                                                     onChange={handleInputChange}
//                                                 >
//                                                     <option value="">Select Level</option>
//                                                     <option value="Entry">Entry Level</option>
//                                                     <option value="Mid">Mid Level</option>
//                                                     <option value="Senior">Senior Level</option>
//                                                     <option value="Executive">Executive</option>
//                                                 </select>
//                                             </div>
//                                             <div className="col-md-6 mb-3">
//                                                 <label htmlFor="experience.years" className="form-label">Years of Experience</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="experience.years"
//                                                     name="experience.years"
//                                                     value={job.experience.years}
//                                                     onChange={handleInputChange}
//                                                     placeholder="e.g. 3-5 years"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Job Description */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Job Description</h5>
//                                         <textarea
//                                             className="form-control"
//                                             id="description"
//                                             name="description"
//                                             rows="5"
//                                             value={job.description}
//                                             onChange={handleInputChange}
//                                             required
//                                         ></textarea>
//                                     </div>

//                                     {/* Responsibilities */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Responsibilities</h5>
//                                         <div className="input-group mb-2">
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={newResponsibility}
//                                                 onChange={(e) => setNewResponsibility(e.target.value)}
//                                                 placeholder="Add a responsibility"
//                                             />
//                                             <button
//                                                 className="btn btn-outline-primary"
//                                                 type="button"
//                                                 onClick={() => handleAddItem('responsibilities', newResponsibility, setNewResponsibility)}
//                                             >
//                                                 Add
//                                             </button>
//                                         </div>
//                                         <ul className="list-group">
//                                             {job.responsibilities.map((item, index) => (
//                                                 <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                                                     {item}
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-sm btn-outline-danger"
//                                                         onClick={() => handleRemoveItem('responsibilities', index)}
//                                                     >
//                                                         Remove
//                                                     </button>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>

//                                     {/* Requirements */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Requirements</h5>
//                                         <div className="mb-3">
//                                             <label className="form-label">Education Requirements</label>
//                                             <div className="d-flex flex-wrap gap-3">
//                                                 {['High School', 'Bachelor', 'Master', 'PhD'].map(level => (
//                                                     <div key={level} className="form-check">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id={`education-${level}`}
//                                                             checked={job.requirements.education.includes(level)}
//                                                             onChange={(e) => {
//                                                                 if (e.target.checked) {
//                                                                     handleAddItem('requirements', level, () => { }, 'education');
//                                                                 } else {
//                                                                     const index = job.requirements.education.indexOf(level);
//                                                                     if (index !== -1) {
//                                                                         handleRemoveItem('requirements', index, 'education');
//                                                                     }
//                                                                 }
//                                                             }}
//                                                         />
//                                                         <label className="form-check-label" htmlFor={`education-${level}`}>
//                                                             {level}
//                                                         </label>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className="input-group mb-2">
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={newRequirement}
//                                                 onChange={(e) => setNewRequirement(e.target.value)}
//                                                 placeholder="Add a requirement"
//                                             />
//                                             <button
//                                                 className="btn btn-outline-primary"
//                                                 type="button"
//                                                 onClick={() => handleAddItem('requirements', newRequirement, setNewRequirement, 'items')}
//                                             >
//                                                 Add
//                                             </button>
//                                         </div>
//                                         <ul className="list-group">
//                                             {job.requirements.items.map((item, index) => (
//                                                 <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                                                     {item}
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-sm btn-outline-danger"
//                                                         onClick={() => handleRemoveItem('requirements', index, 'items')}
//                                                     >
//                                                         Remove
//                                                     </button>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>

//                                     {/* Skills */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Skills</h5>
//                                         <div className="input-group mb-2">
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={newSkill}
//                                                 onChange={(e) => setNewSkill(e.target.value)}
//                                                 placeholder="Add a skill"
//                                             />
//                                             <button
//                                                 className="btn btn-outline-primary"
//                                                 type="button"
//                                                 onClick={() => handleAddItem('skills', newSkill, setNewSkill)}
//                                             >
//                                                 Add
//                                             </button>
//                                         </div>
//                                         <div className="d-flex flex-wrap gap-2">
//                                             {job.skills.map((skill, index) => (
//                                                 <span key={index} className="badge bg-primary bg-opacity-10 text-primary fw-normal py-2 px-3">
//                                                     {skill}
//                                                     <button
//                                                         type="button"
//                                                         className="ms-2 btn-close btn-close-white"
//                                                         aria-label="Close"
//                                                         onClick={() => handleRemoveItem('skills', index)}
//                                                     ></button>
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Benefits */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Benefits</h5>
//                                         <div className="input-group mb-2">
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={newBenefit}
//                                                 onChange={(e) => setNewBenefit(e.target.value)}
//                                                 placeholder="Add a benefit"
//                                             />
//                                             <button
//                                                 className="btn btn-outline-primary"
//                                                 type="button"
//                                                 onClick={() => handleAddItem('benefits', newBenefit, setNewBenefit)}
//                                             >
//                                                 Add
//                                             </button>
//                                         </div>
//                                         <div className="d-flex flex-wrap gap-2">
//                                             {job.benefits.map((benefit, index) => (
//                                                 <span key={index} className="badge bg-success bg-opacity-10 text-success fw-normal py-2 px-3">
//                                                     {benefit}
//                                                     <button
//                                                         type="button"
//                                                         className="ms-2 btn-close btn-close-white"
//                                                         aria-label="Close"
//                                                         onClick={() => handleRemoveItem('benefits', index)}
//                                                     ></button>
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Application Process */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Application Process</h5>
//                                         <div className="row">
//                                             <div className="col-md-6 mb-3">
//                                                 <label htmlFor="applicationProcess.url" className="form-label">Application URL</label>
//                                                 <input
//                                                     type="url"
//                                                     className="form-control"
//                                                     id="applicationProcess.url"
//                                                     name="applicationProcess.url"
//                                                     value={job.applicationProcess.url}
//                                                     onChange={handleInputChange}
//                                                     placeholder="https://example.com/apply"
//                                                 />
//                                             </div>
//                                             <div className="col-md-6 mb-3">
//                                                 <label htmlFor="applicationProcess.deadline" className="form-label">Application Deadline</label>
//                                                 <input
//                                                     type="date"
//                                                     className="form-control"
//                                                     id="applicationProcess.deadline"
//                                                     name="applicationProcess.deadline"
//                                                     value={job.applicationProcess.deadline}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="applicationProcess.instructions" className="form-label">Application Instructions</label>
//                                             <textarea
//                                                 className="form-control"
//                                                 id="applicationProcess.instructions"
//                                                 name="applicationProcess.instructions"
//                                                 rows="3"
//                                                 value={job.applicationProcess.instructions}
//                                                 onChange={handleInputChange}
//                                             ></textarea>
//                                         </div>
//                                     </div>

//                                     {/* Contact Information */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Contact Information</h5>
//                                         <div className="row">
//                                             <div className="col-md-4 mb-3">
//                                                 <label htmlFor="contactInfo.name" className="form-label">Contact Name</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="contactInfo.name"
//                                                     name="contactInfo.name"
//                                                     value={job.contactInfo.name}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                             <div className="col-md-4 mb-3">
//                                                 <label htmlFor="contactInfo.email" className="form-label">Contact Email</label>
//                                                 <input
//                                                     type="email"
//                                                     className="form-control"
//                                                     id="contactInfo.email"
//                                                     name="contactInfo.email"
//                                                     value={job.contactInfo.email}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                             <div className="col-md-4 mb-3">
//                                                 <label htmlFor="contactInfo.phone" className="form-label">Contact Phone</label>
//                                                 <input
//                                                     type="tel"
//                                                     className="form-control"
//                                                     id="contactInfo.phone"
//                                                     name="contactInfo.phone"
//                                                     value={job.contactInfo.phone}
//                                                     onChange={handleInputChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Additional Options */}
//                                     <div className="mb-4">
//                                         <h5 className="fw-bold mb-3">Additional Options</h5>
//                                         <div className="row">
//                                             <div className="col-md-6 mb-3">
//                                                 <div className="form-check form-switch mb-3">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id="visaSponsorship"
//                                                         name="visaSponsorship"
//                                                         checked={job.visaSponsorship}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                     <label className="form-check-label" htmlFor="visaSponsorship">
//                                                         Visa Sponsorship Available
//                                                     </label>
//                                                 </div>
//                                                 <div className="form-check form-switch">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id="relocationAssistance"
//                                                         name="relocationAssistance"
//                                                         checked={job.relocationAssistance}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                     <label className="form-check-label" htmlFor="relocationAssistance">
//                                                         Relocation Assistance
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // View Mode
//     return (
//         <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog modal-lg">
//                 <div className="modal-content">
//                     <div className="modal-header px-3 py-4">
//                         <h5 className="modal-title">Full Job Post</h5>
//                         <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
//                     </div>

//                     {/* Body */}
//                     <div className="modal-body px-3">
//                         <div className="d-flex justify-content-between align-items-center mb-4">
//                             <button className="btn btn-sm btn-outline-primary"  onClick={onClose}>
//                                 <i className="ti ti-arrow-left me-2"></i> Back to Job Posts
//                             </button>
//                             <button
//                                 className="btn btn-primary btn-sm"
//                                 onClick={handleEdit}
//                             >
//                                 <i className="ti ti-edit me-2"></i> Edit Post
//                             </button>
//                         </div>

//                         {/* View Mode Card */}
//                         <div className="card border-0 shadow-sm hover-shadow transition-all">
//                             <div className="card-body p-3 p-md-4">
//                                 {/* Job Header */}
//                                 <div className="d-flex justify-content-between align-items-start mb-3">
//                                     <div>
//                                         <h3 className="card-title mb-1 fw-bold">{job.title}</h3>
//                                         <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
//                                             <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
//                                                 {job.company}
//                                             </span>
//                                             <span className={`badge rounded-pill ${job.status === 'Active' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${job.status === 'Active' ? 'success' : 'secondary'} fw-normal`}>
//                                                 {job.status}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <div className="dropdown">
//                                         <button
//                                             className="btn btn-sm btn-outline-secondary dropdown-toggle"
//                                             type="button"
//                                             onClick={() => setShowActions(!showActions)}
//                                             aria-expanded={showActions}
//                                         >
//                                             Actions
//                                         </button>
//                                         <ul className={`dropdown-menu dropdown-menu-end ${showActions ? 'show' : ''}`}>
//                                             <li>
//                                                 <button className="dropdown-item btn btn-sm" onClick={handleEdit}>
//                                                     Edit Post
//                                                 </button>
//                                             </li>
//                                             <li>
//                                                 <button className="dropdown-item btn btn-sm" onClick={() => navigate(`/company/job-posts/${job.id}/applicants`)}>
//                                                     View Applicants
//                                                 </button>
//                                             </li>
//                                             <li><hr className="dropdown-divider" /></li>
//                                             <li>
//                                                 <button className="dropdown-item btn btn-sm text-danger" onClick={() => setJob({ ...job, status: 'Closed' })}>
//                                                     Close Post
//                                                 </button>
//                                             </li>
//                                             <li>
//                                                 <button className="dropdown-item btn btn-sm text-danger" onClick={handleDeletePost}>
//                                                     Delete Post
//                                                 </button>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>

//                                 {/* Job Meta */}
//                                 <div className="row mb-3">
//                                     <div className="col-12 col-md-6 mb-2 mb-md-0">
//                                         <div className="d-flex align-items-center text-muted mb-2">
//                                             <i className="ti ti-building me-2 flex-shrink-0"></i>
//                                             <small>{formatLocation()}</small>
//                                         </div>
//                                         <div className="d-flex align-items-center text-muted">
//                                             <i className="ti ti-currency-dollar me-2 flex-shrink-0"></i>
//                                             <small>{formatSalary()}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-12 col-md-6">
//                                         <div className="d-flex align-items-center text-muted mb-2">
//                                             <i className="ti ti-briefcase me-2 flex-shrink-0"></i>
//                                             <small>{job.type}</small>
//                                         </div>
//                                         <div className="d-flex align-items-center text-muted">
//                                             <i className="ti ti-user me-2 flex-shrink-0"></i>
//                                             <small>{job.experience.level} ({job.experience.years} years experience)</small>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Posted Date and Applicants */}
//                                 <div className="d-flex justify-content-between align-items-center mb-4">
//                                     <div className="d-flex align-items-center text-muted">
//                                         <i className="ti ti-calendar-event me-2 flex-shrink-0"></i>
//                                         <small>Posted: {formatDate(job.posted)}</small>
//                                     </div>
//                                     <div className="d-flex align-items-center text-muted">
//                                         <i className="ti ti-users me-2 flex-shrink-0"></i>
//                                         <small>{job.applicants} applicants</small>
//                                     </div>
//                                 </div>

//                                 {/* Job Description */}
//                                 <div className="mb-4">
//                                     <h5 className="fw-bold mb-3">Job Description</h5>
//                                     <p className="text-muted mb-0">{job.description}</p>
//                                 </div>

//                                 {/* Responsibilities */}
//                                 <div className="mb-4">
//                                     <h5 className="fw-bold mb-3">Responsibilities</h5>
//                                     <ul className="text-muted mb-0 ps-3">
//                                         {job.responsibilities.map((item, idx) => (
//                                             <li key={idx}>{item}</li>
//                                         ))}
//                                     </ul>
//                                 </div>

//                                 {/* Requirements */}
//                                 <div className="mb-4">
//                                     <h5 className="fw-bold mb-3">Requirements</h5>
//                                     <div className="mb-3">
//                                         <h6 className="fw-bold mb-2">Education</h6>
//                                         <div className="d-flex flex-wrap gap-2">
//                                             {job.requirements.education.map((edu, idx) => (
//                                                 <span key={idx} className="badge bg-info bg-opacity-10 text-info fw-normal py-2 px-3">
//                                                     {edu}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     <ul className="text-muted mb-0 ps-3">
//                                         {job.requirements.items.map((req, idx) => (
//                                             <li key={idx}>{req}</li>
//                                         ))}
//                                     </ul>
//                                 </div>

//                                 {/* Skills */}
//                                 <div className="mb-4">
//                                     <h5 className="fw-bold mb-3">Skills</h5>
//                                     <div className="d-flex flex-wrap gap-2">
//                                         {job.skills.map((skill, idx) => (
//                                             <span
//                                                 key={idx}
//                                                 className="badge bg-primary bg-opacity-10 text-primary fw-normal py-2 px-3"
//                                             >
//                                                 {skill}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Benefits */}
//                                 <div className="mb-4">
//                                     <h5 className="fw-bold mb-3">Benefits</h5>
//                                     <div className="d-flex flex-wrap gap-2">
//                                         {job.benefits.map((benefit, idx) => (
//                                             <span
//                                                 key={idx}
//                                                 className="badge bg-success bg-opacity-10 text-success fw-normal py-2 px-3"
//                                             >
//                                                 {benefit}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Application Process */}
//                                 <div className="mb-4">
//                                     <h5 className="fw-bold mb-3">Application Process</h5>
//                                     <p className="text-muted mb-2">
//                                         <i className="ti ti-calendar-due me-2"></i>
//                                         Deadline: {job.applicationProcess.deadline ? formatDate(job.applicationProcess.deadline) : 'None specified'}
//                                     </p>
//                                     {job.applicationProcess.url && (
//                                         <p className="text-muted mb-2">
//                                             <i className="ti ti-link me-2"></i>
//                                             Application URL: <a href={job.applicationProcess.url} target="_blank" rel="noopener noreferrer">{job.applicationProcess.url}</a>
//                                         </p>
//                                     )}
//                                     <p className="text-muted mb-0">{job.applicationProcess.instructions}</p>
//                                 </div>

//                                 {/* Additional Information */}
//                                 <div className="mb-4">
//                                     <h5 className="fw-bold mb-3">Additional Information</h5>
//                                     <div className="d-flex flex-wrap gap-3">
//                                         {job.visaSponsorship && (
//                                             <span className="badge bg-info bg-opacity-10 text-info fw-normal py-2 px-3">
//                                                 <i className="ti ti-passport me-1"></i> Visa Sponsorship
//                                             </span>
//                                         )}
//                                         {job.relocationAssistance && (
//                                             <span className="badge bg-info bg-opacity-10 text-info fw-normal py-2 px-3">
//                                                 <i className="ti ti-home-move me-1"></i> Relocation Assistance
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Contact Information */}
//                                 <div className="mb-4">
//                                     <h5 className="fw-bold mb-3">Contact Information</h5>
//                                     <div className="row">
//                                         <div className="col-md-4 mb-2">
//                                             <div className="d-flex align-items-center text-muted">
//                                                 <i className="ti ti-user me-2 flex-shrink-0"></i>
//                                                 <small>{job.contactInfo.name || 'Not specified'}</small>
//                                             </div>
//                                         </div>
//                                         <div className="col-md-4 mb-2">
//                                             <div className="d-flex align-items-center text-muted">
//                                                 <i className="ti ti-mail me-2 flex-shrink-0"></i>
//                                                 <small>
//                                                     {job.contactInfo.email ? (
//                                                         <a href={`mailto:${job.contactInfo.email}`}>{job.contactInfo.email}</a>
//                                                     ) : 'Not specified'}
//                                                 </small>
//                                             </div>
//                                         </div>
//                                         <div className="col-md-4 mb-2">
//                                             <div className="d-flex align-items-center text-muted">
//                                                 <i className="ti ti-phone me-2 flex-shrink-0"></i>
//                                                 <small>{job.contactInfo.phone || 'Not specified'}</small>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Footer Actions */}
//                             <div className="card-footer bg-transparent border-top d-flex flex-column flex-md-row justify-content-between align-items-center p-3 gap-2">
//                                 <div className="d-flex gap-2 w-100 w-md-auto">
//                                     <button
//                                         className="btn btn-outline-primary btn-sm flex-grow-1"
//                                         onClick={() => navigate(`/company/job-posts/${job.id}/applicants`)}
//                                     >
//                                         <i className="ti ti-users me-2"></i> View Applicants
//                                     </button>
//                                     <button
//                                         className="btn btn-secondary btn-sm flex-grow-1"
//                                         onClick={handleEdit}
//                                     >
//                                         <i className="ti ti-edit me-2"></i> Edit Post
//                                     </button>
//                                     <button
//                                         className="btn btn-danger btn-sm flex-grow-1"
//                                         onClick={handleDeletePost}
//                                     >
//                                         <i className="ti ti-trash me-2"></i> Delete Post
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };



const JobPostCard = ({ isOpen, job, onClose, setJobPostOpen, jobList, setJobList }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedJob, setEditedJob] = useState({ ...job });

    const { handleJobEdit, handleConfirmDeleteJob } = useCompanyContext()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedJob(prev => ({ ...prev, [name]: value }));
    };

    const handleRequirementsChange = (e, index) => {
        const newRequirements = [...editedJob.requirements];
        newRequirements[index] = e.target.value;
        setEditedJob(prev => ({ ...prev, requirements: newRequirements }));
    };

    const handleSkillsChange = (e, index) => {
        const newSkills = [...editedJob.skills];
        newSkills[index] = e.target.value;
        setEditedJob(prev => ({ ...prev, skills: newSkills }));
    };

    const addRequirement = () => {
        setEditedJob(prev => ({
            ...prev,
            requirements: [...prev.requirements, ""]
        }));
    };

    const deleteRequirement = (index) => {
        const newRequirements = [...editedJob.requirements];
        newRequirements.splice(index, 1);
        setEditedJob(prev => ({
            ...prev,
            requirements: newRequirements
        }));
    };

    const addSkill = () => {
        setEditedJob(prev => ({
            ...prev,
            skills: [...prev.skills, ""]
        }));
    };

    const deleteSkill = (index) => {
        const newSkills = [...editedJob.skills];
        newSkills.splice(index, 1);
        setEditedJob(prev => ({
            ...prev,
            skills: newSkills
        }));
    };

    const handleEdit = async () => {
        await handleJobEdit(editedJob._id, editedJob)
        setEditMode(false);
    }

    const handleCancel = () => {
        setEditedJob({ ...job });
        setEditMode(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);

    const handleDeleteJobModal = (jobId) => {
        setJobToDelete(jobId);
        setIsModalOpen(true);
    };

    const handleDeleteJob = async () => {
        try {
            await handleConfirmDeleteJob(jobToDelete);
            setIsModalOpen(false);
            setJobPostOpen(false);
        } catch (error) {
            console.error("Failed to delete job:", error);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    const { title, company, location, salary, type, experience, posted, description, requirements, skills, applicants, status } =
        editMode ? editedJob : editedJob;

    if (!isOpen) return null;

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
                        <div className="modal-body px-3 px-md-4">
                            <div className="card mb-4 border-0 shadow-sm">
                                <div className="card-body p-3 p-md-4">
                                    {/* Header Section */}
                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                        <div className="w-100 pe-3">
                                            <h4 className="card-title mb-2 fw-bold text-dark">
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={title}
                                                        onChange={handleInputChange}
                                                        className="form-control form-control-lg fw-bold border-2 py-2 px-3"
                                                        placeholder="Job Title"
                                                    />
                                                ) : (
                                                    title
                                                )}
                                            </h4>
                                            <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                                                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 d-flex align-items-center">
                                                    <i className="ti ti-building me-1"></i>
                                                    {company}
                                                </span>
                                                {/* <span className={`badge rounded-pill px-3 py-2 d-flex align-items-center ${status === 'Active' ? 'bg-success' : 'bg-danger'} bg-opacity-10 text-${status === 'Active' ? 'success' : 'danger'}`}>
                                                    {editMode ? (
                                                        <select
                                                            name="status"
                                                            value={status}
                                                            onChange={handleInputChange}
                                                            className="form-select form-select-sm bg-transparent"
                                                        >
                                                            <option value="Active">Active</option>
                                                            <option value="Inactive">Inactive</option>
                                                            <option value="Draft">Draft</option>
                                                        </select>
                                                    ) : (
                                                        <>
                                                            <i className={`ti ti-${status === 'Active' ? 'circle-check' : 'circle-x'} me-1`}></i>
                                                            {status}
                                                        </>
                                                    )}
                                                </span> */}
                                                <span
                                                    className={`badge rounded-pill px-3 py-2 d-flex align-items-center ${status === 'Active' ? 'bg-success' : (status === 'Inactive' ? 'bg-danger' : 'bg-warning')} bg-opacity-10 text-${status === 'Active' ? 'success' : (status === 'Inactive' ? 'danger' : 'warning')}`}
                                                >
                                                    {editMode ? (
                                                        <select
                                                            name="status"
                                                            value={status}
                                                            onChange={handleInputChange}
                                                            className="form-select form-select-sm bg-transparent border-0"
                                                        >
                                                            <option value="Active">Active</option>
                                                            <option value="Inactive">Inactive</option>
                                                            <option value="Draft">Draft</option>
                                                        </select>
                                                    ) : (
                                                        <>
                                                            <i
                                                                className={`ti ti-${status === 'Active' ? 'circle-check' : (status === 'Inactive' ? 'circle-x' : 'circle-dash')}`}
                                                                style={{ fontSize: '1.2em' }}  // Adjust icon size if needed
                                                            ></i>
                                                            {status}
                                                        </>
                                                    )}
                                                </span>

                                            </div>
                                        </div>
                                        {!editMode && (
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="ti ti-dots-vertical me-1"></i> Actions
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                                    <li>
                                                        <button className="dropdown-item d-flex align-items-center" onClick={() => setEditMode(true)}>
                                                            <i className="ti ti-edit me-2"></i> Edit Post
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item d-flex align-items-center">
                                                            <i className="ti ti-users me-2"></i> View Applicants
                                                        </button>
                                                    </li>
                                                    <li><hr className="dropdown-divider my-2" /></li>
                                                    <li>
                                                        <button className="dropdown-item d-flex align-items-center text-danger">
                                                            <i className="ti ti-lock me-2"></i> Close Post
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item d-flex align-items-center text-danger" onClick={() => handleDeleteJobModal(job._id)}>
                                                            <i className="ti ti-trash me-2"></i> Delete Post
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Job Meta Information */}
                                    <div className="row mb-4 g-3">
                                        <div className="col-12 col-md-6">
                                            <div className="d-flex align-items-center text-muted mb-3">
                                                <i className="ti ti-building me-2 fs-5 text-primary"></i>
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={location}
                                                        onChange={handleInputChange}
                                                        className="form-control form-control-sm border-0 border-bottom rounded-0 px-1 py-2"
                                                        placeholder="Location"
                                                    />
                                                ) : (
                                                    <span className="text-dark">{location}</span>
                                                )}
                                            </div>
                                            <div className="d-flex align-items-center text-muted mb-3">
                                                <i className="ti ti-currency-dollar me-2 fs-5 text-primary"></i>
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        name="salary"
                                                        value={salary}
                                                        onChange={handleInputChange}
                                                        className="form-control form-control-sm border-0 border-bottom rounded-0 px-1 py-2"
                                                        placeholder="Salary Range"
                                                    />
                                                ) : (
                                                    <span className="text-dark">{salary}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="d-flex align-items-center text-muted mb-3">
                                                <i className="ti ti-briefcase me-2 fs-5 text-primary"></i>
                                                {editMode ? (
                                                    <select
                                                        name="type"
                                                        value={type}
                                                        onChange={handleInputChange}
                                                        className="form-select form-select-sm bg-transparent"
                                                    >
                                                        <option value="Full-time">Full-time</option>
                                                        <option value="Part-time">Part-time</option>
                                                        <option value="Contract">Contract</option>
                                                        <option value="Temporary">Temporary</option>
                                                        <option value="Internship">Internship</option>
                                                        <option value="Freelance">Freelance</option>
                                                        <option value="Seasonal">Seasonal</option>
                                                        <option value="Volunteer">Volunteer</option>
                                                        <option value="Apprenticeship">Apprenticeship</option>
                                                        <option value="Remote">Remote</option>
                                                        <option value="Hybrid">Hybrid</option>
                                                        <option value="On-site">On-site</option>
                                                        <option value="Consultant">Consultant</option>
                                                        <option value="Per Diem">Per Diem</option>
                                                        <option value="Commission">Commission-based</option>
                                                        <option value="Shift Work">Shift Work</option>
                                                        <option value="Flexible">Flexible Schedule</option>
                                                    </select>
                                                ) : (
                                                    <span className="text-dark">{type}</span>
                                                )}
                                            </div>
                                            <div className="d-flex align-items-center text-muted mb-3">
                                                <i className="ti ti-user me-2 fs-5 text-primary"></i>
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        name="experience"
                                                        value={experience}
                                                        onChange={handleInputChange}
                                                        className="form-control form-control-sm border-0 border-bottom rounded-0 px-1 py-2"
                                                        placeholder="Experience Required"
                                                    />
                                                ) : (
                                                    <span className="text-dark">{experience} experience</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Posted Date and Applicants */}
                                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                                        <div className="d-flex align-items-center text-muted">
                                            <i className="ti ti-calendar-event me-2 fs-5 text-primary"></i>
                                            <span className="text-dark">Posted: {formatDateToRelative(posted)}</span>
                                        </div>
                                        {!editMode && (
                                            <div className="d-flex align-items-center text-muted">
                                                <i className="ti ti-users me-2 fs-5 text-primary"></i>
                                                <span className="text-dark">{applicants} applicants</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Job Description */}
                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-3 text-dark d-flex align-items-center">
                                            <i className="ti ti-notes me-2"></i> Job Description
                                        </h6>
                                        {editMode ? (
                                            <textarea
                                                name="description"
                                                value={description}
                                                onChange={handleInputChange}
                                                className="form-control border-2"
                                                rows="5"
                                                placeholder="Enter detailed job description..."
                                            />
                                        ) : (
                                            <p className="text-muted mb-0 ps-4">{description}</p>
                                        )}
                                    </div>

                                    {/* Requirements Section */}
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-bold text-dark d-flex align-items-center">
                                                <i className="ti ti-list-check me-2"></i> Requirements
                                            </h6>
                                            {editMode && (
                                                <button
                                                    className="btn btn-sm btn-primary d-flex align-items-center"
                                                    onClick={addRequirement}
                                                >
                                                    <i className="ti ti-plus me-1"></i> Add Requirement
                                                </button>
                                            )}
                                        </div>
                                        {editMode ? (
                                            <div className="ps-4">
                                                {requirements.map((req, idx) => (
                                                    <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                                                        <span className="bullet-point text-primary">•</span>
                                                        <input
                                                            type="text"
                                                            value={req}
                                                            onChange={(e) => handleRequirementsChange(e, idx)}
                                                            className="form-control border-0 border-bottom rounded-0 px-1 py-2"
                                                            placeholder="Enter requirement"
                                                        />
                                                        <button
                                                            className="btn btn-sm btn-link text-danger"
                                                            onClick={() => deleteRequirement(idx)}
                                                        >
                                                            <i className="ti ti-trash"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <ul className="text-muted mb-0 ps-4">
                                                {requirements.map((req, idx) => (
                                                    <li key={idx} className="mb-2">{req}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Skills Section */}
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-bold text-dark d-flex align-items-center">
                                                <i className="ti ti-tools me-2"></i> Skills
                                            </h6>
                                            {editMode && (
                                                <button
                                                    className="btn btn-sm btn-primary d-flex align-items-center"
                                                    onClick={addSkill}
                                                >
                                                    <i className="ti ti-plus me-1"></i> Add Skill
                                                </button>
                                            )}
                                        </div>
                                        {editMode ? (
                                            <div className="d-flex flex-wrap gap-2 ps-4">
                                                {skills.map((skill, idx) => (
                                                    <div key={idx} className="d-flex align-items-center gap-1">
                                                        <span className="badge bg-primary bg-opacity-20 text-primary fw-normal py-2 px-3 d-flex align-items-center">
                                                            <input
                                                                type="text"
                                                                value={skill}
                                                                onChange={(e) => handleSkillsChange(e, idx)}
                                                                className="form-control form-control-sm border-0 bg-transparent p-0 text-white"
                                                            />
                                                        </span>
                                                        <button
                                                            className="btn btn-sm btn-link text-danger p-0"
                                                            onClick={() => deleteSkill(idx)}
                                                        >
                                                            <i className="ti ti-trash"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="d-flex flex-wrap gap-2 ps-4">
                                                {skills?.map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="badge bg-primary bg-opacity-10 text-primary fw-normal py-2 px-3"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="card-footer bg-transparent border-top-0 px-0 pt-4 pb-0">
                                        {editMode ? (
                                            <div className="d-flex gap-3">
                                                <button
                                                    className="btn btn-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
                                                    onClick={handleEdit}
                                                >
                                                    <i className="ti ti-check me-2"></i> Save Changes
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
                                                    onClick={handleCancel}
                                                >
                                                    <i className="ti ti-x me-2"></i> Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="d-flex gap-3">
                                                <button className="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center">
                                                    <i className="ti ti-users me-2"></i> View Applicants
                                                </button>
                                                <button
                                                    className="btn btn-secondary btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
                                                    onClick={() => setEditMode(true)}
                                                >
                                                    <i className="ti ti-edit me-2"></i> Edit Post
                                                </button>
                                                <button className="btn btn-outline-danger btn-sm flex-grow-1 d-flex align-items-center justify-content-center" onClick={() => handleDeleteJobModal(job._id)}>
                                                    <i className="ti ti-trash me-2"></i> Delete Post
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteConfirmaton
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleDeleteJob}
            />
        </>
    );
};

const CompanyJobPosts = () => {

    const [jobPostOpen, setJobPostOpen] = useState(false)
    const [selectedJobPost, setSelectedJobPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectOption, setSelectOption] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobListPerPage = 10;
    const { getAllJobs, isLoading, jobList } = useCompanyContext()

    useEffect(() => {
        getAllJobs()
    }, [currentPage])

    const handleViewJobPost = (jobpost) => {
        setJobPostOpen(true);
        setSelectedJobPost(jobpost);
    };

    const handleModalClose = () => {
        setJobPostOpen(false);
        setSelectedJobPost(null);
    };

    const filterJob = () => {
        let filteredJobs;
        if (searchTerm) {
            filteredJobs = jobList.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else if (selectOption) {
            filteredJobs = jobList.filter(job => job.status === selectOption);
        } else {
            filteredJobs = jobList;
        }

        setFilteredJobs(filteredJobs);
    };

    useEffect(() => {
        filterJob();
    }, [searchTerm, selectOption, jobList]);


    const indexOfLastJobList = currentPage * jobListPerPage;
    const indexOfFirstJobList = indexOfLastJobList - jobListPerPage;
    const currentJobList = filteredJobs?.slice(indexOfFirstJobList, indexOfLastJobList);
    const totalPages = Math.ceil(filteredJobs?.length / jobListPerPage);

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
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    filterJob();
                                }}
                            />
                            <i className="ti ti-search position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                        </div>

                        <select
                            className="form-select form-select-sm w-auto"
                            onChange={(e) => {
                                setSelectOption(e.target.value);
                                filterJob();
                            }}
                        >
                            <option value="">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Draft">Draft</option>
                            <option value="Inactive">Inactive</option>
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
                                                    <span>Loading Jobs...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : currentJobList?.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-muted">
                                                No Job found. Add your first Job.
                                            </td>
                                        </tr>
                                    ) : (
                                        currentJobList?.map((job) => (
                                            <tr key={job._id}>
                                                <td className="d-none d-sm-table-cell">{job.title || <span className="text-muted">N/A</span>}</td>
                                                <td>{job.location}</td>
                                                <td className="d-none d-md-table-cell">{job.experience}</td>
                                                <td className="d-none d-lg-table-cell">{formatDateToRelative(job.posted)}</td>
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
                        setJobPostOpen={setJobPostOpen}
                        jobList={jobList}
                    />
                    // <JobPostCard
                    //     isOpen={jobPostOpen}
                    //     singleJob={selectedJobPost}
                    //     onClose={handleModalClose}
                    // />
                )}

                {/* Pagination */}
                <nav aria-label="Page navigation" className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link btn "
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