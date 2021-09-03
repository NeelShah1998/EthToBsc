// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ebToken {
  function mint(address to, uint amount) external;
  function burn(address owner, uint amount) external;
}
