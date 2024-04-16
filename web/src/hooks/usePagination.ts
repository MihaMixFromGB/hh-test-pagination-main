import { useState } from "react";

type UsePaginationArgs = {
  start: number;
  end: number;
  limit: number;
};
export const usePagination = (props: UsePaginationArgs) => {
  const { start, end, limit } = props;
  const getPagesFromStart = getPages({ end, limit });

  const [pages, setPages] = useState(() => getPagesFromStart(start));
  const [active, setActive] = useState(start);

  const onSet = (page: number) => {
    if (page === active) return;
    setActive(page);
    const first = pages[0];
    const last = pages[pages.length - 1];
    if (page === first) {
      setPages(getPagesFromStart(first - 1));
    } else if (page === last) {
      setPages(getPagesFromStart(last - limit + 2));
    }
  };

  const onFirst = () => {
    setActive(1);
    setPages(getPagesFromStart(1));
  };

  const onPrev = () => {
    onSet(active - 1);
  };

  const onNext = () => {
    onSet(active + 1);
  };

  const onLast = () => {
    setActive(end);
    setPages(getPagesFromStart(end - limit + 1));
  };

  return {
    pages,
    active,
    onSet,
    onFirst: active === 1 ? undefined : onFirst,
    onPrev: active === 1 ? undefined : onPrev,
    onNext: active === end ? undefined : onNext,
    onLast: active === end ? undefined : onLast,
  };
};

type GetPagesArgs = Omit<UsePaginationArgs, "start">;
function getPages({ end, limit }: GetPagesArgs) {
  return function getPagesFromStart(start: UsePaginationArgs["start"]) {
    let startPage = start;
    if (startPage < 1) startPage = 1;
    else if (startPage + limit - 1 > end) startPage = end - limit + 1;

    return Array.from({ length: limit }).map((_, idx) => startPage + idx);
  };
}
