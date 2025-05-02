import React, { useEffect, useState } from 'react'
import LogoAnimation from '../components/LogoAnimation';
import { useAuthContext } from '../context/auth-context';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const { login } = useAuthContext()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserInfo(() => ({
            ...userInfo,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

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
            const res = await login(userInfo)
            if (res.success && res.path) {
                navigate(`/${res.path}`);
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    // return (
    //     <>
    //         {/* Preloader  */}
    //         <LogoAnimation />

    //         {/* Body Wrapper  */}
    //         <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-sidebartype="full"
    //             data-sidebar-position="fixed" data-header-position="fixed">
    //             <div className="position-relative overflow-hidden radial-gradient min-vh-100">
    //                 <div className="position-relative z-index-5">
    //                     <div className="row">
    //                         <div className="col-xl-7 col-xxl-8">
    //                             <Link
    //                                 to="https://recruitway.ai/"
    //                                 className="text-nowrap logo-img d-block px-4 py-9 w-100 position-absolute"
    //                                 style={{ top: 0, left: 0 }}
    //                             >
    //                                 <img src="./images/logos/logo.webp" width="180" alt="" />
    //                             </Link>

    //                             <div className="d-none d-xl-flex align-items-center justify-content-center" style={{ height: "calc(100vh - 80px)" }}>
    //                                 <img
    //                                     src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/backgrounds/login-security.svg"
    //                                     alt="" className="img-fluid" width="500" />
    //                             </div>
    //                         </div>
    //                         <div className="col-xl-5 col-xxl-4">
    //                             <div className="authentication-login min-vh-100 bg-body row justify-content-center align-items-center p-4">
    //                                 <div className="col-sm-8 col-md-6 col-xl-9">
    //                                     <h2 className="mb-3 fs-7 fw-bolder">Welcome to RECRUITWAY</h2>
    //                                     <p className=" mb-9">Your Login Dashboard</p>

    //                                     {/* <div className="row">
    //                                         <div className="col-6 mb-2 mb-sm-0">
    //                                             <a className="btn btn-white text-dark border fw-normal d-flex align-items-center justify-content-center rounded-2 py-8"
    //                                                 href="javascript:void(0)" role="button">
    //                                                 <img
    //                                                     src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/google-icon.svg"
    //                                                     alt="" className="img-fluid me-2" width="18" height="18" />
    //                                                 <span className="d-none d-sm-block me-1 flex-shrink-0">Sign in with</span>Google
    //                                             </a>
    //                                         </div>
    //                                         <div className="col-6">
    //                                             <a className="btn btn-white text-dark border fw-normal d-flex align-items-center justify-content-center rounded-2 py-8"
    //                                                 href="javascript:void(0)" role="button">
    //                                                 <img
    //                                                     src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/facebook-icon.svg"
    //                                                     alt="" className="img-fluid me-2" width="18" height="18" />
    //                                                 <span className="d-none d-sm-block me-1 flex-shrink-0">Sign in with</span>FB
    //                                             </a>
    //                                         </div>
    //                                     </div>
    //                                     <div className="position-relative text-center my-4">
    //                                         <p className="mb-0 fs-4 px-3 d-inline-block bg-white text-dark z-index-5 position-relative">or sign in
    //                                             with</p>
    //                                         <span className="border-top w-100 position-absolute top-50 start-50 translate-middle"></span>
    //                                     </div> */}

    //                                     <form onSubmit={handleSubmit}>
    //                                         <div className="mb-3">
    //                                             <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    //                                             <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={userInfo.email} onChange={handleChange} required />
    //                                         </div>
    //                                         <div className="mb-4">
    //                                             <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    //                                             <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={userInfo.password} onChange={handleChange} required />
    //                                         </div>
    //                                         <div className="d-flex align-items-center justify-content-between mb-4">
    //                                             {/* <div className="form-check">
    //                                                 <input className="form-check-input primary" type="checkbox" name="rememberMe" id="flexCheckChecked" />
    //                                                 <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
    //                                                     Remember this Device
    //                                                 </label>
    //                                             </div> */}
    //                                             <Link className="text-primary fw-medium" to="/forgot-password">Forgot Password?</Link>
    //                                         </div>
    //                                         <button type="submit" className="btn btn-primary w-100 py-8 mb-4 rounded-2">Sign In</button>
    //                                         <div className="d-flex align-items-center justify-content-center">
    //                                             <p className="fs-4 mb-0 fw-medium">New to RECRUITWAY?</p>
    //                                             <Link to="/register" className="text-primary fw-medium ms-2">Create an account</Link>
    //                                         </div>
    //                                     </form>

    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>
    //         </div>
    //     </>
    // )

    return (
        <>
            <LogoAnimation />
            <div className="d-flex min-vh-100 align-items-center justify-content-center bg-light">
                {/* Login Card */}
                <div className="col-10 col-md-8 col-lg-6 col-xl-4">
                    <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                        {/* Header Section */}
                        <div className="card-header bg-primary text-white p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to="/" className="text-white text-decoration-none">
                                    <img
                                        src="./images/logos/logo.webp"
                                        alt="RecruitWay Logo"
                                        width="140"
                                        className="d-inline-block align-top"
                                    />
                                </Link>
                                <h2 className="mb-0 fs-4 fw-bold">Welcome Back</h2>
                            </div>
                        </div>

                        {/* Body Section */}
                        <div className="card-body p-4 p-md-5">
                            <p className="text-muted mb-4">Login to your account</p>

                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                {/* Email Field */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-medium">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-transparent">
                                            <i className="bi bi-envelope text-muted"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control py-2"
                                            id="email"
                                            name="email"
                                            value={userInfo.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-medium">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-transparent">
                                            <i className="bi bi-lock text-muted"></i>
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control py-2"
                                            id="password"
                                            name="password"
                                            value={userInfo.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    {/* <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label small text-muted" htmlFor="rememberMe">
                                        Remember me
                                    </label>
                                </div> */}
                                    <Link to="/forgot-password" className="small text-decoration-none">
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2 mb-3 fw-medium"
                                >
                                    Sign In
                                </button>

                                {/* Divider */}
                                <div className="position-relative my-4">
                                    <div className="border-top"></div>
                                    <div className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
                                        OR
                                    </div>
                                </div>

                                <div className="row">
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
                                    <p className="mb-0 fs-4 px-3 d-inline-block bg-white text-dark z-index-5 position-relative">or sign in
                                        with</p>
                                    <span className="border-top w-100 position-absolute top-50 start-50 translate-middle"></span>
                                </div>

                                {/* Sign Up Link */}
                                <div className="text-center small">
                                    <span className="text-muted">Don't have an account? </span>
                                    <Link to="/register" className="text-decoration-none fw-medium">
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login