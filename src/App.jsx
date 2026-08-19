import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { prefetch } from "./hooks/useSanityData";
import { queries } from "./lib/queries";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";

const Projects = lazy(() => import("./pages/Projects"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));

// Start fetching projects immediately on app load — data will be
// cached and ready by the time components mount
prefetch(queries.projects);

const RouteFallback = () => (
  <div className="min-h-screen bg-black" aria-hidden="true" />
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="/project/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProjectPage />
            </Suspense>
          }
        />
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
