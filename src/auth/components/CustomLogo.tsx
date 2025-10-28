import { Link } from 'react-router'

export const CustomLogo = () => {
  return (
     <Link to="/" className="flex items-center whitespace-nowrap">
      <span className="font-montserrat font-bold text-xl m-0 whitespace-nowrap text-primary">
       Guti<span className='text-black'>motos</span>
      </span>
      
     
    </Link>
  )
}
