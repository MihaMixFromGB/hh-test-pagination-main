import BSPagination from "react-bootstrap/Pagination";

type PaginationProps = {
  pages: number[];
  active: number;
  onSet: (page: number) => void;
  onFirst?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onLast?: () => void;
};

export default function Pagination({ pages, active, onSet, onFirst, onPrev, onNext, onLast }: PaginationProps) {
  return (
    <BSPagination>
      <BSPagination.First disabled={!onFirst} onClick={onFirst} />
      <BSPagination.Prev disabled={!onPrev} onClick={onPrev} />
      {pages.map((p) => (
        <BSPagination.Item key={p} active={p === active} onClick={() => onSet(p)}>
          {p}
        </BSPagination.Item>
      ))}
      <BSPagination.Next disabled={!onNext} onClick={onNext} />
      <BSPagination.Last disabled={!onLast} onClick={onLast} />
    </BSPagination>
  );
}
