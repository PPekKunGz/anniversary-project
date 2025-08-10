import { ArrowRight } from "lucide-react";
import { Button } from "../button";
import Image from "next/image";

interface NotLovedCardProps {
  onClose: () => void;
}

export default function NotLovedCard({ onClose }: NotLovedCardProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center min-h-screen p-4">
      <div className="w-[560px] h-[600px] flex flex-col items-center justify-center bg-white border-dashed border-4 border-pink-200 p-8 rounded-3xl shadow-lg">
        <div className="w-56 h-56 mb-5 rounded-md border-4 border-pink-300">
          <Image
            src="/bg.jpg"
            alt="logo"
            width={256}
            height={256}
            className="w-full h-full object-cover rounded-md" />
        </div>
        <div className="flex flex-col items-center gap-3 mb-2">
          <p className="text-center text-pink-600/50 text-2xl font-medium">
            You didn't love me, I know it's hard, but I promise you'll do better next time!
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <Button isName="Try Again" icon={ArrowRight} onClick={onClose} color="primary" />

        </div>
      </div>
    </div>
  );
}
