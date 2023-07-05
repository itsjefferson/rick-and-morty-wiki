import { useState } from "react";

import { Link } from "react-router-dom";

import { IoMdOpen } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "~/store/slice/character";

import style from "./Card.module.scss";

const Card = ({ info, isFavorite }) => {
  const [isFavoriteCard, setIsFavoriteCard] = useState(isFavorite);
  const { id, name, status, species, location, image, firstSeenIn } = info;

  const dispatch = useDispatch();

  const handleFavorite = () => {
    setIsFavoriteCard(!isFavorite);

    !isFavorite
      ? dispatch(addToFavorites(info))
      : dispatch(removeFromFavorites(id));
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.iconContainer}>
        <span>
          <Link to={`/character/${id}`}>
            <IoMdOpen className={style.mdOpenIcon} />
          </Link>
        </span>
        <span onClick={handleFavorite}>
          {isFavoriteCard ? (
            <AiFillHeart className={style.fillHeartIcon} />
          ) : (
            <AiOutlineHeart className={style.outlineHeartIcon} />
          )}
        </span>
      </div>
      <h1 className={style.name}>
        <span className={`${style[`name-${status.toLowerCase()}`]}`}>
          {name.split(" ")[0]}
        </span>
        {" " + name.split(" ").slice(1).join(" ")}
      </h1>

      <h2 className={style.species}>{species}</h2>
      <img
        className={`${style.picture} ${
          style[`picture-${status.toLowerCase()}`]
        }`}
        src={image}
        alt={`${name} of the series Rick and Morty`}
      />
      <div className={style.infoContainer}>
        <p
          className={`${style.status} ${
            style[`status-${status.toLowerCase()}`]
          }`}
        >
          {status}
        </p>
        <div className={style.locationInfo}>
          <span>Last Known Location: </span>
          <p>{location?.name}</p>
        </div>
        <div className={style.locationInfo}>
          <span>First Seen In: </span>
          <p>{firstSeenIn?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
