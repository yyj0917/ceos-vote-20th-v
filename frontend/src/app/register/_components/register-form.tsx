"use client"

import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler, useController } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/zod/schema";

import Header from "@/components/header"
import { Button } from "@/components/button"
import { SelectBox } from "./select-box"
import { RegisterAPI } from "@/lib/api/auth";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";


export default function RegisterForm() {
    const inputType = [
        {
            type: "text",
            name: "username",
            placeholder: "Enter your name",
            title: "Name",
        },
        {
            type: "text",
            name: "loginId",
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
    const selectItemTeam = ["PHOTO_GROUND", "CAKE_WAY", "COFFEE_DEAL", "PEDAL_GENIE", "ANGEL_BRIDGE"];
    const selectItemPart = ["FRONT", "BACK"];
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast(); // useToast 훅 사용

    // useEffect(() => {
    //     if (error) {
    //       toast({
    //         variant: "destructive",
    //         title: "Error",
    //         description: error,
    //         action: <ToastAction altText="Try again">{error}</ToastAction>,
    //       });
    //     }
    //   }, [error, toast]);

    // React Hook Form - zodResolver
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit", 
    });

    // team 필드 제어 - custom component 별도 제어
    const {
        field: teamField,
        fieldState: { error: teamError },
    } = useController({
        name: "team",
        control,
        rules: { required: "팀을 선택하세요" },
    });

    // part 필드 제어 - custom component 별도 제어
    const {
        field: partField,
        fieldState: { error: partError },
    } = useController({
        name: "part",
        control,
        rules: { required: "파트를 선택하세요" },
    });

    // 폼 제출 시 호출
    const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {

        const requestPayload = {
            loginId: data.loginId,
            password: data.password,
            email: data.email,
            username: data.username,
            part: data.part,  // 동일하면 그대로 전달
            team: data.team,  // 동일하면 그대로 전달
          };
        try {
            const response = await RegisterAPI(requestPayload);

            // api 요청 로직.
            setError(null);
            reset();
            alert("회원가입이 완료되었습니다.");
            window.location.href = "/";
            // /main 다이렉트 이동 로직
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;

                // 409 중복된 이메일 & 아이디 에러 처리
                if (status === 409) {
                    setError(err.response?.data.message);
                    toast({
                        variant: "destructive",
                        title: "중복된 정보",
                        description: error,
                        action: <ToastAction altText="다시 시도">Try again</ToastAction>,
                      });
                    return;
                }
            }

        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-10">
            {/* Header */}
            <Header title="Register" />
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                <div className="flex flex-col justify-between gap-4">
                    {inputType.map((input, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <label className="flex items-center gap-8 text-body1 text-grey450">
                                <span>{input.title}</span>
                                {errors[input.name as keyof RegisterSchema] && (
                                <p className="text-newRed text-sm">
                                {errors[input.name as keyof RegisterSchema]?.message as string}
                                </p>
                            )}
                            </label>
                            <input
                                {...register(input.name as keyof RegisterSchema)}
                                type={input.type}
                                placeholder={input.placeholder}
                                autoComplete="off"
                                className="px-1 py-2 w-full text-grey450 border-b-2 border-grey550 bg-inherit focus:outline-none focus:ring-0 focus:border-white focus:placeholder-transparent "
                            />
                            {/* 에러 메시지 */}
                            
                        </div>
                    ))}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-8 text-body1 text-grey450">
                            <span>Team / Part</span>
                            {errors[teamField.name as keyof RegisterSchema] && (
                                <p className="text-newRed text-sm">
                                {errors[teamField.name as keyof RegisterSchema]?.message as string}
                                </p>
                            )}
                        </label>
                        <div className="relative flex gap-10">
                            <SelectBox
                                value={teamField.value}
                                onValueChange={teamField.onChange}
                                placeholder={"Team"} items={selectItemTeam} />

                            <SelectBox
                                value={partField.value}
                                onValueChange={partField.onChange}
                                placeholder={"Part"} items={selectItemPart} />

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