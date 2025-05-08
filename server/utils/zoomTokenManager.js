const axios = require('axios');
const ZoomToken = require('../models/ZoomToken-model');
require('dotenv').config();

const getZoomAccessToken = async () => {
    let tokenDoc = await ZoomToken.findOne();

    if (!tokenDoc) throw new Error('Zoom not authenticated yet.');

    // Check if token expired
    if (new Date() >= tokenDoc.expiresAt) {
        // Refresh token
        const refreshRes = await axios.post(
            'https://zoom.us/oauth/token',
            null,
            {
                params: {
                    grant_type: 'refresh_token',
                    refresh_token: tokenDoc.refreshToken,
                },
                auth: {
                    username: process.env.ZOOM_CLIENT_ID,
                    password: process.env.ZOOM_CLIENT_SECRET,
                },
            }
        );

        const { access_token, refresh_token, expires_in } = refreshRes.data;

        tokenDoc.accessToken = access_token;
        tokenDoc.refreshToken = refresh_token;
        tokenDoc.expiresAt = new Date(Date.now() + expires_in * 1000);
        await tokenDoc.save();
    }

    return tokenDoc.accessToken;
};

module.exports = getZoomAccessToken;
