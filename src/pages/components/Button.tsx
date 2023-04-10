import cn from "classnames";
import {
  FC,
  memo,
  ReactNode,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

type Variant = "default" | "flat";
type Size = "default" | "small";

type ButtonBaseProps = {
  children?: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type LinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

const getClassNames = (className?: string, variant?: Variant, size?: Size) => {
  variant = variant || "default";
  size = size || "default";

  return cn(
    "rounded-full",
    {
      "bg-f68d60 text-white ": variant === "default",
      "border border-e4cba4 bg-f9edd6 text-black": variant === "flat",
    },
    {
      "text-sm md:text-base px-8 py-4 md:px-10 md:py-6": size === "default",
      "py-1.5 px-3 md:py-2 md:px-5 text-sm": size === "small",
    },
    className
  );
};

export const Link = memo(
  ({ className, variant, size, children, ...props }: LinkProps) => (
    <a {...props} className={getClassNames(className, variant, size)}>
      {children}
    </a>
  )
);
Link.displayName = "Link";

const Button: FC<ButtonProps> = ({
  className,
  variant,
  size,
  children,
  ...props
}) => (
  <button {...props} className={getClassNames(className, variant, size)}>
    {children}
  </button>
);

export default memo(Button);
