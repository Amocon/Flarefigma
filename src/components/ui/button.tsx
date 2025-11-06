import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-[var(--flare-button-primary)] text-white hover:bg-[#2d5d16] shadow-sm",
        destructive:
          "bg-[var(--flare-button-danger)] text-white hover:bg-[#6d4a2e] shadow-sm focus-visible:ring-[var(--flare-button-danger)]/20",
        outline:
          "border-2 border-[var(--flare-button-secondary)] bg-background text-foreground hover:bg-[var(--flare-button-secondary)]/10 hover:border-[var(--flare-green-dark)]",
        secondary:
          "bg-[var(--flare-highlight)] text-[var(--flare-text)] hover:bg-[#d9b870] shadow-sm",
        ghost:
          "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-[var(--flare-green-dark)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-xl gap-1.5 px-3.5 has-[>svg]:px-3",
        lg: "h-12 rounded-xl px-7 has-[>svg]:px-5",
        icon: "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
