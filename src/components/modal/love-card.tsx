"use client"
import { ArrowRight } from "lucide-react";
import { Button } from "../button";
import { useEffect, useState } from "react";

interface LovedCardProps {
  onClose: () => void;
}

export default function LovedCard({ onClose }: LovedCardProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);


  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center min-h-screen p-4 ">
      <div className="w-[560px] h-max flex flex-col items-center justify-center bg-white border-dashed border-4 border-pink-200 p-8 rounded-3xl shadow-lg">
        <div className="flex flex-col items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-pink-600/70">I Love You Too!</h1>
          <p className="text-center text-pink-600/50 text-lg font-medium">
            Thank you for loving me, I will cherish you forever.
          </p>
        </div>
        <div className="flex flex-col w-full h-[400px] border-4 rounded-3xl">
          <div className="flex flex-col items-start gap-4 p-4 overflow-y-scroll scrollbar-hide">
            <p className="text-start text-pink-600/50 text-lg font-medium" style={{ whiteSpace: "pre-line" }}>
              {message || "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <Button isName="Close" icon={ArrowRight} onClick={onClose} color="primary" />
        </div>
      </div>
    </div>
  );
}
