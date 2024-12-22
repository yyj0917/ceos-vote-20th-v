"use client";

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/style';

const buttonVariants = cva(
  'transition inline-flex items-center justify-center whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:
          'text-body1 text-grey450 bg-grey650 w-auto h-[36px] px-3 py-[5px] rounded-[24px]',
        secondary:
          'bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        link:
          'text-body2 text-grey550 w-auto h-[24px]'
        
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4 py-2 text-[13px]',
        lg: 'h-11 px-8 text-[13px]',
        icon: 'h-9 w-9',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    // active function


    return <Comp 
            className={cn(buttonVariants({ variant, size, className }),
            )} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
