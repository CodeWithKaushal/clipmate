interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "h-7 w-7" }: LogoProps) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="6"
      y="4"
      width="20"
      height="24"
      rx="4"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
    />
    <rect
      x="11"
      y="2"
      width="10"
      height="4"
      rx="1.5"
      fill="hsl(var(--primary))"
    />
    <path
      d="M17 12L13 19h4l-1 5 5-8h-4l1-4z"
      fill="hsl(var(--highlight))"
      stroke="hsl(var(--highlight))"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);
