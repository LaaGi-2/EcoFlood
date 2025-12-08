import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import MapLayout from '@/components/layout/MapLayout'
import React from 'react'

const page = () => {
  return (
    <>
      <Header />
      <div className='min-h-screen '>
        <MapLayout />
      </div>
      <Footer />
    </>
  )
}

export default page 