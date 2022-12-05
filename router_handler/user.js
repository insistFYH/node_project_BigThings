const db = require('../db/index')
    //用于加密
const bcrypt = require('bcryptjs')
    // const { func } = require('@hapi/joi')
    // 用于生成token字符串
const jwt = require('jsonwebtoken')
    //密匙
const { jwtSecretKey } = require('../config')

exports.register = (req, res) => {
    const userinfo = req.body

    //用户名、密码不能为空
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('用户名或密码不能为空')
    // }
    //检测用户名是否被占用
    const sql = 'select * from ev_users where username=?'
    db.query(sql, [userinfo.username], function(err, results) {
        if (err) {
            return res.cc(err)
        }
        //被占用
        if (results.length > 0) {
            return res.cc('用户名被占用')
        }
        //对密码进行加密处理
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo.password)

        //插入新用户
        const sql2 = 'insert into ev_users set ?'
        db.query(sql2, { username: userinfo.username, password: userinfo.password }, function(err, results) {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) {
                res.cc('注册用户失败！')
            }
            res.send({
                status: 0,
                message: '注册用户成功！'
            })
        })
    })

    // console.log(req.body)
}
exports.login = (req, res) => {
    // res.send('login success')
    const userinfo = req.body
        // 查询用户
        // console.log(userinfo)
    const sql = 'select * from ev_users where username=?'
    db.query(sql, [userinfo.username], function(err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) {
            return res.cc('不存在此用户名！')
        }
        if (!bcrypt.compareSync(userinfo.password, results[0].password)) {
            return res.cc('密码错误，登录失败')
        }
        //生成token
        const user = {...results[0], password: '', user_pic: '' }
        const token = jwt.sign(user, jwtSecretKey, {
            expiresIn: '10h'
        })
        res.send({
            status: 0,
            message: '登录成功',
            data: 'Bearer ' + token
        })

    })
}