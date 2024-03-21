import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [placeholderText, setPlaceholderText] = useState(
    "🔎 Search for your favorite Cakes"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderText((prevText) => {
        if (prevText.includes("Cakes")) {
          return prevText.replace("Cakes", "Flavours");
        } else {
          return prevText.replace("Flavours", "Cakes");
        }
      });
    }, 2000);
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate loading completion after 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword?.trim()) {
      navigate(`/flavourfulCategory/?keyword=${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <>
      <div className="ForDesktop">
        <form onSubmit={submitHandler}>
          <div className="input-group search-container">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              placeholder="Enter Product Name ..."
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>

      <div className="ForMobile">
        {" "}
        <form onSubmit={submitHandler}>
          <div className="flex justify-center">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="w-80 border-1 border-black rounded-start-2 buttonBG"
              placeholder={
                isLoading
                  ? "🔎 Search for your favorite Cakes"
                  : placeholderText
              }
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              id="search_btn"
              className="w-11 h-10 relative bottom-0.5 border-1 rounded-end-2 "
              type="submit"
            >
              <SearchIcon />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
