import ParticipantPreview from './components/ParticipantPreview';

function ParticipantsPage(): JSX.Element {
  return (
    <section className="participants-page">
      <div className="participants-row">
        <ParticipantPreview />
      </div>
    </section>
  );
}

export default ParticipantsPage;
