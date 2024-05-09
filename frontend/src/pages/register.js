import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import LoginForm from "../components/auth/LoginForm";

const register = () => {
  return (
    <div
      className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] 
    overflow-hidden
    "
    >
      {/* Container */}
      <div className="flex w-[1900px] mx-auto h-full">
        {/* Register Form  */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default register;
