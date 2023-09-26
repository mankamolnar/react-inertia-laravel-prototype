import React, { useState, useEffect, useRef } from 'react';
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const submitForm4 = Yup.object().shape({
  testColumn: Yup.string().required('Please fill the test column')
});

const Test = (props) => {
  
    const { data, setData, post } = useForm({
        testColumn: "",
    });
    const firstRender = useRef(true);

    useEffect(() => {
      if (firstRender.current === true) {
        firstRender.current = false;
      } else {
        post("/test-save");
      }
      
    }, [data])

    // function handleSubmit(e) {
    //   e.preventDefault();
    //   post("/test-save");
    // }

    return (
        <div>
          <div>
            {
              props.data.map(currentData => <h1>{currentData}</h1>)
            }
          </div>
          <hr />

          <Formik
            initialValues={{...data}}
            validationSchema={submitForm4}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values)
              setData(values);
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   // router.post("/list", values);
              //   setData(values);
              // }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="testColumn" />
                <ErrorMessage name="testColumn" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          
        </div>
    )
}

export default Test