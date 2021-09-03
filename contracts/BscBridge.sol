// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Bridge.sol';

contract BscBridge is BridgeBase {
  constructor(address token) BridgeBase(token) {}
}
