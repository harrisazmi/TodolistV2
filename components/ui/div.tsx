import { clx } from "@/lib/utils";
import * as React from "react";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Div({ children, className, ...props }: DivProps) {
  return (
    <div
      className={clx(
        "flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
