const Web3 = require('web3');
const EthBridge = require('../build/contracts/EthBridge.json');
const BscBridge = require('../build/contracts/BscBridge.json');

const web3Eth = new Web3('wss://rinkeby.infura.io/ws/v3/6b1a3efd3fd449c8963456ff05fcbd76');
const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const adminPrivKey = '';
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);

const ethBridge = new web3Eth.eth.Contract(
  EthBridge.abi,
  EthBridge.networks['4'].address
);

const bscBridge = new web3Bsc.eth.Contract(
  BscBridge.abi,
  BscBridge.networks['97'].address
);

ethBridge.events.Transfer(
  { fromBlock: 0, step: 0 }
)
  .on('data', async event => {
    const { from, to, amount, date, nonce, signature } = event.returnValues;

    const tx = bscBridge.methods.mint(from, to, amount, nonce, signature);
    const [gasPrice, gasCost] = await Promise.all([
      web3Bsc.eth.getGasPrice(),
      tx.estimateGas({ from: admin }),
    ]);
    const data = tx.encodeABI();
    const txData = {
      from: admin,
      to: bscBridge.options.address,
      data,
      gas: gasCost,
      gasPrice
    };
    const receipt = await web3Bsc.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
    - nonce ${nonce}
  `);
  });
