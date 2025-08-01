"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { signInSchema, type SignInData } from "@/validation/signInSchema";
import useHttp from "@/hooks/useHttp";
import { toast } from "sonner";
import { motion } from "motion/react";
import { PasswordInput } from "@/components/ui/password-input";
import { LoadingButton } from "@/components/ui/button-loading";
import { Lock, Mail } from "lucide-react";
import LinkAnimated from "@/components/ui/link-animated";

export default function SignInPage() {
  const { req, loading } = useHttp();
  const router = useRouter();

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  async function onSubmit(data: SignInData) {
    try {
      await req("/api/auth/signIn", data);
      toast.success("Welcome back!");
      router.push("/");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Sign in failed.");
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-background/10 py-20">
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
                <Lock className="text-primary h-6 w-6" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">
                Sign in to your account
              </h1>
              <p className="text-muted-foreground">
                Sign in to you account to access portal for clients.
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                            placeholder="you@example.com"
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
                  type="submit"
                  loading={loading}
                  disabled={!form.formState.isValid}
                  className="w-full"
                >
                  Sign In
                </LoadingButton>
              </form>
            </Form>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <LinkAnimated href="/sign-up" className="text-primary">
                Sign up
              </LinkAnimated>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
