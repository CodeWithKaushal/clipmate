import { _encatch } from "@encatch/web-sdk";
import { Mail } from "lucide-react";
import { contactFormId } from "@/lib/encatch";
import { cn } from "@/lib/utils";

type ContactUsButtonProps = {
  className?: string;
  showIcon?: boolean;
  onClick?: () => void;
};

export const ContactUsButton = ({
  className,
  showIcon = true,
  onClick,
}: ContactUsButtonProps) => {
  const handleClick = () => {
    if (!contactFormId) {
      console.warn("Set VITE_ENCATCH_CONTACT_FORM_ID in your .env file.");
      return;
    }
    _encatch.showForm(contactFormId);
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary hover:-translate-y-0.5",
        className
      )}
    >
      {showIcon && <Mail className="h-4 w-4" aria-hidden />}
      Contact Us
    </button>
  );
};
