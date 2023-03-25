/*
 * @Author: cly_dev 263118046@qq.com
 * @Date: 2022-10-09 20:27:37
 * @Description: redis连接配置
 */
// TODO: node v4
const log = require('../plugin/log')
const { redisPort } = require('../config/server.config')
const redis = require('redis')

const client = redis.createClient({
  host:'127.0.0.1',
  port:redisPort
})
client.on('connect', () => {
  console.log('redis client connected')
})
client.on('error', (err) => {
  // log.error(err)
  console.log(err)
})

module.exports = client
