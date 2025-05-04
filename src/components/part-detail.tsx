import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface PartDetailProps {
  partId: string;
}

export function PartDetail({ partId }: PartDetailProps) {
  const part = useQuery(api.cars.getPart, { partId });
  if (!part) return <PartDetailSkeleton />;

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
        <h1 className="text-3xl font-bold">{part.name}</h1>
      </div>
      <CardContent className="p-8">
        <div className="grid gap-8">
          <Section title="Description">
            <p className="text-gray-600 leading-relaxed">{part.description}</p>
          </Section>
          <Section title="Specifications">
            <p className="text-gray-600 leading-relaxed">{part.specs}</p>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-blue-50 border-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-blue-800">
                  Price
                </h2>
                <p className="text-3xl font-bold text-blue-600">
                  ${part.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-green-800">
                  Stock
                </h2>
                <p className="text-3xl font-bold text-green-600">
                  {part.quantity} units
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PartDetailSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
        <Skeleton className="h-8 w-3/4" />
      </div>
      <CardContent className="p-8">
        <div className="grid gap-8">
          <div>
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-2" />
          </div>
          <div>
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
