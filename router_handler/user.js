exports.register = (req, res) => {
    const userinfo = req.body

    //用户名、密码不能为空
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('用户名或密码不能为空')
    // }
    //检测用户名是否被占用
    const db = require('../db/index')
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
        const bcrypt = require('bcryptjs')
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo.password)

        //插入新用户
        const sql2 = 'insert into ev_users set ?'
        db.query(sql2, { username: userinfo.username, password: userinfo.password }, function(err, results) {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) {
                res.cc('注册用户失败！')
            }
            res.cc('注册用户成功！', 0)
        })
    })

    // console.log(req.body)
}
exports.login = (req, res) => {
    res.send('login success')
}