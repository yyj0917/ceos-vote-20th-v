"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

export function ProgressBar({ value }: { value: number }) {
  const [progress, setProgress] = useState(33)

  useEffect(() => {
    setProgress(value);
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}
