import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup validation schema
const registrationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const FormikForm = () => {
  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      // Mock API endpoint simulation
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Formik submitting to mock API:", values);
      setStatus({ type: "success", message: "Registration successful! Welcome aboard." });
      resetForm();
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card formik-card">
        <div className="form-header">
          <div className="badge badge-formik">Formik + Yup</div>
          <h2>Create Account</h2>
          <p>Register using Formik validation</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form noValidate>
              {status?.type === "success" && (
                <div className="alert alert-success">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {status.message}
                </div>
              )}

              {status?.type === "error" && (
                <div className="alert alert-error">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {status.message}
                </div>
              )}

              <div className="field-group">
                <label htmlFor="formik-username">Username</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <Field
                    type="text"
                    id="formik-username"
                    name="username"
                    placeholder="johndoe"
                    autoComplete="username"
                    className="formik-field"
                  />
                </div>
                <ErrorMessage name="username" component="span" className="error-msg" />
              </div>

              <div className="field-group">
                <label htmlFor="formik-email">Email Address</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <Field
                    type="email"
                    id="formik-email"
                    name="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    className="formik-field"
                  />
                </div>
                <ErrorMessage name="email" component="span" className="error-msg" />
              </div>

              <div className="field-group">
                <label htmlFor="formik-password">Password</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <Field
                    type="password"
                    id="formik-password"
                    name="password"
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    className="formik-field"
                  />
                </div>
                <ErrorMessage name="password" component="span" className="error-msg" />
              </div>

              <button type="submit" className="submit-btn submit-btn-formik" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner" />
                    Registering...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormikForm;
