import { Skeleton } from "../ui/skeleton";

export default function SpecificProductSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">

        <div className="w-full">
          <Skeleton className="w-full h-[450px] rounded-xl" />
        </div>

        <div className="space-y-6">

          <Skeleton className="h-9 w-3/4" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <Skeleton className="h-9 w-32" />

          <Skeleton className="h-6 w-24 rounded-full" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-20" />        
            <Skeleton className="h-9 w-9 rounded-md" />  
            <Skeleton className="h-6 w-6" />              
            <Skeleton className="h-9 w-9 rounded-md" /> 
          </div>

          {/* Add to Cart button */}
          <Skeleton className="h-10 w-full max-w-[188px] rounded-md" />

        </div>
      </div>
    </div>
  );
}