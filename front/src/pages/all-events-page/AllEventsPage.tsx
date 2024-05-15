/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import eventApi from '../../api/request';
import { EventType } from '../../types/EventType';
import createPagination from '../../utils/paginator/createPagination';
import './AllEventsPage.css';
import EventPreview from './components/EventPreview';

function AllEventsPage(): JSX.Element {
  const [events, setEvents] = useState<EventType[]>();
  const [sortBy, setSortBy] = useState('');
  const [availablePages, setAvailablePages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getEvents = async (): Promise<void> => {
      const response: { events: EventType[], pages: number } = await eventApi.get(
        `events?quantity=12&page=${currentPage}&sortBy=${sortBy.length > 0 ? sortBy : ''}`,
      );

      setEvents(response.events);
      setAvailablePages(response.pages);
    };

    getEvents();
  }, [availablePages, currentPage, sortBy]);

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
      <div className="events-row">
        {events && events.map((event) => <EventPreview key={event._id} {...event} />)}
      </div>
      <div className="pagination">
        {createPagination({ availablePages, setCurrentPage }).map((item) => item)}
      </div>
    </section>
  );
}

export default AllEventsPage;
