import React, { useState } from 'react'
import LogoAnimation from '../components/LogoAnimation'
import { useAuthContext } from '../context/auth-context'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Register = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        role: "",
    })

    const { register } = useAuthContext()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const contain = (password) => {
            const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
            return regex.test(password);
        };

        if (userInfo.password.includes(' ')) {
            toast.dismiss();
            return toast.error("Password cannot contain spaces");
        }

        if (userInfo.password.length < 6 || userInfo.password.length > 20) {
            toast.dismiss();
            return toast.error("Password must be 6-20 characters.");
        }

        if (!contain(userInfo.password)) {
            toast.dismiss();
            return toast.error("Password must include a number and uppercase letter.");
        }

        try {
            const newpath = await register(userInfo);
            if (newpath) {
                navigate(`/${newpath}`);
            }

        } catch (error) {
            console.error("Error during registration:", error.message);
        }
    };

    return (
        <>
            {/* Preloader  */}
            <LogoAnimation />

            {/* Body Wrapper */}
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
                <div className="position-relative overflow-hidden radial-gradient min-vh-100">
                    <div className="position-relative z-index-5">
                        <div className="row">
                            <div className="col-xl-7 col-xxl-8">
                                <a href="index.html" className="text-nowrap logo-img d-block px-4 py-9 w-100">
                                    <img
                                        src="#"
                                        width="180" alt="" />
                                </a>
                                <div className="d-none d-xl-flex align-items-center justify-content-center" style={{ height: "calc(100vh - 80px)" }}>
                                    <img
                                        src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/backgrounds/login-security.svg"
                                        alt="" className="img-fluid" width="500" />
                                </div>
                            </div>
                            <div className="col-xl-5 col-xxl-4">
                                <div className="authentication-login min-vh-100 bg-body row justify-content-center align-items-center p-4">
                                    <div className="col-sm-8 col-md-6 col-xl-9">
                                        <h2 className="mb-3 fs-7 fw-bolder">Welcome to RECRUITWAY</h2>
                                        <p className=" mb-9">Your Register Dashboard</p>

                                        {/* <div className="row">
                                            <div className="col-6 mb-2 mb-sm-0">
                                                <a className="btn btn-white text-dark border fw-normal d-flex align-items-center justify-content-center rounded-2 py-8"
                                                    href="javascript:void(0)" role="button">
                                                    <img
                                                        src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/google-icon.svg"
                                                        alt="" className="img-fluid me-2" width="18" height="18" />
                                                    <span className="d-none d-sm-block me-1 flex-shrink-0">Sign in with</span>Google
                                                </a>
                                            </div>
                                            <div className="col-6">
                                                <a className="btn btn-white text-dark border fw-normal d-flex align-items-center justify-content-center rounded-2 py-8"
                                                    href="javascript:void(0)" role="button">
                                                    <img
                                                        src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/facebook-icon.svg"
                                                        alt="" className="img-fluid me-2" width="18" height="18" />
                                                    <span className="d-none d-sm-block me-1 flex-shrink-0">Sign in with</span>FB
                                                </a>
                                            </div>
                                        </div>
                                        <div className="position-relative text-center my-4">
                                            <p className="mb-0 fs-4 px-3 d-inline-block bg-white text-dark z-index-5 position-relative">or sign Up
                                                with</p>
                                            <span className="border-top w-100 position-absolute top-50 start-50 translate-middle"></span>
                                        </div> */}

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={userInfo.email} onChange={handleChange} required />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={userInfo.password} onChange={handleChange} required />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="role" className="form-label text-muted">Choose Role</label>
                                                <select
                                                    className="form-select btn btn-light-primary text-primary"
                                                    aria-label="Choose Role"
                                                    name="role"
                                                    value={userInfo.role}
                                                    onChange={handleChange}
                                                    required
                                                    id="role"
                                                >
                                                    <option className='d-none' value="" disabled>Choose Role</option>
                                                    <option value="interviewee">Interviewee</option>
                                                    <option value="interviewer">Interviewer</option>
                                                    <option value="company">Company</option>
                                                    <option value="user">User</option>
                                                </select>
                                            </div>

                                            <button type="submit" className="btn btn-primary w-100 py-8 mb-4 rounded-2">Sign Up</button>
                                            <div className="d-flex align-items-center">
                                                <p className="fs-4 mb-0 text-dark">Already have an Account?</p>
                                                <Link to="/login" className="text-primary fw-medium ms-2">Log In</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register