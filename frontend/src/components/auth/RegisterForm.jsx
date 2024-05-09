import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import AuthInput from "../auth/AuthInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../features/userSlice.js";
import { useState } from "react";
import Picture from "./Picture.jsx";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit = async (data) => {
    let res = await dispatch(registerUser({ ...data, picture: "" }));
    if (res.payload.user) {
      navigate("/");
    }
  };
  // console.log(picture, readablePicture);
  // console.log("values", watch());
  // console.log("errors", errors);
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/**Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/**Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back,</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/*  FORM */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="password"
            register={register}
            error={errors?.password?.message}
          />

          {/* Picture  */}
          <Picture
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setPicture={setPicture}
          />

          {/* if we have Error  */}
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}

          {/**Submit Button */}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full 
          tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer 
          transition-all ease-in duration-300"
            type="submit"
          >
            {status == "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign up"
            )}
          </button>
          {/**Sign in link */}

          <p
            className="flex gap-2 items-center justify-center mt-10 text-center text-md
          dark:text-dark_text_1"
          >
            <span>have an account ? </span>

            <Link
              to="/login"
              className=" hover:underline cursor-pointer transition ease-in duration-800"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
