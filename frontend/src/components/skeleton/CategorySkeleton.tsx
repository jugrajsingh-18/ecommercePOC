import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function CategoryCardSkeleton() {
  return (
    <Card className="pt-0 overflow-hidden rounded-2xl shadow-sm h-full">
      <div className="relative overflow-hidden">
        <Skeleton className="w-full h-52" />
      </div>
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}

export default function CategorySkeleton() {
  return (
    <div className="p-6 ">
      <div className="mb-6 flex flex-col my-10 justify-center items-center gap-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-44" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4,5,6,7,8].map((item) => (
    <CategoryCardSkeleton key={item} />
  ))}
      </div>
    </div>
  );
}