const express = require('express')
const userHandler = require('../router_handler/user')
    //创建路由对象
const router = express.Router()
    //注册
router.post('/register', userHandler.register)
    //登录
router.post('/login', userHandler.login)
    //共享路由对象
module.exports = router