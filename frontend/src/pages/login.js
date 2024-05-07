import React from "react";
import LoginForm from "../components/auth/LoginForm";

const login = () => {
  return (
    <div
      className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] 
overflow-hidden
"
    >
      {/* Container */}
      <div className="flex w-[1900px] mx-auto h-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default login;
