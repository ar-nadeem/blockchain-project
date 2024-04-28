pragma solidity >=0.4.22 <= 0.8.25;

contract Kickstarter {
    struct Project {
        address owner;
        uint targetAmount;
        uint currentAmount;
        uint deadline;
        bool funded;
        mapping(address => uint) contributions;
    }
    
    mapping(uint => Project) public projects;
    uint public numProjects;
    
    event ProjectCreated(uint projectId, address owner, uint targetAmount, uint deadline);
    event ProjectRemoved(uint projectId);
    event contributedEvent(uint amount);
    event senderEvent(address sender);
    event contractEvent(address contractAddress);
    
    function getCurrentAmount(uint projectId) public view returns (uint) {
        return projects[projectId].currentAmount;
    }


    function createProject(uint _targetAmount, uint _deadline) public {
        emit senderEvent(msg.sender);
        emit contractEvent(address(this));
        uint projectId = numProjects++;
        Project storage newProject = projects[projectId];
        newProject.owner = msg.sender;
        newProject.targetAmount = _targetAmount;
        newProject.deadline = block.timestamp + _deadline;
        newProject.funded = false;
        emit ProjectCreated(projectId, msg.sender, _targetAmount, block.timestamp + _deadline);
    }
    
    function contribute(uint _projectId) public payable {
        // Send balance from sender to Contract
        Project storage project = projects[_projectId];
        require(block.timestamp < project.deadline, "Project deadline passed");
        require(!project.funded, "Project already funded");
        

        // Ensure some ether is sent with the transaction
        require(msg.value > 0, "No ether sent with the transaction");


        project.contributions[msg.sender] += msg.value;
        project.currentAmount += msg.value;
        emit contributedEvent(msg.value);

    }
    
    function withdrawFunds(uint _projectId) public {
        // Send Balance from contract to project owner
        Project storage project = projects[_projectId];
        require(project.owner == msg.sender, "Only project owner can withdraw funds");
        require(project.funded, "Project not yet funded");
        require(block.timestamp >= project.deadline, "Deadline not yet passed");
        
        address payable owner = payable(msg.sender);
        owner.transfer(project.currentAmount);
        project.currentAmount = 0;

        
    }
    
    function withdrawContribution(uint _projectId) public {
        // Send balance from contract to sender

        Project storage project = projects[_projectId];
        require(block.timestamp >= project.deadline, "Deadline not yet passed");
        require(!project.funded, "Project already funded");
        
        uint amount = project.contributions[msg.sender];
        require(amount > 0, "No contribution to withdraw");
        
        payable(msg.sender).transfer(amount);

        project.currentAmount -= amount;
        project.contributions[msg.sender] = 0;
    }
}
