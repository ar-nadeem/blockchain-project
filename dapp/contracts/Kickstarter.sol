pragma solidity >=0.4.22 <0.8.20;
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
    event ProjectFunded(uint projectId, uint amount);
    
    function createProject(uint _targetAmount, uint _deadline) public {
        uint projectId = numProjects++;
        projects[projectId] = Project(msg.sender, _targetAmount, 0, block.timestamp + _deadline, false);
        emit ProjectCreated(projectId, msg.sender, _targetAmount, block.timestamp + _deadline);
    }
    
    function contribute(uint _projectId) public payable {
        Project storage project = projects[_projectId];
        require(block.timestamp < project.deadline, "Project deadline passed");
        require(!project.funded, "Project already funded");
        
        project.contributions[msg.sender] += msg.value;
        project.currentAmount += msg.value;
        
        emit ProjectFunded(_projectId, msg.value);
    }
    
    function withdrawFunds(uint _projectId) public {
        Project storage project = projects[_projectId];
        require(project.owner == msg.sender, "Only project owner can withdraw funds");
        require(project.funded, "Project not yet funded");
        require(block.timestamp >= project.deadline, "Deadline not yet passed");
        
        payable(msg.sender).transfer(project.currentAmount);
        project.currentAmount = 0;
    }
    
    function withdrawContribution(uint _projectId) public {
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
