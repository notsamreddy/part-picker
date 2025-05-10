"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PartPageProps {
  params: Promise<{ partId: string }>;
}

export default async function PartPage({ params }: PartPageProps) {
  const partId = await params;
  const part = useQuery(api.cars.getPart, { partId: partId.partId });

  if (!part) {
    return (
      <div className="container mx-auto p-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <p className="text-center text-slate-600">
              Loading part details...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline">← Back to Parts</Button>
          </Link>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{part.name}</CardTitle>
            <CardDescription className="text-xl text-slate-600">
              {part.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-slate-700">Price</h3>
                <p className="text-2xl font-bold text-blue-600">
                  ${part.price.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700">Stock</h3>
                <p className="text-2xl font-bold text-slate-800">
                  {part.quantity} units
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-700 mb-2">
                Specifications
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-600">{part.specs}</p>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full" size="lg">
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
