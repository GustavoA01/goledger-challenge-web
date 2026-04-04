import { APIWatchlistResponseType } from "../data/types"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const ListsTab = ({ lists }: { lists: APIWatchlistResponseType[] }) => (
  <>
    {lists.map((list) => (
      <Card
        key={list["@key"]}
        className="w-full cursor-pointer group border hover:border-accent transition-all duration-200"
      >
        <CardHeader>
          <CardTitle>{list.title}</CardTitle>
          <CardDescription>
            {list.tvShows?.length === 1
              ? "1 série adicionada"
              : list.tvShows?.length === 0 || list.tvShows == undefined
                ? "Nenhuma série adicionada"
                : `${list.tvShows?.length} séries adicionadas`}
          </CardDescription>
        </CardHeader>
      </Card>
    ))}
  </>
)
