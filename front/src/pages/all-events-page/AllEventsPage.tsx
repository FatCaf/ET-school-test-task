import EventPreview from './components/EventPreview';

function AllEventsPage(): JSX.Element {
  return (
    <section className="all-events-page">
      <div className="events-row">
        <EventPreview />
      </div>
      <div className="pagination">
        There will be pagination
      </div>
    </section>
  );
}

export default AllEventsPage;
