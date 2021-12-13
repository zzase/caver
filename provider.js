const fs = require('fs')
const Caver = require('caver-js')
const caver = new Caver(process.env.SCN_URL)

require('dotenv').config();

const keystore = fs.readFileSync(process.env.KLAYTN_KEYSTORE_PATH,'utf-8')
const keyring = caver.wallet.keyring.decrypt(keystore,process.env.KLAYTN_KEYSTORE_PW)

console.log(keyring)

caver.wallet.add(keyring)

console.log(caver)

module.exports = caver