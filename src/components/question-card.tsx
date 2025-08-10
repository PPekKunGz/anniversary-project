import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import { useState } from "react";
import NotLovedCard from "./modal/notlove-card";
import LovedCard from "./modal/love-card";

export default function QuestionCard() {
  const [isLoved, setIsLoved] = useState(false);
  const [isNotLoved, setIsNotLoved] = useState(false);

  const handleLoveClick = () => {
    setIsNotLoved(false);
    setIsLoved(true);
  };

  const handleNotLoveClick = () => {
    setIsLoved(false);
    setIsNotLoved(true);
  };

  return (
    <>
      {isLoved && <LovedCard onClose={() => setIsLoved(false)} />}
      {isNotLoved && <NotLovedCard onClose={() => setIsNotLoved(false)} />}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-[560px] h-[600px] flex flex-col items-center justify-center bg-white/40 border-dashed border-4 border-pink-200 p-8 rounded-3xl shadow-lg">
          <div className="w-full h-full mb-5 rounded-md border-4 border-pink-300">
            <Image
              src="/bg.jpg"
              alt="logo"
              width={256}
              height={256}
              className="w-full h-full object-cover rounded-md" />
          </div>
          <div className="flex flex-col items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-pink-600">Do you lovee me?</h1>
            <p className="text-center text-pink-600/50 text-lg font-medium -translate-y-2">
              I lovee you, and I will always do so.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button isName="Lovee" icon={ArrowRight} onClick={handleLoveClick} color="primary" />
            <Button isName="Not Lovee" icon={ArrowRight} onClick={handleNotLoveClick} color="secondary" />
          </div>
          <button className="w-full mt-4" onClick={() => window.location.reload()}>Close</button>


        </div>
      </div>
      </>

  );
}
