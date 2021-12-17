require('dotenv').config();

const keyring = require('./libs/keyring');

const menu = ['[1] Create v4 keystore', '[2] Get account type', '[3] Get nonce', '[4] Get balance', '[5] Send klay', '[6] Create mnemonic code', '[7] Exit'];

const run = ()=>{
    let readline = require('readline');
    let r = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    })
    
    console.log('----------Menu----------');
    for(let i=0; i<menu.length; i++){
        console.log(menu[i]);
    }
    console.log('------------------------');
    
    console.log('Choice Menu Number : ');

    r.setPrompt('>');
    r.prompt();
    r.on('line', function(line){
        
        console.log(menu[line-1]);

        switch(line){
            case '1' :
                r.question('password : ', async (password)=>{
                    const key = await keyring.createKeyring(password);
                    console.log(key);
                })
                break;

            case '2' :
                r.question('account : ',async (account)=>{
                    const accountType = await keyring.getAccountType(account);

                    console.log(`Account Type : 0x${accountType}`);
                });
                break;
            
            case '3' :
                r.question('account : ',async (account)=>{
                    const nonce = await keyring.getNonce(account);

                    console.log(`Nonce : ${nonce}`);
                });
                break;

            case '4' :
                r.question('account : ',async (account)=>{
                    const balance = await keyring.getBalance(account);

                    console.log(`Balance : ${balance} klay`);
                });
                break;
            case '5' :
                r.question('from : ',async (from)=>{
                    r.question('to : ', async (to)=>{
                        r.question('value : ', async(value)=>{
                            console.log(await keyring.sendKlay(from,to,value));
                        })
                    })
                });
                break;

            case '6' :
                console.log(keyring.createMnemonic());
                break;

            case '7' :
                r.close();
                break;
                
            default :
                console.log(`${line} is not menu. just input 1~7`);
        }
        
        r.prompt();
    })

    r.on('close',function() {
        process.exit();
    })
    
}

run();