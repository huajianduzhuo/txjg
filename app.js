const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const axios = require('axios')

const app = new Koa()

// 静态资源
const main = serve(path.join(__dirname, 'dist'))
app.use(main)

// 路由
let router = new Router()
router.get('/load', function * (next){
  yield axios.get('https://baike.baidu.com/item/%E5%A4%A9%E8%A1%8C%E4%B9%9D%E6%AD%8C', {
    headers: {
      "Content-Type": 'text/html'
    },
    responseType: 'text/html'
  })
    .then(res => {
      let result = res.data
      result = result.substring(result.indexOf('<ul class="dramaSerialList" id="dramaSerialList">'))
      result = result.substring(0, result.indexOf('</ul>') + 5)
      this.body = result
    })
    .catch(() => {
      this.body = '获取数据失败'
      this.status = 500
    })
    yield next
})

app.use(router.routes()).use(router.allowedMethods())

// 错误监听
app.on('error', (error, ctx) => {
  console.log('server error listener', error)
})

app.listen(9000)
