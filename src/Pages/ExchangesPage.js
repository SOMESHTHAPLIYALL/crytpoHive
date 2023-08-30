import React, { useEffect, useState } from "react";
import { Server } from "../index";
import axios from "axios";
import ExchangeCard from "../Components/ExchangeCard";
import { BiSearchAlt } from "react-icons/bi";
import Loader from "../Components/Loader";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getExchanges = async () => {
    try {
      const { data } = await axios.get(`${Server}/exchanges`);
      setExchanges(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExchanges();
  }, []);

  return (
    <>
      {loading && loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="w-full flex justify-center">
            <div className=" bg-slate-200 search flex justify-center items-center p-2 mt-10 lg:w-96 rounded-2xl">
              <input
                className="bg-slate-200 w-full p-4 rounded-2xl outline-none"
                type="text"
                placeholder="Search Your Exchanges"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <BiSearchAlt size={"30px"} />
            </div>
          </div>
          <div className="lg:grid flex flex-col justify-center items-center p-2 gap-x-10 lg:grid-cols-4 ">
            {exchanges
              ?.filter((exchange) => {
                return search.toLowerCase === "" || search === ""
                  ? exchange
                  : exchange.name.toLowerCase().includes(search) ||
                      exchange.name.includes(search);
              })
              .map((exchange) => (
                <ExchangeCard
                  name={exchange.name}
                  url={exchange.url}
                  image={exchange.image}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Exchanges;
