import { useState } from 'react';

const useForm = (callback) => {
  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    console.log('Generic submit handler ...');
    e.preventDefault();
    e.target.reset();

    callback(values);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log('Generic Change Handler ...');
  };

  // return [handleSubmit, handleInputChange, values];
  return [handleSubmit, handleInputChange];
};

export default useForm;
