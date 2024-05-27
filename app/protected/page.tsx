"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/Utils/CustomButton";

const ProtectedPage = () => {
  const { status, data }: any = useSession();
  console.log(data, "data");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status]);

  const handleClick = (e: any) => {
    signOut();
  };

  return (
    <div>
      <div>
        <CustomButton
          handleClick={handleClick}
          containerStyles="bg-teal text-center h-10 px-16 rounded-lg text-white"
          title="Logout`"
        />
      </div>
    </div>
  );
};

export default ProtectedPage;
