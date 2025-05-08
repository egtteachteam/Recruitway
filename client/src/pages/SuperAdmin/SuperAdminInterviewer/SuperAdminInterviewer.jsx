// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SuperAdminInterviewerModal from './SuperAdminInterviewerModal';
// import { useAuthContext } from '../../../context/auth-context';
// import { useSuperAdminContext } from '../../../context/superadmin-context';

// const SuperAdminInterviewer = () => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [editingInterviewer, setEditingInterviewer] = useState(null);
//     const { getAllInterviewers, interviewers } = useSuperAdminContext()
//     const { server } = useAuthContext()
//     const token = localStorage.getItem("token")

//     useEffect(() => {
//         getAllInterviewers();
//     }, []);

//     const handleSave = async (data) => {
//         if (editingInterviewer) {
//             await axios.put(`${server}/api/v1/superadmin/updateInterviewer/${editingInterviewer._id}`,
//                 data,
//                 {
//                     headers:
//                     {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//         } else {
//             await axios.post(`${server}/api/v1/superadmin/createInterviewer`,
//                 data,
//                 {
//                     headers:
//                     {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//         }
//         getAllInterviewers();
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this interviewer?')) {
//             await axios.delete(`${server}/api/v1/superadmin/deleteInterviewer/${id}`,
//                 {
//                     headers:
//                     {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//             getAllInterviewers();
//         }
//     };

//     return (
//         <>
//             <div className="container-fluid px-3">
//                 <div className="container mt-4">
//                     <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
//                         <h2 className="mb-2 mb-md-0">Interviewers</h2>
//                         <button
//                             className="btn btn-success"
//                             onClick={() => {
//                                 setModalVisible(true);
//                                 setEditingInterviewer(null);
//                             }}
//                         >
//                             Add Interviewer
//                         </button>
//                     </div>

//                     <div className="table-responsive">
//                         <table className="table table-bordered table-striped align-middle">
//                             <thead className="table-light">
//                                 <tr>
//                                     <th>Full Name</th>
//                                     <th className="d-none d-md-table-cell">Email</th>
//                                     <th>Position</th>
//                                     <th className="text-center">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {interviewers?.map((intv) => (
//                                     <tr key={intv._id}>
//                                         <td>{intv.fullname.length > 20 ? intv.fullname.slice(0, 20) + '...' : intv.fullname}</td>
//                                         <td className="d-none d-md-table-cell">{intv.email}</td>
//                                         <td>{intv.position}</td>
//                                         <td className="text-center">
//                                             <button
//                                                 className="btn btn-sm btn-primary me-2 mb-1 mb-md-0"
//                                                 onClick={() => {
//                                                     setModalVisible(true);
//                                                     setEditingInterviewer(intv);
//                                                 }}
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 className="btn btn-sm btn-danger"
//                                                 onClick={() => handleDelete(intv._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <SuperAdminInterviewerModal
//                         show={modalVisible}
//                         onHide={() => setModalVisible(false)}
//                         onSave={handleSave}
//                         editingInterviewer={editingInterviewer}
//                     />
//                 </div>
//             </div>

//         </>
//     );
// };

// export default SuperAdminInterviewer;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SuperAdminInterviewerModal from './SuperAdminInterviewerModal';
import { useAuthContext } from '../../../context/auth-context';
import { useSuperAdminContext } from '../../../context/superadmin-context';

const SuperAdminInterviewer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editingInterviewer, setEditingInterviewer] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [positionFilter, setPositionFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const interviewersPerPage = 10;

    const { getAllInterviewers, interviewers } = useSuperAdminContext();
    const { server } = useAuthContext();
    const token = localStorage.getItem("token");

    useEffect(() => {
        getAllInterviewers();
    }, []);

    const handleSave = async (data) => {
        if (editingInterviewer) {
            await axios.put(`${server}/api/v1/superadmin/updateInterviewer/${editingInterviewer._id}`,
                data,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });
        } else {
            await axios.post(`${server}/api/v1/superadmin/createInterviewer`,
                data,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });
        }
        getAllInterviewers();
    };

    const handleConfirmDelete = async () => {
        if (!confirmDeleteId) return;
        await axios.delete(`${server}/api/v1/superadmin/deleteInterviewer/${confirmDeleteId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setConfirmDeleteId(null);
        getAllInterviewers();
    };

    const filteredInterviewers = interviewers.filter(intv => {
        const matchesSearch = intv.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intv.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPosition = positionFilter === 'All' || intv.position === positionFilter;
        return matchesSearch && matchesPosition;
    });

    const uniquePositions = ['All', ...new Set(interviewers.map(i => i.position))];

    const indexOfLastInterviewers = currentPage * interviewersPerPage;
    const indexOfFirstInterviewers = indexOfLastInterviewers - interviewersPerPage;
    const currentInterviewersList = filteredInterviewers?.slice(indexOfFirstInterviewers, indexOfLastInterviewers);
    const totalPages = Math.ceil(filteredInterviewers?.length / interviewersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container-fluid px-3">
                <div className="container mt-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                        <h2 className="mb-2 mb-md-0">Interviewers</h2>
                        <button className="btn btn-primary" onClick={() => {
                            setModalVisible(true);
                            setEditingInterviewer(null);
                        }}>Add Interviewer</button>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-8 mb-2 mb-md-0">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={positionFilter}
                                onChange={(e) => setPositionFilter(e.target.value)}
                            >
                                {uniquePositions.map((pos, i) => (
                                    <option key={i} value={pos}>{pos}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="table-responsive">
                        {/* Desktop Table (hidden on mobile) */}
                        <table className="table table-bordered table-striped align-middle d-none d-md-table">
                            <thead className="table-light">
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentInterviewersList.map((intv) => (
                                    <tr key={intv._id}>
                                        <td>{intv.fullname.length > 20 ? intv.fullname.slice(0, 20) + '...' : intv.fullname}</td>
                                        <td>{intv.email}</td>
                                        <td>{intv.position}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() => {
                                                    setModalVisible(true);
                                                    setEditingInterviewer(intv);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => setConfirmDeleteId(intv._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile Cards (hidden on desktop) */}
                        <div className="d-md-none">
                            {currentInterviewersList.map((intv) => (
                                <div key={intv._id} className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h5 className="card-title mb-1">{intv.fullname.length > 20 ? intv.fullname.slice(0, 20) + '...' : intv.fullname}</h5>
                                                <p className="card-text text-muted mb-1">{intv.position}</p>
                                            </div>
                                            <div className="d-flex">
                                                <button
                                                    className="btn btn-sm btn-primary me-2"
                                                    onClick={() => {
                                                        setModalVisible(true);
                                                        setEditingInterviewer(intv);
                                                    }}
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => setConfirmDeleteId(intv._id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-envelope me-2"></i>
                                            <small className="text-truncate">{intv.email}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <SuperAdminInterviewerModal
                        show={modalVisible}
                        onHide={() => setModalVisible(false)}
                        onSave={handleSave}
                        editingInterviewer={editingInterviewer}
                    />

                    {/* Delete Confirmation Modal */}
                    {confirmDeleteId && (
                        <div className="modal fade show d-block" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Confirm Delete</h5>
                                        <button type="button" className="btn-close" onClick={() => setConfirmDeleteId(null)}></button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to delete this interviewer?
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                                        <button className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    <nav aria-label="Page navigation" className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link btn "
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(pageNum)}>
                                            {pageNum}
                                        </button>
                                    </li>
                                );
                            })}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default SuperAdminInterviewer;

