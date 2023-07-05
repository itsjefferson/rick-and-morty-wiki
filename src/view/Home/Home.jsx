import SearchBar from "~/component/SearchBar/SearchBar";
import CardGrid from "~/component/CardGrid/CardGrid";
import SearchFilter from "~/component/SearchFilter/SearchFilter";
import Paging from "~/component/Paging/Paging";

const Home = () => {
  return (
    <>
      <SearchBar />
      <CardGrid />
      <SearchFilter />
      <Paging />
    </>
  );
};

export default Home;
