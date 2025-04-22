const cloudinary = require('../config/cloudinary');
const user1Model = require('../models/Auth/user1-model');

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const profilePicResult = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
            if (error) throw error;

            const resumeResult = await cloudinary.uploader.upload_stream({ resource_type: 'raw' }, async (error2, result2) => {
                if (error2) throw error2;

                const user = new user1Model({
                    name,
                    email,
                    profilePicture: result.secure_url,
                    resume: result2.secure_url,
                });

                await user.save();
                res.status(201).json(user);
            });

            resumeResult.end(req.files.resume[0].buffer);
        });

        profilePicResult.end(req.files.profilePicture[0].buffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
