import { Dispatch, ReactNode, SetStateAction } from 'react';

type PaginatorParams = {
  availablePages: number,
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSkipOffset: Dispatch<SetStateAction<boolean>>;
  setPreventScroll: Dispatch<SetStateAction<boolean>>;
}

const createPagination = (
  {
    availablePages, setCurrentPage, setSkipOffset, setPreventScroll,
  }: PaginatorParams,
): ReactNode[] => {
  const paginationArray = [];
  for (let i = 0; i < availablePages; i++) {
    const paginationItem: ReactNode = (
      <button
        type="button"
        id={`${i}`}
        key={i}
        onClick={
            (e: React.MouseEvent<HTMLButtonElement>) => {
              setCurrentPage(Number(e.currentTarget.id));
              setPreventScroll(true);
              setSkipOffset(false);
            }
          }
      >
        {i + 1}
      </button>
    );
    paginationArray.push(paginationItem);
  }

  return paginationArray;
};

export default createPagination;
