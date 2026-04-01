import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"

type DatePickerProps = {
  date: Date | undefined
  onSelect: (date: Date | undefined) => void
}

export const DatePicker = ({ date, onSelect }: DatePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        data-empty={!date}
        className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
      >
        {date ? format(date, "PPP") : <span>Escolha uma data</span>}
        <ChevronDownIcon />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSelect}
        defaultMonth={date}
      />
    </PopoverContent>
  </Popover>
)
