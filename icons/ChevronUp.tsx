import { clx } from "../lib/utils";

export function ChevronUp({ className = "", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={clx("", className)}
      {...props}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}
