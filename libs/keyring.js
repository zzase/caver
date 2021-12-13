require('dotenv').config();

const fs = require('fs')
const caver = require('../provider')

class Keyring {
    createKeyring () {
        const keystore = fs.readFileSync(process.env.KLAYTN_KEYSTORE_PATH,'utf-8')
        const keyring = caver.wallet.keyring.decrypt(keystore,process.env.KLAYTN_KEYSTORE_PW)
        
        caver.wallet.add(keyring)

        console.log(keyring)
    }

}

const keyring = new Keyring()

module.exports = keyring