/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import eventApi from '../../api/request';
import { EventType } from '../../types/EventType';
import createPagination from '../../utils/paginator/createPagination';
import './AllEventsPage.css';
import EventPreview from './components/EventPreview';

function AllEventsPage(): JSX.Element {
  const [events, setEvents] = useState<EventType[]>();
  const [availablePages, setAvailablePages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getEvents = async (): Promise<void> => {
      const response: { events: EventType[], pages: number } = await eventApi.get(
        `events?quantity=12&page=${currentPage}`,
      );

      setEvents(response.events);
      setAvailablePages(response.pages);
    };

    getEvents();
  }, [availablePages, currentPage]);

  return (
    <section className="all-events-page">
      <div className="title">
        <h1>Events</h1>
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
