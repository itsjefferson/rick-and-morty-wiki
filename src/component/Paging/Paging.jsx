import { useSelector } from "react-redux";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Paging = () => {
  const pagingInfo = useSelector((state) => state.paging);

  return (
    <div>
      {pagingInfo.prevURL && (
        <button onClick={() => handleClick(pagingInfo.prevURL)}>
          <IoIosArrowBack style={{ scale: "1.5" }} />
          Prev
        </button>
      )}
      <p>
        <span>{`${pagingInfo.currentPage}\n`}</span>
        {pagingInfo.pageCount && pagingInfo.pageCount !== 1 && (
          <>
            of <span>&nbsp;{pagingInfo.pageCount}</span>
          </>
        )}
      </p>
      {pagingInfo.nextURL && (
        <button onClick={() => handleClick(pagingInfo.nextURL)}>
          Next <IoIosArrowForward style={{ scale: "1.5" }} />
        </button>
      )}
    </div>
  );
};

export default Paging;
