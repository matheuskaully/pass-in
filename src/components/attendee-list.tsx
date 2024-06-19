import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br" 
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";
// import { attendees } from "./data/attendees";

interface Attendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('search')) {
      return url.searchParams.get('search') ?? ''
    } 
      
    return ''
  })
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    } 
      
    return 1
  })

  const totalPages = Math.ceil(total / 10)
  const eventId = '9e9bd979-9d10-4915-b339-3786b1634f33'

  function goToNextPage() {
    setCurrentPage(page + 1)
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  function goToPreviusPage() {
    setCurrentPage(page - 1)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())
    url.searchParams.set('page', String(page))

    window.history.pushState({}, '', url)

    setPage(page)
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())
    url.searchParams.set('search', search)

    window.history.pushState({}, '', url)

    setSearch(search)
  }

  useEffect(() => {
    const url = new URL(`http://localhost:3333/events/${eventId}/attendees`)
    url.searchParams.set('pageIndex', String(page - 1))
    
    if (search.length > 0) {
      url.searchParams.set('query', search)
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
      setAttendees(data.attendees)
      setTotal(data.total)
    })
  }, [page, search])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="flex items-center px-3 py-1.5 border border-white/10 rounded-lg gap-3">
          <Search className="size-4 text-emerald-300" />
          <input 
            onChange={onSearchInputChanged} 
            value={search} 
            className="flex-1 bg-transparent text-sm w-72 outline-none border-0 p-0 focus:ring-0" 
            type="text" 
            placeholder="Buscar participante..." 
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow className="border-b border-white/10">
            <TableHeader style={{ width: 48 }} className="py-3 px-4 text-sm font-semibold text-left">
              <input className="size-4 bg-black/20 rounded border border-white/10 accent-orange-400" type="checkbox" />
            </TableHeader>
            <TableHeader className="py-3 px-4 text-sm font-semibold text-left">Código</TableHeader>
            <TableHeader className="py-3 px-4 text-sm font-semibold text-left">Participantes</TableHeader>
            <TableHeader className="py-3 px-4 text-sm font-semibold text-left">Data de inscrição</TableHeader>
            <TableHeader className="py-3 px-4 text-sm font-semibold text-left">Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }} className="py-3 px-4 text-sm font-semibold text-left"></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {attendees.map((attendee) => {
            return (
              <TableRow key={attendee.id} className="border-b border-white/10 hover:bg-white/5">
                <TableCell>
                  <input className="size-4 bg-black/20 rounded border border-white/10 accent-orange-400" type="checkbox" />
                </TableCell>
                <TableCell>
                  {attendee.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>
                  {attendee.checkedInAt === null 
                    ? <span className="text-zinc-400">Não fez check-in</span> 
                    : dayjs().to(attendee.checkedInAt)
                  }
                </TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Mostrando {attendees.length} de {total} itens</TableCell>
            <td className="py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                Página {page} de {totalPages}

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4"/>
                  </IconButton>
                  <IconButton onClick={goToPreviusPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>  
                </div>  
              </div>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}