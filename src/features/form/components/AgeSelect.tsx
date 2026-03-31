import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"

export const AgeSelect = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Livre">Livre</SelectItem>
        <SelectItem value="10">10+</SelectItem>
        <SelectItem value="12">12+</SelectItem>
        <SelectItem value="14">14+</SelectItem>
        <SelectItem value="16">16+</SelectItem>
        <SelectItem value="18">18+</SelectItem>
      </SelectContent>
    </Select>
  )
}
