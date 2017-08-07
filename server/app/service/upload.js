import qn from 'qn'
const config = require('../../config.js')
const client = qn.create({
  accessKey: config.qn_accessKey,
  secretKey: config.qn_secretKey,
  bucket: 'feweekly',
  domain: 'http://ooaa8syjw.bkt.clouddn.com',
})
export default client
