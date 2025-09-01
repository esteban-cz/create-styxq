"use client";

import { ArrowUp, Twitter, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useMobile";
import Link from "next/link";
import DynamicIcon from "@/components/ui/dynamic-icon";
import LinkAnimated from "@/components/ui/link-animated";

type ContactInfo = {
  id: number;
  icon: string;
  title: string;
  detail: string;
  description: string;
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  const handleContactClick = (info: ContactInfo) => {
    switch (info.title) {
      case "Email":
        window.location.href = `mailto:${info.detail}`;
        break;
      case "Phone":
        if (isMobile) {
          window.location.href = `tel:${info.detail}`;
        } else {
          navigator.clipboard
            .writeText(info.detail)
            .then(() => toast.success("Phone number copied!"))
            .catch(() => toast.error("Copy failed"));
        }
        break;
      case "Location": {
        const loc = info.detail;
        const url = isMobile
          ? `geo:0,0?q=${encodeURIComponent(loc)}`
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`;
        window.open(url, "_blank");
        break;
      }
      case "Live Chat":
        // implement live chat
        break;
    }
  };

  useEffect(() => {
    const contacts: ContactInfo[] = [
      {
        id: 1,
        icon: "Mail",
        title: "Email",
        detail: "contact@styxq.dev",
        description: "Send us an email",
      },
      {
        id: 2,
        icon: "Phone",
        title: "Phone",
        detail: "+1 (555) 123-4567",
        description: "Call or text us",
      },
      {
        id: 3,
        icon: "MapPin",
        title: "Location",
        detail: "San Francisco, CA",
        description: "Our location",
      },
    ];

    setContactInfo(contacts);
    setLoading(false);
  }, []);

  return (
    <footer className="from-background/80 to-background/100 border-t bg-gradient-to-b backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex min-h-[280px] flex-col md:min-h-[220px] md:flex-row md:items-start md:justify-between">
          {/* Left Column: Contact Info Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {},
            }}
            className="flex flex-col items-center gap-6 text-center md:max-w-xs md:items-start"
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col items-center gap-1 md:flex-row md:items-center md:gap-3"
              >
                <div className="bg-primary/10 rounded-full p-2 shadow">
                  <DynamicIcon
                    name={info.icon}
                    className="text-primary h-6 w-6"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-muted-foreground text-xs font-semibold uppercase">
                    {loading ? "Loading..." : info.title}
                  </span>
                  <LinkAnimated
                    onClick={() => handleContactClick(info)}
                    className="text-primary"
                  >
                    {loading ? "Loading..." : info.detail}
                  </LinkAnimated>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Scroll + Social Icons */}
          <div className="mt-8 flex flex-1 flex-col md:mt-0 md:flex-none md:items-end">
            <div className="flex justify-center md:justify-end">
              <Button
                onClick={scrollToTop}
                size="icon"
                variant="ghost"
                className="group border-primary/30 bg-background/70 rounded-full border shadow-lg"
              >
                <ArrowUp className="transition-transform group-hover:scale-125" />
              </Button>
            </div>

            {/* Spacer to push socials to bottom */}
            <div className="flex" />

            <div className="mt-8 flex justify-center space-x-8 md:mt-40 md:justify-end">
              <Link
                href="https://twitter.com/YourProfile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="hover:text-primary h-6 w-6 transition-colors" />
              </Link>
              <Link
                href="https://github.com/YourRepo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="hover:text-primary h-6 w-6 transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com/in/YourProfile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="hover:text-primary h-6 w-6 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-muted-foreground mt-8 text-center text-sm">
          © {new Date().getFullYear()} Create StyxQ. All rights reserved.
        </div>
        <div className="text-muted-foreground mt-2 flex justify-center space-x-4 text-sm">
          <LinkAnimated href="/privacy" className="text-primary mt-2">
            Privacy Policy
          </LinkAnimated>
          <span className="mt-2 cursor-default">|</span>
          <LinkAnimated href="/terms" className="text-primary mt-2">
            Terms of Service
          </LinkAnimated>
        </div>
      </div>
    </footer>
  );
}
