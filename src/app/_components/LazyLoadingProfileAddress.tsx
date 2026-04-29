import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export function LazyLoadingProfileAddress() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">My Addresses</h1>
          <p className="text-sm font-normal leading-5 text-[#6A7282]">
            Manage your saved delivery addresses
          </p>
        </div>

        <Button
          disabled={true}
          className="bg-green-600 shadow-md shadow-[#16A34A40] hover:bg-green-700 transition duration-200 text-white font-semibold rounded-xl h-11 w-40 flex items-center justify-center gap-1 cursor-pointer"
        >
          <Spinner />
          Add Address
        </Button>
        {/* Modal */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-10">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
