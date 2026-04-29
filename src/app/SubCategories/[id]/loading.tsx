import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      {/* header skeleton */}
      <Skeleton className="w-full h-[204px]" />

      <div className="w-11/12 m-auto mt-7">
        {/* filters skeleton */}
        <div className="flex items-center gap-2 mb-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-32 rounded-full" />
        </div>
        <Skeleton className="h-4 w-36 mb-5" />

        {/* grid skeleton */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="w-full aspect-square rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
