"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { set } from "react-hook-form"

export function ProgressBar({ value }: { value: number }) {
  const [progress, setProgress] = React.useState(33)

  React.useEffect(() => {
    setProgress(value);
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}
