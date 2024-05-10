import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z_ ]*$/, "No special characters Allowed.")
    .min(2, "Name must between 2 and 16 characters.")
    .max(16, "Name must be between 2 and 16 characters."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email Address is required."),
  status: Yup.string().max(64, "Status must be less than 64 Characters."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/^.{6,}$/, "Password must contain at least 6 characters"),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email Address is required."),

  password: Yup.string().required("Password is required."),
});
