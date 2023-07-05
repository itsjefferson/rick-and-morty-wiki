import { useEffect, useState } from "react";
import { getAllEpisode, getCharacterListFrom } from "~/service/dataFetcher";

import CardGrid from "~/component/CardGrid/CardGrid";

import { useDispatch } from "react-redux";
import { setCollection } from "~/store/slice/character";

const Episode = () => {
  const [episodeList, setEpisodeList] = useState([]);
  const [isLoading, setIsLoading] = useState({
    component: true,
    characters: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getInitialData = async () => {
      const [episodes, characterList] = await Promise.all([
        getAllEpisode(),
        getCharacterListFrom({
          resource: "episode",
          payload: 1,
        }),
      ]);

      setEpisodeList(episodes);
      dispatch(setCollection(characterList));
      setIsLoading({ ...isLoading, component: false });
    };

    getInitialData();
  }, []);

  const handleChange = async (e) => {
    setIsLoading({ ...isLoading, residents: true });

    const characterList = await getCharacterListFrom({
      resource: "episode",
      payload: e.target.value,
    });

    dispatch(setCollection(characterList));
    setIsLoading({ ...isLoading, residents: false });
  };

  return isLoading.component ? (
    <p>Is Loading...</p>
  ) : (
    <>
      <select onChange={handleChange}>
        {episodeList.map((episode) => {
          const { id, name } = episode;
          return (
            <option key={id} value={id}>{`Episode ${id}: ${name}`}</option>
          );
        })}
      </select>
      {isLoading.characters ? <p>Loading List...</p> : <CardGrid />}
    </>
  );
};

export default Episode;
