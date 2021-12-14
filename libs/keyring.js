require('dotenv').config();

const fs = require('fs');
const caver = require('../provider');

class Keyring {
    createKeyring = async (password)=> {
        try{
            const keystore = fs.readFileSync(process.env.KLAYTN_KEYSTORE_PATH,'utf-8');
            const keyring = await caver.wallet.keyring.decrypt(keystore,password);
            caver.wallet.add(keyring);
            caver.klay.accounts.wallet.add(keyring._key._privateKey);

            return keyring;

        }catch(err){
            console.log(err);
        }
    }

    getAccountType = async (account)=> {
        try{
            const acc = await caver.rpc.klay.getAccount(account)

            return acc.accType;
        }catch(err){
            console.log(err)
        }
    }

    getNonce = async (account)=> {
        try{
            const acc = await caver.rpc.klay.getAccount(account)

            return acc.account.nonce;
        }catch(err){
            console.log(err)
        }
    }

    getBalance = async (account)=> {
        try{
            const acc = await caver.rpc.klay.getAccount(account);
            // if(caver.utils.isBigNumber(acc.account.balance)){
            //     console.log('Big Number');
            //     value = await caver.utils.toBN(acc.account.balance).toString();
            // }
            // else{
            //     value = await caver.utils.hexToNumber(acc.account.balance);
            // }

            const value = caver.utils.convertFromPeb(caver.utils.toBN(acc.account.balance).toString());

            return value;
        }catch(err){
            console.log(err)
        }
    }

    sendKlay = async (from,to,value)=> {
        try{
            const tx = await caver.transaction.valueTransfer.create({
                from: from,
                to : to,
                value : caver.utils.convertToPeb(`${value}`,'KLAY'),
                gas : 50000
            });
            await caver.rpc.klay.sendTransaction(tx).then(console.log);

        }catch(err){
            console.log(err)
        }
    }

    createMnemonic = async ()=> {

    }

}

const keyring = new Keyring();

module.exports = keyring;