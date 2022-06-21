import React, { useEffect } from "react";
import "../styles/Sidebar.css";
import { FcComboChart, FcRotateCamera, FcHome } from "react-icons/fc";
import { FaCarAlt, FaEarlybirds, FaPhabricator } from "react-icons/fa";
import { GrGamepad, GrBike } from "react-icons/gr";
import { GiAnimalHide, GiMountainCave } from "react-icons/gi";
import { BsImageAlt, BsWater } from "react-icons/bs";
import { ImAirplane } from "react-icons/im";
import { useNav } from "../contexts/NavbarContext";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const { setNav, dvalue } = useNav();

  useEffect(() => {
    setNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sidebar" style={dvalue}>
      <div className="logo">
        <Link to="/" style={{textDecoration: "none", color: "#000"}}><h2>Wallify</h2></Link>
      </div>
      <div className="body">
        <div className="main">
          <p>Main</p>
          <ul>
            <Link to="/main/new" className="link">
            <li>
              <FcHome />
              <span>Home</span>
            </li>
            </Link>
            <Link to="/main/popular" className="link">
                <li>
                <FcComboChart />
                <span>Popular</span>
                </li>
            </Link>
            <Link to="/main/latest" className="link">
                <li>
                <FcRotateCamera />
                <span>Latest</span>
                </li>
            </Link>
          </ul>
        </div>
        <div className="categories">
          <p>Categories</p>
          <ul>
            <Link to="/main/cars" className="link">
              <li>
                <FaCarAlt />
                <span>Cars</span>
              </li>
            </Link>
            <Link to="/main/games" className="link">
              <li>
                <GrGamepad />
                <span>Games</span>
              </li>
            </Link>
            <Link to="/main/birds" className="link">
              <li>
                <FaEarlybirds />
                <span>Birds</span>
              </li>
            </Link>
            <Link to="/main/animals" className="link">
              <li>
                <GiAnimalHide />
                <span>Animals</span>
              </li>
            </Link>
            <Link to="/main/nature" className="link">
              <li>
                <BsImageAlt />
                <span>Nature</span>
              </li>
            </Link>
            <Link to="/main/planes" className="link">
              <li>
                <ImAirplane />
                <span>Planes</span>
              </li>
            </Link>
            <Link to="/main/mountains" className="link">
              <li>
                <GiMountainCave />
                <span>Mountains</span>
              </li>
            </Link>
            <Link to="/main/bikes" className="link">
              <li>
                <GrBike />
                <span>Bikes</span>
              </li>
            </Link>
            <Link to="/main/sea" className="link">
              <li>
                <BsWater />
                <span>Sea</span>
              </li>
            </Link>
            <Link to="/main/cartoons" className="link">
              <li>
                <FaPhabricator />
                <span>Cartoons</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
