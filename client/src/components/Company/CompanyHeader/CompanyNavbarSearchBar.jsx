import React from 'react'

const CompanyNavbarSearchBar = () => {
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-1">
                        <div className="modal-header border-bottom d-flex align-items-center justify-content-between">
                            <input
                                type="search"
                                className="form-control fs-3 me-3"
                                placeholder="Search here"
                                id="search"
                            />
                            <div className="d-flex align-items-center">
                                <button className="btn btn-outline-primary">Search</button>
                                <button type="button" className="btn-close me-2" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyNavbarSearchBar