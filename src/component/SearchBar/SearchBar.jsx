import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCollection } from "~/store/slice/character";

import VideoComponent from "./VideoComponent/VideoComponent";
import AnimatedLabel from "./AnimatedLabel/AnimatedLabel";

import { getCharacterCollection } from "~/service/dataFetcher";

import style from "./SearchBar.module.scss";

const SearchBar = () => {
  const [characterName, setCharacterName] = useState("");
  const [showAnimatedLabel, setShowAnimatedLabel] = useState(true);

  const dispatch = useDispatch();

  const { criterion } = useSelector((state) => state.search);

  // Get the desired collection based on `characterName` or the `criterion` (usually a filter)
  useEffect(() => {
    const getDesiredCollection = async () => {
      try {
        const desiredCollection = await getCharacterCollection({
          ...criterion,
          name: characterName,
        });
        dispatch(setCollection(desiredCollection.results));
      } catch (error) {
        if (error.message === "The resource could not be found") {
          console.log("Manejando error...");
        }
      }
    };

    getDesiredCollection();
  }, [criterion, characterName]);

  const handleFocus = () => setShowAnimatedLabel(false);

  const handleBlur = () => {
    if (!characterName) setShowAnimatedLabel(true);
  };

  return (
    <main>
      <div className={style.videoContainer}>
        <VideoComponent />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={style.welcomeContainer}>
          <h1 className={style.welcomeTitle}>
            Welcome to
            <br />
            Rick and Morty <span>Wiki</span>
          </h1>
          <p className={style.welcomeDesc}>
            Find your favorite character here. Wubba lubba dub-dub!
          </p>
        </div>
        <div className={style.searchContainer}>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="searchBar"
            className={style.searchInput}
          />
          {showAnimatedLabel && (
            <div className={style.animatedLabel}>
              <AnimatedLabel />
            </div>
          )}
        </div>
      </form>
    </main>
  );
};

export default SearchBar;
