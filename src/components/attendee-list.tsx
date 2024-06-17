import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br" 
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";
import { attendees } from "./data/attendees";

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(attendees.length / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToLastPage() {
    setPage(totalPages)
  }1

  function goToPreviusPage() {
    setPage(page - 1)
  }

  function goToFirstPage() {
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="flex items-center px-3 py-1.5 border border-white/10 rounded-lg gap-3">
          <Search className="size-4 text-emerald-300" />
          <input onChange={onSearchInputChanged} className="flex-1 bg-transparent text-sm w-72 outline-none border-0 p-0" type="text" placeholder="Buscar participante..." />
        </div>
        { search }
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
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
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
                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
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
            <TableCell colSpan={3}>Mostrando 10 de {attendees.length} itens</TableCell>
            <td className="py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                Página {page} de {totalPages}

                <div className="flex gap-1.5">
                  <IconButton disabled={page === 1}>
                    <ChevronsLeft onClick={goToFirstPage} className="size-4"/>
                  </IconButton>
                  <IconButton disabled={page === 1}>
                    <ChevronLeft onClick={goToPreviusPage} className="size-4" />
                  </IconButton>
                  <IconButton disabled={page === totalPages}>
                    <ChevronRight onClick={goToNextPage} className="size-4" />
                  </IconButton>
                  <IconButton disabled={page === totalPages}>
                    <ChevronsRight onClick={goToLastPage} className="size-4" />
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