import React from 'react'

const SuperAdminShoppingCart = () => {
    return (
        <>
            <div className="offcanvas offcanvas-end shopping-cart" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header py-4">
                    <h5 className="offcanvas-title fs-5 fw-semibold" id="offcanvasRightLabel">Shopping Cart</h5>
                    <span className="badge bg-primary rounded-4 px-3 py-1 lh-sm">5 new</span>
                </div>
                <div className="offcanvas-body h-100 px-4 pt-0" data-simplebar>
                    <ul className="mb-0">
                        <li className="pb-7">
                            <div className="d-flex align-items-center">
                                <img src="/images/products/product-1.jpg" width="95" height="75" className="rounded-1 me-9 flex-shrink-0" alt="" />
                                <div>
                                    <h6 className="mb-1">Supreme toys cooker</h6>
                                    <p className="mb-0 text-muted fs-2">Kitchenware Item</p>
                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                        <h6 className="fs-2 fw-semibold mb-0 text-muted">$250</h6>
                                        <div className="input-group input-group-sm w-50">
                                            <button className="btn border-0 round-20 minus p-0 bg-light-success text-success " type="button" id="add1"> - </button>
                                            <input type="text" className="form-control round-20 bg-transparent text-muted fs-2 border-0  text-center qty" placeholder="" aria-label="Example text with button addon" aria-describedby="add1" value="1" readOnly />
                                            <button className="btn text-success bg-light-success  p-0 round-20 border-0 add" type="button" id="addo2"> + </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="pb-7">
                            <div className="d-flex align-items-center">
                                <img src="/images/products/product-2.jpg" width="95" height="75" className="rounded-1 me-9 flex-shrink-0" alt="" />
                                <div>
                                    <h6 className="mb-1">Supreme toys cooker</h6>
                                    <p className="mb-0 text-muted fs-2">Kitchenware Item</p>
                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                        <h6 className="fs-2 fw-semibold mb-0 text-muted">$250</h6>
                                        <div className="input-group input-group-sm w-50">
                                            <button className="btn border-0 round-20 minus p-0 bg-light-success text-success " type="button" id="add2"> - </button>
                                            <input type="text" className="form-control round-20 bg-transparent text-muted fs-2 border-0  text-center qty" placeholder="" aria-label="Example text with button addon" aria-describedby="add2" value="1" readOnly />
                                            <button className="btn text-success bg-light-success  p-0 round-20 border-0 add" type="button" id="addon34"> + </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="pb-7">
                            <div className="d-flex align-items-center">
                                <img src="/images/products/product-3.jpg" width="95" height="75" className="rounded-1 me-9 flex-shrink-0" alt="" />
                                <div>
                                    <h6 className="mb-1">Supreme toys cooker</h6>
                                    <p className="mb-0 text-muted fs-2">Kitchenware Item</p>
                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                        <h6 className="fs-2 fw-semibold mb-0 text-muted">$250</h6>
                                        <div className="input-group input-group-sm w-50">
                                            <button className="btn border-0 round-20 minus p-0 bg-light-success text-success " type="button" id="add3"> - </button>
                                            <input type="text" className="form-control round-20 bg-transparent text-muted fs-2 border-0  text-center qty" placeholder="" aria-label="Example text with button addon" aria-describedby="add3" value="1" readOnly />
                                            <button className="btn text-success bg-light-success  p-0 round-20 border-0 add" type="button" id="addon3"> + </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="align-bottom">
                        <div className="d-flex align-items-center pb-7">
                            <span className="text-dark fs-3">Sub Total</span>
                            <div className="ms-auto">
                                <span className="text-dark fw-semibold fs-3">$2530</span>
                            </div>
                        </div>
                        <div className="d-flex align-items-center pb-7">
                            <span className="text-dark fs-3">Total</span>
                            <div className="ms-auto">
                                <span className="text-dark fw-semibold fs-3">$6830</span>
                            </div>
                        </div>
                        <a href="eco-checkout" className="btn btn-outline-primary w-100">Go to shopping cart</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuperAdminShoppingCart