const path = require('path')
const db = require('../db/index')
exports.addArticle = (req, res) => {
    // console.log(req.body) // 文本类型的数据
    // console.log('--------分割线----------')
    // console.log(req.file) // 文件类型的数据
    // res.send('ok')

    if (!req.file || req.file.fieldname !== 'cover_img') res.cc('文章封面是必选参数！')
    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }

    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleInfo, (err, results) => {
        if (err) res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')
        res.send({
            status: 0,
            message: '发布文章成功'
        })
    })
}