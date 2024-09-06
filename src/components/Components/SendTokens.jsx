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
    <div className="flex flex-col items-center">
      <div className="flex w-full">
      <Input id="to" type="text" placeholder="To" />
      <Input id="amount" type="text" placeholder="Amount" />
      </div>
      
      <br />
      <div>
      <Button className="flex w-fit text-center items-center" onClick={sendTokens}>Send</Button>
      </div>
    </div>
  );
}


