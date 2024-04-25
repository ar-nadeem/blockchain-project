pragma solidity >=0.4.22 <0.8.20;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Balance.sol";

contract TestBalance {
    Balance balance = Balance(DeployedAddresses.Balance());

    // Testing the getAddressBalance() function
    function testGetAddressBalance() public {
        address testAdderess = 0xE6fD0fcb31D10364C19C4479f14609d96a419228;
        uint expected = 100000000000000000000;
        Assert.equal(balance.getAddressBalance(testAdderess), expected, "Owner should have 100 Eth balance initially");
    }
}