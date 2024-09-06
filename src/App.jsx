import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Components/Airdrop";
import ShowSolBalance from "./components/Components/ShowSolBalance";
import SendTokens from "./components/Components/SendTokens";
import SignMessage from "./components/Components/SignMessage";



function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider
      endpoint={
        "https://solana-devnet.g.alchemy.com/v2/TZhI9DZqvhXLlGmmHgExySU4UpGJOcjU"
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="bg-gray-500 md:h-screen p-10 md:p-20 w-full flex items-center justify-center flex-col">
            <div>
              <h1 className="text-4xl py-10 text-white font-serif text-center">Paras Solana Adapter</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:justify-between align-middle items-center text-center w-full">
              <WalletMultiButton />
              <br />
              <WalletDisconnectButton />
            </div>

            <div className="flex align-middle items-center justify-center text-center w-full">
              <Airdrop />
            </div>

            <div className="w-full py-10 flex justify-center">
              <ShowSolBalance  />
            </div>

            <div className="w-full py-10 flex justify-center">
              <SendTokens />
            </div>

            <div className="w-full py-10 flex justify-center">
              <SignMessage />
            </div>
            
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App

