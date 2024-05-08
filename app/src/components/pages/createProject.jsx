import React from "react";
import Metamask from "../buttons/metamask";
import SignUp from "../buttons/signup";
import SignIn from "../buttons/signin";
import RawButton from "../buttons/rawButton";
import { Separator } from "@/components/ui/separator"
import {createNewProject } from "@/contractCalls";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
export default function CreateProject() {


  let navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState("");
  


  
  return (
    <div className='bg-black h-screen w-full '>
      <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
      <div className="flex flex-col justify-center items-center">
    <button 
      onClick={() => navigate('/')} 
      className='md:text-9xl text-5xl font-sans font-semibold text-white flex justify-center items-center pt-20'
    >
      Kickstarter
      
    </button>
    </div>
            <Separator className="my-5"/>

       

        <div className="flex justify-center pt-10">
        <Metamask />
        </div>
        <div className="flex flex-col gap-4">
        <div className="flex justify-center pt-10 gap-5">
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Amount in ETH" 
             onChange={(e)=>setAmount(e.target.value)}
             />
              <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Time in seconds" 
             onChange={(e)=>setTime(e.target.value)}
             />
              <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Title" 
             onChange={(e)=>setTitle(e.target.value)}
             />

        </div>
        <RawButton title="Submit" func={()=>{createNewProject(amount,time,title); toast.success("Project created")}} />
        </div>
      
    </div>
  );
}