import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

export const FormHeader = () => (
  <DialogHeader>
    <DialogTitle className="max-sm:text-lg">Criar lista</DialogTitle>
    <DialogDescription>
      Crie uma lista para adicionar séries a ela
    </DialogDescription>
  </DialogHeader>
)
