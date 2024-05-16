import { MutableRefObject, ReactNode } from 'react';

export type InfiniteScrollContainerProps = {
    onScroll: () => void,
    containerRef: MutableRefObject<HTMLDivElement | null>,
    data: ReactNode[]
}
