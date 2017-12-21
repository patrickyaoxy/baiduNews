var express = require('express');
var router = express.Router();
//引入数据库模块
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: 'root',
    database: 'baidunews'
})
con.connect();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('admin', {});
});
//获取所有数据
router.post('/getMessage', function (req, res, next) {
    con.query('SELECT * FROM news', function (err, results, f) {
        if (!err) {
            res.json(results)
        }
    })
})
//添加数据
router.post('/addMessage', function (req, res, next) {
    var addDate = req.body;
    var ary = [addDate.type, addDate.imgs, addDate.title, addDate.time, addDate.comefrom, addDate.import]
    console.log(ary)
    var str = "INSERT INTO `news`(`id`, `type`, `imgs`, `title`, `time`, `comefrom`, `import`) VALUES (NULL,?,?,?,?,?,?)"
    con.query(str, ary, function (err, results, f) {
        if (!err) {

            res.json({
                "states": "ok",
                "message": "您已成功添加一条数据"
            })
        }
    })
})
//删除数据
router.post('/deleteMessage', function (req, res, next) {
    var dataId = [req.body.id];
    var str = "DELETE FROM `news` WHERE id=?"
    con.query(str, dataId, function (err, results, f) {
        if (!err) {

            res.json({
                "states": "ok",
                "message": "您已成功删除一条数据"
            })
        }
    })
})
//更新数据
router.post('/updateMessage', function (req, res, next) {
    var ary = [req.body.type, req.body.imgs, req.body.title, req.body.time, req.body.comefrom, req.body.import, req.body.id];
    console.log(ary);
    var str = "UPDATE `news` SET `type`=?,`imgs`=?,`title`=?,`time`=?,`comefrom`=?,`import`=? WHERE `id`=?"
    con.query(str, ary, function (err, results, f) {
        if (!err) {

            res.json({
                "states": "ok",
                "message": "您已成功修改一条数据"
            })
        } else {
            console.log(err)
        }
    })
})
module.exports = router;