import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'button',
        `button-${variant}`,
        fullWidth && 'button-full-width',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
