'use client'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  return (
    <div>
      <Header />
      {/* hero section */}
      <div className='relative min-h-screen flex justify-between items-start px-20'>
        {/* left content */}
        <div className='max-w-2/5 flex flex-col items-start gap-y-14'>
          <div className='relative '>
            <h1 className='text-[80px] leading-20 w-fit'>
              Pantau Deforestasi. <span className='font-bold'>Cegah Banjir.</span>
              <div className='bg-primary h-9 w-full -rotate-1 absolute -bottom-1 left-0 -z-10' />
            </h1>
          </div>
          <p className='text-gray-600 text-2xl w-[90%]'>
            Platform visualisasi data untuk melihat dampak nyata hilangnya hutan terhadap risiko air di wilayah Anda.
          </p>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => router.push('/peta')}
              className='bg-surface-primary text-background px-9 py-3 rounded-full font-semibold cursor-pointer hover:bg-surface-primary/80 transition duration-300 hover:translate-y-0.5'>
              Buka Peta
            </button>
            <button
              onClick={() => router.push('/simulasi')}
              className='bg-primary text-foreground px-9 py-3 rounded-full font-semibold cursor-pointer hover:bg-primary/80 transition duration-300 hover:translate-y-0.5'>
              Coba Simulasi
            </button>
          </div>
        </div>
        {/* right content */}
        <div className='absolute right-18 -top-35 flex justify-center items-center -z-10'>
          <div className='relative w-175 h-190'>
            <Image src="/hero-image.png" alt="EcoFlood Logo" width={600} height={500} className='object-center w-full h-full' />
            <div className='absolute bottom-8 right-8 z-10'>
              <div className='bg-background rounded-4xl w-60 h-40 flex flex-col justify-center px-5 gap-2 z-10'>
                <h3 className='font-bold text-lg w-3/4'>Banjir Sumatra, 2025</h3>
                <p className='font-medium text-[12px]'>Damaged houses as seen in the flood-hit Aceh on Dec. 4, 2025. (Antara Photo/Bayu Pratama)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* about */}
      <div className='min-h-screen'>

      </div>
      <Footer />
    </div>
  )
}

export default Page 