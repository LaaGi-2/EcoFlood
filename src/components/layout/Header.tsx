"use client"

import Navigate, { NavigateType } from "../ui/Navigate";
import React from 'react'

const Header = () => {
     const navigate: NavigateType[] = [
          {
               href: "/",
               name: "Beranda"
          },
          {
               href: "/peta-deforestasi",
               name: "Peta"
          },
          {
               href: "/simulasi-lingkungan",
               name: "Simulasi Lingkungan"
          },
     ]

     return (
          <header className="shadow-sm shadow-accent/10">
               <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                         <h1 className="text-2xl font-bold">EcoFlood</h1>
                         <nav className="flex items-center gap-10">
                              {navigate.map((item, index) => (
                                   <Navigate
                                        key={index}
                                        href={item.href}
                                        name={item.name} />
                              ))}
                         </nav>
                    </div>
               </div>
          </header>
     );
}

export default Header
