import React, { useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const CoinComponent = ({
  id,
  market_cap_rank,
  currency,
  image,
  name,
  total_supply,
  current_price,
  price_change_24h,
  market_cap,
}) => {
  return (
    <tr className="hover:cursor-pointer hover:scale-105 ">
      <td>{market_cap_rank}.</td>
      <td className="flex items-center gap-2">
        <Link
          className="flex justify-center items-center gap-2"
          to={`/coinDetails/${id}`}
        >
          <img className="h-10" src={image} />
          {name}
        </Link>
      </td>

      {price_change_24h > 0 ? (
        <td className=" text-green-600">
          <span className="flex items-center gap-1">
            <Link to={`/coinDetails/${id}`}>
              {currency}
              {current_price}
            </Link>
          </span>
        </td>
      ) : (
        <td className=" text-red-600">
          <span className="flex items-center gap-1">
            <Link to={`/coinDetails/${id}`}></Link>
            {currency}
            {current_price}
          </span>
        </td>
      )}

      {price_change_24h > 0 ? (
        <td className="  text-green-600">
          <span className="  flex items-center gap-1">
            <BsArrowUpRight />
            <Link to={`/coinDetails/${id}`}>
              {currency}
              {price_change_24h}
            </Link>
          </span>
        </td>
      ) : (
        <td className="  text-red-600">
          <span className="flex items-center gap-1">
            <BsArrowDownRight />
            <Link to={`/coinDetails/${id}`}>
              {currency}
              {price_change_24h}
            </Link>
          </span>
        </td>
      )}

      <td>
        <Link to={`/coinDetails/${id}`}>
          {currency}
          {market_cap}
        </Link>
      </td>
      <td>{total_supply}</td>
    </tr>
  );
};

export default CoinComponent;
