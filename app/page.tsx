"use client";

import { HeroSection } from "@/components/hero-section";
import { motion } from "motion/react";
// import { useState, useEffect } from "react";
// import { createClient } from "@/lib/supabase/client";

export default function Home() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const supabase = createClient();

  // useEffect(() => {
  //   let mounted = true;
  //   supabase.auth
  //     .getUser()
  //     .then(({ data: { user } }) => {
  //       if (mounted) setIsAuthenticated(!!user);
  //     })
  //     .catch((err) => console.error("Error fetching user:", err));

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     if (mounted) setIsAuthenticated(!!session?.user);
  //   });

  //   return () => {
  //     mounted = false;
  //     subscription.unsubscribe();
  //   };
  // }, [supabase]);

  // useEffect(() => {
  //   const subscribe = async () => {
  //     await subscribeToPush();
  //   };
  //   subscribe().catch((err) => console.log(err));
  // });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="from-primary via-background to-background flex min-h-screen flex-col bg-gradient-to-br"
    >
      <HeroSection />
    </motion.div>
  );
}
