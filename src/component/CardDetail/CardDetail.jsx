import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterDetail } from "~/service/dataFetcher";

const CardDetail = () => {
  const [characterDetail, setCharacterDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getDetailedCharacterInfo = async () => {
      const characterInfo = await getCharacterDetail(id);
      setCharacterDetail(characterInfo);
      setIsLoading(false);
    };
    getDetailedCharacterInfo();
  }, []);

  const { name, status, species, location, image, about, firstSeenIn } =
    characterDetail;

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>{name}</h1>
      <h2>
        {status} — {species}
      </h2>
      <img src={image} alt={`${name} of the series Rick and Morty`} />
      <div>
        <div>
          <span>Last Known Location:</span>
          <p>{location?.name}</p>
        </div>
        <div>
          <span>First Seen In:</span>
          <p>{firstSeenIn?.name}</p>
        </div>
      </div>
      <div>
        <h2>About {name}</h2>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default CardDetail;
