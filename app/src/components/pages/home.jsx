import React from "react";
import Metamask from "../buttons/metamask";
import SignUp from "../buttons/signup";
import SignIn from "../buttons/signin";
import RawButton from "../buttons/rawButton";
import { Separator } from "@/components/ui/separator"
import { getProjects,getTotalProjects,contribute,withdraw } from "@/contractCalls";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function Home() {

  
  let navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const contract = await getTotalProjects();
      setTotalProjects(contract);
      
      
    };
    init();
  }, []);
  useEffect(() => {
    const init = async () => {
      await getAllProjects();
      
      
    };
    init();
  }, [totalProjects]);
  
  const handleContribute = (index, amount) => {
    setAmount(amount);
  };


  async function getAllProjects(){
    let newProjects = []; // Create a new array to accumulate projects

      for (let i = 0; i < totalProjects; i++) {
        const projects = await getProjects(i);
        let parts = projects.split(",");
        let j = {
          owner: parts[0],
          amount_required: parts[1],
          ammount: parts[2],
          timestamp: parts[3],
          funded: parts[4],
          title: parts[5]
        };
        newProjects.push(j);
        
    }
      setProjects(newProjects);
      console.log(projects);
  }
  function getTimeRemaining(timestamp) {
    // Current time in milliseconds
    const currentTime = new Date().getTime();
    
    // Convert timestamp to milliseconds
    const targetTime = new Date(timestamp * 1000).getTime();
    
    // Calculate the difference in milliseconds
    const difference = targetTime - currentTime;
    
    // Calculate remaining days, hours, minutes, and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  
  // Example usage:
  const timestamp = 1715187173; // Example timestamp
  const remainingTime = getTimeRemaining(timestamp);
  console.log(remainingTime);

  return (
    <div className='bg-black h-screen w-full'>
      <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
      <div onClick={()=>{navigate('/')}} className='md:text-9xl text-5xl font-sans font-semibold text-white flex justify-center items-center pt-20'>
        Kickstarter
        </div>
      
        <Separator className="my-5" />

       

        <div className="flex justify-center pt-10">
        <Metamask />
        </div>

        <div className="flex flex-col gap-4">
        <div className="flex justify-center pt-10 gap-5">
          <RawButton title="Create Project" func={()=>{navigate('/createProject')}} />

          <div>
          <div className="text-white text-2xl">Total Projects: {totalProjects}</div>
          </div>

            {/* <RawButton title="Get total projects" func={()=>{getTotalProjects()}} />
            <RawButton title="Create new Project" func={()=>{createNewProject(1,10000,"Test Project")}} />
            <RawButton title="Contribute" func={()=>{contribute(0,1)}} />
            <RawButton title="Get Project" func={()=>{getProject(0)}} />
            <RawButton title="Withdraw" func={()=>{withdraw(0)}} /> */}


        </div>
        <div className="flex gap-3 ">
        {projects.map((project, index) => (
                <Card key={index} className="bg-gray-600">
                <CardHeader>
                <CardTitle className="text-white">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-white text-xl">{(project.amount_required)/1000000000000000000} Eth</p>
                </CardContent>
                <CardContent>
                <p className="text-white text-xl">{(project.ammount)/1000000000000000000} Eth - funded</p>
                </CardContent>
                <CardContent>
                <p className="text-white text-xl">{`
                ${getTimeRemaining(project.timestamp).days < 0 ? 0 : getTimeRemaining(project.timestamp).days} Days
                 ${getTimeRemaining(project.timestamp).hours < 0 ? 0: getTimeRemaining(project.timestamp).hours} Hours
                 ${getTimeRemaining(project.timestamp).minutes < 0 ? 0: getTimeRemaining(project.timestamp).minutes} Minutes
                 ${getTimeRemaining(project.timestamp).seconds < 0 ? 0: getTimeRemaining(project.timestamp).seconds} Seconds`
                 }</p>
                </CardContent>
                <CardFooter>
                <p className="text-white text-xl">{`${project.funded == 'false' ? 'Project not yet fully funded' : 'Project Funded'}`}</p>
                </CardFooter>
                <div>
                <input type="text" 
                className=" bg-gray-600 border border-gray-300 text-white text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount in ETH"
                onChange={(e) => handleContribute(index, e.target.value)} 
                >

                </input>
                <div className="flex flex-row gap-3">
                <RawButton title="Contribute" func={async ()=>{

                  const result = await contribute(index,amount);
                  if (result) {
                  toast.success("Contribution made");
                  }
                  else {
                  toast.error("Contribution Failed");
                  }

                  }} />
                  
                <RawButton title="Withdraw all" func={async ()=>{

                    const result = await withdraw(index,amount);
                    if (result) {
                    toast.success("Withdrawn made");
                    }
                    else {
                    toast.error("Withdrawn Failed");
                    }
                  
                  }} />
                  </div>
                </div>
                
                </Card>
        ))}
          </div>
        </div>
        {/* <div className="flex justify-center pt-10 gap-5">
        <SignIn />
        <SignUp />
        </div> */}
      
    </div>
  );
}