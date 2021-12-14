require('dotenv').config();

const fs = require('fs')
const caver = require('../provider')

class Keyring {
    createKeyring = async (password)=> {
        try{
            const keystore = fs.readFileSync(process.env.KLAYTN_KEYSTORE_PATH,'utf-8')
            const keyring = await caver.wallet.keyring.decrypt(keystore,password)
            caver.wallet.add(keyring)

            console.log(keyring)
        }catch(err){
            console.log(err)
        }
    }

    getAccountType() {

    }

    getNonce() {

    }

    getBalance() {

    }

    sendKlay() {

    }

    createMnemonic() {

    }

}

const keyring = new Keyring()

module.exports = keyring