import { Skeleton } from "@/src/components/ui/skeleton"
import { Header } from "@/src/components/Header"

const HomeLoading = () => (
  <div>
    <Header />
    <main className="container mx-auto p-4 mt-24">
      <div className="flex gap-2 mb-6">
        <Skeleton className="w-full h-10 sm:w-20" />
        <Skeleton className="w-full h-10 sm:w-20" />
      </div>

      <div className="flex-col max-sm:space-y-4 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
)

export default HomeLoading
