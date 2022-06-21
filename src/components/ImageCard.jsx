import React, { useState } from "react";
import "../styles/ImageCard.css";
import { BiCloudDownload } from "react-icons/bi";
import { saveAs } from "file-saver";

export const ImageCard = (props) => {
  const API_URL = "https://wallpaperapibyhanan.herokuapp.com/wallpaper";
  const [download, setDownload] = useState("");

  // Function to download image
  async function downloadImage(imageURL, name = "download", type = "png") {
    const URL = download ? download : imageURL;
    saveAs(URL, "image.png")
    // console.log(URL);
  }

  // Function to get full size wallpaper
  const getFRWallpaper = async (wallpaperID) => {
    const response = await fetch(`${API_URL}?itemID=${wallpaperID}`);
    const data = await response.json();
    setDownload(data["link"]);
    setDownload((state) => {
      downloadImage(state);
      return state;
    });
  };

  return (
    <div className="imageCard">
      <img src={props.image} alt={props.id} />
      <button className="dButton" onClick={() => getFRWallpaper(props.id)}>
        <BiCloudDownload />
      </button>
    </div>
  );
};
