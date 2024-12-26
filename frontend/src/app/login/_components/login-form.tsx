"use client"

import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Header from "@/components/header"
import { Button } from "@/components/button"
import { LoginSchema, loginSchema } from "@/lib/zod/schema"
import { zodResolver } from "@hookform/resolvers/zod"

interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function LoginForm() {
    const inputType = [
        {
            type: "text",
            name: "ID",
            placeholder: "Enter your ID",
            title: "ID",
        },
        {
            type: "password",
            name: "password",
            placeholder: "Enter your password",
            title: "Password",
        },
    ];
    
    const [error, setError] = useState<string | null>(null);
    // React Hook Form - zodResolver
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit", 
    });

    // 폼 제출 시 호출
    const onSubmit: SubmitHandler<LoginSchema> = (data) => {
        console.log("login submitted successfully:", data)
        try {
            console.log("Form submitted successfully:", data);
            alert("로그인 완료!"); // 실제로는 여기서 API POST 요청 등 백엔드와 연동
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
        <div className="w-full h-full flex flex-col gap-40">
            {/* Header */}
            <Header title="Login" />
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20">
                <div className="space-y-4">
                    {inputType.map((input, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <label className="text-body1 text-grey450">{input.title}</label>
                            <input
                                {...register(input.name as keyof LoginSchema)}
                                type={input.type}
                                placeholder={input.placeholder}
                                autoComplete="off"
                                className="px-1 py-2 w-full border-b-2 border-grey550 bg-inherit focus:outline-none focus:ring-0 focus:border-white focus:placeholder-transparent "
                            />
                            {/* 에러 메시지 */}
                            {errors[input.name as keyof LoginSchema] && (
                                <p className="text-newRed text-sm">
                                {errors[input.name as keyof LoginSchema]?.message as string}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <Button
                    type="submit"
                    variant={"primary"}
                    className="w-full p-2 text-white hover:bg-grey750"
                >
                    Sign up
                </Button>
            </form>
        </div>
    )
    }