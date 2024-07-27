"use client"

import { signUpSchema, SignUpValues } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignUpForm() {
    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        
        },
    })

    async function onSubmit(value: SignUpValues){
        console.log(value)
    }
    return (
        <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
             <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="username" {...field} />
                    </FormControl>
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                        <Input placeholder="email" {...field} />
                    </FormControl>
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Entrer votre mot de passe..." {...field} />
                    </FormControl>
                </FormItem>
              )}
              />
              <Button type="submit" className="w-full rounded-full">Inscrire</Button>
           </form>
        </Form>

    )
}