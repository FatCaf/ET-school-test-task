function EventRegPage(): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
  };
  return (
    <section className="event-reg-page">
      <div className="form-row">
        <form onSubmit={handleSubmit}>
          <label id="fullName">
            Full name
            <input type="text" name="fullName" id="fullName" onChange={handleChange} />
          </label>
          <label id="email">
            Email
            <input type="email" name="email" id="email" onChange={handleChange} />
          </label>
          <label id="dob">
            Date of birth
            <input type="date" name="dob" id="dob" onChange={handleChange} />
          </label>
          <fieldset>
            <legend>Where did you hear about this event?</legend>
            <div>
              <input type="checkbox" name="social" id="social" />
              <label htmlFor="social">Social media</label>
            </div>
            <div>
              <input type="checkbox" name="friends" id="friends" />
              <label htmlFor="friends">Friends</label>
            </div>
            <div>
              <input type="checkbox" name="myself" id="myself" />
              <label htmlFor="myself">Myself</label>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default EventRegPage;
