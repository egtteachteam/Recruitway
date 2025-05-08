import React, { useState, useEffect } from 'react';

const SuperAdminInterviewerModal = ({ show, onHide, onSave, editingInterviewer }) => {
    const [formData, setFormData] = useState({ fullname: '', email: '', position: '' });

    useEffect(() => {
        if (editingInterviewer) {
            setFormData(editingInterviewer);
        } else {
            setFormData({ fullname: '', email: '', position: '' });
        }
    }, [editingInterviewer]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onHide();
    };

    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{editingInterviewer ? 'Edit Interviewer' : 'Add Interviewer'}</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control mb-2" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} />
                        <input className="form-control mb-2" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <input className="form-control mb-2" name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminInterviewerModal;
