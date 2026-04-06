import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { TvShowFormType } from "@/src/data/schemas"
import { Controller } from "react-hook-form"

export const AgeSelect = () => (
  <Controller<TvShowFormType>
    name="recommendedAge"
    render={({ field: { value, onChange } }) => (
      <Select value={value as string} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma idade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Livre">Livre</SelectItem>
          <SelectItem value="10">10 +</SelectItem>
          <SelectItem value="12">12 +</SelectItem>
          <SelectItem value="14">14 +</SelectItem>
          <SelectItem value="16">16 +</SelectItem>
          <SelectItem value="18">18 +</SelectItem>
        </SelectContent>
      </Select>
    )}
  />
)
