import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function requestAirdrop() {
    let amount = document.getElementById("amount").value;
    await connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
  }

  return (
    <div className="flex flex-col md:flex-row items-center w-[50%] pt-10">
      <br />
      <Input className="flex w-[200%] justify-around" id="amount" type="text" placeholder="Amount" />
      <br />
      <Button onClick={requestAirdrop}>Request Airdrop</Button>
    </div>
  );
};

export default Airdrop;
