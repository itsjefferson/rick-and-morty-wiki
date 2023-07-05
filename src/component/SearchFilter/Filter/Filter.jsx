import { useDispatch, useSelector } from "react-redux";

import { setCriterion } from "~/store/slice/search";

import style from "./Filter.module.scss";

const Filter = ({ criterion, content, selectedFilter, onClick }) => {
  const { criterion: globalFilter } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    dispatch(setCriterion({ [criterion]: e.target.textContent }));

    onClick(criterion);
  };

  return (
    <ul
      className={`${style.filterList} ${
        selectedFilter[criterion] && style.filterListVisible
      }`}
    >
      <div className={style.filterContainer}>
        {content?.map((option, index) => {
          const isActiveFilter = globalFilter[criterion] === option;
          return (
            <li key={index}>
              <button
                className={`${style.filterOption} ${
                  isActiveFilter && style.isActiveFilter
                }`}
                onClick={handleClick}
              >
                {option}
              </button>
            </li>
          );
        })}
      </div>
    </ul>
  );
};

export default Filter;
