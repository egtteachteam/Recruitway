import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useCompanyContext } from '../../../context/company-context';

const Carousel = () => {

  const { jobList, allAppliedCandidates } = useCompanyContext()

  const options = {
    loop: true,
    margin: 24,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 },
      1200: { items: 6 }
    }
  };

  return (
    <OwlCarousel className="owl-theme" {...options}>
      <div className="item">
        <div className="card border-0 zoom-in bg-light-primary shadow-none">
          <div className="card-body">
            <div className="text-center">
              <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-user-male.svg" width="50" height="50" className="mb-3" alt="" />
              <p className="fw-semibold fs-3 text-primary mb-1"> Candidates </p>
              <h5 className="fw-semibold text-primary mb-0">{allAppliedCandidates.length}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="card border-0 zoom-in bg-light-warning shadow-none">
          <div className="card-body">
            <div className="text-center">
              <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-briefcase.svg" width="50" height="50" className="mb-3" alt="" />
              <p className="fw-semibold fs-3 text-warning mb-1">Reports</p>
              <h5 className="fw-semibold text-warning mb-0">3,650</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="card border-0 zoom-in bg-light-info shadow-none">
          <div className="card-body">
            <div className="text-center">
              <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-mailbox.svg" width="50" height="50" className="mb-3" alt="" />
              <p className="fw-semibold fs-3 text-info mb-1">Job Posts</p>
              <h5 className="fw-semibold text-info mb-0">356</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="card border-0 zoom-in bg-light-danger shadow-none">
          <div className="card-body">
            <div className="text-center">
              <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-favorites.svg" width="50" height="50" className="mb-3" alt="" />
              <p className="fw-semibold fs-3 text-danger mb-1">Application</p>
              <h5 className="fw-semibold text-danger mb-0">696</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="card border-0 zoom-in bg-light-success shadow-none">
          <div className="card-body">
            <div className="text-center">
              <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-speech-bubble.svg" width="50" height="50" className="mb-3" alt="" />
              <p className="fw-semibold fs-3 text-success mb-1">Shortlisted</p>
              <h5 className="fw-semibold text-success mb-0">$96k</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="card border-0 zoom-in bg-light-secondary shadow-none">
          <div className="card-body">
            <div className="text-center">
              <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-connect.svg" width="50" height="50" className="mb-3" alt="" />
              <p className="fw-semibold fs-3 text-info mb-1">Rejected</p>
              <h5 className="fw-semibold text-info mb-0">59</h5>
            </div>
          </div>
        </div>
      </div>
    </OwlCarousel>
  );
};

export default Carousel;