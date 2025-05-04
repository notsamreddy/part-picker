import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SelectField } from "@/components/select-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentProps {
  onSelectPart: (id: string) => void;
}

export function Content({ onSelectPart }: ContentProps) {
  const [year, setYear] = useState<number | null>(null);
  const [manufacturer, setManufacturer] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);

  const years = useQuery(api.cars.getYears);
  const manufacturers = useQuery(
    api.cars.getManufacturers,
    year ? { year } : "skip"
  );
  const models = useQuery(
    api.cars.getModels,
    year && manufacturer ? { year, manufacturer } : "skip"
  );
  const parts = useQuery(
    api.cars.getParts,
    year && manufacturer && model ? { year, manufacturer, model } : "skip"
  );

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Find Your Car Parts
          </CardTitle>
          <CardDescription className="text-center">
            <p className="text-xl text-slate-600">
              Select your vehicle details below
            </p>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="grid gap-6">
            <SelectField
              label="Year"
              value={year ?? ""}
              onChange={(v: string) => {
                setYear(v ? Number(v) : null);
                setManufacturer(null);
                setModel(null);
              }}
              options={years}
            />
            {year && (
              <SelectField
                label="Manufacturer"
                value={manufacturer ?? ""}
                onChange={(v: string) => {
                  setManufacturer(v || null);
                  setModel(null);
                }}
                options={manufacturers}
              />
            )}
            {year && manufacturer && (
              <SelectField
                label="Model"
                value={model ?? ""}
                onChange={(v: string) => setModel(v || null)}
                options={models}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {parts && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Available Parts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {parts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPart(p.id)}
                  className={cn(
                    "text-left border rounded-lg p-4",
                    "hover:bg-slate-50 transition-colors duration-200",
                    "hover:shadow-md hover:border-blue-200"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">
                        {p.name}
                      </h3>
                      <p className="text-slate-600">{p.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">
                        ${p.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {p.quantity} in stock
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
