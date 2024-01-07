'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import Joi from "joi"
import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import { toast } from "@/components/ui/use-toast"
import { signOut, useSession } from "next-auth/react"


export default function ChangePassword({ cls }) {

    const { data: session } = useSession()


    const schema = Joi.object({

        oldPassword: Joi.string()
            .required()
            .messages({
                "string.empty": `Password cannot be empty`,
                "any.required": `Password is required`,
            }),
        newPassword: Joi.string()
            .min(8)
            .required()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .messages({
                "string.empty": `Password cannot be empty`,
                "string.min": "Password length must be at least 8 characters long ",
                "any.required": `Password is required`,
                "string.pattern.base": `Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be eight characters long`,
            }),

    });
    //Instantiate React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: joiResolver(schema),
    });


    const [loading, setLoading] = useState(false)
    const handleChange = async (data) => {
        if (!data?.oldPassword || !data?.newPassword) return
        try {
            const response = await fetch(`api/changePassword`, {
                method: "POST",
                body: JSON.stringify({ oldPassword: data.oldPassword, newPassword: data.newPassword, email: session?.user?.email  }),
                cache: "no-store",
            });
            const result = await response.json()

            if (response.ok) {
                toast({
                    variant: "success",
                    title: 'Success',
                    description: 'password updated successfully,Please re login',
                })
                signOut({ redirect: true, callbackUrl: 'http://localhost:3000/login' })
            }
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: 'Error!',
                    description: (response.status === 400 || 404) ? result.message : "Something went wrong",
                })

            }
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: 'Error!',
                description: 'Something went wrong',
            })
        }
        finally {
            setLoading(false)
        }

    }





    return (
        <Dialog className=''>
            <DialogTrigger asChild>
                <Button className={cls} variant="outline">Change Password</Button>
            </DialogTrigger>
            <DialogContent id='changePasswordForm' className="w-[360px] sm:w-[425px] ">
                <DialogHeader>
                    <DialogTitle>Change your password</DialogTitle>
                    <DialogDescription>
                        Please ennter your old and new password
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(handleChange)} >

                    <div className="flex justify-center items-center gap-2">
                        <Label htmlFor="oldPassword" className="shrink-0 grow">
                            Old Password
                        </Label>
                        <div className="w-[200px] sm:w-[260px]">
                            <Input
                                className="w-[200px] sm:w-[260px] h-[43px] hover:bg-[#f1f5f9] focus:bg-[#f1f5f9]
                    focus:border-[1px] border-[1px] focus:outline-none "
                                id="oldPassword"
                                type="password"
                                {...register("oldPassword")}

                            />
                            {errors.oldPassword && (
                                <span className="text-red-600 text-xs max-w-sm">
                                    {errors.oldPassword.message}
                                </span>
                            )}

                        </div>

                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <Label htmlFor="newPassword" className="shrink-0 grow">
                            New Password
                        </Label>
                        <div className="w-[200px] sm:w-[260px]">
                            <Input
                                className="w-[200px] sm:w-[260px] h-[43px] hover:bg-[#f1f5f9] focus:bg-[#f1f5f9]
                 focus:border-[1px] border-[1px] focus:outline-none"
                                id="newPassword"
                                type="password"
                                {...register("newPassword")}

                            />
                            {errors.newPassword && (
                                <span className="text-red-600 text-xs max-w-sm">
                                    {errors.newPassword.message}
                                </span>
                            )}

                        </div>
                    </div>
                    <Button className="relative" onClick={handleChange} variant={'default'} type="submit" disabled={loading}>
                        <>
                            Change

                            {loading &&
                                <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                                    <div class="border-t-transparent border-solid animate-spin  rounded-full border-white border-[3px] h-6 w-6"></div>
                                </div>
                            }
                        </>
                    </Button>

                </form>

            </DialogContent>
        </Dialog>
    )
}