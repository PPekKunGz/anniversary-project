"use client"

import { useState } from "react"
import QuestionCard from "../components/question-card"
import MainCard from "@/components/main-card"

export default function HomePage() {
  const firstDate = new Date('2025-04-11');
  const currentDate = new Date();

  const [isOpen, setIsOpen] = useState(false);

  // คำนวณจำนวนเดือนที่คบกัน
  const yearDiff = currentDate.getFullYear() - firstDate.getFullYear();
  const monthDiff = currentDate.getMonth() - firstDate.getMonth();

  let totalMonths = yearDiff * 12 + monthDiff;
  if (currentDate.getDate() < firstDate.getDate()) {
    totalMonths -= 1;
  }
  if (totalMonths < 0) totalMonths = 0;

  // คำนวณจำนวนวันเกินจากเดือนเต็ม
  let extraDays = currentDate.getDate() - firstDate.getDate();
  if (extraDays < 0) {
    // หาเลขวันของเดือนก่อนหน้า
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    extraDays = prevMonth.getDate() + extraDays;
  }

  return (
    <div className="relative h-screen w-screen bubblegum-sans-regular">
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center blur z-0" />
      {isOpen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <QuestionCard />
        </div>
      )}

      {!isOpen && (
        <MainCard
          onClose={() => setIsOpen(true)}
          startDate={firstDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          monthsTogether={totalMonths}
          extraDays={extraDays}
        />
      )}
    </div>
  )
}
