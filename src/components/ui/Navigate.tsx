import Link from 'next/link'
import React from 'react'

export type NavigateType = {
     href: string,
     name: string
}

const Navigate: React.FC<NavigateType> = ({
     href, name
}) => {
     return (
          <Link href={href} className='font-medium text-base hover:scale-105 transition duration-300'>
               {name}
          </Link>
     )
}

export default Navigate