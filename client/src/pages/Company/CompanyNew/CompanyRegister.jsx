import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CompanyRegister = () => {
  const [companyData, setCompanyData] = useState({
    companyname: '',
    email: '',
    phonenumber: '',
    description:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company Data Submitted:', companyData);
    alert('Company registered successfully!');
  };

  return (
    <div className="container py-3 py-md-4  ">
      <h2 className=" py-1 mb-1 mt-5">Register Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="companyname" className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyname"
            name="companyname"
            value={companyData.companyname}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={companyData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phonenumber" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phonenumber"
            name="phonenumber"
            value={companyData.phonenumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            type="text"
            className="form-control"
            rows={5}
            id="description"
            name="description"
            value={companyData.description}
            onChange={handleInputChange}
            required
          >
            </textarea>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="/company/CompanyDetail" className="btn btn-outline-danger" state={{ companyData }}>Submit Company Detail</Link>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegister;
