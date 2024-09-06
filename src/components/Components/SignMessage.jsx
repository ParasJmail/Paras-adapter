import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SignMessage = () => {
    const { publicKey, signMessage } = useWallet();

    const onClick = async () => {
      if (!publicKey) {
        alert("Wallet not connected!");
        return;
      }
      if (!signMessage) {
        alert("Wallet does not support message signing!");
        return;
      }
  
      const message = document.getElementById("message").value;
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);
  
      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        alert("Message signature invalid!");
        return;
      }
      alert(`Message signature: ${bs58.encode(signature)}`);
    };

  return (
    <div className="flex flex-col items-center w-[100%]">
      <Input className="w-[100%]" id="message" type="text" placeholder="Message" />
      
      <div className="pt-5">
      <Button className="" onClick={onClick}>Sign Message</Button>

      </div>
    </div>
  )
}

export default SignMessage
