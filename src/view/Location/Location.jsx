import { useEffect, useState } from "react";
import { getAllLocation, getCharacterListFrom } from "~/service/dataFetcher";

import { useDispatch } from "react-redux";

import { setCollection } from "~/store/slice/character";

import CardGrid from "~/component/CardGrid/CardGrid";
import SearchFilter from "~/component/SearchFilter/SearchFilter";

const Location = () => {
  const dispatch = useDispatch();

  const [locationList, setLocationList] = useState([]);
  const [isLoading, setIsLoading] = useState({
    component: true,
    residents: false,
  });

  useEffect(() => {
    const getInitialData = async () => {
      const [locationList, residentList] = await Promise.all([
        getAllLocation(),
        getCharacterListFrom({
          resource: "location",
          payload: 1,
        }),
      ]);

      setLocationList(locationList);
      dispatch(setCollection(residentList));

      setIsLoading({ ...isLoading, component: false });
    };

    getInitialData();
  }, []);

  const handleChange = async (e) => {
    setIsLoading({ ...isLoading, residents: true });

    const residentList = await getCharacterListFrom({
      resource: "location",
      payload: e.target.value,
    });

    dispatch(setCollection(residentList));
    setIsLoading({ ...isLoading, residents: false });
  };

  return isLoading.component ? (
    <p>Is Loading...</p>
  ) : (
    <>
      <select onChange={handleChange}>
        {locationList.map((location) => {
          const { id, name, type } = location;
          return (
            <option key={id} value={id}>{`${
              !type || type === "unknown" ? "" : `${type}:`
            } ${name}`}</option>
          );
        })}
      </select>
      {isLoading.residents ? (
        <p>Loading List...</p>
      ) : (
        <>
          <CardGrid />
        </>
      )}
    </>
  );
};

export default Location;
