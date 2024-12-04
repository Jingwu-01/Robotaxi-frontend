import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarLinkProps {
  children: React.ReactNode
  href: string
}

export default function SidebarLink({
  children,
  href,
}: SidebarLinkProps) {

  const pathname = usePathname()
  
  return (
    <Link className={`block text-gray-800 dark:text-gray-100 ${pathname === href ? 'group-[.is-link-group]:text-violet-500' : 'hover:text-gray-900 dark:hover:text-white group-[.is-link-group]:text-gray-500/90 dark:group-[.is-link-group]:text-gray-400 group-[.is-link-group]:hover:text-gray-700 dark:group-[.is-link-group]:hover:text-gray-200'}`} href={href}>
      {children}
    </Link>
  )
}
