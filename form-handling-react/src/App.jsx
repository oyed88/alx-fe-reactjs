import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="3" fill="#6366f1" />
              <rect x="18" y="2" width="12" height="12" rx="3" fill="#8b5cf6" />
              <rect x="2" y="18" width="12" height="12" rx="3" fill="#a78bfa" />
              <rect x="18" y="18" width="12" height="12" rx="3" fill="#c4b5fd" />
            </svg>
            <span>ReactForms</span>
          </div>
          <nav className="header-nav">
            <a href="#controlled">Controlled</a>
            <a href="#formik">Formik</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1>
            Form Handling
            <br />
            <span className="gradient-text">in React</span>
          </h1>
          <p className="hero-sub">
            Two approaches to building robust registration forms — controlled
            components vs. Formik with Yup validation.
          </p>

          <div className="approach-pills">
            <span className="pill pill-blue">useState</span>
            <span className="divider">→</span>
            <span className="pill pill-purple">Formik + Yup</span>
          </div>
        </section>

        <div className="forms-grid">
          <section id="controlled">
            <div className="section-label">
              <span className="step-num">01</span>
              <div>
                <h3>Controlled Components</h3>
                <p>Manual state management with React useState</p>
              </div>
            </div>
            <RegistrationForm />
          </section>

          <section id="formik">
            <div className="section-label">
              <span className="step-num step-num-purple">02</span>
              <div>
                <h3>Formik + Yup</h3>
                <p>Schema-based validation with Formik</p>
              </div>
            </div>
            <FormikForm />
          </section>
        </div>

        <section className="comparison">
          <h2>Approach Comparison</h2>
          <div className="comparison-grid">
            <div className="comparison-card">
              <div className="comparison-icon">⚙️</div>
              <h4>Controlled Components</h4>
              <ul>
                <li>Manual useState per field</li>
                <li>Custom validation logic</li>
                <li>Full control over behavior</li>
                <li>More boilerplate code</li>
                <li>Great for simple forms</li>
              </ul>
            </div>
            <div className="comparison-card comparison-card-highlight">
              <div className="comparison-icon">✨</div>
              <h4>Formik + Yup</h4>
              <ul>
                <li>Built-in state management</li>
                <li>Schema-based validation</li>
                <li>Less boilerplate code</li>
                <li>Touch & dirty tracking</li>
                <li>Scales for complex forms</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built for <strong>alx-fe-reactjs</strong> · form-handling-react
        </p>
      </footer>
    </div>
  );
}

export default App;
