import { Participant } from '../../../types/Participant';
import './ParticipantPreview.css';

function ParticipantPreview({ name, email }: Participant): JSX.Element {
  return (
    <div className="participant-preview">
      <div className="participant-info">
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default ParticipantPreview;
