require('dotenv').config();

const args = process.argv

const keyring = require('./libs/keyring')

const menu = ['[1] Create v4 keystore', '[2] Get account type', '[3] Get nonce', '[4] Get balance', '[5] Send klay', '[6] Create mnemonic code', '[7] Exit']

const run = ()=>{
    let readline = require('readline')
    let r = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    })
    
    console.log('----------Menu----------')
    for(let i=0; i<menu.length; i++){
        console.log(menu[i])
    }
    console.log('------------------------')
    
    console.log('Choice Menu Number : ')

    r.setPrompt('>')
    r.prompt()
    r.on('line', function(line){
        
        console.log(menu[line-1])

        switch(line){
            case '1' :
                keyring.createKeyring()
                break;
            
            case '7' :
                r.close()
                break;
                
            default :
                console.log(`${line} is not menu. just input 1~7`)
        }
        
        r.prompt() 
    })

    r.on('close',function() {
        process.exit()
    })
    
}

run()