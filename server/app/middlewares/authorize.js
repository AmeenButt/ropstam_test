const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/user')
module.exports = (req, res) => {
    try {
        if (!req.query.authorization) {
            return (
                res.status(400).json(
                    {
                        message: "please provide JWT token in headers",
                        status: false,
                    }
                )
            )
        }

        const token = req.query.authorization;
        if (!token) {
            return (
                res.status(400).json({
                    message: "Please provide jwt token in header",
                    status: false
                })
            )
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'unauthorized', status: false });
            }
            else if (decoded) {
                const user = await User.findOne({_id:decoded})
                console.log(user)
                if (!user) {
                    return (
                        res.status(401).json({
                            message: "This user is un authorized",
                            status: false
                        })
                    )
                }
                else {
                    return (
                        res.status(200).json({
                            message: "This user is authorized",
                            status: true
                        })
                    )
                }
            }
        })
    } catch {
        res.status(401).json({
            error: "invalid token"
        });
    }
};
