import React, { useState } from "react";
import { Link } from "react-router-dom";

const CandidateForm = () => {
  const [candidatefrom, setCandidateFrom] = useState({
    appliedFor: "",
    name: "",
    phone: "Active",
    email: "",
    address: "",
    currentsalary: "",
    salaryexpectation: "",
    employmentType: "Full-time",
    experienceRequired: "",
    skill: "",
  });
  const[resumeFile,setResumeFile]=useState(null);
  const handleFileChange=(e)=>{
    setResumeFile(e.target.file[0]);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCandidateFrom({ ...candidatefrom, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append('email',candidatefrom.email);
    formData.append('phone',candidatefrom.phone);
    formData.append('currentsalary',candidatefrom.currentsalary);
    formData.append('salaryexpectation',candidatefrom.salaryexpectation);
    if(resumeFile){
      formData.append('resume',resumeFile)
    }
  
    console.log(" Submitted:", candidatefrom);
    alert("Job post submitted successfully!");
  };

  return (
    <div className="container-fluid">
      <div className="container py-3 py-md-4">
        <h2 className="mb-4">Candidate from</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="appliedFor" className="form-label">
                Applied For
              </label>
              <input
                type="text"
                className="form-control"
                id="appliedFor"
                name="appliedFor"
                value={candidatefrom.appliedFor}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={candidatefrom.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={candidatefrom.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phonenumber"
                name="phone"
                value={candidatefrom.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="currentSalary" className="form-label">
                Current Salary
              </label>
              <input
                type="text"
                className="form-control"
                id="currentSalary"
                name="currentsalary"
                value={candidatefrom.currentsalary}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="employmentType" className="form-label">
                Employment Type
              </label>
              <select
                className="form-select"
                id="employmentType"
                name="employmentType"
                value={candidatefrom.employmentType}
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
              <label htmlFor="salaryexpectation" className="form-label">
                Salary Expectation
              </label>
              <input
                type="text"
                className="form-control"
                id="salaryexpectation"
                name="salaryexpectation"
                value={candidatefrom.salaryexpectation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="address"
                className="form-control"
                id="address"
                name="address"
                value={candidatefrom.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="experienceRequired" className="form-label">
              Experience
            </label>
            <input
              type="text"
              className="form-control"
              id="experienceRequired"
              name="experienceRequired"
              value={candidatefrom.experienceRequired}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="skill" className="form-label">
              Skill
            </label>
            <textarea
              className="form-control"
              id="skill"
              name="skill"
              rows="3"
              value={candidatefrom.skill}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="resume" className="form-label">
              Upload Resume(.doc,.pdf,.zip)
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".doc,.pdf,.zip"
              onChange={handleFileChange}
              required
            ></input>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link
              to="/company/candidates"
              type="submit"
              className="btn btn-outline-danger "
            >
              Submit
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
