import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ExchangeCard = ({ name, url, image, description }) => {
  const navigate = useNavigate();
  return (
    <>
      <Link className="w-60" to={url}>
        <div className="box border-1 p-2 flex flex-wrap w-60 justify-center items-center gap-4 flex-col mt-10 hover:cursor-pointer rounded-2xl hover:scale-105 shadow-xl">
          <img
            className="lg:h-12 lg:w-12 rounded-xl"
            src={image}
            alt="Image Not Found"
          ></img>
          <h1>{name}</h1>
        </div>
      </Link>
    </>
  );
};

export default ExchangeCard;
