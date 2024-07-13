import React from "react";
import { io } from "socket.io-client";

const id = "http://localhost:5000";

const socket = io(id);

export default function App() {
  return <div className=" text-4xl font-serif ">Addy</div>;
}
