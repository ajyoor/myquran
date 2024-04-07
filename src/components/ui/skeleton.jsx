import { cn } from "@/lib/utils";

function Skeleton({ className, fill = 1, ...props }) {
  let html = (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
  return new Array(fill).fill(html).map((item) => {
    return item;
  });
}

export { Skeleton };
