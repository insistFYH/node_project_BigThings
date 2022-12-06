const joi = require('@hapi/joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

//增加文章分类验证规则
exports.addArtCates_schema = {
    body: {
        name,
        alias
    }
}

//id校验规则
exports.id_schema = {
    params: {
        id
    }
}

//根据id更新文章分类校验规则
exports.updateArtCate_schema = {
    body: {
        id,
        name,
        alias
    }
}