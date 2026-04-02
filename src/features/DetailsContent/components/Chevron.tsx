import { ChevronDownIcon } from "lucide-react"

export const Chevron = () => (
  <div className="ml-auto">
    <ChevronDownIcon
      data-slot="accordion-trigger-icon"
      className="pointer-events-none shrink-0 group-data-[state=open]:rotate-180 transition-all"
    />
  </div>
)
