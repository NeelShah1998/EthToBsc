const EthBridge = artifacts.require('./EthBridge.sol');

const privateKey = '';

module.exports = async done => {
  const nonce = 1;
  const accounts = await web3.eth.getAccounts();
  const ethBridge = await EthBridge.deployed();
  const amount = 100;
  const message = web3.utils.soliditySha3(
    { t: 'address', v: accounts[0] },
    { t: 'address', v: accounts[0] },
    { t: 'uint256', v: amount },
    { t: 'uint256', v: nonce },
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message,
    privateKey
  );
  await ethBridge.burn(accounts[0], amount, nonce, signature);
  done();
}
