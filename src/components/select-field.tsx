import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  options?: Array<string | number>;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-slate-800">{label}</Label>
      <Select value={value.toString()} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "w-full",
            "border-slate-200 focus:border-blue-500",
            "focus:ring-2 focus:ring-blue-200"
          )}
        >
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((opt) => (
            <SelectItem key={opt} value={opt.toString()}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
