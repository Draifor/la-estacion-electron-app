import { useState } from 'react'
import { Link } from 'react-router-dom'

import DownArrow from './icons/DownArrow'

type DropdownMenuProps = {
  title: string
  items: {
    label: string
    link: string
  }[]
  className?: string
  isVisible?: boolean
}

export default function DropdownMenu({
  title,
  items,
  className,
  isVisible = true
}: DropdownMenuProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = (): void => {
    setIsOpen(true)
  }

  const handleMouseLeave = (): void => {
    setIsOpen(false)
  }

  if (!isVisible) return null

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col justify-center items-center space-x-1 focus:outline-none hover:cursor-pointer">
        {title}
        <DownArrow />
      </div>
      {isOpen && (
        <div className="absolute z-10 flex flex-col justify-center py-2 w-max bg-white rounded-md shadow-lg left-1/2 transform -translate-x-1/2">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              // baseStyle="none"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
