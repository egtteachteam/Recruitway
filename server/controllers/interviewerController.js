const Interviewer = require("../models/Interviewer-model");

const getAllInterviewers = async (req, res) => {
    try {
        const interviewers = await Interviewer.find().sort({ createdAt: -1 });
        res.json({ success: true, data: interviewers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch interviewers", error: error.message });
    }
};

const createInterviewer = async (req, res) => {
    try {
        const { fullname, email, position } = req.body;
        if (!fullname || !email) {
            return res.status(400).json({ success: false, message: "Full name and email are required" });
        }

        const existing = await Interviewer.findOne({ email });
        if (existing) {
            return res.status(409).json({ success: false, message: "Interviewer with this email already exists" });
        }

        const newInterviewer = new Interviewer({ fullname, email, position });
        await newInterviewer.save();
        res.status(201).json({ success: true, data: newInterviewer });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create interviewer", error: error.message });
    }
};

const updateInterviewer = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Interviewer.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteInterviewer = async (req, res) => {
    try {
        const { id } = req.params;
        await Interviewer.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



                                                                                                                                                                                                                                                                                                            

const getDashboard = (req, res) => {
    res.render('interviewer/dashboard', { user: req.user });
};

const getScheduledInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find({ interviewer: req.user._id }).populate('company interviewee');
        res.render('interviewer/schedule', { interviews });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving scheduled interviews' });
    }
};

const updateInterviewStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Interview.findByIdAndUpdate(req.params.id, { status });
        res.redirect('/interviewer/schedule');
    } catch (error) {
        res.status(500).json({ message: 'Error updating interview status' });
    }
};

module.exports = {
    getAllInterviewers, createInterviewer, updateInterviewer, deleteInterviewer,
    getDashboard, getScheduledInterviews, updateInterviewStatus
}
