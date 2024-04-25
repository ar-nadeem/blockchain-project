pragma solidity >=0.4.22 <0.8.20;

contract Balance {
    // Function to get the balance of a specific address
    function getAddressBalance(address _address) public view returns (uint) {
        return _address.balance;
    }

}
