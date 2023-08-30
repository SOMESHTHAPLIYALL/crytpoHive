import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NewsCard = ({ date, image, description, title, url }) => {
  const navigate = useNavigate();
  return (
    <>
      <Link to={url}>
        <div className="box overflow-y-auto p-2 flex gap-4 flex-col mt-10 hover:cursor-pointer hover:scale-105 shadow-xl">
          <h1 className="font-bold">{title}</h1>
          <p className="p-1">
            {description}{" "}
            <button
              className="text-blue-500 underline-offset-3 underline"
              onClick={() => navigate({ url })}
            >
              Read More
            </button>
          </p>
          <p className="font-bold">
            Date Published:{" "}
            <span className="font-normal">{date.slice(0, 10)}</span>
          </p>
        </div>
      </Link>
    </>
  );
};

export default NewsCard;
