import { MutableRefObject, ReactNode } from 'react';

type InfiniteScrollContainerProps = {
    onScroll: () => void,
    containerRef: MutableRefObject<HTMLDivElement | null>,
    data: ReactNode[]
}

function InfiniteScrollContainer({ onScroll, containerRef, data }:
    InfiniteScrollContainerProps): JSX.Element {
  return (
    <div>
      <div
        className="containerInner"
        onScroll={onScroll}
        ref={containerRef}
        style={{ height: '100dvh', overflowY: 'scroll' }}
      >
        {data && data.map((node) => node)}
      </div>
    </div>
  );
}

export default InfiniteScrollContainer;
