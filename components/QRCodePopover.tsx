"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, QrCode } from "lucide-react";
import QRCode from "react-qr-code";

interface QRCodePopupButtonProps {
  link: string;
  mode?: "text" | "icon";
  label?: string;
}

export default function QRCodePopupButton({
  link,
  mode = "text",
  label = "Show QR Code",
}: QRCodePopupButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {mode === "text" ? (
          <Button variant="outline">{label}</Button>
        ) : (
          <Button variant="outline" size="icon">
            <QrCode className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-4">
      <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Below is the code for the link.
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 border-2 rounded">
            <QRCode value={link} size={160} />
        </div>
        <div className="flex items-center gap-2 max-w-fit">
          <Input value={link} readOnly />
          <Button onClick={handleCopy} size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        {copied && <p className="text-green-600 text-sm">Link copied!</p>}
      </DialogContent>
    </Dialog>
  );
}
