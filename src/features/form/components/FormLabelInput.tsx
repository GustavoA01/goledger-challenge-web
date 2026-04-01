import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"

type FormLabelInputProps = {
  label: string
  placeholder: string
  className?: string
  inputType?: string
  value?: string | number
  onChangeFn?: (value: string) => void
}

export const FormLabelInput = ({
  label,
  placeholder,
  className = "",
  inputType = "text",
  value,
  onChangeFn = () => {},
}: FormLabelInputProps) => (
  <div className={`space-y-2 ${className}`}>
    <Label>{label}</Label>
    <Input
      type={inputType}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChangeFn?.(e.target.value)}
    />
  </div>
)
