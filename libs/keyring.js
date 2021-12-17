require('dotenv').config();

const fs = require('fs');
const caver = require('../provider');
const bip39 = require('bip39');

class Keyring {
    createKeyring = async (password)=> {
        try{
           
            //const keyring = await caver.wallet.keyring.generate();
            const account = await caver.klay.accounts.create(password);
            const keyring = await account.encrypt(password);
            
            await caver.klay.accounts.wallet.add(account.privateKey, account.address);
            
            fs.writeFile(`keystore/keystore-${account.address}.json`,JSON.stringify(keyring),async (err)=>{
                if(err){
                    console.log('fs error : ' + err);
                }
                else{
                    console.log('fs write success');
                    const keystore = fs.readFileSync(`keystore/keystore-${account.address}.json`,'utf-8');
                    const decryptedKeyring = await caver.wallet.keyring.decrypt(keystore,password);
                    console.log(`decrypted : `);
                    console.log(decryptedKeyring);
                    await caver.wallet.add(decryptedKeyring);

                    //console.log(`account : ${decryptedKeyring._address} private key : ${decryptedKeyring._key._privateKey}`)
                    await caver.klay.accounts.createWithAccountKey(decryptedKeyring._address,decryptedKeyring._key._privateKey);
                    
                    console.log(await caver.klay.getAccounts());
                }
            });

            return keyring;

        }catch(err){
            console.log(err);

            return null;
        }
    }

    getAccountType = async (account)=> {
        try{
            const acc = await caver.rpc.klay.getAccount(account);
            console.log(acc);

            return acc.accType;
        
            
        }catch(err){
            console.log(err);

            return null;
        }
    }

    getNonce = async (account)=> {
        try{
            const acc = await caver.rpc.klay.getAccount(account)

            return acc.account.nonce;

        }catch(err){
            console.log(err);
            
            return null;
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

            
            const balance = await caver.utils.hexToNumberString(await caver.rpc.klay.getBalance(account));

            const value = await caver.utils.convertFromPeb(balance);

            return value;

        }catch(err){
            console.log(err);

            return null;
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
            const receipt =  await caver.rpc.klay.sendTransaction(tx);

            return receipt;
            
        }catch(err){
            console.log(err);

            return null;
        }
    }

    createMnemonic = ()=> {
        return bip39.generateMnemonic();
    }
}

const keyring = new Keyring();

module.exports = keyring;