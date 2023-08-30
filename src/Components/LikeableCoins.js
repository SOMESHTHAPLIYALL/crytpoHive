import axios from "axios";
import React, { useEffect, useState } from "react";
import { Server } from "..";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

const LikeableCoins = ({ name }) => {
  const [coins, setCoins] = useState();

  const getCoins = async () => {
    try {
      const { data } = await axios.get(
        `${Server}/coins//markets?vs_currency=inr`
      );
      if (data) {
        setCoins(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <>
      <div className="flex flex-col rounded-lg mt-8 gap-y-5 lg:h-96 justify-center p-10 gap-2 shadow-2xl border-2 ">
        <div className="font-bold text-2xl font-mono">Coins You May Like</div>
        <div className="flex w-full flex-col lg:flex-row">
          {coins?.slice(0, 7).map((coin) => {
            return coin.name === name ? (
              <></>
            ) : (
              <div>
                <Link
                  to={`/coinDetails/${coin.id}`}
                  className="flex gap-16 justify-between w-fit items-center p-2"
                >
                  <div className="flex  gap-2 lg:flex-col w-[70vw] lg:w-[10vw] h-full items-center hover:scale-105">
                    <p className=" bg-black text-white rounded-lg p-1 lg:w-fit">
                      Rank #{coin?.market_cap_rank}
                    </p>
                    <img
                      className="  w-8 h-10 lg:w-10 lg:mt-5"
                      src={coin.image}
                    />
                    <p className="lg:mt-5 font-bold">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LikeableCoins;
