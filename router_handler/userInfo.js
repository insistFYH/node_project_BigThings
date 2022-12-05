const db = require('../db/index')
const bcrypt = require('bcryptjs')
    //获取用户信息
exports.getUserInfo = (req, res) => {
    // res.send('get ok')
    const user = req.user
    console.log(user)
    const sql = 'select username,nickname,email,user_pic from ev_users where id=?'
    db.query(sql, [user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 1) res.cc('不存在此用户信息,请联系后台处理！')
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        })
    })
}

//更新用户信息
exports.updateUserInfo = (req, res) => {
    // res.send('update ok')
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) {
            res.cc('更新用户信息失败！')
        }
        res.send({
            status: 0,
            message: '更新用户信息成功！'
        })
    })
}

//重置密码
exports.resetPassword = (req, res) => {
    // res.send('reset ok')
    // 查找此用户是否存在
    console.log(req.user)
    const sql = 'select * from ev_users where id=?'
    db.query(sql, [req.user.id], (err, results) => {
        if (err) res.cc(err)
        if (results.length < 1) res.cc('不存在该用户!')

        //检查旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPassword, results[0].password)
        if (!compareResult) return res.cc('旧密码错误！')

        // 对新密码进行加密，重置密码
        const newPassword = bcrypt.hashSync(req.body.newPassword, 10)
        sql2 = 'update ev_users set password=? where id=?'
        db.query(sql2, [newPassword, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) res.cc('重置密码失败')
            res.send({
                status: 0,
                message: '重置密码成功！'
            })
        })
    })
}

//更新用户头像
exports.updateAvatar = (req, res) => {
    // res.send('avatar ok')
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) res.cc('更新用户头像失败！')
        res.send({
            status: 0,
            message: '更新用户头像成功！'
        })
    })
}