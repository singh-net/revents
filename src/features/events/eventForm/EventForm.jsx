import cuid from 'cuid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

export default function EventForm({
  setFormOpen,
  setEvents,
  createEvent,
  selectedEvent,
  updateEvent,
}) {
  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const [values, setValues] = useState(initialValues);

  function handleFormSubmit() {
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...values })
      : createEvent({
          ...values,
          id: cuid(),
          hostedBy: 'Bob',
          attendees: [],
          hostPhotoURL: '/assets/user.png',
        });
    setFormOpen(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type='text'
            placeholder='Event Title'
            value={values.title}
            name='title'
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='category'
            value={values.category}
            onChange={(e) => handleInputChange(e)}
            placeholder='Category'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='description'
            value={values.description}
            onChange={(e) => handleInputChange(e)}
            placeholder='Description'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='city'
            value={values.city}
            onChange={(e) => handleInputChange(e)}
            placeholder='City'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='venue'
            value={values.venue}
            onChange={(e) => handleInputChange(e)}
            placeholder='Venue'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='date'
            name='date'
            value={values.date}
            onChange={(e) => handleInputChange(e)}
            placeholder='Date'
          />
        </Form.Field>
        <Button type='submit' floated='right' positive content='Submit' />
        <Button
          type='button'
          floated='right'
          content='Cancel'
          as={Link}
          to='/events'
        />
      </Form>
    </Segment>
  );
}
