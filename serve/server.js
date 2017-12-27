const nedb = require('nedb')
const path = require('path')
const db = new nedb({
    //自身(serveファイル)内からみた階層
    filename: path.join(__dirname, 'db/tst.db'),
    autoload: true
})

const express = require('express')
const app = express()
const portNo = 3000
/*  createServer  */
app.listen(portNo, () => {
    console.log(`listen to localhost:${portNo}`)
})

/*  定義  */
app.use('/public', express.static('./public'))//親(ptototype)からみた階層
app.use('/bundle', express.static('./bundle'))//親(ptototype)からみた階層
/*  / => ./public  */
app.get('/', (req, res) => {
    res.redirect(302, '/public')
})

/*  Define API */
app.get('/api/getItems', (req, res) => {
    db.find({}).sort({ stime: 1 }).exec((err, data) => {
        console.log('サーバにアクセスしました')
        if (err) {
            console.log(err)
            return
        }
        sendJSON(res, true, { logs: data })
    })
})

//基本的にgetを利用する
//postだとcrossdomainにひっかかる
app.get('/api/write', (req, res) => {
    const q = req.query
    db.insert({
        name: q.name,
        body: q.body,
        stime: (new Date()).getTime()
    }, (err, doc) => {
        if (err) return
        sendJSON(res, true, { id: doc._id })
    })
})

function sendJSON(res, result, obj) {
    obj['result'] = result
    res.json(obj)
}
