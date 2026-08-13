/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import Projects from "./pages/Projects";
import { AnimatePresence } from "framer-motion";
import { prefetch } from "./hooks/useSanityData";
import { queries } from "./lib/queries";
import ScrollToTop from "./components/layout/ScrollToTop";

// Start fetching projects immediately on app load — data will be
// cached and ready by the time components mount
prefetch(queries.projects);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
