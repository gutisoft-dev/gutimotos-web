import { CustomHeader } from '@/components/CustomHeader'
import { FaWhatsapp } from 'react-icons/fa'
import { Outlet } from 'react-router'

const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background relative" >
      <CustomHeader/>
        <Outlet/>
         <a
        href="https://wa.me/59167398260?text=Hola,%20quiero%20una%20cotizaci%C3%B3n" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
      >
      <FaWhatsapp size={30} />
      </a>
    </div>
  )
}

export default ShopLayout