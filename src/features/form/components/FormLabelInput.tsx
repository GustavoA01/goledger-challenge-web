import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { UseFormRegister, FieldValues, Path, FieldError } from "react-hook-form"

type FormLabelInputProps<T extends FieldValues> = {
  label: string
  placeholder?: string
  className?: string
  inputType?: string
  name: Path<T>
  register: UseFormRegister<T>
  error: FieldError | undefined
  transformToNumber?: (value: string) => number | undefined
}

export const FormLabelInput = <T extends FieldValues>({
  label,
  placeholder,
  className = "",
  inputType = "text",
  name,
  register,
  error,
  transformToNumber,
}: FormLabelInputProps<T>) => (
  <div className={`space-y-2 ${className}`}>
    <Label>{label}</Label>
    <Input
      type={inputType}
      placeholder={placeholder}
      {...register(
        name,
        transformToNumber ? { setValueAs: transformToNumber } : {},
      )}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1">{error.message?.toString()}</p>
    )}
  </div>
)
