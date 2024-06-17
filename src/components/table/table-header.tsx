import { ComponentProps } from "react";

interface TableHeader extends ComponentProps<'th'> {}

export function TableHeader(props: TableHeader) {
  return (
    <th {...props} className="py-3 px-4 text-sm font-semibold text-left" />
  )
}