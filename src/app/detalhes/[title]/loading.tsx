import { Skeleton } from "@/src/components/ui/skeleton";
import { GoBackButton } from "@/src/components/GoBackButton";

const DetailsShowLoading = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="bg-linear-to-r from-primary/20 to-background pt-8 pb-16">
        <div className="container mx-auto px-4">
          <header className="flex justify-between items-center mb-8">
            <GoBackButton />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
          </header>
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-12 w-64" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex mb-6 overflow-x-auto gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-32 rounded-md" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="flex gap-3 ml-9">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-16 w-full ml-9" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailsShowLoading;