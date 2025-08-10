"use client";

import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonProps {
    isName?: string;
    onClick?: () => void;
    icon?: LucideIcon;
    href?: string;
    color?: "primary" | "secondary";
}

export function Button({ isName, onClick, icon: Icon, href, color = "primary" }: ButtonProps) {
    const router = useRouter();

    const clickHandler = () => {
        if (onClick) onClick();
        if (href) router.push(href);
    };

    return (
        <div className="w-full">
            <div className="flex justify-center">
                <button
                    onClick={clickHandler}
                    className={`w-40 animate-pulse bg-pink-400/70 hover:bg-pink-500 text-white font-medium py-3 px-8 rounded-3xl transition-colors duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 ${
                        color === "primary" ? "bg-pink-400/70" : "bg-teal-500/70"
                    }`}
                >
                    {isName}
                    {Icon && <Icon size={20} />}
                </button>
            </div>
        </div>
    );
}