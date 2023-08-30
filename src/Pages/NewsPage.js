import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsCard from "../Components/NewsCard";
import Loader from "../Components/Loader";
import { GiNewspaper } from "react-icons/gi";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const options = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: "crypto currencies",
      freshness: "Day",
      textFormat: "Raw",
      safeSearch: "Off",
    },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "abed86941bmsh272d6cd7dc241d4p14f090jsn0c58bc076a85",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };

  const getNews = async () => {
    try {
      const { data } = await axios.request(options);
      setNews(data.value);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full flex justify-center items-center mt-10">
            <h1 className="font-bold text-4xl">NEWS</h1>
            <GiNewspaper size={"50px"} />
          </div>

          <div className="grid p-2 gap-x-10 lg:grid-cols-3">
            {news?.map((i) => (
              <NewsCard
                date={i.datePublished}
                title={i.name}
                description={i.description}
                url={i.url}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default NewsPage;
