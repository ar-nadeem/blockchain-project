import { ethers } from "ethers";
import ABI from "./ABI.json";
const contractAddress = '0xf64e096f2a0ccE686626219d59cc5EA849abA88A';

const init = async () => {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545"); // Assuming Ganache is running on default port
    const contractABI = ABI; // Replace YOUR_CONTRACT_ABI with the actual ABI

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log('Connected Account: ', account);
        const signer = provider.getSigner(account);
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        // const result = await contract.numProjects(); // Remove .call(), ethers.js doesn't require it for read-only functions
        
        // console.log('Result from contract method: ', result.toString()); // Convert BigNumber to string for display
        return contract;
    } catch (error) {
        console.error('Error Creating contract method: ', error);
    }
}; 


async function getTotalProjects() {
    try {
        const contract  = await init();
        const result = await contract.numProjects(); // Remove .call(), ethers.js doesn't require it for read-only functions
        
        console.log('Result from contract method: ', result.toString()); // Convert BigNumber to string for display
        return result.toString();
    } catch (error) {
        console.error('Error calling contract method: ', error);
    }
}


async function createNewProject(amount,timestamp,title) {
    const overrides = {
        gasLimit: 300000 // Set an appropriate gas limit here
    };
    try {
        const contract  = await init();
        const valueInWei = ethers.utils.parseEther(amount.toString());

        const result = await contract.createProject(valueInWei.toBigInt(),timestamp,title,overrides); // Remove .call(), ethers.js doesn't require it for read-only functions
        
        console.log('Result from contract method: ', result.toString()); // Convert BigNumber to string for display
        return result;
    } catch (error) {
        console.error('Error calling contract method: ', error);
    }
}

async function contribute(projectID,price) {
    try {
        
        // Initialize the contract
        const contract = await init();
        
        // Call the contribute function on the contract
        const valueInWei = ethers.utils.parseEther(price.toString());
        const result = await contract.contribute(projectID, { value: valueInWei });
        
        // Log and return the result
        console.log('Result from contract method: ', result.toString());
        // Listen to the ContributionMade event
        contract.on("contributedEvent", (contributor, projectId, amount) => {
            console.log(`${contributor} has contributed ${amount} wei to project ${projectId}.`);
            // Update the activity tab or UI with this information
        });

        return result;
    } catch (error) {
        console.error('Error calling contract method: ', error);
        return null; // Return null or handle error as needed
    }
} 

async function getProject(projectID) {
      
    try {
        const contract  = await init();
        const result = await contract.projects(projectID,); // Remove .call(), ethers.js doesn't require it for read-only functions
        
        console.log('Result from contract method: ', result.toString()); // Convert BigNumber to string for display
        return result;
    } catch (error) {
        console.error('Error calling contract method: ', error);
    }
} 

async function withdraw(projectID) {
    try {
        const contract = await init();
        const overrides = {
            gasLimit: 300000 // Set an appropriate gas limit here
        };
        const result = await contract.withdrawFunds(projectID, overrides);
        console.log('Result from contract method: ', result.toString());
        
        // Listen to the FundsWithdrawn event
        contract.on("FundsWithdrawn", (recipient, amount) => {
            console.log(`${recipient} has withdrawn ${amount} wei.`);
            // Display this information in your UI or update the activity tab
        });

        return result;
    } catch (error) {
        console.error('Error calling contract method: ', error);
    }
}



export { getTotalProjects,createNewProject,contribute,getProject,withdraw };