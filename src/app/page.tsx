import { Header } from "../components/Header"
import { services } from "../services"

const Home = async () => {
  try {
    const response = await services.tvShows.getAll()
    console.log(response.data)
  } catch (error) {
    console.error("Error fetching data:", error)
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4 mt-24">Cards</main>
    </div>
  )
}

export default Home
