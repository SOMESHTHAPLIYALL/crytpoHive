import axios from "axios";
import React, { useEffect, useState } from "react";
import { Server } from "../index";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import LikeableCoins from "./LikeableCoins";
import Charts from "./Charts";

const CoinDetails = () => {
  const params = useParams();
  const [coinInfo, setCoinInfo] = useState();
  const [currencyCoin, setCurrencyCoin] = useState("inr");
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(500);
  const [text, setText] = useState("Read More");
  const [days, setDays] = useState("24h");
  const [chartArray, setChatArray] = useState([]);

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "360d"];
  const currency =
    currencyCoin === "inr" ? "₹" : currencyCoin === "usd" ? "$" : "€";
  const getCoinInfo = async () => {
    try {
      const { data } = await axios.get(`${Server}/coins/${params.id}`);
      const { data: chartData } = await axios.get(
        `${Server}/coins/${params.id}/market_chart?vs_currency=${currencyCoin}&days=${days}`
      );

      setCoinInfo(data);
      setChatArray(chartData?.prices);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const switchChartStats = (val) => {
    switch (val) {
      case "24h":
        setDays("24h");
        setLoading(false);
        break;
      case "7d":
        setDays("7d");
        setLoading(false);
        break;
      case "14d":
        setDays("14d");
        setLoading(false);
        break;
      case "30d":
        setDays("30d");
        setLoading(false);
        break;
      case "60d":
        setDays("60d");
        setLoading(false);
        break;
      case "200d":
        setDays("200d");
        setLoading(false);
        break;
      case "360d":
        setDays("360d");
        setLoading(false);
        break;

      default:
        setDays("24h");
        setLoading(false);
        break;
    }
  };

  useEffect(() => {
    getCoinInfo();
  }, [currencyCoin, days]);

  return (
    <>
      <div className="items-center h-screen">
        {loading && loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex px-10 mt-5">
              <select
                className="p-2 bg-slate-400 rounded-lg w-fit hover:cursor-pointer font-bold"
                onChange={(e) => setCurrencyCoin(e.target.value)}
              >
                <option value="inr">INR(₹)</option>
                <option value="usd">USD($)</option>
                <option value="eur">EUR(€)</option>
              </select>
            </div>
            <div className="container flex flex-col lg:flex-row gap-5 p-4">
              <div className="flex flex-col rounded-lg mt-8 gap-y-5 lg:w-96 p-10 gap-2 shadow-2xl justify-center border-2 ">
                <p className="font-semibold bg-black text-white rounded-lg p-1 w-fit">
                  Rank #{coinInfo?.market_cap_rank}
                </p>

                <p className="flex gap-2">
                  <img
                    className="rounded-lg shadow-xl"
                    src={coinInfo?.image?.thumb}
                  />
                  <p className="font-semibold text-xl">{coinInfo?.name}</p>
                  <p className="text-gray-600 text-xl">
                    ({coinInfo?.symbol.toUpperCase()})
                  </p>
                </p>
                <div className="flex items-center gap-4">
                  {currency === "₹" ? (
                    <p className="text-2xl font-bold">
                      {currency}
                      {coinInfo?.market_data?.current_price?.inr}
                    </p>
                  ) : currency === "$" ? (
                    <p className="text-2xl font-bold">
                      {currency}
                      {coinInfo?.market_data?.current_price?.usd}
                    </p>
                  ) : (
                    <p className="text-2xl font-bold">
                      {currency}
                      {coinInfo?.market_data?.current_price?.eur}
                    </p>
                  )}
                  {coinInfo?.market_data?.price_change_percentage_24h > 0 ? (
                    <p className="flex items-center text-green-500 font-semibold">
                      {" "}
                      {<BiSolidUpArrow color="green" />}
                      {coinInfo?.market_data?.price_change_percentage_24h}%
                    </p>
                  ) : (
                    <p className="flex items-center text-red-500 font-semibold">
                      {" "}
                      {<BiSolidDownArrow color="red" />}
                      {coinInfo?.market_data?.price_change_percentage_24h}%
                    </p>
                  )}
                </div>

                {currency === "₹" ? (
                  <span className="flex gap-2 justify-between  font-mono font-bold">
                    <p className="text-gray-600">MarketCap</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.market_cap?.inr}
                    </p>
                  </span>
                ) : currency === "$" ? (
                  <span className="flex gap-2  justify-between   font-mono font-bold">
                    <p className="text-gray-600">MarketCap</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.market_cap?.usd}
                    </p>
                  </span>
                ) : (
                  <span className="flex gap-2  justify-between   font-mono font-bold">
                    <p className="text-gray-600">MarketCap</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.market_cap?.eur}
                    </p>
                  </span>
                )}

                {currency === "₹" ? (
                  <span className="flex gap-2  justify-between font-mono font-bold">
                    <p className="text-gray-600">Total Volume</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.total_volume?.inr}
                    </p>
                  </span>
                ) : currency === "$" ? (
                  <span className="flex gap-2  justify-between font-mono font-bold">
                    <p className="text-gray-600">Total Volume</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.total_volume?.usd}
                    </p>
                  </span>
                ) : (
                  <span className="flex gap-2  justify-between font-mono font-bold">
                    <p className="text-gray-600">Total Volume</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.total_volume?.eur}
                    </p>
                  </span>
                )}

                {currency === "₹" ? (
                  <span className="flex gap-2  justify-between font-mono font-bold">
                    <p className="text-gray-600">Circulating Supply</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.circulating_supply}
                    </p>
                  </span>
                ) : currency === "$" ? (
                  <span className="flex gap-2  justify-between font-mono font-bold">
                    <p className="text-gray-600">Circulating Supply</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.circulating_supply}
                    </p>
                  </span>
                ) : (
                  <span className="flex gap-2  justify-between font-mono font-bold">
                    <p className="text-gray-600">Circulating Supply</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.circulating_supply}
                    </p>
                  </span>
                )}
              </div>
              <div className="coinsyouMayLike hidden lg:inline-block">
                <LikeableCoins id={coinInfo?.id} name={coinInfo?.name} />
              </div>
            </div>

            <div className="coinDetails flex flex-col lg:flex-row lg:justify-between px-2 mt-16">
              <div className="Charts">
                {
                  <Charts
                    arr={chartArray}
                    currencyCoin={currencyCoin}
                    currency={currency}
                    days={days}
                  />
                }
                <div className="flex gap-5 flex-wrap justify-center  mt-5 mb-5">
                  {btns.map((i) => (
                    <button
                      className=" hover:scale-105 w-16 bg-slate-300 p-2 rounded-xl text-black"
                      onClick={() => switchChartStats(i)}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
              <div className="box p-4 border-2 flex flex-col items-center md:w-96 h-fit lg:w-96 shadow-2xl rounded-lg bg-slate-200 gap-y-10">
                <h1 className="font-bold text-xl lg:text-4xl">
                  {coinInfo?.symbol.toUpperCase()} Price Statistics
                </h1>

                {currency === "₹" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>{coinInfo?.name} Price</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.current_price?.inr}
                    </p>
                  </span>
                ) : currency === "$" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>{coinInfo?.name} Price</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.current_price?.usd}
                    </p>
                  </span>
                ) : (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>{coinInfo?.name} Price</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.current_price?.eur}
                    </p>
                  </span>
                )}

                {currency === "₹" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>24h High</p>
                    <p className="text-green-500">
                      {currency}
                      {coinInfo?.market_data?.high_24h?.inr}
                    </p>
                  </span>
                ) : currency === "$" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>24h High </p>
                    <p className="text-green-500">
                      {currency}
                      {coinInfo?.market_data?.high_24h?.usd}
                    </p>
                  </span>
                ) : (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>24h High</p>
                    <p className="text-green-500">
                      {currency}
                      {coinInfo?.market_data?.high_24h?.eur}
                    </p>
                  </span>
                )}

                {currency === "₹" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>24h Low</p>{" "}
                    <p className="text-red-500">
                      {currency}
                      {coinInfo?.market_data?.high_24h?.inr}
                    </p>
                  </span>
                ) : currency === "$" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>24h Low</p>
                    <p className="text-red-500">
                      {currency}
                      {coinInfo?.market_data?.high_24h?.usd}
                    </p>
                  </span>
                ) : (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>24h Low</p>
                    <p className="text-red-500">
                      {currency}
                      {coinInfo?.market_data?.high_24h?.eur}
                    </p>
                  </span>
                )}
                <span className="flex justify-between w-full font-mono font-bold">
                  <p>Market Cap Rank</p> <p>#{coinInfo?.market_cap_rank}</p>
                </span>

                {currency === "₹" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p> Price change 24H</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.price_change_24h_in_currency?.inr}
                    </p>
                  </span>
                ) : currency === "$" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p> Price change 24H</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.price_change_24h_in_currency?.usd}
                    </p>
                  </span>
                ) : (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p> Price change 24H</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.price_change_24h_in_currency?.eur}
                    </p>
                  </span>
                )}

                {currency === "₹" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>MarketCap</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.market_cap?.inr}
                    </p>
                  </span>
                ) : currency === "$" ? (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>MarketCap</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.market_cap?.usd}
                    </p>
                  </span>
                ) : (
                  <span className="flex justify-between w-full font-mono font-bold">
                    <p>MarketCap</p>
                    <p>
                      {currency}
                      {coinInfo?.market_data?.market_cap?.eur}
                    </p>
                  </span>
                )}
              </div>
            </div>

            <div className="p-4">
              <h1 className="font-bold text-5xl">What is {coinInfo?.name}?</h1>
              <div
                className=" p-2 text-xl font-sans font-medium hidden lg:inline-block mt-5"
                dangerouslySetInnerHTML={{ __html: coinInfo?.description?.en }}
              ></div>
              <div
                className="font-sans font-medium lg:hidden mt-5"
                dangerouslySetInnerHTML={{
                  __html: (coinInfo?.description?.en).substring(0, num),
                }}
              ></div>
              <button
                className="lg:hidden md:hidden text-blue-500 underline underline-offset-2 hover:cursor-pointer"
                onClick={() => {
                  setNum(10000);
                  setText("Show Less");
                  if (text === "Show Less") {
                    setNum(500);
                    setText("Show More");
                  }
                }}
              >
                {text}
              </button>
            </div>

            {
              <div className="p-4">
                <div className="box p-4 border-1 flex flex-col  shadow-2xl rounded-lg bg-slate-200 gap-y-5">
                  <h1 className="font-bold font-mono text-2xl lg:text-4xl">
                    Global {coinInfo?.name} Prices
                  </h1>

                  {
                    <>
                      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mt-10">
                        <span className="flex justify-between w-full font-mono font-bold">
                          <p>{coinInfo?.symbol.toUpperCase()}/USD Us Dollar</p>
                          <p>${coinInfo?.market_data?.current_price?.usd}</p>
                        </span>

                        <span className="flex justify-between w-full font-mono font-bold">
                          <p>
                            {coinInfo?.symbol.toUpperCase()}/CAD Canadian Dollar
                          </p>
                          <p>CA${coinInfo?.market_data?.current_price?.cad}</p>
                        </span>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 ">
                        <span className="flex justify-between w-full font-mono font-bold">
                          <p>
                            {coinInfo?.symbol.toUpperCase()}/AUD Australian
                            Dollar
                          </p>
                          <p>A${coinInfo?.market_data?.current_price?.aud}</p>
                        </span>
                        <span className="flex justify-between w-full font-mono font-bold">
                          <p>
                            {coinInfo?.symbol.toUpperCase()}/GBP British Pound
                            Sterling
                          </p>
                          <p>£{coinInfo?.market_data?.current_price?.gbp}</p>
                        </span>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 ">
                        <span className="flex justify-between w-full font-mono font-bold">
                          <p>
                            {coinInfo?.symbol.toUpperCase()}/INR Indian Rupee
                          </p>
                          <p>₹{coinInfo?.market_data?.current_price?.inr}</p>
                        </span>

                        <span className="flex justify-between w-full font-mono font-bold">
                          <p>
                            {coinInfo?.symbol.toUpperCase()}/PHP Philippine Peso
                          </p>
                          <p>₱{coinInfo?.market_data?.current_price?.php}</p>
                        </span>
                      </div>
                    </>
                  }
                </div>
                <div className="coinsyouMayLike lg:hidden ">
                  <LikeableCoins id={coinInfo?.id} name={coinInfo?.name} />
                </div>
              </div>
            }
          </>
        )}
      </div>
    </>
  );
};

export default CoinDetails;
