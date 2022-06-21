import React, { useEffect, useRef, useState } from "react";
import "../styles/Main.css";
import { useParams } from "react-router-dom";
import { ImageCard } from "./ImageCard";
import { BiSearchAlt } from "react-icons/bi";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const { query } = useParams();
  const searchQuery = useRef();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://wallpaperapibyhanan.herokuapp.com/api";
  const SIZE = 48;

  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const searchMovies = async (query) => {
    setLoading(false);
    const response = await fetch(
      `${API_URL}?query=${query}&page=${pageCount}&size=${SIZE}&secret=sultan`
    );
    const data = await response.json();
    setImages(data);
    setLoading(true);
  };

  useEffect(() => {
    searchMovies(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Search Handle Result
  function handleSearch() {
    const searchQueryValue = searchQuery.current.value;
    if (searchQueryValue.length <= 0) {
      alert("Please something to search");
    } else {
      const path = "/main/" + searchQueryValue;
      navigate(path, { query: searchQueryValue });
      searchQuery.current.value = "";
    }
  }

  // Handle Data on Load more
  const fetchMore = async (pageNUM) => {
    const response = await fetch(
      `${API_URL}?query=${query}&page=${pageNUM}&size=${SIZE}&secret=sultan`
    );
    const data = await response.json();
    setImages(images.concat(data));
  }

  // Function to load more data
  const loadMore = async () => {
    setPageCount(pageCount + 1)
    setPageCount((state) => {
      fetchMore(state)
      return state
    })
  }


  return (
    <div className="mainSection">
      <div className="query">
        <h2>{capitalizeFirstLowercaseRest(query)}</h2>
        <div className="searchContainer">
          <input
            type="search"
            ref={searchQuery}
            placeholder="Search..."
            className="searchInput"
          />
          <div className="searchIcon">
            <BiSearchAlt onClick={handleSearch} />
          </div>
        </div>
      </div>
      <div className="attribute">
        @Copyright. Muhammad Hanan Asghar
      </div>
      {loading ? (
        <div className="gallerySection">
          <div className="gallery">
            {images.length > 0 ? images.map((image) =>
              image["status"] ? (
                ""
              ) : (
                <ImageCard image={image.image} id={image.id} />
              )
            ) : "No Images Found"}
          </div>
        </div>
      ) : (
        <div className="spinner">
          <Spinner animation="grow" />
        </div>
      )}

    <div className="load" onClick={loadMore}>
      <div className="button">
      Load
      </div>
    </div>
    </div>
  );
};
