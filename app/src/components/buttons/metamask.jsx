import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSDK } from "@metamask/sdk-react";

export default function Metamask() {
    const [account, setAccount] = useState();
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        console.log(connected)
        try {
        const accounts = await sdk?.connect();
        setAccount(accounts?.[0]);
        } catch (err) {
        console.warn("failed to connect..", err);
        }
    };
  return (
    <Button className="p-5" variant={connected ? "destructive" : ''} onClick={connect}>
        
      
      {connected ? (
          <div className="text text-xl">
            Connected !
          </div>
      ):
      <div className="text text-xl">
        
        Connect to Metamask

      
      </div>}
    </Button>
  );
}