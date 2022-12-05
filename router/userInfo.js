const express = require('express')
const { getUserInfo, updateUserInfo, resetPassword, updateAvatar } = require('../router_handler/userInfo')
const router = express.Router()
    // 表单数据验证
const expressJoi = require('@escook/express-joi')
const { updateUserInfo_schema } = require('../schema/userInfo')
const { resetPassword_schema } = require('../schema/resetPassword')
const { updateAvatar_schema } = require('../schema/updateAvatar')

// 获取用户信息
router.get('/getUserInfo', getUserInfo)

//更新用户信息
router.post('/updateUserInfo', expressJoi(updateUserInfo_schema), updateUserInfo)

//重置密码
router.post('/resetPassword', expressJoi(resetPassword_schema), resetPassword)

//更新用户头像
router.post('/updateAvatar', expressJoi(updateAvatar_schema), updateAvatar)

module.exports = router