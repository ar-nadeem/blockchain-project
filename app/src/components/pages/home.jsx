import React from "react";
import Metamask from "../buttons/metamask";
import SignUp from "../buttons/signup";
import SignIn from "../buttons/signin";
import RawButton from "../buttons/rawButton";
import { Separator } from "@/components/ui/separator"
import { getTotalProjects,createNewProject,contribute,getProject,withdraw } from "@/contractCalls";

export default function Home() {



  
  


  
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
            <RawButton title="Get total projects" func={()=>{getTotalProjects()}} />
            <RawButton title="Create new Project" func={()=>{createNewProject(1,10000,"Test Project")}} />
            <RawButton title="Contribute" func={()=>{contribute(0,1)}} />
            <RawButton title="Get Project" func={()=>{getProject(0)}} />
            <RawButton title="Withdraw" func={()=>{withdraw(0)}} />


        </div>
        {/* <div className="flex justify-center pt-10 gap-5">
        <SignIn />
        <SignUp />
        </div> */}
      
    </div>
  );
}