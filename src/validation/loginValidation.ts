type ErrorType = {
  email?: string;
  password?: string;
};

export const loginValidation = (values: {
  email: string;
  password: string;
}) => {
  const errors: ErrorType = {};
  if (!values.email) errors.email = "Email Required!";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }
  if (!values.password) errors.password = "Password Required!";
  return errors;
};
