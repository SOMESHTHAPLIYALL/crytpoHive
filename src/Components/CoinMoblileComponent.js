import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const CoinMobileComponent = ({id , market_cap_rank ,currency, image , name   , current_price , price_change_24h }) => {
  
  
  return (
    <tbody>

    <tr className='hover:cursor-pointer hover:scale-105 text-xl'>
      <td>{market_cap_rank}.</td>
    <td className='flex items-center gap-1'><Link className='flex justify-center items-center gap-2' to={`/coinDetails/${id}`}>
    <img className='h-8' src={image}/>
    {name}
    </Link>
    </td>

    {
      price_change_24h>0?<td className=" text-green-600" >
      
      <span className='flex items-center gap-1'><Link className='flex justify-center items-center gap-2' to={`/coinDetails/${id}`}>{currency}{current_price}</Link></span></td>:
      
      <td className=" text-red-600" >
      
      <span className='flex items-center gap-1'><Link className='flex justify-center items-center gap-2' to={`/coinDetails/${id}`}>{currency}{current_price}</Link></span></td>
    }
    
    
    
    </tr>
    </tbody>
  )
}

export default CoinMobileComponent