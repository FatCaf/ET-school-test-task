/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import eventApi from '../../api/request';
import { ChartData } from '../../types/ChartData';
import { Participant } from '../../types/Participant';
import './ParticipantsPage.css';
import ParticipantPreview from './components/ParticipantPreview';

function ParticipantsPage(): JSX.Element {
  const defaultState: Participant[] = useLocation().state;
  const [participants, setParticipants] = useState<Participant[]>([
    ...defaultState,
  ]);
  const [chartData, setChartData] = useState<ChartData[]>();
  const { eventId } = useParams();
  const [formData, setFormData] = useState<{ searchParam: string }>();

  useEffect(() => {
    const getChartData = async (): Promise<void> => {
      const response: ChartData[] = await eventApi.get(`/participants/${eventId}/stats`);

      setChartData(response);
    };

    getChartData();
  }, [eventId]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const response: Participant = await eventApi.post(
      `/participants/${eventId}`,
      formData,
    );

    if (response) setParticipants([response]);
  };

  return (
    <section className="participants-page">
      <div className="title">
        <h1>They will go to the event</h1>
      </div>
      <form onSubmit={handleSubmit} className="find-participant">
        <label id="searchParam">
          Participant search
          <input
            type="text"
            name="searchParam"
            id="searchParam"
            placeholder="Enter name or email"
            onChange={
              (
                e: React.ChangeEvent<HTMLInputElement>,
              ) => setFormData(
                { searchParam: e.target.value },
              )
            }
          />
        </label>
        <button type="submit">Find</button>
      </form>
      <div className="stat-chart">
        {chartData && chartData.map((item) => (
          <div className="chart-item">
            <p>{item.createdAt}</p>
            <div className="chart-bar" style={{ width: item.regCount * 10 }} />
          </div>
        ))}
      </div>
      <div className="participants-row">
        {participants && participants.map((participant) => (
          <ParticipantPreview key={participant._id} {...participant} />))}
      </div>
    </section>
  );
}

export default ParticipantsPage;
