import { Link } from 'react-router-dom';
import { EventType } from '../../../types/EventType';
import './EventPreview.css';

function EventPreview({
  _id, title, description, date, organizer, participants,
}: EventType): JSX.Element {
  return (
    <div className="event-preview">
      <div className="preview-title">
        <h4>{title}</h4>
      </div>
      <div className="event-info">
        <p className="description">{description}</p>
        <p>
          {`Organized by: ${organizer}`}
        </p>
        <p>{`Start at: ${new Date(date).toDateString()}`}</p>
      </div>
      <div className="controls">
        <Link to={`/event-reg-form/${_id}`} className="register">Register</Link>
        <Link to={`/participants/${_id}`} state={participants} className="view">View</Link>
      </div>
    </div>
  );
}

export default EventPreview;
