import { type ClassNameValue } from "tailwind-merge";
import { twMerge } from "tailwind-merge";

const clx = (...args: ClassNameValue[]): string => {
  return twMerge(args);
};

export { clx };
