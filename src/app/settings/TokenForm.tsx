import { Formik } from 'formik';
import * as Yup from 'yup';
import { requiredValidation } from '~/data/validations';

export default function TokenForm() {
  const initialValues = {
    name: '',
    description: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: requiredValidation,
        description: requiredValidation
      })}
    ></Formik>
  );
}
