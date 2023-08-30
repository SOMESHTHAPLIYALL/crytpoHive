import React, { useEffect, useState } from "react";
import { Server } from "../index";
import axios from "axios";
import Loader from "../Components/Loader";
import CoinComponent from "../Components/CoinComponent";
import CoinMobileComponent from "../Components/CoinMoblileComponent";
import { BiSearchAlt } from "react-icons/bi";

const CoinPage = () => {
  const [allCoins, setAllCoins] = useState();
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";
  const getAllCoins = async () => {
    try {
      const { data } = await axios.get(
        `${Server}/coins/markets?vs_currency=${currency}`
      );
      setLoader(true);
      if (data.length > 0) {
        setAllCoins(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCoins();
  }, [currency]);
  return (
    <>
      {loader && loader ? (
        <div className="coinPage flex flex-col justify-center items-center">
          <div className="inputAndClassname flex lg:flex-row flex-col mt-20 justify-center items-center gap-2">
            <div className="border-2  items-center flex border-black bg-slate-200  p-1 rounded-lg lg:w-96">
              <input
                className="w-full outline-none bg-slate-200 p-2 "
                placeholder="Search your crypto"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <BiSearchAlt size={"30px"} />
            </div>

            <div>
              <select
                className="hover:cursor-pointer h-12 p-2 border-2 border-black rounded-xl font-bold"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="inr">INR</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>
            </div>
          </div>

          <table className="hidden lg:inline border-separate lg:border-spacing-x-20 lg:border-spacing-y-10 md:border-spacing-x-5 md:border-spacing-y-10 p-2">
            <thead className="border-x-2 border-black">
              <tr className="font-mono font-bold lg:text-2xl ">
                <th>Rank</th>
                <th>Coin</th>
                <th>Price</th>
                <th>Price_Change_24h</th>
                <th>Market Cap</th>
                <th>Total Supply</th>
              </tr>
            </thead>

            {allCoins
              ?.filter((coin) => {
                return search.toLowerCase === "" || search === ""
                  ? coin
                  : coin.name.toLowerCase().includes(search) ||
                      coin.name.includes(search);
              })
              .map((coin) => {
                return (
                  <CoinComponent
                    key={coin.id}
                    id={coin.id}
                    market_cap_rank={coin.market_cap_rank}
                    currency={currencySymbol}
                    image={coin.image}
                    name={coin.name}
                    price_change_percentage_24h={
                      coin.price_change_percentage_24h
                    }
                    symbol={coin.symbol}
                    current_price={coin.current_price}
                    price_change_24h={coin.price_change_24h}
                    market_cap={coin.market_cap}
                    total_supply={coin.total_supply}
                  />
                );
              })}
          </table>

          <table className="lg:hidden  m-5 border-separate border-spacing-y-14 border-spacing-x-5 mr-2">
            <thead>
              <tr className="font-mono font-bold  text-2xl">
                <th>Rank</th>
                <th>Coin</th>
                <th>Price</th>
              </tr>
            </thead>

            {allCoins
              ?.filter((coin) => {
                return search.toLowerCase === "" || search === ""
                  ? coin
                  : coin.name.toLowerCase().includes(search) ||
                      coin.name.includes(search);
              })
              .map((coin) => {
                return (
                  <CoinMobileComponent
                    key={coin.id}
                    id={coin.id}
                    market_cap_rank={coin.market_cap_rank}
                    currency={currencySymbol}
                    image={coin.image}
                    name={coin.name}
                    current_price={coin.current_price}
                    price_change_24h={coin.price_change_24h}
                  />
                );
              })}
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CoinPage;
