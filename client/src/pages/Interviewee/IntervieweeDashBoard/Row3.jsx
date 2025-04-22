// import React, { useEffect } from 'react';
// import ApexCharts from 'apexcharts';

// const Row3 = () => {
//     useEffect(() => {
//         const options = {
//             chart: {
//                 type: 'line',
//                 height: 300,
//                 toolbar: { show: false }
//             },
//             stroke: {
//                 curve: 'smooth',
//                 width: 3
//             },
//             series: [{
//                 name: 'Weekly Sales',
//                 data: [12000, 15000, 14000, 18000, 17000, 20000, 22000]
//             }],
//             markers: {
//                 size: 5,
//                 colors: ['#fff'],
//                 strokeColors: '#5D87FF',
//                 strokeWidth: 3
//             },
//             xaxis: {
//                 categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//                 labels: {
//                     style: { colors: '#6C757D' }
//                 }
//             },
//             yaxis: {
//                 labels: {
//                     formatter: val => `$${val / 1000}K`,
//                     style: { colors: '#6C757D' }
//                 }
//             },
//             colors: ['#5D87FF'],
//             grid: {
//                 borderColor: '#e0e6ed',
//                 strokeDashArray: 4
//             },
//             tooltip: {
//                 y: {
//                     formatter: val => `$${val.toLocaleString()}`
//                 }
//             }
//         };

//         const chart = new ApexCharts(document.querySelector("#stats"), options);
//         chart.render();

//         return () => {
//             chart.destroy();
//         };
//     }, []);

//     return (
//         <>
//             <div className="row">
//                 {/* Weekly Stats */}
//                 <div className="col-lg-4 d-flex align-items-stretch">
//                     <div className="card w-100">
//                         <div className="card-body">
//                             <h5 className="card-title fw-semibold">Weekly Stats</h5>
//                             <p className="card-subtitle mb-0">Sales Trend</p>
//                             <div id="stats" className="my-4"></div>

//                             <div className="position-relative">
//                                 <div className="d-flex align-items-center justify-content-between mb-7">
//                                     <div className="d-flex">
//                                         <div className="p-6 bg-light-primary rounded me-6 d-flex align-items-center justify-content-center">
//                                             <i className="ti ti-grid-dots text-primary fs-6"></i>
//                                         </div>
//                                         <div>
//                                             <h6 className="mb-1 fs-4 fw-semibold">Top Sales</h6>
//                                             <p className="fs-3 mb-0">Johnathan Doe</p>
//                                         </div>
//                                     </div>
//                                     <div className="bg-light-primary badge">
//                                         <p className="fs-3 text-primary fw-semibold mb-0">+68</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex align-items-center justify-content-between mb-7">
//                                     <div className="d-flex">
//                                         <div className="p-6 bg-light-success rounded me-6 d-flex align-items-center justify-content-center">
//                                             <i className="ti ti-grid-dots text-success fs-6"></i>
//                                         </div>
//                                         <div>
//                                             <h6 className="mb-1 fs-4 fw-semibold">Best Seller</h6>
//                                             <p className="fs-3 mb-0">MaterialPro Admin</p>
//                                         </div>
//                                     </div>
//                                     <div className="bg-light-success badge">
//                                         <p className="fs-3 text-success fw-semibold mb-0">+68</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex align-items-center justify-content-between">
//                                     <div className="d-flex">
//                                         <div className="p-6 bg-light-danger rounded me-6 d-flex align-items-center justify-content-center">
//                                             <i className="ti ti-grid-dots text-danger fs-6"></i>
//                                         </div>
//                                         <div>
//                                             <h6 className="mb-1 fs-4 fw-semibold">Most Commented</h6>
//                                             <p className="fs-3 mb-0">Ample Admin</p>
//                                         </div>
//                                     </div>
//                                     <div className="bg-light-danger badge">
//                                         <p className="fs-3 text-danger fw-semibold mb-0">+68</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Top Performers */}
//                 <div className="col-lg-8 d-flex align-items-stretch">
//                     <div className="card w-100">
//                         <div className="card-body">
//                             <div className="d-sm-flex d-block align-items-center justify-content-between mb-7">
//                                 <div className="mb-3 mb-sm-0">
//                                     <h5 className="card-title fw-semibold">Top Performers</h5>
//                                     <p className="card-subtitle mb-0">Best Employees</p>
//                                 </div>
//                                 <div>
//                                     <select className="form-select">
//                                         <option value="1">March 2023</option>
//                                         <option value="2">April 2023</option>
//                                         <option value="3">May 2023</option>
//                                         <option value="4">June 2023</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="table-responsive">
//                                 <table className="table align-middle text-nowrap mb-0">
//                                     <thead>
//                                         <tr className="text-muted fw-semibold">
//                                             <th scope="col" className="ps-0">Assigned</th>
//                                             <th scope="col">Project</th>
//                                             <th scope="col">Priority</th>
//                                             <th scope="col">Budget</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="border-top">
//                                         {/* Add your employee data here, already provided */}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Row3;







