"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Rocket } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import ThemeButton from "@/components/ui/theme/theme-button-animated"
import InstallPrompt from "@/components/PWA/install-prompt"
import useHttp from "@/hooks/useHttp"
import LinkAnimated from "@/components/ui/link-animated"
import { useAuth } from "@/components/auth/auth-provider"

const menuVariants = {
  hidden: { height: 0, transition: { when: "afterChildren" } },
  visible: {
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}
const iconVariants = {
  initial: { rotate: -90, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: 90, opacity: 0 },
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  const { req } = useHttp()

  async function handleSignOut() {
    const res = await req("/api/auth/signOut", "", "GET", {
      successToast: true,
    })
    if (!res.ok) return
    router.refresh()
  }

  const menuItems = [{ title: "About", href: "/about" }]

  return (
    <nav className="bg-background/80 fixed z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="text-primary h-8 w-8" />
            <span className="text-xl font-bold">StyxQ Stack</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            {menuItems.map((item) => (
              <LinkAnimated
                key={item.title}
                href={item.href}
                className={`${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                } transition-colors`}
              >
                {item.title}
              </LinkAnimated>
            ))}

            {user ? (
              <Button
                variant="default"
                className="w-25"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="default" className="w-25">
                    Sign In
                  </Button>
                </Link>

                <Link href="/sign-up">
                  <Button variant="outline" className="w-25">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <ThemeButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeButton />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X /> : <Menu />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden border-t md:hidden"
          >
            <div className="space-y-1 px-2 pt-2 pb-3">
              <motion.div variants={itemVariants}>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`${
                    pathname === "/"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  } block px-3 py-2 text-base font-medium transition-colors`}
                >
                  Homepage
                </Link>
              </motion.div>
              {menuItems.map((item) => (
                <motion.div key={item.title} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`${
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    } block px-3 py-2 text-base font-medium transition-colors`}
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={itemVariants}
                className="space-y-2 px-3 py-2"
              >
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button className="w-full">Sign In</Button>
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button className="w-full" variant="outline">
                    Sign Up
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <InstallPrompt />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
