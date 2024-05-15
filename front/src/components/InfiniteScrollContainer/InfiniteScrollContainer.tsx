import { InfiniteScrollContainerProps } from '../../types/InfiniteScrollProps';
import './InfiniteScrollContainer.css';

function InfiniteScrollContainer({ onScroll, containerRef, data }:
    InfiniteScrollContainerProps): JSX.Element {
  return (
    <div>
      <div
        className="container-inner"
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
