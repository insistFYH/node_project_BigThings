const joi = require('@hapi/joi')
const title = joi.string().require()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()
const cate_id = joi.number().integer().min(1).required()

//发布文章校验规则对象
exports.addActicle_schema = {
    body: {
        title,
        content,
        state,
        cate_id
    }
}