const authService = require('../services/auth');
const userService = require('../services/user');
// const mailService = require('../services/mail');

const UI_EMAIL_VERIFICATION_URI = process.env.UI_EMAIL_VERIFICATION_URI;

module.exports.register = async (req, res, next) => {
    let { email, password } = req.body;
    let user = await userService.createUser({ 
        email, password
    });
    // let token = await authService.generateVerificationEmailToken(user._id);
    // await mailService.sendMail(email, 'test-passport email verification', `<h1>please click <a href="${UI_EMAIL_VERIFICATION_URI}/${token}" >this link</a></h1>`);

    req.status = 201;
    req.data = user;
    req.error = null;
    next();
};

module.exports.login = async (req, res, next) => {
    let { email } = req.body;
    let user = await userService.readUser({
        email
    });
    let { accessToken, refreshToken } = await authService.generateJwt(user._id);

    req.status = 200;
    req.data = [{
        accessToken, refreshToken
    }];
    req.error = null;
    next();
};

module.exports.logout = async (req, res, next) => {
    let { accessToken, refreshToken } = req;
    await authService.addToBlackListTokens([accessToken, refreshToken]);

    req.status = 200;
    req.data = [{
        accessToken, refreshToken
    }];
    req.error = null;
    next();
};
