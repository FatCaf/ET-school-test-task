import { Participant } from '../../../types/Participant';
import './ParticipantPreview.css';

function ParticipantPreview({ name, email }: Participant): JSX.Element {
  return (
    <div className="participant-preview">
      <div className="participant-info">
        <h4>{name}</h4>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default ParticipantPreview;
