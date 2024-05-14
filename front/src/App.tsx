import { Route, Routes } from 'react-router-dom';
import './App.css';
import AllEventsPage from './pages/all-events-page/AllEventsPage';
import EventRegPage from './pages/event-reg-page/EventRegPage';
import ParticipantsPage from './pages/participants-page/ParticipantsPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<AllEventsPage />} index />
      <Route path="/event-reg-from" element={<EventRegPage />} />
      <Route path="/participants" element={<ParticipantsPage />} />
    </Routes>
  );
}

export default App;
