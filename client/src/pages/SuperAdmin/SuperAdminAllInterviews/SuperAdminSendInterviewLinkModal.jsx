import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSuperAdminContext } from "../../../context/superadmin-context";

const SuperAdminSendInterviewLinkModal = ({ isOpen, interview, onClose }) => {
    const [email, setEmail] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [interviewerEmail, setInterviewerEmail] = useState("");
    const [interviewerEmailSubject, setInterviewerEmailSubject] = useState("");
    const [interviewerEmailMessage, setInterviewerEmailMessage] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    const [interviewerMeetingLink, setInterviewerMeetingLink] = useState("");
    const [isSending, setIsSending] = useState(false);
    const { getAllInterviews, handleSendEmail } = useSuperAdminContext()

    useEffect(() => {
        if (!interview) return;

        const {
            joinLink,
            startLink,
            start,
            end,
            candidateEmail,
            candidateName,
            interviewerName,
            interviewerEmail,
            jobTitle,
            companyName,
        } = interview;

        const formattedDate = new Date(start).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const formattedTime = new Date(start).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        });

        const formattedEndTime = new Date(end).toLocaleTimeString('en-US', {
            hour: '2-digit',
            timeZoneName: 'short',
        });

        setMeetingLink(joinLink);
        setInterviewerMeetingLink(startLink);

        setEmail(candidateEmail);
        setEmailSubject(`Interview Invitation: ${jobTitle} Position at ${companyName}`);
        setEmailMessage(`Dear ${candidateName},

We’re pleased to invite you for an interview for the **${jobTitle}** position at **${companyName}**.

**Interview Details:**
- **Date:** ${formattedDate}
- **Time:** ${formattedTime} - ${formattedEndTime}
- **Interviewer:** ${interviewerName}
- **Zoom Link:** ${joinLink}

Please join the interview using the Zoom link above at your scheduled time.

If you have any questions or need to reschedule, feel free to reply to this email or reach out to us directly.

Best regards,  
RecruitWay`);

        setInterviewerEmail(interviewerEmail);
        setInterviewerEmailSubject(`Interview Scheduled with ${candidateName} - ${jobTitle}`);
        setInterviewerEmailMessage(`Dear ${interviewerName},

You are scheduled to interview **${candidateName}** (${candidateEmail}) for the **${jobTitle}** position at **${companyName}**.

**Interview Details:**
- **Date:** ${formattedDate}
- **Time:** ${formattedTime} - ${formattedEndTime}
- **Zoom Start Link:** ${startLink}

Please use the Zoom **start** link above to begin the interview at the scheduled time.

Best regards,  
RecruitWay`);
    }, [interview]);

    const handleSend = async () => {
        if (!interview) return;

        if (!emailSubject.trim() || !emailMessage.trim() || !interviewerEmailSubject.trim() || !interviewerEmailMessage.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSending(true);
        try {
            await handleSendEmail(interview._id, {
                email,
                interviewerEmail,
                meetingLink,
                interviewerMeetingLink,
                emailSubject,
                emailMessage,
                interviewerEmailSubject,
                interviewerEmailMessage,
                candidateName: interview.candidateName,
                interviewerName: interview.interviewerName,
                jobTitle: interview.jobTitle,
                scheduledStartTime: new Date(interview.start).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                }),
                scheduledEndTime: new Date(interview.end).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                }),
            });
            getAllInterviews()
            onClose();
        } catch (error) {
            toast.error("Failed to send emails");
        } finally {
            setIsSending(false);
        }
    };

    const copyLink = () => {
        if (!meetingLink) return;
        navigator.clipboard.writeText(meetingLink);
        toast.success("Link copied to clipboard!");
    };

    const copyInterviewerLink = () => {
        if (!interviewerMeetingLink) return;
        navigator.clipboard.writeText(interviewerMeetingLink);
        toast.success("Link copied to clipboard!");
    };

    if (!isOpen || !interview) return null;

    return (
        <div
            className={`modal fade ${isOpen ? "show d-block" : ""}`}
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                            Send Interview Details
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            disabled={isSending}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="alert alert-info mb-4">
                            You are sending interview links for <strong>{interview.candidateName}</strong> (<em>{interview.candidateEmail}</em>) and <strong>{interview.interviewerName}</strong> (<em>{interview.interviewerEmail}</em>) regarding the role of <strong>{interview.jobTitle}</strong> at <strong>{interview.companyName}</strong>.
                        </div>

                        {/* Candidate Email Section */}
                        <h6 className="fw-bold">Candidate Mail -</h6>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">Candidate Email Id*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSending}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailSubject" className="form-label fw-bold">Subject*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="emailSubject"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                disabled={isSending}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="emailMessage" className="form-label fw-bold">Message*</label>
                            <textarea
                                className="form-control"
                                id="emailMessage"
                                rows="6"
                                value={emailMessage}
                                onChange={(e) => setEmailMessage(e.target.value)}
                                disabled={isSending}
                                readOnly
                            ></textarea>
                        </div>

                        {/* Interviewer Email Section */}
                        <h6 className="fw-bold">Interviewer Mail</h6>
                        <div className="mb-3">
                            <label htmlFor="interviewerEmail" className="form-label fw-bold">Interviewer Email Id*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="interviewerEmail"
                                value={interviewerEmail}
                                onChange={(e) => setInterviewerEmail(e.target.value)}
                                disabled={isSending}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="interviewerEmailSubject" className="form-label fw-bold">Subject*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="interviewerEmailSubject"
                                value={interviewerEmailSubject}
                                onChange={(e) => setInterviewerEmailSubject(e.target.value)}
                                disabled={isSending}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="interviewerEmailMessage" className="form-label fw-bold">Message*</label>
                            <textarea
                                className="form-control"
                                id="interviewerEmailMessage"
                                rows="6"
                                value={interviewerEmailMessage}
                                onChange={(e) => setInterviewerEmailMessage(e.target.value)}
                                disabled={isSending}
                                readOnly
                            ></textarea>
                        </div>

                        {/* Candidate Zoom Link */}
                        <div className="mb-3">
                            <label htmlFor="meetingLink" className="form-label fw-bold">Candidate Zoom Link</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="meetingLink"
                                    value={meetingLink}
                                    readOnly
                                />
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={copyLink}
                                    disabled={!meetingLink || isSending}
                                >
                                    <i className="bi bi-clipboard"></i> Copy
                                </button>
                            </div>
                            <small className="text-muted">This is the link the candidate will use to join the interview.</small>
                        </div>

                        {/* Interviewer Zoom Link */}
                        <div className="mb-3">
                            <label htmlFor="interviewerMeetingLink" className="form-label fw-bold">Interviewer Zoom Link</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="interviewerMeetingLink"
                                    value={interviewerMeetingLink}
                                    readOnly
                                />
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={copyInterviewerLink}
                                    disabled={!interviewerMeetingLink || isSending}
                                >
                                    <i className="bi bi-clipboard"></i> Copy
                                </button>
                            </div>
                            <small className="text-muted">This is the link the interviewer will use to start the interview.</small>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={isSending}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSend}
                            disabled={isSending}
                        >
                            {isSending ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-send me-2"></i> Send Emails
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSendInterviewLinkModal;