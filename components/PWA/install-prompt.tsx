"use client";

import { Bell, PlusSquare, Share } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { subscribeToPush } from "@/lib/push";
import { useRouter } from "next/navigation";

export default function InstallPrompt() {
  const router = useRouter();
  const [isIOS, setIsIOS] = useState(false);
  const [hasSub, setHasSub] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  useEffect(() => {
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setHasSub(!!sub))
      .catch(console.error);
  }, []);

  const onSubscribe = async () => {
    try {
      await subscribeToPush();
      setHasSub(true);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert("Could not subscribe: " + err.message);
    }
  };

  if (isStandalone && !hasSub) {
    return (
      <>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={onSubscribe}
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-4"
          >
            <Bell className="h-4 w-4" />
            <span>Allow notifications</span>
          </Button>
        </div>
      </>
    );
  } else if (isStandalone && hasSub) {
    return null;
  }

  if (isIOS) {
    return (
      <>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => setShowAlert(true)}
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-4"
          >
            <PlusSquare className="h-4 w-4" />
            <span>Add to Home Screen</span>
          </Button>
        </div>
        <Dialog open={showAlert} onOpenChange={setShowAlert}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">How to Install</DialogTitle>
              <DialogDescription className="flex items-center justify-center space-x-1 text-center text-[0.8rem]">
                <span>Tap</span>
                <Share className="text-primary" size={16} />
                <span>then</span>
                <PlusSquare className="text-primary" size={16} />
                <span>to add to Home Screen</span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button onClick={() => setShowAlert(false)}>Got it</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
