import { getServerSession } from "next-auth";
import Navbar from "./Navbar";
import Buttons from "./Buttons";
import { AuthOption } from "@/server/auth";

export default async function Header() {
  const initialSession = await getServerSession(AuthOption);
  return (
    <header className="py-4 md:py-6">
      <div className="flex justify-between items-center container">
        <Navbar initialSession={initialSession} />
        <Buttons initialSession={initialSession} />
      </div>
    </header>
  );
}
