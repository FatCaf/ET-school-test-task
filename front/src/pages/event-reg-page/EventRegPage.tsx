import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import eventApi from '../../api/request';
import { EventReg } from '../../types/EventReg';
import { emailRegexp } from '../../utils/emailRegexp';
import { nameRegexp } from '../../utils/nameRegexp';
import './EventRegPage.css';

function EventRegPage(): JSX.Element {
  const [formData, setFormData] = useState<EventReg>({
    name: '',
    email: '',
    dob: '',
    where_heard: '',
  });
  const { eventId } = useParams();
  const currentDate = new Date().toISOString().substring(0, 10);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.email.match(emailRegexp)) {
      toast.error('Email is invalid');
      return;
    } if (!formData.name.match(nameRegexp)) {
      toast.error('Full name is invalid');
      return;
    }

    await eventApi.post(`/event-reg-form/${eventId}`, formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section className="event-reg-page">
      <form onSubmit={handleSubmit} className="reg-form">
        <h4>Event registration form</h4>
        <div className="form-fields">
          <label id="name">
            Full name
            <input type="text" name="name" id="name" maxLength={24} required onChange={handleChange} />
          </label>
          <label id="email">
            Email
            <input type="email" name="email" id="email" required onChange={handleChange} />
          </label>
          <label id="dob">
            Date of birth
            <input type="date" name="dob" id="dob" max={currentDate} required onChange={handleChange} />
          </label>
          <fieldset>
            <legend>Where did you hear about this event?</legend>
            <div className="fieldset-item">
              <input type="radio" name="where_heard" id="social" value="social media" required onChange={handleChange} />
              <label htmlFor="social">Social media</label>
            </div>
            <div className="fieldset-item">
              <input type="radio" name="where_heard" id="friends" value="friends" required onChange={handleChange} />
              <label htmlFor="friends">Friends</label>
            </div>
            <div className="fieldset-item">
              <input type="radio" name="where_heard" id="myself" value="myself" required onChange={handleChange} />
              <label htmlFor="myself">Myself</label>
            </div>
          </fieldset>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default EventRegPage;
