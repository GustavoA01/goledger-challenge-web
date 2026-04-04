import Link from "next/link"
import { APIWatchlistResponseType } from "../data/types"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const ListsTab = ({ lists }: { lists: APIWatchlistResponseType[] }) => (
  <>
    {lists.map((list) => (
      <Link
        key={list["@key"]}
        href={`/detalhes-lista/${encodeURIComponent(list.title)}`}
        passHref
      >
        <Card className="w-full cursor-pointer group border hover:border-accent transition-all duration-200">
          <CardHeader>
            <CardTitle className="group-hover:text-primary transition-all duration-200">
              {list.title}
            </CardTitle>
            <CardDescription>
              {list.tvShows?.length === 1
                ? "1 série adicionada"
                : list.tvShows?.length === 0 || list.tvShows == undefined
                  ? "Nenhuma série adicionada"
                  : `${list.tvShows?.length} séries adicionadas`}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    ))}
  </>
)
