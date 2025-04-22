import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const Row2 = () => {
    const salaryRef = useRef(null);
    const customersRef = useRef(null);
    const projectsRef = useRef(null);

    useEffect(() => {
        const salaryChart = new ApexCharts(salaryRef.current, {
            chart: {
                type: 'bar',
                height: 150,
                toolbar: { show: false },
            },
            series: [{ name: 'Salary', data: [5000, 7000, 8000, 6000, 7500, 9000] }],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            },
            colors: ['#5D87FF'],
        });
        salaryChart.render();

        const customersChart = new ApexCharts(customersRef.current, {
            chart: {
                type: 'line',
                height: 120,
                sparkline: { enabled: true },
            },
            series: [{ name: 'Customers', data: [20, 40, 35, 50, 49, 60] }],
            stroke: { curve: 'smooth' },
            colors: ['#FA896B'],
        });
        customersChart.render();

        const projectsChart = new ApexCharts(projectsRef.current, {
            chart: {
                type: 'area',
                height: 120,
                sparkline: { enabled: true },
            },
            series: [{ name: 'Projects', data: [30, 35, 45, 55, 70, 90] }],
            stroke: { curve: 'smooth' },
            colors: ['#13DEB9'],
        });
        projectsChart.render();

        return () => {
            salaryChart.destroy();
            customersChart.destroy();
            projectsChart.destroy();
        };
    }, []);

    return (
        <div className="row">
            {/* Employee Salary */}
            <div className="col-lg-4 d-flex align-items-stretch">
                <div className="card w-100">
                    <div className="card-body">
                        <h5 className="card-title fw-semibold mb-1">Employee Salary</h5>
                        <p className="card-subtitle mb-0">Every month</p>
                        <div ref={salaryRef} className="mb-3"></div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <div className="bg-light-primary rounded me-3 p-2 d-flex align-items-center justify-content-center">
                                    <i className="ti ti-grid-dots text-primary fs-6"></i>
                                </div>
                                <div>
                                    <p className="fs-3 mb-0 fw-normal">Salary</p>
                                    <h6 className="fw-semibold text-dark fs-4 mb-0">$36,358</h6>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="bg-light rounded me-3 p-2 d-flex align-items-center justify-content-center">
                                    <i className="ti ti-grid-dots text-muted fs-6"></i>
                                </div>
                                <div>
                                    <p className="fs-3 mb-0 fw-normal">Profit</p>
                                    <h6 className="fw-semibold text-dark fs-4 mb-0">$5,296</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Section */}
            <div className="col-lg-4">
                <div className="row">
                    {/* Customers */}
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body pb-0 mb-xxl-4 pb-1">
                                <p className="mb-1 fs-3">Customers</p>
                                <h4 className="fw-semibold fs-7">36,358</h4>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                                        <i className="ti ti-arrow-down-right text-danger"></i>
                                    </span>
                                    <p className="text-dark fs-3 mb-0">+9%</p>
                                </div>
                            </div>
                            <div ref={customersRef}></div>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="mb-1 fs-3">Projects</p>
                                <h4 className="fw-semibold fs-7">78,298</h4>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                                        <i className="ti ti-arrow-up-left text-success"></i>
                                    </span>
                                    <p className="text-dark fs-3 mb-0">+9%</p>
                                </div>
                                <div ref={projectsRef}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coming Soon */}
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                            <img src="/images/profile/user-1.jpg" className="shadow-warning rounded-2 me-3" width="72" height="72" alt="" />
                            <div>
                                <h5 className="fw-semibold fs-5 mb-2">Super awesome, Vue coming soon!</h5>
                                <p className="fs-3 mb-0">22 March, 2023</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <ul className="hstack mb-0">
                                {[2, 3, 4, 5].map(num => (
                                    <li key={num} className="ms-n3">
                                        <a href="javascript:void(0)">
                                            <img src={`/images/profile/user-${num}.jpg`} className="rounded-circle border border-2 border-white" width="44" height="44" alt="" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <a href="#" className="bg-light rounded py-1 px-3 d-flex align-items-center">
                                <i className="ti ti-message-2 fs-6 text-primary"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selling Products */}
            <div className="col-lg-4 d-flex align-items-stretch">
                <div className="card bg-primary border-0 w-100">
                    <div className="card-body pb-0">
                        <h5 className="fw-semibold mb-1 text-white card-title">Best Selling Products</h5>
                        <p className="fs-3 mb-3 text-white">Overview 2023</p>
                        <div className="text-center mt-3">
                            <img src="/images/backgrounds/piggy.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="card mx-2 mb-2 mt-n2">
                        <div className="card-body">
                            {[
                                { name: 'MaterialPro', value: '$23,568', percent: 55, color: 'primary' },
                                { name: 'Flexy Admin', value: '$23,568', percent: 20, color: 'secondary' }
                            ].map((item, idx) => (
                                <div key={idx} className="mb-4 pb-1">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div>
                                            <h6 className="mb-1 fs-4 fw-semibold">{item.name}</h6>
                                            <p className="fs-3 mb-0">{item.value}</p>
                                        </div>
                                        <div>
                                            <span className={`badge bg-light-${item.color} text-${item.color} fw-semibold fs-3`}>
                                                {item.percent}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`progress bg-light-${item.color}`} style={{ height: '4px' }}>
                                        <div className={`progress-bar bg-${item.color}`} style={{ width: `${item.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Row2;
