/* global google */
import cuid from 'cuid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: { address: '', latlang: null },
    venue: { address: '', latlang: null },
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required('City is required'),
    }),

    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required'),
    }),

    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: 'Bob',
                  attendees: [],
                  hostPhotoURL: '/assets/user.png',
                })
              );
          history.push('/events');
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content={'Event Details'} />
            <MyTextInput name='title' placeholder='Event title' />
            <MySelectInput
              name='category'
              placeholder='Category'
              options={categoryData}
            />
            <MyTextArea name='description' placeholder='Description' rows={3} />
            <Header sub color='teal' content={'Event location details'} />
            <MyPlaceInput name='city' placeholder='City' />
            <MyPlaceInput
              name='venue'
              placeholder='Venue'
              disabled={!values.city.latLng}
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment'],
              }}
            />
            <MyDateInput
              name='date'
              placeholderText='date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyyy h:mm a'
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              type='button'
              floated='right'
              content='Cancel'
              as={Link}
              to='/events'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
