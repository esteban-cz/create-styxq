"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { signUpSchema, type SignUpData } from "@/validation/signUpSchema";
import useHttp from "@/hooks/useHttp";
import { motion } from "motion/react";
import { PasswordInput } from "@/components/ui/password-input";
import { LoadingButton } from "@/components/ui/button-loading";
import { Lock, Mail, User } from "lucide-react";
import LinkAnimated from "@/components/ui/link-animated";

export default function SignUpSection() {
  const { req, loading } = useHttp();
  const router = useRouter();

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", surname: "", email: "", password: "" },
    mode: "onChange",
  });

  async function onSubmit(data: SignUpData) {
    // try {
    //   await req("/api/auth/signUp", data);
    //   toast.success("Successfully signed up! You can now sign in.");
    //   router.push("/sign-in");
    // } catch (err: any) {
    //   if (err.status === 409) {
    //     toast.error(
    //       <span>
    //         {err.message}!
    //         <br />
    //         Please sign in instead.
    //       </span>,
    //       {
    //         action: {
    //           label: "Sign In",
    //           onClick: () => router.push("/sign-in"),
    //         },
    //       },
    //     );
    //   } else {
    //     toast.error(err.message || "Sign up failed.");
    //   }
    // }
    const res = await req("/api/auth/signUp", data, "POST", {
      successToast: true,
    });
    if (!res.ok) return;
    router.push("/sign-in");
    router.refresh();
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-background/10 py-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card className="w-[600px] p-8">
            <div className="mb-8 text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <User className="text-primary h-6 w-6" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Create an account</h1>
              <p className="text-muted-foreground">
                With this account you will gain access to client portal.
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 items-start gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Joe" type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Surname</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                          <Input
                            aria-invalid={!!fieldState.error}
                            type="email"
                            placeholder="jan.novak@email.cz"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                          <PasswordInput
                            aria-invalid={!!fieldState.error}
                            id="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <LoadingButton
                  disabled={!form.formState.isValid}
                  loading={loading}
                  type="submit"
                  className="w-full"
                >
                  Submit
                </LoadingButton>
              </form>
            </Form>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <LinkAnimated href="/sign-in" className="text-primary">
                Sign in
              </LinkAnimated>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
