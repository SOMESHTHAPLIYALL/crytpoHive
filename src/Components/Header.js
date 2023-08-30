import React, { useState } from "react";
import { FaBitcoin, FaBlogger, FaRegNewspaper } from "react-icons/fa";
import { AiFillHome, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsCoin, BsCurrencyExchange } from "react-icons/bs";
import { Link } from "react-router-dom";
const Header = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="header bg-black text-white h-28 p-2 flex  z-20 sticky top-0">
        <div className="box  h-full w-[100vw] flex justify-between place-items-center ">
          <div className="heading flex  text-4xl font-extrabold p-2 gap-2 ">
            <Link className="flex gap-1 items-center" to="/">
              <span>
                <FaBitcoin />
              </span>
              <h1>CryptoHive</h1>
            </Link>
          </div>
          {toggle ? (
            <AiOutlineClose
              onClick={() => setToggle(!toggle)}
              className="text-4xl md:hidden block hover:cursor-pointer "
            />
          ) : (
            <AiOutlineMenu
              onClick={() => setToggle(!toggle)}
              className="text-4xl md:hidden block hover:cursor-pointer"
            />
          )}

          <ul className="justify-end hidden md:flex flex-row gap-7 p-2">
            <li>
              <Link to="/">
                <p className="hover:bg-white hover:text-black hover:scale-110 font-bold text-2xl rounded-xl p-2 flex items-center gap-2">
                  <AiFillHome />
                  Home
                </p>
              </Link>
            </li>

            <li>
              <Link to="/coins">
                <p className="hover:bg-white font-bold hover:text-black hover:scale-110 text-2xl rounded-xl p-2 flex items-center gap-2">
                  <BsCoin />
                  Coins
                </p>
              </Link>
            </li>

            <li>
              <Link to="/exchanges">
                <p className="hover:bg-white font-bold hover:text-black hover:scale-110 text-2xl rounded-xl p-2 flex items-center gap-2">
                  <BsCurrencyExchange />
                  Exchanges
                </p>
              </Link>
            </li>

            <li>
              <Link to="/news">
                <p className="hover:bg-white font-bold hover:text-black hover:scale-110 text-2xl rounded-xl p-2 flex items-center gap-2">
                  <FaRegNewspaper />
                  News
                </p>
              </Link>
            </li>
          </ul>

          <ul
            className={`md:hidden border-t-2 flex-row  font-bold gap- p-5 fixed bg-black top-[110px] w-full h-screen ${
              toggle ? "left-0" : "left-[-100%]"
            } `}
          >
            <li>
              <Link to="/">
                <button
                  className="mt-10  lg:hover:bg-white  font-bold hover:scale-110 text-3xl rounded-xl p-2 flex items-center gap-2"
                  onClick={() => setToggle(!toggle)}
                >
                  <AiFillHome />
                  Home
                </button>
              </Link>
            </li>

            <li>
              <Link to="/coins">
                <button
                  className="mt-10  lg:hover:bg-white font-bold hover:scale-110 text-3xl rounded-xl p-2 flex items-center gap-2"
                  onClick={() => setToggle(!toggle)}
                >
                  <BsCoin />
                  Coins
                </button>
              </Link>
            </li>

            <li>
              <Link to="/exchanges">
                <button
                  className="mt-10  lg:hover:bg-white font-bold hover:scale-110 text-3xl rounded-xl p-2 flex items-center gap-2"
                  onClick={() => setToggle(!toggle)}
                >
                  <BsCurrencyExchange />
                  Exchanges
                </button>
              </Link>
            </li>

            <li>
              <Link to="/news">
                <button
                  className=" mt-10 lg:hover:bg-white font-bold hover:scale-110 text-3xl rounded-xl p-2 flex items-center gap-2"
                  onClick={() => setToggle(!toggle)}
                >
                  <FaRegNewspaper />
                  News
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
