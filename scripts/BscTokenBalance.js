const BscToken = artifacts.require('./BscToken.sol');

module.exports = async done => {
  const [recipient, _] = await web3.eth.getAccounts();
  const bscToken = await BscToken.deployed();
  const balance = await bscToken.balanceOf(recipient);
  console.log(balance.toString());
  done();
}
