"use client";
import Navbar from "./Components/Navbar";

export default function Home() {
  
  const openchat = () => {
    window.location.href = '/Aichat';
  }

  return (
    <main className="flex min-h-screen flex-col  ">
      
      <Navbar/>
    </main>
  );
}
