"use client";

import { useState } from "react";
import { FiCheck, FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  className?: string;
  placeholder?: string;
  submitLabel?: string;
  note?: string;
}

/** Newsletter capture. UI-only for now — wires to the backend later. */
export function NewsletterForm({
  className,
  placeholder = "Enter your email",
  submitLabel = "Subscribe",
  note,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: POST to newsletter endpoint when backend is connected.
    setDone(true);
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          disabled={done}
          className={cn(
            "h-11 w-full rounded-lg border border-border bg-background px-4 text-sm",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        />
        <Button type="submit" variant={done ? "secondary" : "primary"} className="shrink-0">
          {done ? (
            <>
              <FiCheck className="h-4 w-4" /> Sent
            </>
          ) : (
            <>
              {submitLabel} <FiSend className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {done ? (
        <p className="mt-2 text-xs text-success">Thanks! You&apos;re on the list for exclusive deals.</p>
      ) : (
        note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>
      )}
    </form>
  );
}
