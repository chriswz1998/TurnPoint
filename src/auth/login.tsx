import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useFetch from "@/lib/use-http.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
    email: z.string().min(2, {
        message: "email is required.",
    }),
    password: z.string().min(4, {
        message: "password is required.",
    })
})

export const Login = () => {
    const { loading, fetchData } = useFetch();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const res = await fetchData<z.infer<typeof FormSchema>,{ access_token: string }>('auth/login', 'POST', data)
        if (res && res.access_token) {
            localStorage.setItem('access_token', res?.access_token); // 存储 access_token
            toast.success('Login successfully!');
            navigate("/upload");
            //TODO 在login增加用户信息返回
        }
    }


    return (
        <div className='flex w-full h-full sm:bg-custom-bg md:bg-custom-bg lg:bg-none'>
            <div className='w-1/2 sm:bg-white md:bg-white max-w-[800px] mx-auto p-6 flex flex-col items-center justify-center'>
                <img src='../../public/logoipsum-351.svg' alt='Logo' />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} type="submit" className='w-full'>Submit</Button>
                    </form>
                </Form>
            </div>
            <div className='w-full h-full flex flex-col items-center justify-center sm:hidden md:hidden lg:block bg-custom-bg bg-cover bg-center' />
        </div>
    )
}
