const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mailer = require('nodemailer');
const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
})
exports.signUp = async (req, res) => {
    const { name, email } = req.body;
    try {
        if (!name || !email) {
            return res.json({
                status: false,
                message: 'Name and email are required'
            })
        }
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.json({
                status: false,
                message: 'User with this email already exsists'
            })
        }
        let password  = generatePassword();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        sendThankyouEmail(email, name,password)
        res.json({
            status: true,
            message: 'Sign up successfull! Check you email for password.',
            result:user
        })
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        })
    }
}
exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({
                status: false,
                message: 'Email and password are required'
            })
        }
        const findUser = await User.findOne({ email });
        console.log(findUser)
        if (!findUser) {
            return res.json({
                status: false,
                message: 'Invalid credentials'
            })
        }
        const compare = await bcrypt.compare(password, findUser.password);
        if (!compare) {
            return res.json({
                status: false,
                message: 'Invalid credentials'
            })
        }
        const token = jwt.sign(findUser._id.toString(), process.env.JWT_SECRET)
        res.json({
            status: true,
            message: 'Sign up successfull',
            result: {
                user: findUser,
                token: token
            }
        })
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        })
    }
}
const generatePassword = () => {
    let length = 8;
    const numbers = '0123456789';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const specialCharacters = '!@#$%^&*()_+';
    const allCharacters = numbers + upperCaseLetters + lowerCaseLetters + specialCharacters;

    // Ensure one character of each type
    let result = [
        numbers.charAt(Math.floor(Math.random() * numbers.length)),
        upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length)),
        lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length)),
        specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length))
    ];

    // Fill the rest of the string length
    for (let i = result.length; i < length; i++) {
        result.push(allCharacters.charAt(Math.floor(Math.random() * allCharacters.length)));
    }

    // Shuffle the result array and join into a string
    result = result.sort(() => 0.5 - Math.random());
    return result.join('');
}
const sendThankyouEmail = async (email, userName,password) => {
    try {
        if (!email || !userName) {
            return {
                status: false,
                message: 'Email and userName are required'
            }
        }
        let sendEmailResponse = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Thank You for Signing up',
            html: `<center>
                <h2 style="padding-top: 1%; padding-bottom: 1%; color: #FF6700; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Welcomem ${userName}!</h2><br />
            </center>   
            <center><p style="color: rgb(122, 122, 122);
            margin-bottom: 20px; font-size:20px;">Thank you for signing up.</p></center>
            <p style="color: rgb(122, 122, 122);
            margin-bottom: 20px; font-size:20px;">
            Use the following password to login into the system</p>
            <center><p style="color: white;
            font-weight: 800; font-size:20px; padding:20px 20px; background-color:blue;">${password}</p></center>`

        });
        if (!sendEmailResponse) {
            return {
                status: false,
                message: 'unable to send email'
            }
        }
        return {
            status: true,
            message: `Email Sent to ${userName}`,
        }
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        })
    }
}