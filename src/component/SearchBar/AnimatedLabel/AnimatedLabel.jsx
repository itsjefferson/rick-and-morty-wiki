import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import style from "./AnimatedLabel.module.scss";

const AnimatedLabel = React.memo(() => {
  const { collection } = useSelector((state) => state.character);

  const [randomCharacter, setRandomCharacter] = useState("");
  const [animateLabel, setAnimateLabel] = useState(false);

  useEffect(() => {
    const updateRandomCharacter = setInterval(() => {
      const { name } =
        collection[Math.floor(Math.random() * collection.length)];

      setRandomCharacter(name);
      setAnimateLabel(true);

      setTimeout(() => {
        setAnimateLabel(false);
      }, 1000);
    }, 3000);

    return () => clearInterval(updateRandomCharacter);
  }, [collection]);

  return (
    <label
      className={`${style.random} ${animateLabel && style.animateRandom}`}
      htmlFor="searchBar"
    >
      {randomCharacter}
    </label>
  );
});

export default AnimatedLabel;
