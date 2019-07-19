var ceasar = require('./ceasarCipher');
var readline= require('readline');
var events = require('events');
class _events extends events{};
var e = new _events();





var cli = {};

e.on('exit',function(str){
    cli.response.exit();
})

e.on('ceasar',function(str){
    cli.response.encode(str)
})

cli.response = {}

cli.response.exit = function(){
    process.exit(0);
}

cli.response.encode = function(str){
    var getArgs = str.split('-');
    var amount = parseInt(getArgs[1].trim());
    var sentence = getArgs[2];

    var encoded = ceasar.cipher(sentence,amount);

    console.log("----------------------------------------------------");
    console.log("----------------------------------------------------");

    console.log("Original Sentence : "+sentence);
   
    console.log("Encrypted Sentence : "+encoded);


}

cli.processInput = function(str){
    str = typeof(str) == 'string' && str.length > 0 ? str.trim() : false
    if(str){
        //Commands to look out for
        var commands = ["ceasar","exit"];
        var matchFound = false;
        var count =0;
        commands.some(function(input){
            if(str.toLowerCase().indexOf(input)> -1){
               matchFound = true;
               //Emit event
               e.emit(input,str); 
               return true;
            }
        })
    }

    if(!matchFound){
        console.log("Sorry Wrong Command try again");
    }



}

cli.init = function(){


    console.log('\x1b[34m%s\x1b[0m',"The Ceasar Cipher Cli is Running");
    console.log('\x1b[35m%s\x1b[0m',"Type ceasar -<shift> -<string to be encoded>");
    console.log('\x1b[32m%s\x1b[0m',"shift range from 1-26 and add the - sign");
    console.log('\x1b[33m%s\x1b[0m',"Make sure to use the same shift value if you want to return to the original string");
    console.log('\x1b[36m%s\x1b[0m',"Type ctrl c  or exit to cancel cli");
  

    const _interface = readline.createInterface({
        input : process.stdin,
        output: process.stdout,
        prompt : '>>'

    });

    _interface.prompt();


    _interface.on('line',function(str){
        cli.processInput(str);
        _interface.prompt();
    })

    _interface.on('close',function(){
        process.exit(0);
    })

}





module.exports = cli;