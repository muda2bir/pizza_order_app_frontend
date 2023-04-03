type ErrorType = {
  email?: string;
  password?: string;
  cpassword?: string;
};

export const registerValidation = (values: {
  email: string;
  password: string;
  cpassword: string;
}) => {
  const errors: ErrorType = {};
  if (!values.email) errors.email = "Email Required!";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }
  if (!values.password) errors.password = "Password Required!";
  else if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/gm.test(
      values.password
    )
  ) {
    errors.password =
      "Password should contain at least one number, one special character and should be 6 to 16 characters long!";
  }

  if (values.password !== values.cpassword) {
    errors.cpassword = "Password are not matching!";
  }
  return errors;
};
