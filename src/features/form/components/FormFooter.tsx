import { Button } from "@/src/components/ui/button"
import Link from "next/link"

export const FormFooter = () => (
  <div className="flex justify-end gap-4">
    <Link href="/">
      <Button variant="outline" type="button">
        Cancelar
      </Button>
    </Link>
    <Button>Continuar</Button>
  </div>
)
