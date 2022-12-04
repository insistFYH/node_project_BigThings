const express = require('express')

//创建服务器实例
const app = express()

//cors跨域配置
const cors = require('cors')
app.use(cors())

//解析表单数据中间件配置
app.use(express.urlencoded({ extended: false }))

//导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//监听
app.listen(7777, function() {
    console.log('api server running at http://127.0.0.1:7777')
})