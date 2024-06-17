import { ComponentProps } from "react"

interface IconButtonProps extends ComponentProps<'button'> {
  transparent?: boolean
}

export function IconButton({transparent, ...props}: IconButtonProps) {
  return (
    <button 
    {...props} 
    className={`border border-white/10 rounded-md p-1.5 disabled:cursor-not-allowed disabled:opacity-50 ${transparent ? 'bg-transparent' : 'bg-white/10 '}`} />
  )
}