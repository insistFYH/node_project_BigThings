const db = require('../db/index')

////获取文章分类列表
exports.getArtCates = (req, res) => {
    // res.send('cates get!')
    const sql = 'select * from ev_article_cate'
    db.query(sql, (err, results) => {
        if (err) res.cc(err)
        if (results.length < 1) res.cc('获取文章列表失败！')
        res.send({
            status: 0,
            message: '获取文章列表成功！',
            data: results
        })
    })
}

//获取文章分类列表
exports.addArtCates = (req, res) => {
    // res.send('addCates success')

    //查看文章分类名、别名是否被占用
    const sql = 'select * from ev_article_cate where name = ? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) res.cc(err)
        if (results.length === 2) res.cc('文章分类名和别名都已被占用')
        if (results.length === 1 && req.body.name === results[0].name && req.body.alias === results[0].alias) {
            res.cc('文章分类名和别名都已被占用')
        }
        if (results.length === 1 && req.body.name === results[0].name) res.cc('文章分类名被占用')
        if (results.length === 1 && req.body.alias === results[0].alias) res.cc('别名被占用')
            //添加文章分类
        const sql2 = 'insert into ev_article_cate set ?'
        db.query(sql2, [req.body], (err, results) => {
            if (err) res.cc(err)
            if (results.affectedRows < 1) res.cc('添加文章分类失败！')
            res.send({
                status: 0,
                message: '添加文章分类成功！'
            })
        })
    })
}

//根据id删除文章分类
exports.deleteCate = (req, res) => {
    // res.send('delete ok')
    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) res.cc('删除文章分类成功!')
        res.send({
            status: 0,
            message: '删除文章分类成功!'
        })
    })
}

//根据id获取文章分类
exports.getArtCate = (req, res) => {
    // res.send('get ok')
    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) res.cc(err)
        if (results.length !== 1) res.cc('获取文章分类失败!')
        res.send({
            status: 0,
            message: '获取文章分类成功！',
            data: results
        })
    })
}

//根据id更新文章分类
exports.updateArtCate = (req, res) => {
    // res.send('update ok')
    //查看文章分类名、别名是否被占用
    const sql = 'select * from ev_article_cate where name = ? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) res.cc(err)
        if (results.length === 2) res.cc('文章分类名和别名都已被占用')
        if (results.length === 1 && req.body.name === results[0].name && req.body.alias === results[0].alias) {
            res.cc('文章分类名和别名都已被占用')
        }
        if (results.length === 1 && req.body.name === results[0].name) res.cc('文章分类名被占用')
        if (results.length === 1 && req.body.alias === results[0].alias) res.cc('别名被占用')
            //更新文章分类
        const sql2 = 'update ev_article_cate set ? where id=?'
        db.query(sql2, [req.body, req.body.id], (err, results) => {
            if (err) res.cc(err)
            if (results.affectedRows !== 1) res.cc('更新文章分类失败！')
            res.send({
                status: 0,
                message: '更新文章分类成功！'
            })
        })
    })
}