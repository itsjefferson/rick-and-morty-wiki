import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getCharacterCollection } from "./service/dataFetcher";
import { setCollection } from "./store/slice/character";
import { setPaging } from "./store/slice/paging";

import Home from "./view/Home/Home";
import Episode from "./view/Episode/Episode";
import Location from "./view/Location/Location";
import Favorite from "./view/Favorite/Favorite";

import Loading from "./view/Loading/Loading";
import NotFound from "./view/404/NotFound";

import Nav from "./component/Nav/Nav";
import CardDetail from "./component/CardDetail/CardDetail";

import { Routes, Route } from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getInitialCollection = async () => {
      const { results: collection, info } = await getCharacterCollection();
      dispatch(setCollection(collection));
      dispatch(
        setPaging({
          count: info.pages,
          next: info.next,
          prev: info.prev,
        })
      );
      setIsLoading(false);
    };

    getInitialCollection();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/episode" element={<Episode />} />
            <Route path="/location" element={<Location />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/character/:id" element={<CardDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
