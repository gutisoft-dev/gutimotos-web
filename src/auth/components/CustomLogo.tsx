import { Link } from 'react-router'

export const CustomLogo = () => {
  return (
     <Link to="/" className="flex items-center whitespace-nowrap">
      <h1 className="font-montserrat font-bold tracking-[0.1em] text-xl m-0 whitespace-nowrap text-primary">
       <span className='text-black'>GUTI</span>MOTOS
      </h1>
      
     
    </Link>
  )
}
