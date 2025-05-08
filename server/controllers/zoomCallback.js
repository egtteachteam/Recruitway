const axios = require('axios');
const ZoomToken = require('../models/ZoomToken-model');
require('dotenv').config();

const zoomCallback = async (req, res) => {
    const { code } = req.query;

    console.log(code);
    

    if (!code) return res.status(400).send('Missing authorization code');

    try {
        const response = await axios.post(
            'https://zoom.us/oauth/token',
            null,
            {
                params: {
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: process.env.ZOOM_REDIRECT_URI,
                },
                auth: {
                    username: process.env.ZOOM_CLIENT_ID,
                    password: process.env.ZOOM_CLIENT_SECRET,
                },
            }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        // Save or update token in MongoDB
        const existing = await ZoomToken.findOne();
        if (existing) {
            existing.accessToken = access_token;
            existing.refreshToken = refresh_token;
            existing.expiresAt = new Date(Date.now() + expires_in * 1000);
            await existing.save();
        } else {
            await ZoomToken.create({
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresAt: new Date(Date.now() + expires_in * 1000),
            });
        }

        console.log(existing);
        

        // ✅ Redirect back to your frontend dashboard or success message
        res.redirect('http://localhost:5173/superadmin/interviews'); // change to your actual frontend page
    } catch (err) {
        console.error('Zoom callback error:', err.message);
        res.status(500).send('Zoom connection failed.');
    }
};

module.exports = zoomCallback;
