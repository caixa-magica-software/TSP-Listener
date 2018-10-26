const Web3 = require('web3');
const lightwallet = require('eth-lightwallet');
const txutils = lightwallet.txutils;
const contract = require('truffle-contract');
const util = require('util');
const tx = require('ethereumjs-tx');
const meta_info = require('./definition.json');
const interface_abi = meta_info.abi;
const storeTSP = require('./storeTSP');
//wss://mainnet.infura.io/ws
//wss://rinkeby.infura.io/ws
const rinkeby_ws = "wss://rinkeby.infura.io/ws";
let provider = new Web3.providers.WebsocketProvider(rinkeby_ws);
let web3 = new Web3(provider);
let address_wallet;
let contract_addr;
let econtract;

function initListener() {
  address_wallet =  meta_info.wallet_adress;
  contract_addr = meta_info.contract_adress;
  econtract = new web3.eth.Contract(interface_abi, contract_addr);
  console.log('Starting listener events...');

  addedDocumentEvent();
}

// Event return addedDocument after just call method!!
function addedDocumentEvent() {
  econtract.events.AddedDocument({
    fromBlock: 5424000,
    address: '<address>',
    toBlock: 'latest'
  }, function (err, result) {
    console.log('EVENT: AddedDocument was called');
    console.log('VALUES ->> ', result.returnValues);

    if (err) {
      console.error('ERROR Invoke contracts: ', err);

    } else {
      if (result !== undefined) {
        console.log('Will call storeTSP.');
      }
    }
  });
}

initListener();

let interval =  setInterval(function() {
  provider = null;
  console.log('WS closed');
  console.log('Attempting to reconnect...');
  provider = new Web3.providers.WebsocketProvider(rinkeby_ws);
  console.log('WSS Reconnected');
  web3.setProvider(provider);
  initListener();
}, 1000 * 60 * 10);
