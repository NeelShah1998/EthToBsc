const EthToken = artifacts.require('EthToken.sol');
const BscToken = artifacts.require('BscToken.sol');
const EthBridge = artifacts.require('EthBridge.sol');
const BscBridge = artifacts.require('BscBridge.sol');

module.exports = async function (deployer, network, addresses) {
  if (network === 'rinkby') {
    await deployer.deploy(EthToken);
    const ethToken = await EthToken.deployed();
    await ethToken.mint(addresses[0], 10000);
    await deployer.deploy(EthBridge, ethToken.address);
    const ethBridge = await EthBridge.deployed();
    await ethToken.updateAdmin(ethBridge.address);
  }
  if (network === 'bsc') {
    await deployer.deploy(BscToken);
    const bscToken = await BscToken.deployed();
    await deployer.deploy(BscBridge, bscToken.address);
    const bscBridge = await BscBridge.deployed();
    await bscToken.updateAdmin(bscBridge.address);
  }
};
