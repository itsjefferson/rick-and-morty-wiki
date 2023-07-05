const BASE = "https://rickandmortyapi.com/api/",
  HOST = "http://localhost:3001/";

const buildURL = (resource = "", filterFor) => {
  if (resource["url"]) {
    return resource.url;
  }

  let endpoint;
  if (
    resource.name === "character" ||
    resource.name === "episode" ||
    resource.name === "location"
  ) {
    if (resource.payload) {
      if (Array.isArray(resource.payload)) {
        endpoint = new URL(
          `${resource.name}/${JSON.stringify(resource.payload)}`,
          BASE
        );
      } else {
        endpoint = new URL(`${resource.name}/${resource.payload}`, BASE);
      }
    } else {
      endpoint = new URL(resource.name, BASE);
    }
  } else if (resource.name === "detail") {
    endpoint = new URL(`character/about/${resource.payload}`, HOST);
  }

  if (typeof filterFor === "object" && !Array.isArray(filterFor)) {
    for (const filter in filterFor) {
      endpoint.searchParams.append(filter, filterFor[filter]);
    }
  }
  return endpoint.href;
};

const handleErrorCode = (code) => {
  switch (code) {
    case 400:
      throw new Error(
        "Bad Request: The server could not understand the request"
      );

    case 404:
      throw new Error("Not Found: The requested resource could not be found");

    case 500:
      throw new Error(
        "Internal Server Error: An unexpected error occurred on the server"
      );

    default:
      break;
  }
};

const requestData = async (resource, filterFor = {}) => {
  try {
    const URL = buildURL(resource, filterFor);

    const res = await fetch(URL);
    const data = await res.json();

    handleErrorCode(res.status);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getCharacterCollection = async (filterFor = {}) => {
  try {
    const data = await requestData(
      { name: "character", payload: "" },
      filterFor
    );

    const parsedCharacterCollection = await Promise.all(
      data?.results.map(async (character) => {
        const { episode } = character;
        const firstSeenIn = await requestData({ url: episode[0] });

        return { ...character, firstSeenIn };
      })
    );

    return { ...data, results: parsedCharacterCollection };
  } catch (error) {
    throw error;
  }
};

export const getSingleCharacter = async (ID = 1) => {
  try {
    const data = await requestData({ name: "character", payload: ID });
    const { episode } = data;
    const firstSeenIn = await requestData({ url: episode[0] });

    return { ...data, firstSeenIn };
  } catch (error) {
    throw error;
  }
};

export const getAllLocation = async () => {
  try {
    const NUM_OF_LOCATIONS = 126;
    // This constant is defined for performance purposes, as the number of locations could be retrieved from the API, but that would slow down the initial data load.

    const data = await requestData({
      name: "location",
      payload: Array.from(
        Array(NUM_OF_LOCATIONS),
        (ignored, index) => index + 1
      ),
    });

    return data?.map(({ id, name, type, dimension }) => {
      return { id, name, type, dimension };
    });
  } catch (error) {
    throw error;
  }
};

export const getAllEpisode = async () => {
  try {
    const NUM_OF_EPISODES = 51;
    // This constant is defined for performance purposes, as the number of episodes could be retrieved from the API, but that would slow down the initial data load.

    const data = await requestData({
      name: "episode",
      payload: Array.from(
        Array(NUM_OF_EPISODES),
        (ignored, index) => index + 1
      ),
    });

    return data?.map(({ id, name, air_date, episode }) => {
      const match = episode?.match(/^S(\d{2})E(\d{2})$/);
      return { id, name, air_date, season: match[1], episode: match[2] };
    });
  } catch (error) {
    throw error;
  }
};

export const getCharacterDetail = async (ID = 1) => {
  try {
    const [basicInfo, detailedInfo] = await Promise.all([
      getSingleCharacter(ID),
      requestData({ name: "detail", payload: ID }),
    ]).catch((error) => new Error(error));

    return { ...basicInfo, ...detailedInfo };
  } catch (error) {
    throw error;
  }
};

export const getCharacterListFrom = async ({ resource, payload }) => {
  try {
    const data = await requestData({ name: resource, payload });

    const endpointList =
      data[resource === "location" ? "residents" : "characters"];

    const requestList = endpointList.map((characterEndpoint) => {
      return fetch(characterEndpoint)
        .then((res) => res.json())
        .catch((error) => error);
    });

    const characterList = await Promise.all(requestList);

    const parsedCharacterList = [];

    for (const resident of characterList) {
      const parsedCharacter = await getSingleCharacter(resident.id);

      parsedCharacterList.push(parsedCharacter);
    }

    return parsedCharacterList;
  } catch (error) {
    throw error;
  }
};
