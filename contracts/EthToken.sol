// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Token.sol';

contract EthToken is Token {
  constructor() Token('EthToken', 'ET') {}
}
