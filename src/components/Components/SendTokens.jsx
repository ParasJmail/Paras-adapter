import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {Buffer} from 'buffer';
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SendTokens() {
  const wallet = useWallet();
  const { connection } = useConnection();
  window.Buffer = Buffer;

  async function sendTokens() {
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;
    const transaction = new Transaction();
    
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
    alert("Sent " + amount + " SOL to " + to);
  }

  return (
    <div className="flex flex-col items-center w-[100%] md:w-[50%]">
      <div className="flex w-full flex-col md:flex-row ">
      <Input className="w-[100%] md:w-[200%] " id="to" type="text" placeholder="To" />
      <br />
      <Input id="amount" type="text" placeholder="Amount" />
      </div>
      
      <br />
      <div>
      <Button className="flex w-fit text-center items-center" onClick={sendTokens}>Send</Button>
      </div>
    </div>
  );
}


