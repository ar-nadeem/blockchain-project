import React from "react";
import Metamask from "../buttons/metamask";
import SignUp from "../buttons/signup";
import SignIn from "../buttons/signin";
import RawButton from "../buttons/rawButton";
import { Separator } from "@/components/ui/separator"
import { ethers } from "ethers";
import ABI from "./ABI.json";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545"); // Assuming Ganache is running on default port


export default function Home() {
  const contractAddress = '0xEB393613Eff6030A99b5958b0A54A41C2007E54A';
  const contractABI = ABI;
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  
  return (
    <div className='bg-black h-screen w-full'>
      <div className='md:text-9xl text-5xl font-sans font-semibold text-white flex justify-center items-center pt-20'>
        Kickstarter
        </div>
        <Separator className="my-5" />

       

        <div className="flex justify-center pt-10">
        <Metamask />
        </div>

        <div className="flex justify-center pt-10 gap-5">
            <RawButton title="Create a new project" func={()=>{console.log("hello")}} />
        </div>
        {/* <div className="flex justify-center pt-10 gap-5">
        <SignIn />
        <SignUp />
        </div> */}
      
    </div>
  );
}