import React from 'react'

const IntervieweeNavbarSearchBar = () => {
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-1">
                        <div className="modal-header border-bottom">
                            <input type="search" className="form-control fs-3" placeholder="Search here" id="search" />
                            <span data-bs-dismiss="modal" className="lh-1 cursor-pointer">
                                <i className="ti ti-x fs-5 ms-3"></i>
                            </span>
                        </div>
                        <div className="modal-body message-body" data-simplebar="">
                            <h5 className="mb-0 fs-5 p-1">Quick Page Links</h5>
                            <ul className="list mb-0 py-2">
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Modern</span>
                                        <span className="fs-3 text-muted d-block">/dashboards/dashboard1</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Dashboard</span>
                                        <span className="fs-3 text-muted d-block">/dashboards/dashboard2</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Contacts</span>
                                        <span className="fs-3 text-muted d-block">/apps/contacts</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Posts</span>
                                        <span className="fs-3 text-muted d-block">/apps/blog/posts</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Detail</span>
                                        <span className="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Shop</span>
                                        <span className="fs-3 text-muted d-block">/apps/ecommerce/shop</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Modern</span>
                                        <span className="fs-3 text-muted d-block">/dashboards/dashboard1</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Dashboard</span>
                                        <span className="fs-3 text-muted d-block">/dashboards/dashboard2</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Contacts</span>
                                        <span className="fs-3 text-muted d-block">/apps/contacts</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Posts</span>
                                        <span className="fs-3 text-muted d-block">/apps/blog/posts</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Detail</span>
                                        <span className="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</span>
                                    </a>
                                </li>
                                <li className="p-1 mb-1 bg-hover-light-black">
                                    <a href="#">
                                        <span className="fs-3 text-black fw-normal d-block">Shop</span>
                                        <span className="fs-3 text-muted d-block">/apps/ecommerce/shop</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IntervieweeNavbarSearchBar