import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm.jsx";
function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Controlled Form</h1>
      <RegistrationForm />

      <hr style={{ margin: "2rem 0" }} />

      <h1>Formik Form</h1>
      <FormikForm />
    </div>
  );
}

export default App;
