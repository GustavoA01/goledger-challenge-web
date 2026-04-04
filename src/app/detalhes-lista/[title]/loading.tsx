// app/detalhes-lista/[title]/loading.tsx
import { Skeleton } from "@/src/components/ui/skeleton";
import { GoBackButton } from "@/src/components/GoBackButton";

const ListDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="bg-linear-to-r from-primary/30 to-background pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <GoBackButton />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
          </header>
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-96" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-primary/15 p-4 h-full flex flex-col gap-2 max-h-40 rounded-lg overflow-hidden border"
            >
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListDetailsLoading;