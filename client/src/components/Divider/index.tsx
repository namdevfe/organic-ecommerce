import { cn } from '~/utils/functions'

type DividerProps = {
  width?: number | string
  height?: number | string
  className?: string
}

const Divider = ({ width, height, className = '' }: DividerProps) => {
  return (
    <div
      className={cn(
        'bg-gray-300',
        width && height ? `h-[${height}px] w-[${width}px]` : '',
        className
      )}
    />
  )
}

export default Divider
