/* eslint-disable no-underscore-dangle */
import { useLocation } from 'react-router-dom';
import { Participant } from '../../types/Participant';
import './ParticipantsPage.css';
import ParticipantPreview from './components/ParticipantPreview';

function ParticipantsPage(): JSX.Element {
  const participants: Participant[] = useLocation().state;

  return (
    <section className="participants-page">
      <div className="title">
        <h1>They will go to the event</h1>
      </div>
      <div className="participants-row">
        {participants
        && participants.map((participant) => (
          <ParticipantPreview
            key={participant._id}
            {...participant}
          />
        ))}
      </div>
    </section>
  );
}

export default ParticipantsPage;
