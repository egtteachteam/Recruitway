import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../context/auth-context';
import toast from 'react-hot-toast';
import { useSuperAdminContext } from '../../../context/superadmin-context';

const SuperAdminScheduleInterview = () => {
    const location = useLocation();
    const { state } = location;
    const { server } = useAuthContext();
    const token = localStorage.getItem("token");

    // Initialize state
    const [formData, setFormData] = useState({
        _id: '',
        candidateId: '',
        candidateName: '',
        jobId: '',
        jobTitle: '',
        companyId: '',
        companyName: '',
        interviewerId: '',
        interviewerName: '',
        start: '',
        end: '',
        location: '',
        notes: '',
        status: 'scheduled'
    });

    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { getAllInterviewers, interviewers } = useSuperAdminContext()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                getAllInterviewers()

                // Fetch interviews if coming from applicant page
                if (state?.applicant?._id) {
                    const interviewsRes = await axios.get(`${server}/api/v1/superadmin/getCandidateAllInterviews/${state.applicant._id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );

                    setEvents(
                        interviewsRes.data.data.map(event => ({
                            ...event,
                            start: new Date(event.start),
                            end: new Date(event.end)
                        }))
                    );
                }

                // Set form data if coming from applicant page
                if (state?.applicant && state?.job) {
                    setFormData(prev => ({
                        ...prev,
                        candidateId: state.applicant._id,
                        candidateName: state.applicant.fullname,
                        jobId: state.job._id,
                        jobTitle: state.job.title,
                        companyId: state.job.companyId,
                        companyName: state.job.company
                    }));
                }

                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch initial data:", err);
                setError('Failed to load initial data');
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [state, server, token]);





    const clientId = import.meta.env.VITE_ZOOM_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_ZOOM_REDIRECT_URI;



    // const checkZoomStatus = async () => {
    //     try {
    //         const res = await axios.get(`${server}/zoom/status`);
    //         const isConnected = res.data.connected;

    //         if (!isConnected) {
    //             const oauthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    //             window.location.href = oauthUrl;
    //         }
    //     } catch (err) {
    //         console.error('Zoom status check failed:', err.message);
    //         setError('Failed to check Zoom connection. Please try again later.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // const checkZoomStatus = async () => {
    //     try {
    //         const res = await axios.get(`${server}/zoom/status`);
    //         const isConnected = res.data.connected;

    //         if (!isConnected) {
    //             const oauthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    //             window.open(oauthUrl, '_blank'); // 👈 Open Zoom OAuth in a new tab
    //         }
    //     } catch (err) {
    //         console.error('Zoom status check failed:', err.message);
    //         setError('Failed to check Zoom connection. Please try again later.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    useEffect(() => {
        const checkZoomStatus = async () => {
            try {
                const res = await axios.get(`${server}/zoom/status`);
                const isConnected = res.data.connected;

                if (!isConnected) {
                    const oauthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
                    const authWindow = window.open(oauthUrl, '_blank');

                    // Listen for message from popup
                    const messageListener = (event) => {
                        if (event.origin !== window.location.origin) return;

                        if (event.data === 'zoom-connected') {
                            console.log('Zoom connected successfully!');
                            authWindow?.close();
                            window.location.reload(); // reload current tab
                        }
                    };

                    window.addEventListener('message', messageListener);

                    // Cleanup listener on unmount
                    return () => {
                        window.removeEventListener('message', messageListener);
                    };
                }
            } catch (err) {
                console.error('Zoom status check failed:', err.message);
                setError('Failed to check Zoom connection. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        checkZoomStatus();
    }, []);

    // useEffect(() => {
    //     checkZoomStatus();
    // }, []);







    const handleDateSelect = (selectInfo) => {
        setFormData(prev => ({
            ...prev,
            _id: '', // Clear ID for new interview
            start: selectInfo.start,
            end: moment(selectInfo.start).add(1, 'hour').toDate()
        }));
        setShowModal(true);
    };

    const handleEventClick = (clickInfo) => {
        setFormData({
            ...clickInfo.event.extendedProps,
            start: clickInfo.event.start,
            end: clickInfo.event.end
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.candidateId || !formData.jobId || !formData.interviewerName ||
            !formData.start || !formData.end || !formData.location) {
            setError('Please fill all required fields');
            return;
        }

        if (new Date(formData.start) >= new Date(formData.end)) {
            setError('End time must be after start time');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const interviewData = {
                ...formData,
                start: new Date(formData.start).toISOString(),
                end: new Date(formData.end).toISOString()
            };

            // Determine if we're creating or updating
            const isUpdate = !!formData._id;
            let res;

            if (isUpdate) {
                res = await axios.put(
                    `${server}/api/v1/superadmin/updateInterviews/${formData._id}`,
                    interviewData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
            } else {
                res = await axios.post(`${server}/api/v1/superadmin/createInterviews`,
                    interviewData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
            }

            // Update events state
            if (isUpdate) {
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event._id === formData._id
                            ? {
                                ...res.data.data,
                                start: new Date(res.data.data.start),
                                end: new Date(res.data.data.end)
                            }
                            : event
                    )
                );
            } else {
                setEvents(prevEvents => [
                    ...prevEvents,
                    {
                        ...res.data.data,
                        start: new Date(res.data.data.start),
                        end: new Date(res.data.data.end)
                    }
                ]);
            }

            toast.success(res.data.message);
            setShowModal(false);

            // Reset form for new entries (but keep candidate/job info if coming from applicant page)
            if (!isUpdate) {
                setFormData(prev => ({
                    ...prev,
                    _id: '',
                    interviewerId: '',
                    interviewerName: '',
                    start: '',
                    end: '',
                    location: '',
                    notes: '',
                    status: 'scheduled'
                }));
            }
        } catch (err) {
            console.error('Interview submission error:', err);
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.error ||
                'Failed to save interview. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!formData._id) return;

        try {
            setLoading(true);
            await axios.delete(`${server}/api/v1/superadmin/deleteInterviews/${formData._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setEvents(prevEvents => prevEvents.filter(event => event._id !== formData._id));
            toast.success('Interview deleted successfully');
            setShowModal(false);
        } catch (err) {
            console.error('Delete error:', err);
            const errorMessage = err.response?.data?.message ||
                'Failed to delete interview. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    const handleInterviewerChange = (e) => {
        const selectedId = e.target.value;
        const selectedName = e.target.options[e.target.selectedIndex].getAttribute("data-name");

        setFormData(prev => ({
            ...prev,
            interviewerId: selectedId,
            interviewerName: selectedName,
        }));
    };


    return (
        <div className="container-fluid">
            <div className="container p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Interview Scheduling</h2>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setFormData(prev => ({
                                ...prev,
                                _id: '',
                                interviewerId: '',
                                interviewerName: '',
                                start: '',
                                end: '',
                                location: '',
                                notes: '',
                                status: 'scheduled'
                            }));
                            setShowModal(true);
                        }}
                    >
                        <i className="bi bi-plus me-2"></i> Schedule Interview
                    </button>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            weekends={true}
                            nowIndicator={true}
                            events={events}
                            eventContent={renderEventContent}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            height="auto"
                        />
                    </div>
                </div>

                {/* Interview Modal */}
                <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {formData._id ? 'Edit Interview' : 'Schedule New Interview'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                    disabled={loading}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    {error && <div className="alert alert-danger">{error}</div>}

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="candidateName" className="form-label">Candidate</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="candidateName"
                                                name="candidateName"
                                                value={formData.candidateName}
                                                onChange={handleInputChange}
                                                required
                                                disabled={loading || !!formData.candidateId}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="jobTitle" className="form-label">Job Position</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="jobTitle"
                                                name="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={handleInputChange}
                                                required
                                                disabled={loading || !!formData.jobId}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="interviewerName" className="form-label">Interviewer</label>
                                            {/* <select
                                                className="form-select"
                                                id="interviewerName"
                                                name="interviewerName"
                                                value={formData.interviewerName}
                                                onChange={handleInputChange}
                                                required
                                                disabled={loading}
                                            >
                                                <option value="">Select Interviewer</option>
                                                {interviewers.map(interviewer => (
                                                    <option key={interviewer._id} value={interviewer.fullname}>
                                                        {interviewer.fullname}
                                                    </option>
                                                ))}
                                            </select> */}
                                            <select
                                                className="form-select"
                                                id="interviewerName"
                                                name="interviewerId"
                                                value={formData.interviewerId}
                                                onChange={handleInterviewerChange}
                                                required
                                                disabled={loading}
                                            >
                                                <option value="">Select Interviewer</option>
                                                {interviewers.map(interviewer => (
                                                    <option
                                                        key={interviewer._id}
                                                        value={interviewer._id}
                                                        data-name={interviewer.fullname}
                                                    >
                                                        {interviewer.fullname}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="location" className="form-label">Location/Medium</label>
                                            <select
                                                className="form-select"
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                required
                                                disabled={loading}
                                            >
                                                <option value="">Select Interview Platform</option>
                                                <option value="googleMeet">Google Meet</option>
                                                <option value="zoom">Zoom</option>
                                                <option value="inPerson">In Person</option>
                                                <option value="phone">Phone</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="companyName" className="form-label">Company</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="companyName"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                required
                                                disabled={loading || !!formData.companyId}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="status" className="form-label">Status</label>
                                            <select
                                                className="form-select"
                                                id="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                disabled={loading}
                                            >
                                                <option value="scheduled">Scheduled</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="inProcess">In Process</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="start" className="form-label">Start Time</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                id="start"
                                                name="start"
                                                value={formData.start ? moment(formData.start).format('YYYY-MM-DDTHH:mm') : ''}
                                                onChange={handleInputChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="end" className="form-label">End Time</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                id="end"
                                                name="end"
                                                value={formData.end ? moment(formData.end).format('YYYY-MM-DDTHH:mm') : ''}
                                                onChange={handleInputChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="notes" className="form-label">Notes</label>
                                        <textarea
                                            className="form-control"
                                            id="notes"
                                            rows="3"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            placeholder="Any special instructions or details"
                                            disabled={loading}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {formData._id && (
                                        <button
                                            type="button"
                                            className="btn btn-danger me-auto"
                                            onClick={handleDelete}
                                            disabled={loading}
                                        >
                                            {loading ? 'Deleting...' : 'Delete'}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                        ) : null}
                                        {formData._id ? 'Update' : 'Schedule'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Modal Backdrop */}
                {showModal && <div className="modal-backdrop fade show"></div>}
            </div>
        </div>
    );
};

function renderEventContent(eventInfo) {
    return (
        <div className="fc-event-content">
            <div className="fc-event-time">{eventInfo.timeText}</div>
            <div className="fc-event-title">{eventInfo.event.title}</div>
            <div className="fc-event-location small">{eventInfo.event.extendedProps.location}</div>
            <div className={`fc-event-status badge ${eventInfo.event.extendedProps.status === 'completed' ? 'bg-success' :
                eventInfo.event.extendedProps.status === 'cancelled' ? 'bg-danger' :
                    eventInfo.event.extendedProps.status === 'confirmed' ? 'bg-primary' :
                        'bg-secondary'
                }`}>
                {eventInfo.event.extendedProps.status}
            </div>
        </div>
    );
}

export default SuperAdminScheduleInterview;