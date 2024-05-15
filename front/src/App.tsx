import { Route, Routes } from 'react-router-dom';
import './App.css';
import AllEventsPage from './pages/all-events-page/AllEventsPage';
import EventRegPage from './pages/event-reg-page/EventRegPage';
import Layout from './pages/layout/Layout';
import ParticipantsPage from './pages/participants-page/ParticipantsPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<AllEventsPage />} index />
        <Route path="event-reg-form/:eventId" element={<EventRegPage />} />
        <Route path="participants/:eventId" element={<ParticipantsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
