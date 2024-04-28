import { ethers } from "ethers";
import ABI from "./ABI.json";
const contractAddress = '0x89B44dEe5a8291394f7c40bB8D4Aa3Ed0B094Ea6';

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


async function createNewProject(amount,timestamp) {
    try {
        const contract  = await init();
        const result = await contract.createProject(amount,timestamp); // Remove .call(), ethers.js doesn't require it for read-only functions
        
        console.log('Result from contract method: ', result.toString()); // Convert BigNumber to string for display
        return result.toString();
    } catch (error) {
        console.error('Error calling contract method: ', error);
    }
}

async function contribute(projectID,price) {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const priceString = price.toString()
        // Request permission to connect MetaMask account
        // const params = [
        //     {
        //       from: account,
        //       to: contractAddress,
        //       // 30400
        //       gas: "0x76c0",
        //       // 10000000000000
        //       gasPrice: "0x9184e72a000",
        //       // 2441406250
        //       value: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(priceString))
        //       ,
        //     },
        //   ];
          
        // const sign = await window.ethereum.request({
        //     method: "eth_sendTransaction",
        //     params,
        //   })
      
        
        // Initialize the contract
        const contract = await init();
        
        // Call the contribute function on the contract
        const result = await contract.contribute(projectID, { value: ethers.BigNumber.from(price) });
        
        // Log and return the result
        console.log('Result from contract method: ', result.toString());
        return result.toString();
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
        return result.toString();
    } catch (error) {
        console.error('Error calling contract method: ', error);
    }
} 


export { getTotalProjects,createNewProject,contribute,getProject };