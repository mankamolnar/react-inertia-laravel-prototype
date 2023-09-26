import React, { useState, useEffect, useRef } from 'react';
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const submitForm4 = Yup.object().shape({
  id: Yup.string().required('Please fill the test column'),
  test_column: Yup.string().required('Please fill the test column')
});

const ModifyPage = (props) => {

  

  const { data, setData, post } = useForm({
      id: props.row.id,
      test_column: props.row.test_column,
  });

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
    } else {
      post(`/modify-row`);
    }
    
  }, [data])

    return (
      <Formik
        initialValues={{...data}}
        validationSchema={submitForm4}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setData(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="hidden" name="id" />
            <Field type="text" name="test_column" />
            <ErrorMessage name="test_column" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    )
}

export default ModifyPage