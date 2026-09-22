import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function ProductCardSkeleton() {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <Skeleton className="w-full h-52" />

      <CardContent className="p-4 flex flex-col gap-3">
        <Skeleton className="h-5 w-4/5" />

        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-3/4" />
        </div>

        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        <Skeleton className="h-9 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

export default function ProductsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-center mb-8">
        <Skeleton className="h-8 w-40" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        
         {[0,1, 2, 3, 4,5,6,7,8,9].map((item) => (
    <ProductCardSkeleton key={item} />
  ))}
      </div>

      <div className="flex justify-center gap-3 mt-10">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-16 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </div>
  );
}