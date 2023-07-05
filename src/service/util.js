export const getPageNumberFromURL = (URL) => {
  const paramList = new URLSearchParams(new URL(URL).search);
  return parseInt(paramList.get("page"), 10);
};
