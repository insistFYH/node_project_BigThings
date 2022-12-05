const joi = require('@hapi/joi')
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
exports.resetPassword_schema = {
    body: {
        oldPassword: password,
        newPassword: joi.not(joi.ref('oldPassword')).concat(password)
    }
}