import React from 'react'

const CompanyMobileNavbar = () => {
    return (
        <>
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="mobilenavbar" aria-labelledby="offcanvasWithBothOptionsLabel">
                <nav className="sidebar-nav scroll-sidebar">
                    <div className="offcanvas-header justify-content-between">
                        <img src="/images/logos/favicon.ico" alt="" className="img-fluid" />
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body profile-dropdown mobile-navbar" data-simplebar>
                        <ul id="sidebarnav">
                            <li className="sidebar-item">
                                <a className="sidebar-link has-arrow" href="javascript:void(0)" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-apps"></i>
                                    </span>
                                    <span className="hide-menu">Apps</span>
                                </a>
                                <ul aria-expanded="false" className="collapse first-level my-3">
                                    <li className="sidebar-item py-2">
                                        <a href="#" className="d-flex align-items-center">
                                            <div className="bg-white rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                                <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-dd-chat.svg" alt="" className="img-fluid" width="24" height="24" />
                                            </div>
                                            <div className="d-inline-block">
                                                <h6 className="mb-1 bg-hover-primary">Chat Application</h6>
                                                <span className="fs-2 d-block fw-normal text-muted">New messages arrived</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="sidebar-item py-2">
                                        <a href="#" className="d-flex align-items-center">
                                            <div className="bg-white rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                                <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-dd-invoice.svg" alt="" className="img-fluid" width="24" height="24" />
                                            </div>
                                            <div className="d-inline-block">
                                                <h6 className="mb-1 bg-hover-primary">Invoice App</h6>
                                                <span className="fs-2 d-block fw-normal text-muted">Get latest invoice</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="sidebar-item py-2">
                                        <a href="#" className="d-flex align-items-center">
                                            <div className="bg-white rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                                <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-dd-mobile.svg" alt="" className="img-fluid" width="24" height="24" />
                                            </div>
                                            <div className="d-inline-block">
                                                <h6 className="mb-1 bg-hover-primary">Contact Application</h6>
                                                <span className="fs-2 d-block fw-normal text-muted">2 Unsaved Contacts</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="sidebar-item py-2">
                                        <a href="#" className="d-flex align-items-center">
                                            <div className="bg-white rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                                <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-dd-message-box.svg" alt="" className="img-fluid" width="24" height="24" />
                                            </div>
                                            <div className="d-inline-block">
                                                <h6 className="mb-1 bg-hover-primary">Email App</h6>
                                                <span className="fs-2 d-block fw-normal text-muted">Get new emails</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="sidebar-item py-2">
                                        <a href="#" className="d-flex align-items-center">
                                            <div className="bg-white rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                                <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-dd-cart.svg" alt="" className="img-fluid" width="24" height="24" />
                                            </div>
                                            <div className="d-inline-block">
                                                <h6 className="mb-1 bg-hover-primary">User Profile</h6>
                                                <span className="fs-2 d-block fw-normal text-muted">learn more information</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="sidebar-item py-2">
                                        <a href="#" className="d-flex align-items-center">
                                            <div className="bg-white rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                                <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-dd-date.svg" alt="" className="img-fluid" width="24" height="24" />
                                            </div>
                                            <div className="d-inline-block">
                                                <h6 className="mb-1 bg-hover-primary">Calendar App</h6>
                                                <span className="fs-2 d-block fw-normal text-muted">Get dates</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="sidebar-item py-2">
                                        <a href="#" className="d-flex align-items-center">
                                            <div className="bg-white rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                                <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-dd-lifebuoy.svg" alt="" className="img-fluid" width="24" height="24" />
                                            </div>
                                            <div className="d-inline-block">
                                                <h6 className="mb-1 bg-hover-primary">Contact List Table</h6>
                                                <span className="fs-2 d-block fw-normal text-muted">Add new contact</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="sidebar-item py-2">
                                        <a href="#" className="d-flex align-items-center">
                                            <div className="bg-white rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                                <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-dd-application.svg" alt="" className="img-fluid" width="24" height="24" />
                                            </div>
                                            <div className="d-inline-block">
                                                <h6 className="mb-1 bg-hover-primary">Notes Application</h6>
                                                <span className="fs-2 d-block fw-normal text-muted">To-do and Daily tasks</span>
                                            </div>
                                        </a>
                                    </li>
                                    <ul className="px-8 mt-7 mb-4">
                                        <li className="sidebar-item mb-3">
                                            <h5 className="fs-5 fw-semibold">Quick Links</h5>
                                        </li>
                                        <li className="sidebar-item py-2">
                                            <a className="fw-semibold text-dark" href="#">Pricing Page</a>
                                        </li>
                                        <li className="sidebar-item py-2">
                                            <a className="fw-semibold text-dark" href="#">Authentication Design</a>
                                        </li>
                                        <li className="sidebar-item py-2">
                                            <a className="fw-semibold text-dark" href="#">Register Now</a>
                                        </li>
                                        <li className="sidebar-item py-2">
                                            <a className="fw-semibold text-dark" href="#">404 Error Page</a>
                                        </li>
                                        <li className="sidebar-item py-2">
                                            <a className="fw-semibold text-dark" href="#">Notes App</a>
                                        </li>
                                        <li className="sidebar-item py-2">
                                            <a className="fw-semibold text-dark" href="#">User Application</a>
                                        </li>
                                        <li className="sidebar-item py-2">
                                            <a className="fw-semibold text-dark" href="#">Account Settings</a>
                                        </li>
                                    </ul>
                                </ul>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="app-chat" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-message-dots"></i>
                                    </span>
                                    <span className="hide-menu">Chat</span>
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="app-calendar" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-calendar"></i>
                                    </span>
                                    <span className="hide-menu">Calendar</span>
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="app-email" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-mail"></i>
                                    </span>
                                    <span className="hide-menu">Email</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default CompanyMobileNavbar