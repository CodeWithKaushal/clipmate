import { _encatch } from "@encatch/web-sdk";
import { MessageSquare } from "lucide-react";
import { feedbackFormId } from "@/lib/encatch";
import { cn } from "@/lib/utils";

type GiveFeedbackButtonProps = {
  className?: string;
  showIcon?: boolean;
  onClick?: () => void;
};

export const GiveFeedbackButton = ({
  className,
  showIcon = true,
  onClick,
}: GiveFeedbackButtonProps) => {
  const handleClick = () => {
    if (!feedbackFormId) {
      console.warn("Set VITE_ENCATCH_FEEDBACK_FORM_ID in your .env file.");
      return;
    }
    _encatch.showForm(feedbackFormId);
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
      {showIcon && <MessageSquare className="h-4 w-4" aria-hidden />}
      Give Feedback
    </button>
  );
};
