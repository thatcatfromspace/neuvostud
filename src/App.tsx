import LandingPage from "./pages/Landing";
import MarkdownEditor from "./pages/MarkdownEditor";
import OnboardingPage from "./pages/Onboarding";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/editor" element={<MarkdownEditor />} />
      </Routes>
    </Router>
  );
}
export default App;
