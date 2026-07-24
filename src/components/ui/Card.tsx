import type { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  elevated?: boolean
}

export function Card({
  children,
  elevated = false,
  className,
  ...props
}: CardProps) {
  return (
    <article
      className={clsx('card', elevated && 'card-elevated', className)}
      {...props}
    >
      {children}
    </article>
  )
}
