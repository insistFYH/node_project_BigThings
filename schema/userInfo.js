const { string } = require('@hapi/joi')
const joi = require('@hapi/joi')
const id = joi.number().integer().required()
const nickname = joi.string().required()
const user_pic = joi.string().email().required()
exports.updateUserInfo_schema = {
    body: {
        id,
        nickname,
        user_pic
    }
}