"use client"
import { ArrowRight } from "lucide-react";
import { Button } from "../components/button";
import Image from "next/image";

interface MainCardProps {
    onClose: () => void;
    startDate: string;
    monthsTogether: number;
    extraDays: number;
}

export default function MainCard({ onClose, startDate, monthsTogether, extraDays }: MainCardProps) {

    return (
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <div className="w-[560px] h-[600px] flex flex-col items-center justify-center bg-white/40 border-dashed border-4 border-pink-200 p-8 rounded-3xl shadow-lg">
                <div className="w-56 h-56 mb-5 rounded-md border-4 border-pink-300 overflow-hidden">
                    <Image
                        src="/bg.jpg"
                        alt="logo"
                        width={256}
                        height={256}
                        className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="mb-4 tracking-widest flex flex-col items-center justify-center gap-2 text-center">
                    <h1 className="text-pink-500 uppercase [text-shadow:_0_4px_8px_rgba(236_72_153_/_0.5)] text-3xl font-bold">
                        Happy Anniversary, My Love
                    </h1>
                    <span className="text-pink-800/70 [text-shadow:_0_4px_8px_rgba(236_72_153_/_0.5)] text-lg">
                        we have been together for {monthsTogether} months and {extraDays} days
                    </span>
                    <span className="text-pink-800/70 [text-shadow:_0_4px_8px_rgba(236_72_153_/_0.5)] text-lg">
                        we started on {startDate}
                    </span>
                    <span className="text-pink-800/30 [text-shadow:_0_4px_8px_rgba(236_72_153_/_0.5)] text-lg">
                        I will always love you more than words can say
                    </span>
                </div>
                <Button isName="Get Started" icon={ArrowRight} onClick={() => onClose()} />
                <h1 className="text-black/20 uppercase text-sm font-medium mt-2">Click the button below to get started</h1>
            </div>
        </div>
    );
}
