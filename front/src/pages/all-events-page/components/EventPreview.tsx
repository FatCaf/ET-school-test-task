import { Link } from 'react-router-dom';
import { EventType } from '../../../types/EventType';
import './EventPreview.css';

function EventPreview({
  _id, title, description, date, organizer, participants,
}: EventType): JSX.Element {
  return (
    <div className="event-preview">
      <div className="title">
        <h4>{title}</h4>
        <p>{description}</p>
        <p>
          Organized by:
          {organizer}
        </p>
        <p>{date}</p>
      </div>
      <div className="controls">
        <Link to={`/event-reg-form/${_id}`}>Register</Link>
        <Link to="/participants" state={participants}>View</Link>
      </div>
    </div>
  );
}

export default EventPreview;
