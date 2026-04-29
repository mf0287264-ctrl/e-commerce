import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-13 animate-spin", className)}
      {...props}
    />
  );
}

export default function loading() {
  return (
    <div className="flex items-center gap-4 justify-center h-dvh">
      <div className="flex flex-col justify-center items-center gap-1">
        <Spinner className="text-green-500 " />
        <span className="text-xl text-green-500">Loaing product</span>
      </div>
    </div>
  );
}
