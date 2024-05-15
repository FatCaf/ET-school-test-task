import { ReactElement } from 'react';
import EventPreview from '../pages/all-events-page/components/EventPreview';
import { EventType } from '../types/EventType';

const createEventsPreviews = (events: EventType[] | undefined): ReactElement[] | [] => {
  const eventsPreviews: ReactElement[] = [];

  if (!events) return [];

  events.forEach((item) => {
    const event = <EventPreview key={item._id} {...item} />;

    eventsPreviews.push(event);
  });

  return eventsPreviews;
};

export default createEventsPreviews;
