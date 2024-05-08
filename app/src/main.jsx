import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MetaMaskProvider } from "@metamask/sdk-react";

// if (typeof web3 !== 'undefined') {
//   App.web3Provider = web3.currentProvider;
//   web3 = new Web3(web3.currentProvider);
// } else {
//   // If no injected web3 instance is detected, fallback to Ganache.
//   App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
//   web3 = new Web3(App.web3Provider);
// }
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Kickstarter",
          url: window.location.href,
        },
        // Other options.
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>,
)
