const Interview = require('../models/Interview');

exports.getDashboard = (req, res) => {
    res.render('interviewer/dashboard', { user: req.user });
};

exports.getScheduledInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find({ interviewer: req.user._id }).populate('company interviewee');
        res.render('interviewer/schedule', { interviews });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving scheduled interviews' });
    }
};

exports.updateInterviewStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Interview.findByIdAndUpdate(req.params.id, { status });
        res.redirect('/interviewer/schedule');
    } catch (error) {
        res.status(500).json({ message: 'Error updating interview status' });
    }
};
