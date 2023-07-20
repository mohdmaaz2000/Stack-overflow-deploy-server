const otpGenerator = require('otp-generator');


const OTP_LENGTH = 6;
const OTP_CONFIG = {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
}
const generateOTP = () => {
    const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
    return OTP;
};

module.exports = generateOTP;