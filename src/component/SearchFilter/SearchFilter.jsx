import { useState, useEffect } from "react";

import { unsetCriterion } from "~/store/slice/search";
import { useDispatch, useSelector } from "react-redux";

import Filter from "./Filter/Filter";

import style from "./SearchFilter.module.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const SearchFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState({});
  const [showComponent, setShowComponent] = useState(false);

  const { searchCriteria } = useSelector((state) => state.search);
  const { criterion: globalFilter } = useSelector((state) => state.search);

  const isFirstPropertyTrue = Object.values(selectedFilter)[0] === true;
  const anyActiveFilter = Object.values(globalFilter).some(
    (filter) => filter !== ""
  );

  const dispatch = useDispatch();

  const handleClick = (criterion) => {
    setSelectedFilter({
      [criterion]: !selectedFilter[criterion],
    });
  };

  const handleOtherClick = () => {
    if (anyActiveFilter) {
      dispatch(unsetCriterion());
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollThreshold = 375;

      if (scrollY > scrollThreshold) {
        setShowComponent(true);
      } else {
        setShowComponent(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showComponent) {
    return null;
  }

  return (
    <ul
      className={`${style.filterContainer} ${
        isFirstPropertyTrue ? style.filterOpen : ""
      }`}
    >
      <li
        className={`${style.listTitle} ${anyActiveFilter && style.clearFilter}`}
        onClick={handleOtherClick}
      >
        {anyActiveFilter ? "Clear" : "Filter"}
      </li>
      <div className={style.filterOptionContainer}>
        {Object.entries(searchCriteria).map(([criterion, content], index) => (
          <li
            className={`${style.filter} ${
              selectedFilter[criterion] && style.selectedFilter
            }`}
            onClick={() => handleClick(criterion)}
            key={index}
          >
            <span>{criterion}</span>
            <Filter
              criterion={criterion}
              content={content}
              selectedFilter={selectedFilter}
              onClick={handleClick}
            />
            {selectedFilter[criterion] ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </li>
        ))}
      </div>
    </ul>
  );
};

export default SearchFilter;
