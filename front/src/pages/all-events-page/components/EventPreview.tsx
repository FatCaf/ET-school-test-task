import { Link } from 'react-router-dom';

function EventPreview(): JSX.Element {
  return (
    <div className="event-preview">
      <div className="title">
        <h4>Title</h4>
        <p>Description</p>
        <p>Organized by</p>
      </div>
      <div className="controls">
        <Link to="/event-reg-page">Register</Link>
        <Link to="/participants">View</Link>
      </div>
    </div>
  );
}

export default EventPreview;
