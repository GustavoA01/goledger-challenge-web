import { DetailsSection } from "../components/DetailsSection"
import { FormFooter } from "../components/FormFooter"
import { SeasonsSection } from "../components/SeasonsSection"

export const ShowForm = () => {
  return (
    <form className="mt-8 space-y-6">
      <DetailsSection />
      <SeasonsSection />
      <FormFooter />
    </form>
  )
}
