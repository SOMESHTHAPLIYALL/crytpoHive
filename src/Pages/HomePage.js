import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Server } from "../index";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
var cors = require("cors");
const HomePage = () => {
  const [coins, setCoins] = useState([{}]);
  const [coinInfo, setCoinInfo] = useState();
  const [loading, setloading] = useState(true);

  const trendingCoins = async () => {
    const { data } = await axios.get(`${Server}/search/trending`);
    const { data: coinData } = await axios.get(
      `${Server}/coins/markets?vs_currency=inr`
    );
    setCoins(data?.coins);
    setCoinInfo(coinData);
    setloading(false);
  };

  useEffect(() => {
    trendingCoins();
  }, []);

  const items = coins?.map((coin) => {
    return (
      <div className="flex flex-col text-black justify-center items-center hover:scale-105 cursor-pointer p-2 rounded-lg gap-4">
        <img className="rounded-lg" src={coin?.item?.large} />
        <p className="font-bold">Rank #{coin?.item?.market_cap_rank}</p>
        <p className="font-mono">{coin?.item?.name}</p>
      </div>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <>
      {loading && loading ? (
        <Loader />
      ) : (
        <div className="homePage h-screen ">
          <div className=" text-white justify-center bg-cover flex items-center flex-col  shadow-xl gap-10">
            <h1 className="flex  mt-5 w-full justify-center font-extrabold text-4xl lg:text-6xl items-center font-mono text-black">
              Trending Coins
            </h1>
            <AliceCarousel
              mouseTracking
              infinite
              autoPlayInterval={1000}
              animationDuration={1500}
              disableDotsControls
              disableButtonsControls
              responsive={responsive}
              autoPlay
              items={items}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between px-10 justify-center items-center mt-10 w-full">
            <h1 className="font-bold text-3xl lg:text-5xl">
              Get Update Of All Top Crytpo Currencies
            </h1>
            <div className="bg-slate-200  flex-col shadow-2xl justify-center items-center mt-10 lg:mt-0 p-2 rounded-xl lg:w-[30vw] ">
              <h1 className="font-bold text-xl px-5">
                Top 5 Crytpo Currencies
              </h1>
              {coinInfo?.slice(0, 5).map((coin) => {
                return (
                  <>
                    <Link className="w-full" to={`/coinDetails/${coin.id}`}>
                      <div className="flex px-5 items-center justify-between  hover:cursor-pointer gap-5 hover:scale-105 mt-5">
                        <img className="h-12 w-12" src={coin.image} />
                        <p className="font-semibold">{coin.name}</p>
                        <p>Rank #{coin.market_cap_rank}</p>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col p-4 justify-center items-center lg:flex-row lg:justify-between mt-10">
            <h1 className="font-bold text-3xl lg:text-5xl">
              Read All the latest News about crytpo market world wide
            </h1>
            <img
              className="rounded-lg mt-5 lg:mt-0"
              src="https://imgs.search.brave.com/tYkgj_p55A2yD1oCQx3UUOpyX4ckf8sj9FRhSqI_lZ8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdC5k/ZXBvc2l0cGhvdG9z/LmNvbS85NjI1MjYy/LzU1OTA3L3YvNjAw/L2RlcG9zaXRwaG90/b3NfNTU5MDc4NTgw/LXN0b2NrLXZpZGVv/LTRrLXRlbGV2aXNp/b24td29ybGQtYnJl/YWtpbmctbmV3cy5q/cGc"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
