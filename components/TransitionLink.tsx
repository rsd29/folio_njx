'use client'

import Link from 'next/link'
import { useNavigation } from './NavigationProvider'
import { MouseEvent, forwardRef } from 'react'

interface TransitionLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode
}

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, children, onClick, ...props }, ref) => {
    const { startTransition } = useNavigation()

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const targetHref = typeof href === 'string' ? href : href.pathname || '/'
      startTransition(targetHref)
      onClick?.(e)
    }

    return (
      <Link href={href} onClick={handleClick} ref={ref} {...props}>
        {children}
      </Link>
    )
  }
)

TransitionLink.displayName = 'TransitionLink'

export default TransitionLink

