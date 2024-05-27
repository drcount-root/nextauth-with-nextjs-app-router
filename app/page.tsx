import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Login from "@/components/Login";

export default async function Home() {
  const session: any = await getServerSession(authOptions);
  if (session?.status === "authenticated") redirect("/protected");
  return (
    <div>
      <Login />
    </div>
  );
}
