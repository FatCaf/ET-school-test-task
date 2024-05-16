import {
  useEffect, useRef, useState,
} from 'react';
import eventApi from '../../api/request';
import InfiniteScrollContainer from '../../components/InfiniteScrollContainer/InfiniteScrollContainer';
import { EventType } from '../../types/EventType';
import createEventsPreviews from '../../utils/eventPreviewCreator';
import createPagination from '../../utils/paginator/createPagination';
import './AllEventsPage.css';

function AllEventsPage(): JSX.Element {
  const [events, setEvents] = useState<EventType[]>();
  const [sortBy, setSortBy] = useState('');
  const [skipOffset, setSkipOffset] = useState(false);
  const [preventScroll, setPreventScroll] = useState(false);
  const [availablePages, setAvailablePages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = (): void => {
    if (containerRef.current) {
      containerRef.current.scroll({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const getEvents = async (): Promise<void> => {
      const response: { events: EventType[], pages: number } = await eventApi.get(
        `events?quantity=12&page=${currentPage}${sortBy.length > 0 ? `&sortBy=${sortBy}` : ''}`,
      );

      if (!skipOffset) scrollToTop();

      if (sortBy.length > 0) {
        setEvents(response.events);
      } else {
        setEvents((prevEvents) => (skipOffset
          && prevEvents ? [...prevEvents, ...response.events] : response.events));
      }

      setAvailablePages(response.pages);
    };

    getEvents();
  }, [availablePages, currentPage, skipOffset, sortBy]);

  const eventsPreviews = createEventsPreviews(events);

  const onScroll = (): void => {
    if (containerRef.current && !preventScroll) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if (currentPage + 1 < availablePages) setCurrentPage(currentPage + 1);
        setSkipOffset(true);
      }
    }
  };

  return (
    <section className="all-events-page">
      <div className="title">
        <h1>Events</h1>
      </div>
      <div className="sort-bar">
        <select
          name="sort"
          id="sort"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="placeholder" disabled>Sort events</option>
          <option value="title">Sort by title (A-Z)</option>
          <optgroup label="Sort by date:">
            <option value="nearest">Nearest</option>
            <option value="furthest">Furthest</option>
          </optgroup>
          <option value="organizer">Sort by organizer (A-Z)</option>
        </select>
      </div>
      <InfiniteScrollContainer
        onScroll={onScroll}
        containerRef={containerRef}
        data={eventsPreviews}
      />
      <div className="pagination">
        {createPagination({
          availablePages, setCurrentPage, setSkipOffset, setPreventScroll, currentPage,
        }).map((item) => item)}
      </div>
    </section>
  );
}

export default AllEventsPage;
