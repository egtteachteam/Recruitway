const { Schema, model } = require('mongoose');

const zoomTokenSchema = new Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
}, { timestamps: true });

const ZoomToken = model('ZoomToken', zoomTokenSchema);

module.exports = ZoomToken
