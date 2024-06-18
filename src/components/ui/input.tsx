import * as React from "react";
import InputMask, { Props as InputMaskProps, ReactInputMask } from 'react-input-mask';
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, Partial<Omit<InputMaskProps, 'mask'>> {
  mask?: string | (string | RegExp)[];
}

// Use React.ForwardedRef para aceitar ambos os tipos: HTMLInputElement e ReactInputMask
const Input = React.forwardRef<HTMLInputElement | ReactInputMask, InputProps>(
  ({ className, mask, type, ...props }, ref) => {
    if (mask) {
      // Crie uma ref interna para o InputMask
      const inputMaskRef = ref as React.MutableRefObject<ReactInputMask | null>;

      return (
        <InputMask
          mask={mask}
          type={type}
          className={cn(
            "!text-base flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={inputMaskRef}
          {...props}
        />
      );
    } else {
      return (
        <input
          type={type}
          className={cn(
            "!text-base flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref as React.Ref<HTMLInputElement>}
          {...props}
        />
      );
    }
  }
);

Input.displayName = "Input";

export { Input };
