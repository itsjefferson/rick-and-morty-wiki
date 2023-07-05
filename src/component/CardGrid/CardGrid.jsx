import Card from "../Card/Card";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import style from "./CardGrid.module.scss";

const CardGrid = () => {
  const { collection, favorites } = useSelector((state) => state.character);
  const location = useLocation();

  const characterList =
    location.pathname === "/favorite" ? favorites : collection;

  return (
    <ul className={style.gridCard}>
      {characterList?.map((character) => {
        const isFavorite = favorites?.some(
          (favorite) => favorite.id === character.id
        );

        return (
          <li key={character.id}>
            <Card info={character} isFavorite={isFavorite} />
          </li>
        );
      })}
    </ul>
  );
};

export default CardGrid;
