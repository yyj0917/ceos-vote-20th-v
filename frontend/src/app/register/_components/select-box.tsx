import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectBoxProps = {
    placeholder: string
    items: string[]
    value?: string;  // 현재 선택값
    onValueChange?: (value: string) => void; // 선택 변경 콜백
}


export function SelectBox({ placeholder, items, value, onValueChange} : SelectBoxProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {items.map((item, index) => (
                <SelectItem key={index} value={item}>{item}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
