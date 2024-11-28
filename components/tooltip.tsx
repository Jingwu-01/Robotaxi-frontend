'use client'

import { useState } from 'react'
import { Transition } from '@headlessui/react'

interface TooltipProps {
  children: React.ReactNode
  className?: string
  bg?: 'dark' | 'light' | null
  size?: 'sm' | 'md' | 'lg' | 'none'
}

export default function Tooltip({
  children,
  className = '',
  bg = null,
  size = 'none',
}: TooltipProps) {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  const sizeClasses = (size: TooltipProps['size']) => {
    switch (size) {
      case 'lg':
        return 'min-w-[18rem] px-3 py-2'
      case 'md':
        return 'min-w-[14rem] px-3 py-2'
      case 'sm':
        return 'min-w-[11rem] px-3 py-2'
      default:
        return 'px-3 py-2'
    }
  }

  const colorClasses = (bg: TooltipProps['bg']) => {
    switch (bg) {
      case 'dark':
        return 'bg-gray-800 text-gray-100 border-gray-700/60'
      default:
        return 'text-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700/60'
    }
  }  

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onFocus={() => setTooltipOpen(true)}
      onBlur={() => setTooltipOpen(false)}
    >
      <button
        className="block"
        aria-haspopup="true"
        aria-expanded={tooltipOpen}
        onClick={(e) => e.preventDefault()}
      >
        <svg className="fill-current text-gray-500" width="12" height="12" viewBox="0 0 18 18">
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
        </svg>
      </button>
      <div className={`z-10 absolute`}>
        <Transition
          show={tooltipOpen}
          as="div"
          className={`rounded-lg border overflow-hidden shadow-lg ${sizeClasses(size)} ${colorClasses(bg)} }`}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          unmount={false}
        >
          {children}
        </Transition>
      </div>
    </div>
  )
}