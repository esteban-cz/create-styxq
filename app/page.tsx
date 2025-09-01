"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TextLoop } from "@/components/ui/text-loop"
import ResponsiveSlider from "@/components/ui/responsive-slider"
import ResponsiveTilt from "@/components/ui/responsive-tilt"
import { motion } from "motion/react"
import { GlowEffect } from "@/components/ui/glow-effect"
import LinkAnimated from "@/components/ui/link-animated"

export default function Home() {
  return (
    <div className="py-16">
      <section className="from-primary/10 via-background to-background relative overflow-hidden bg-gradient-to-b">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 0.8, y: 0 },
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
            <LinkAnimated className="mb-8 text-4xl font-bold sm:text-6xl">
              Next.js Starter
            </LinkAnimated>
            <br />
            <TextLoop
              className="overflow-y-clip"
              transition={{
                type: "spring",
                stiffness: 900,
                damping: 80,
                mass: 10,
              }}
              variants={{
                initial: {
                  y: 20,
                  rotateX: 90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
                animate: {
                  y: 0,
                  rotateX: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                },
                exit: {
                  y: -20,
                  rotateX: -90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
              }}
            >
              <span className="text-primary">Text Primary</span>
              <span className="text-secondary">Text Secondary</span>
              <span className="text-muted">Text Muted</span>
              <span className="text-accent">Text Accent</span>
              <span className="text-destructive">Text Destructive</span>
              <span className="text-success">Text Success</span>
            </TextLoop>
            <TextLoop
              className="ml-8 overflow-y-clip"
              transition={{
                type: "spring",
                stiffness: 900,
                damping: 80,
                mass: 10,
              }}
              variants={{
                initial: {
                  y: 20,
                  rotateX: 90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
                animate: {
                  y: 0,
                  rotateX: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                },
                exit: {
                  y: -20,
                  rotateX: -90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
              }}
            >
              <span className="bg-primary text-primary-foreground">
                Bg Primary
              </span>
              <span className="bg-secondary text-secondary-foreground">
                Bg Secondary
              </span>
              <span className="bg-muted text-muted-foreground">Bg Muted</span>
              <span className="bg-accent text-accent-foreground">
                Bg Accent
              </span>
              <span className="bg-destructive text-destructive-foreground">
                Bg Destructive
              </span>
              <span className="bg-success text-success-foreground">
                Bg Success
              </span>
            </TextLoop>
            <div className="flex justify-center">
              <ResponsiveSlider
                speedOnHover={20}
                speed={40}
                gap={20}
                className="mt-8 max-w-lg"
              >
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </ResponsiveSlider>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-background flex justify-center text-center">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 0.8, y: 0 },
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-24 lg:px-8">
            <ResponsiveTilt rotationFactor={8}>
              <div className="relative mx-auto h-full w-full max-w-full">
                <GlowEffect
                  colors={["#6203fc", "#C959DD", "#7f03fc", "#df03fc"]}
                  mode="rotate"
                  blur="medium"
                />
                <div className="relative h-full w-full rounded-lg">
                  <Image
                    src="/img/banner.png"
                    width={600}
                    height={300}
                    title="Next.js Starter"
                    alt="Next.js Starter"
                    priority={true}
                    className="h-auto w-auto rounded-lg"
                  />
                </div>
              </div>
            </ResponsiveTilt>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
