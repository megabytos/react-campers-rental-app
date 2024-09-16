import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import * as Yup from 'yup';
import Button from '../Button/Button';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import 'react-datepicker/dist/react-datepicker.css';
import css from './ProductForm.module.css';
import './ProductForm.css';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  date: null,
  comment: '',
};

const FormSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Please enter minimum 3 characters').trim().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  date: Yup.date().required('Booking date is required'),
  comment: Yup.string().trim(),
});

export default function ProductForm() {
  const [startDate, setStartDate] = useState(null);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate());

  const handleSubmit = (values, { resetForm }) => {
    toast.success(`Thank you ${values.name}! Your booking has been confirmed!`);
    resetForm();
    setStartDate(null);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h4 className={css.title}>Book your campervan now</h4>
        <p className={css.text}>Stay connected! We are always ready to help you.</p>
      </div>
      <Formik initialValues={INITIAL_FORM_DATA} validationSchema={FormSchema} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.field}>
              <Field className={css.input} type="text" name="name" placeholder="Name*" />
              <ErrorMessage className={css.error} name="name" component="span" />
            </div>
            <div className={css.field}>
              <Field className={css.input} type="email" name="email" placeholder="Email*" />
              <ErrorMessage className={css.error} name="email" component="span" />
            </div>

            <div className={css.field}>
              <DatePicker
                selected={startDate}
                closeOnScroll={true}
                onChange={date => {
                  setStartDate(date);
                  setFieldValue('date', date);
                }}
                startDate={today}
                minDate={tomorrow}
                dateFormat="MMMM d, yyyy"
                highlightDates={[today]}
                placeholderText="Booking date*"
                className={css.input}
              />
              <ErrorMessage className={css.error} name="date" component="span" />
            </div>

            <div className={css.field}>
              <Field className={clsx(css.input, css.comment)} as="textarea" name="comment" placeholder="Comment" />
            </div>
            <Button selfcenter type="submit">
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
