const express = require('express')
const joi = require('@hapi/joi')
    // 导入各路由模块
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
const artCateRouter = require('./router/artCate')
const articleRouter = require('./router/article')
    //解析token
const expressJWT = require('express-jwt')
const { jwtSecretKey } = require('./config')
    //创建服务器实例
const app = express()

//cors跨域配置
const cors = require('cors')
app.use(cors())

//解析表单数据中间件配置
app.use(express.urlencoded({ extended: false }))

//声明全局中间件res.cc(),响应数据，优化res.send()代码
app.use(function(req, res, next) {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//解析token
app.use(expressJWT({ secret: jwtSecretKey }).unless({ path: [/^\/api\//] }))

//注册用户路由模块
app.use('/api', userRouter)

//注册个人中心路由模块
app.use('/my', userInfoRouter)

//注册文章分类模块
app.use('/my/article', artCateRouter)

//注册文章模块
app.use('/my/article', articleRouter)

//托管静态资源
app.use('/uploads', express.static('./uploads'))

//全局错误中间件， 捕获验证失败的错误并响应给客户端
app.use(function(err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)

    //token验证失败
    if (err.name == 'UnauthorizedError') return res.cc('身份验证失败')

    // 未知错误
    res.cc(err)
})

//监听
app.listen(7777, function() {
    console.log('api server running at http://127.0.0.1:7777')
})