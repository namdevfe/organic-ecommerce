import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { cn } from '~/utils/functions'

const buttonVariants = cva(
  'min-w-fit rounded-[43px] text-white font-semibold transition-all duration-300 flex items-center justify-center capitalize',
  {
    variants: {
      variant: {
        primary: 'bg-primary-200 hover:bg-primary-300',
        outlined:
          'bg-white border-2 border-primary-200 text-primary-200 hover:border-primary-300 hover:text-primary-300',
        ghost:
          'bg-ghost text-primary-200 hover:bg-ghost-hover hover:text-primary-300',
        link: 'bg-transparent text-primary-200'
      },
      size: {
        sm: 'h-9 text-xs px-6',
        md: 'h-11 text-sm px-8',
        lg: 'h-[50px] text-base px-10'
      }
    }
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  path?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { path, children, className, variant = 'primary', size = 'md', ...props },
    ref
  ) => {
    if (path) {
      return (
        <Link
          to={path}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

export default Button
