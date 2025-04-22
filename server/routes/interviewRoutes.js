const express = require('express');
const Interview = require('../models/Interview');
const interviewRoutes = express.Router();

// Get single interview
interviewRoutes.get('/:id', async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);
        if (!interview) return res.status(404).json({ message: 'Not found' });
        res.json(interview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update interview status
interviewRoutes.patch('/:id/status', async (req, res) => {
    try {
        const interview = await Interview.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(interview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = interviewRoutes;
