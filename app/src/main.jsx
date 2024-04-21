import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MetaMaskProvider } from "@metamask/sdk-react";

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
