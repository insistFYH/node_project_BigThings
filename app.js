const express = require('express')

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

// 全局错误中间件，捕获验证失败的错误并响应给客户端
const joi = require('@hapi/joi')
app.use(function(err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
        // 未知错误
    res.cc(err)
})

//导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//监听
app.listen(7777, function() {
    console.log('api server running at http://127.0.0.1:7777')
})