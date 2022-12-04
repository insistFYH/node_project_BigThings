exports.register = (req, res) => {
    const userinfo = req.body

    //用户名、密码不能为空
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不能为空！' })
    }
    //检测用户名是否被占用
    const db = require('../db/index')
    const sql = 'select * from ev_users where username=?'
    db.query(sql, [userinfo.username], function(err, results) {
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        //被占用
        if (results.length > 0) {
            return res.send({ status: 1, message: '用户名被占用' })
        }
    })

    res.send('regiter success')
        // console.log(req.body)
}
exports.login = (req, res) => {
    res.send('login success')
}