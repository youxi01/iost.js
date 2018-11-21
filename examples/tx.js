'use strict';

const IOST = require('../iost/iost');
const KeyPair = require('../lib/crypto/key_pair');
const bs58 = require('bs58');

// init iost sdk
let iost = new IOST({ // 如果不设置则使用default配置来发交易
    gasPrice: 100,
    gasLimit: 100000,
    delay:0,
});


let account = "abc";
let kp = new KeyPair(bs58.decode('1rANSfcRzr4HkhbUFZ7L1Zp69JZZHiDDq5v7dNSbbEqeU4jxy3fszV4HGiaLQEyqVpS1dKT9g7zCVRxBVzuiUzB'));

iost.setPublisher(account, kp);


// send a call
let handler = iost.callABI("iost.token", "transfer", ["iost", "form", "to", "1000.000"]);

handler
    .onPending(console.log)
    .onSuccess(console.log)
    .onFailed(console.log)
    .send()
    .listen(); // 如果不listen的话，可以自行操作，这时只有onPending或onFailed可能被call

// query iost rpc
iost.rpc.getTxByHash("abc");
