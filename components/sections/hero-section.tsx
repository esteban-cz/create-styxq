"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/10 mx-auto flex h-24 w-24 items-center justify-center rounded-full"
          >
            <Rocket className="text-primary h-12 w-12" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold tracking-tight md:text-6xl"
          >
            Build Fast & Modern
            <span className="text-primary"> Web Applications</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground mx-auto max-w-2xl text-xl"
          >
            This Next.js starter kit is designed to help you kickstart your web
            development projects with ease. Whether you're building a personal
            blog, a portfolio, or a complex web application, this starter
            provides the tools and structure you need to succeed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link href="/sign-up">
              <Button size="lg" className="group w-40">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="w-40">
                Read More
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-muted-foreground pt-8"
          >
            <p className="font-medium">
              Trusted by leading companies worldwide
            </p>
            <div className="mt-4 flex justify-center gap-8 opacity-60 grayscale">
              {/* Add company logos here */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
