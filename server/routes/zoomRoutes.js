// const express = require('express');
// const ZoomToken = require('../models/ZoomToken-model');
// const zoomCallback = require('../controllers/zoomCallback');

// const zoomRouter = express.Router();
// zoomRouter.get('/status', async (req, res) => {
//     try {
//         const tokenDoc = await ZoomToken.findOne();
//         const isConnected = !!tokenDoc && new Date() < new Date(tokenDoc.expiresAt);
//         res.json({ connected: isConnected });
//     } catch (err) {
//         console.error('Zoom status check failed:', err.message);
//         res.status(500).json({ connected: false });
//     }
// });

// zoomRouter.get('/callback', zoomCallback);

// module.exports = zoomRouter;




const express = require('express');
const axios = require('axios');
const ZoomToken = require('../models/ZoomToken-model');
const zoomRouter = express.Router();

const { ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_REDIRECT_URI } = process.env;

// GET /zoom/status
zoomRouter.get('/status', async (req, res) => {
    const tokenDoc = await ZoomToken.findOne();
    res.json({ connected: !!tokenDoc });
});

// GET /zoom/callback
zoomRouter.get('/callback', async (req, res) => {
    const { code } = req.query;
    console.log(code);
    
    if (!code) return res.status(400).send('Missing code');

    try {
        const tokenRes = await axios.post(
            'https://zoom.us/oauth/token',
            null,
            {
                params: {
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: ZOOM_REDIRECT_URI,
                },
                auth: {
                    username: ZOOM_CLIENT_ID,
                    password: ZOOM_CLIENT_SECRET,
                },
            }
        );

        const { access_token, refresh_token, expires_in } = tokenRes.data;

        const expiresAt = new Date(Date.now() + expires_in * 1000);
        await ZoomToken.findOneAndUpdate(
            {},
            { accessToken: access_token, refreshToken: refresh_token, expiresAt },
            { upsert: true }
        );

        res.send('✅ Zoom connected successfully. You may close this window.');
    } catch (err) {
        console.error('Zoom callback error:', err.message);
        res.status(500).send('Failed to connect Zoom.');
    }
});

module.exports = zoomRouter;

