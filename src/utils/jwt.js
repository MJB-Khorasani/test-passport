const path = require('path');
const { promises: fsPromises } = require('fs');

const jsonwebtoken = require('jsonwebtoken');

const PRIVATE_KEY_PATH = path.join(__dirname, '..', '..', 'keys', 'id_rsa_private.pem');

module.exports.generateAccessToken = async (payload, expiresIn) => {
    let privateKey = fsPromises.readFile(PRIVATE_KEY_PATH);
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, privateKey, {
            expiresIn, algorithm: 'RS256'
        }, (error, accessToken) => {
            if (error) reject(error);
            else resolve(accessToken);
        });
    });
};

module.exports.generateRefreshToken = async (payload, expiresIn) => {
    let privateKey = fsPromises.readFile(PRIVATE_KEY_PATH);
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, privateKey, {
            expiresIn, algorithm: 'RS256'
        }, (error, refreshToken) => {
            if (error) reject(error);
            else resolve(refreshToken);
        });
    });
};