import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const Row3 = () => {
    useEffect(() => {
        const options = {
            chart: {
                type: 'area',
                height: 300,
                toolbar: { show: false },
                sparkline: { enabled: false }
            },
            series: [{
                name: 'Sales',
                data: [28, 40, 36, 52, 38, 60, 55]
            }],
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                labels: { style: { colors: '#6c757d' } },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                labels: { style: { colors: '#6c757d' } }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.6,
                    opacityTo: 0.1,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: { enabled: false },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            colors: ['#5D87FF'],
            grid: {
                borderColor: '#f1f1f1',
                strokeDashArray: 5
            }
        };

        const chart = new ApexCharts(document.querySelector("#stats"), options);
        chart.render();

        return () => {
            chart.destroy(); // Clean up
        };
    }, []);

    return (
        <>
            <div className="row">
                {/* Weekly Stats */}
                <div className="col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <h5 className="card-title fw-semibold">Weekly Stats</h5>
                            <p className="card-subtitle mb-0">Average sales</p>
                            <div id="stats" className="my-4"></div>
                            <div className="position-relative">
                                <div className="d-flex align-items-center justify-content-between mb-7">
                                    <div className="d-flex">
                                        <div className="p-6 bg-light-primary rounded me-6 d-flex align-items-center justify-content-center">
                                            <i className="ti ti-grid-dots text-primary fs-6"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 fs-4 fw-semibold">Top Sales</h6>
                                            <p className="fs-3 mb-0">Johnathan Doe</p>
                                        </div>
                                    </div>
                                    <div className="bg-light-primary badge">
                                        <p className="fs-3 text-primary fw-semibold mb-0">+68</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-7">
                                    <div className="d-flex">
                                        <div className="p-6 bg-light-success rounded me-6 d-flex align-items-center justify-content-center">
                                            <i className="ti ti-grid-dots text-success fs-6"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 fs-4 fw-semibold">Best Seller</h6>
                                            <p className="fs-3 mb-0">MaterialPro Admin</p>
                                        </div>
                                    </div>
                                    <div className="bg-light-success badge">
                                        <p className="fs-3 text-success fw-semibold mb-0">+68</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex">
                                        <div className="p-6 bg-light-danger rounded me-6 d-flex align-items-center justify-content-center">
                                            <i className="ti ti-grid-dots text-danger fs-6"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 fs-4 fw-semibold">Most Commented</h6>
                                            <p className="fs-3 mb-0">Ample Admin</p>
                                        </div>
                                    </div>
                                    <div className="bg-light-danger badge">
                                        <p className="fs-3 text-danger fw-semibold mb-0">+68</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Performers */}
                <div className="col-lg-8 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <div className="d-sm-flex d-block align-items-center justify-content-between mb-7">
                                <div className="mb-3 mb-sm-0">
                                    <h5 className="card-title fw-semibold">Top Performers</h5>
                                    <p className="card-subtitle mb-0">Best Employees</p>
                                </div>
                                <div>
                                    <select className="form-select">
                                        <option value="1">March 2023</option>
                                        <option value="2">April 2023</option>
                                        <option value="3">May 2023</option>
                                        <option value="4">June 2023</option>
                                    </select>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table align-middle text-nowrap mb-0">
                                    <thead>
                                        <tr className="text-muted fw-semibold">
                                            <th scope="col" className="ps-0">Assigned</th>
                                            <th scope="col">Project</th>
                                            <th scope="col">Priority</th>
                                            <th scope="col">Budget</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top">
                                        {/* Repeat rows like before */}
                                        {/* You can keep your existing performer rows here */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Row3;

