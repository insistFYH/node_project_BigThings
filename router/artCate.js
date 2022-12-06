const express = require('express')
const { getArtCates, addArtCates, deleteCate, getArtCate, updateArtCate } = require('../router_handler/artCate')
    //表单数据验证
const expressJoi = require('@escook/express-joi')
const { addArtCates_schema, id_schema, updateArtCate_schema } = require('../schema/artCates')

const artCateRouter = express.Router()

//获取文章分类列表
artCateRouter.get('/cates', getArtCates)

//新增文章分类
artCateRouter.post('/addCates', expressJoi(addArtCates_schema), addArtCates)

//根据id删除文章分类
artCateRouter.get('/deleteCate/:id', expressJoi(id_schema), deleteCate)

//根据id获取文章分类
artCateRouter.get('/cate/:id', expressJoi(id_schema), getArtCate)

//根据id更新文章分类
artCateRouter.post('/updateCate', expressJoi(updateArtCate_schema), updateArtCate)
module.exports = artCateRouter