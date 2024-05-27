"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomButton from "./Utils/CustomButton";

const Login = () => {
  const router = useRouter();
  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      const res: any = await signIn("credentials", {
        email: "john@gmail.com",
        password: "1234",
        redirect: false,
      });
      console.log(res, "res");
      if (res?.error) {
        console.log(res?.error, "errro");
        return;
      }
      router.replace("/protected");
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
      <div>
        <div>
          <div>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
          <div>
            <CustomButton
              handleClick={handleClick}
              containerStyles="bg-black text-center h-10 px-16 rounded-lg text-white"
              title="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
