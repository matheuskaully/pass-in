import { Search } from "lucide-react";

export function AttendeeList() {
  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold">Participantes</h1>

      <div className="flex items-center px-3 py-1.5 border border-white/10 rounded-lg gap-3">
      <Search className="size-4 text-emerald-300" />
        <input type="text" placeholder="Buscar participante..." className="flex-1 bg-transparent text-sm w-72 outline-none" />
      </div>
    </div>
    
  )
}