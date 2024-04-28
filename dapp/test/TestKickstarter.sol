pragma solidity >=0.4.22 <= 0.8.25;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Kickstarter.sol";
contract TestKickstarter {
    Kickstarter kickstarter = Kickstarter(DeployedAddresses.Kickstarter());



    // Create a project
    function testCreateProject() public {
        kickstarter.createProject(100, block.timestamp + 3600);
        uint expected = 1;
        Assert.equal(kickstarter.numProjects(), expected, "Number of projects should be 1");
    }

    // // Contribute to a project
    // function testGetContractBalanceAfter() public {
    //     uint expected = 1;

    //     kickstarter.createProject(expected, block.timestamp + 3600);
    //     Assert.equal(kickstarter.numProjects(), 2, "Project ID should be 2");
        
    // }


    // 
}