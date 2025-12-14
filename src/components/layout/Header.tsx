"use client"

import Image from "next/image";
import Navigate, { NavigateType } from "../ui/Navigate";
import React from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {
     const pathname = usePathname()

     const navigate: NavigateType[] = [
          {
               href: "/",
               name: "Beranda"
          },
          {
               href: "/peta",
               name: "Peta"
          },
          {
               href: "/simulasi",
               name: "Simulasi"
          },
          {
               href: "/laporan",
               name: "Laporan"
          },
     ]

     return (
          <header className="py-12">
               <div className="mx-auto py-4 w-full px-20">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                              <Image src="/logo.png" alt="EcoFlood Logo" width={40} height={40} />
                              <h1 className="text-xl font-bold">EcoFlood</h1>
                         </div>
                         <nav className="flex items-center gap-3 px-8">
                              {navigate.map((item, index) => (
                                   <Navigate
                                        key={index}
                                        href={item.href}
                                        name={item.name}
                                        isActive={pathname === item.href}
                                   />
                              ))}
                         </nav>
                    </div>
               </div>
          </header>
     );
}

export default Header
