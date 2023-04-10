import cn from "classnames";
import { CSSProperties, FC, memo } from "react";

const iconNames = [
  "3rd-web",
  "external",
  "mascot",
  "wid-human",
  "worldcoin",
] as const;

export type IconType = typeof iconNames[number];

type Props = {
  className?: string;
  noMask?: boolean;
  testId?: string;
} & ({ name: IconType; path?: never } | { name?: never; path: string });

const Icon: FC<Props> = ({ noMask, className, testId, path, name }) => {
  return (
    <span
      className={cn(
        "icon inline-block pointer-events-none",

        {
          "bg-current": !noMask,
          "no-mask": noMask,
        },

        className
      )}
      {...(testId && { "data-testid": testId })}
      role="icon"
      style={
        {
          "--image": `url("${path ?? `/icons/${name}.svg`}")`,
        } as CSSProperties
      }
    />
  );
};

export default memo(Icon);
