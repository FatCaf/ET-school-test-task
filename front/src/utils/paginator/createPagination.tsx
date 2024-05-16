import React, { Dispatch, ReactNode, SetStateAction } from 'react';

type PaginatorParams = {
  availablePages: number,
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSkipOffset: Dispatch<SetStateAction<boolean>>;
  setPreventScroll: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
}

const createPagination = (
  {
    availablePages, setCurrentPage, setSkipOffset, setPreventScroll, currentPage,
  }: PaginatorParams,
): ReactNode[] => {
  const activePageColor = 'blueviolet';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setCurrentPage(Number(e.currentTarget.id));
    setPreventScroll(true);
    setSkipOffset(false);
    setPreventScroll(false);
  };

  const paginationArray = [];
  for (let i = 0; i < availablePages; i++) {
    const isActive = i === currentPage;
    const paginationItem: ReactNode = (
      <button
        type="button"
        id={`${i}`}
        key={i}
        style={{ backgroundColor: isActive ? activePageColor : 'initial', border: 'none' }}
        onClick={handleClick}
      >
        {i + 1}
      </button>
    );
    paginationArray.push(paginationItem);
  }

  return paginationArray;
};

export default createPagination;
