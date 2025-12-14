import Link from 'next/link'
import React from 'react'

export type NavigateType = {
     href: string,
     name: string,
     isActive?: boolean,
     handleIsActive?: () => void,
}

const Navigate: React.FC<NavigateType> = ({
     href, name, isActive
}) => {

     return (
          <Link href={href} className={`font-medium text-base 
          rounded-full px-6 py-2
          hover:translate-y-0.5 transition duration-300
          ${isActive ? 'bg-primary' : 'bg-background hover:bg-primary '}`}>
               {name}
          </Link>
     )
}

export default Navigate