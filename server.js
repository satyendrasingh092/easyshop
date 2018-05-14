var express = require('express')
var path = require('path')
var os = require('os');
var ifaces = os.networkInterfaces();
var IP_ON_WIFI = ''
console.log("All IP of your Machine")
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            if(ifname === 'wifi0'){
                IP_ON_WIFI = iface.address
            }
            console.log(ifname, iface.address);
        }
        ++alias;
    });
});
const app = express()
const port = 5000
 app.listen(port,function () {
     console.log("<------------------------------------------------------------------------------------>")
     console.log("To open on local machine")
     console.log('http://localhost:'+port);
     console.log("<------------------------------------------------------------------------------------>")
     console.log("To open on other machine on same network")
     console.log("http://"+IP_ON_WIFI+":"+port)
 })
var environment = 'dev'
var arguments = process.argv
for (var i= 0 ; i<arguments.length ; i++){
    if(arguments[i] === 'prod'){
        environment = 'prod'
        break
    }
}

var servePath = ''
if(environment === 'prod'){
    servePath= path.join(__dirname,'/app.html')
}else{
    servePath = path.join(__dirname,'/index.html')
}
app.all('/',function (req,res) {
    res.sendFile(servePath)
})
app.all('/product/:id',function (req,res) {
    res.sendFile(servePath)
})
app.use(express.static(path.join(__dirname,'/'),{index:servePath}))


