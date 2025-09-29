import { Skeleton } from "./ui/skeleton"

const LoadingSkeletion = () => {
  return (
      <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
                <Skeleton className="h-[150px] w-full" />
                <Skeleton className="h-[150px] w-full" />
                <Skeleton className="h-[150px] w-full" />
                <Skeleton className="h-[150px] w-full" />
                <Skeleton className="h-[150px] w-full" />
          </div>
          <div className="grid gap-6">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
          </div>
    </div>
  )
}

export default LoadingSkeletion