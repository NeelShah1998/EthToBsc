const EthToken = artifacts.require('./EthToken.sol');

module.exports = async done => {
  const [sender, _] = await web3.eth.getAccounts();
  const ethToken = await EthToken.deployed();
  const balance = await ethToken.balanceOf(sender);
  console.log(balance.toString());
  done();
}
