import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../context/auth-context';
const clientId = import.meta.env.VITE_ZOOM_CLIENT_ID;
const redirectUri = import.meta.env.VITE_ZOOM_REDIRECT_URI;

const SuperAdminConnectZoomButton = () => {
    const [connected, setConnected] = useState(null);
    const { server } = useAuthContext()

    useEffect(() => {
        const checkZoomStatus = async () => {
            try {
                const res = await axios.get(`${server}/zoom/status`);
                setConnected(res.data.connected);
            } catch (err) {
                console.error('Zoom status check failed:', err.message);
                setConnected(false);
            }
        };

        checkZoomStatus();
    }, []);


    const handleConnectZoom = () => {
        console.log(clientId);
        console.log(redirectUri);


        const oauthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

        // ✅ Full-page redirect
        window.location.href = oauthUrl;
    }


    if (connected === null) {
        return (
            <>
                <div className="container-fluid">
                    <div className="container">
                        <p>Checking Zoom connection...</p>
                    </div>
                </div>
            </>
        )
    }
    if (connected) {
        return (
            <>
                <div className="container-fluid">
                    <div className="container">
                        <p>✅ Zoom is already connected.</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <button className="btn btn-primary" onClick={handleConnectZoom}>
                        Connect Zoom
                    </button>
                </div>
            </div>
        </>
    )
}

export default SuperAdminConnectZoomButton;
