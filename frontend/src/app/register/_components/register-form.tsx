"use client"

import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/zod/schema";

import Header from "@/components/header"
import { Button } from "@/components/button"
import { SelectBox } from "./select-box"

interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
    const inputType = [
        {
            type: "text",
            name: "name",
            placeholder: "Enter your name",
            title: "Name",
        },
        {
            type: "text",
            name: "ID",
            placeholder: "Enter your ID",
            title : "ID",
        },
        {
            type: "password",
            name: "password",
            placeholder: "Enter your password",
            title: "Password",
        },
        {
            type: "password",
            name: "confirmPassword",
            placeholder: "Confirm your password",
            title: "Confirm Password",
        },
        {
            type: "email",
            name: "email",
            placeholder: "Enter your email",
            title: "Email",
        },
    ];
    const selectItemTeam = ["MUSAI", "CakeWay", "CoffeeDeal", "PhotoGround", "AngelBridge"];
    const selectItemPart = ["기획", "디자인", "프론트엔드", "백엔드"];
    const [error, setError] = useState<string | null>(null);
    // React Hook Form - zodResolver
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit", 
    });

    // 폼 제출 시 호출
    const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
        console.log("Form submitted successfully:", data)
        try {
            console.log("Form submitted successfully:", data);
            alert("회원가입 완료!"); // 실제로는 여기서 API POST 요청 등 백엔드와 연동
            // api 요청 로직.
            setError(null);
            reset();
            // /main 다이렉트 이동 로직
        } catch (err) {
            console.error(err);
            setError("에러가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-10">
            {/* Header */}
            <Header title="Register" />
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                <div className="space-y-4">
                    {inputType.map((input, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <label className="text-body1 text-grey450">{input.title}</label>
                            <input
                                {...register(input.name as keyof RegisterSchema)}
                                type={input.type}
                                placeholder={input.placeholder}
                                autoComplete="off"
                                className="px-1 py-2 w-full border-b-2 border-grey550 bg-inherit focus:outline-none focus:ring-0 focus:border-white focus:placeholder-transparent "
                            />
                            {/* 에러 메시지 */}
                            {errors[input.name as keyof RegisterSchema] && (
                                <p className="text-newRed text-sm">
                                {errors[input.name as keyof RegisterSchema]?.message as string}
                                </p>
                            )}
                        </div>
                    ))}
                    <div className="flex flex-col gap-2">
                        <label className="text-body1 text-grey450">Team / Part</label>
                        <div className="relative flex gap-10">
                            <SelectBox title={"Team"} placeholder={"Team"} items={selectItemTeam} />
                            <SelectBox title={"Part"} placeholder={"Part"} items={selectItemPart} />
                        </div>
                    </div>
                </div>
                <Button
                    type="submit"
                    variant={"primary"}
                    className="w-full p-2 text-grey350 hover:bg-grey750"
                >
                    Sign up
                </Button>
            </form>
        </div>
    )
    }