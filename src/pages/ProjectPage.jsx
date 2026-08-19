import { useParams, Link } from "react-router-dom";
import { useProject, useProjects } from "../hooks/useProjects";
import {
  PageTransition,
  Header,
  Footer,
  Button,
  Badge,
  LoadingSpinner,
} from "../components";
import CaseStudyContent from "../components/project/CaseStudyContent";
import MarqueeGallery from "../components/sections/MarqueeGallery";
import { glowCardClass, TopGlow } from "../components/ui/GlowCard";
import { getCategoryLabel } from "../utils/categoryLabel";
import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { urlForOrNull } from "../lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

// Load the lightbox styles only when the lightbox is first opened.
const Lightbox = lazy(() =>
  import("yet-another-react-lightbox").then((module) =>
    import("yet-another-react-lightbox/styles.css").then(() => module),
  ),
);

const ProjectPage = () => {
  const { slug } = useParams();
  const { project, loading, error } = useProject(slug);
  const { projects } = useProjects();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef();
  const messageRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const index = projects?.findIndex((p) => p.slug?.current === slug) ?? -1;
  const prev =
    index > 0 && projects[index - 1]?.slug?.current
      ? projects[index - 1]
      : null;
  const next =
    index >= 0 && index < (projects?.length ?? 0) - 1 && projects[index + 1]?.slug?.current
      ? projects[index + 1]
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      formRef.current.reset();
      if (messageRef.current) messageRef.current.style.height = "auto";
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        <LoadingSpinner />
      </div>
    );
  if (error || !project)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
        Project not found{" "}
        <Link to="/" className="mt-4 text-primary-400 underline decoration-primary-400/50 underline-offset-4">
          Go Home
        </Link>
      </div>
    );

  const galleryImages =
  project.gallery
    ?.map((img) => urlForOrNull(img, { width: 640, quality: 80 }))
    .filter(Boolean) || [];

const slides = galleryImages.map((src) => ({ src }));

  return (
    <div className="min-h-screen text-white bg-black">
      <Header />
      <PageTransition>
        <div className="px-4 mb-8">
          <div className="mx-auto max-w-7xl">
            <Link
              to="/projects"
              className="inline-flex items-center mb-6 transition-colors text-neutral-400 hover:text-white underline decoration-neutral-500 underline-offset-4"
            >
              <HugeiconsIcon
                icon={ArrowLeft02Icon}
                size={18}
                color="currentColor"
                className="mr-2"
              />{" "}
              Back to Projects
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-4xl font-bold md:text-6xl"
            >
              {project.title}
            </motion.h1>
            <div className="flex flex-wrap gap-3">
              {project.category && <Badge>{getCategoryLabel(project.category)}</Badge>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 /px-6 mx-auto mt-12 max-w-7xl /md:px-12 /lg:px-20 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-12 lg:col-span-2">
              <div className="my-8 flex justify-center">
                {urlForOrNull(project.featuredImage, { width: 700, quality: 85 }) && (
                  <img
                    src={urlForOrNull(project.featuredImage, { width: 700, quality: 85 })}
                    alt={project.title}
                    className="max-w-md w-full h-auto rounded-md"
                  />
                )}
              </div>
              {project.caseStudy ? (
                <CaseStudyContent value={project.caseStudy} />
              ) : (
                <p className="text-lg md:text-xl text-neutral-400">
                  {project.description}
                </p>
              )}

              {/* Gallery — infinite marquee */}
              {galleryImages.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold">Project Gallery</h3>
                  <MarqueeGallery
                    items={galleryImages.map((src, idx) => ({
                      key: `g-${idx}`,
                      src,
                      onClick: () => {
                        setPhotoIndex(idx)
                        setLightboxOpen(true)
                      },
                    }))}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className={`sticky top-24 p-6 ${glowCardClass} backdrop-blur-sm`}>
                <TopGlow />
                <h3 className="pb-4 text-lg md:text-xl font-bold border-b border-neutral-800">
                  About This Project
                </h3>

                <div className="space-y-4 py-4">
                  {project.client && (
                    <div>
                      <span className="block text-xs md:text-sm uppercase tracking-wider text-neutral-500 mb-1">
                        Client
                      </span>
                      <span className="text-xs md:text-sm font-medium text-white">
                        {project.client}
                      </span>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <span className="block text-xs md:text-sm uppercase tracking-wider text-neutral-500 mb-1">
                        Year
                      </span>
                      <span className="text-xs md:text-sm font-medium text-white">
                        {project.year}
                      </span>
                    </div>
                  )}
                  {project.category && (
                    <div>
                      <span className="block text-xs md:text-sm uppercase tracking-wider text-neutral-500 mb-1">
                        Category
                      </span>
                      <span className="text-xs md:text-sm font-medium text-white">
                        {getCategoryLabel(project.category)}
                      </span>
                    </div>
                  )}
                  {project.collaborators?.length > 0 && (
                    <div>
                      <span className="block text-xs md:text-sm uppercase tracking-wider text-neutral-500 mb-1">
                        Collaborators
                      </span>
                      <span className="text-xs md:text-sm font-medium text-white">
                        {project.collaborators.join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-neutral-800">
                  <AnimatePresence mode="wait">
                    {!showForm ? (
                      <motion.div
                        key="cta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center mt-4"
                      >
                        <p className="mb-4 text-xs md:text-sm text-neutral-500">
                          Interested in a similar project?
                        </p>
                        <Button
                          className="w-full"
                          onClick={() => setShowForm(true)}
                        >
                          Start a Project
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs md:text-sm font-bold text-white">
                            Start a Project
                          </h4>
                          <button
                            onClick={() => {
                              setShowForm(false);
                              setStatus(null);
                            }}
                            className="text-xs md:text-sm text-neutral-500 hover:text-white transition-colors"
                          >
                            Cancel
                          </button>
                        </div>

                        <form
                          ref={formRef}
                          onSubmit={handleSubmit}
                          className="space-y-3"
                        >
                          <input
                            type="text"
                            name="from_name"
                            required
                            aria-label="Your name"
                            placeholder="Your name"
                            className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs md:text-sm placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                          <input
                            type="email"
                            name="from_email"
                            required
                            aria-label="Your email"
                            placeholder="your@email.com"
                            className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs md:text-sm placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                          <input
                            type="text"
                            name="subject"
                            required
                            aria-label="Project subject"
                            placeholder="Project subject"
                            className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs md:text-sm placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                          <textarea
                            name="message"
                            required
                            rows={3}
                            ref={messageRef}
                            aria-label="Message"
                            onChange={(e) => {
                              e.target.style.height = "auto";
                              e.target.style.height = e.target.scrollHeight + "px";
                            }}
                            placeholder="Tell me about your project..."
                            className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs md:text-sm placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors resize-none overflow-hidden"
                          />

                          {status === "success" && (
                            <p className="text-xs md:text-sm text-green-400">
                              Message sent! I&apos;ll be in touch soon.
                            </p>
                          )}
                          {status === "error" && (
                            <p className="text-xs md:text-sm text-red-400">
                              Something went wrong. Please try again.
                            </p>
                          )}

                          <button
                            type="submit"
                            disabled={sending}
                            className="w-full px-4 py-2.5 rounded-full text-xs md:text-sm font-medium bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                          >
                            {sending ? "Sending..." : "Send Message"}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>

      {prev || next ? (
        <div className="px-4 mb-16">
          <div className="mx-auto max-w-7xl mt-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              {prev ? (
                <Link
                  to={`/project/${prev.slug.current}`}
                  className="group w-full sm:w-auto flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 transition-colors hover:border-primary-500/40"
                >
                  <HugeiconsIcon
                    icon={ArrowLeft02Icon}
                    size={20}
                    color="currentColor"
                    className="text-neutral-500 group-hover:text-primary-400 transition-colors"
                  />
                  <div>
                    <span className="block text-xs md:text-sm uppercase tracking-wider text-neutral-500">
                      Previous Project
                    </span>
                    <span className="text-xs md:text-sm font-medium text-white">
                      {prev.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  to={`/project/${next.slug.current}`}
                  className="group w-full sm:w-auto flex items-center justify-end gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 text-right transition-colors hover:border-primary-500/40"
                >
                  <div>
                    <span className="block text-xs md:text-sm uppercase tracking-wider text-neutral-500">
                      Next Project
                    </span>
                    <span className="text-xs md:text-sm font-medium text-white">
                      {next.title}
                    </span>
                  </div>
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    size={20}
                    color="currentColor"
                    className="text-neutral-500 group-hover:text-primary-400 transition-colors"
                  />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      ) : null}

      <Footer />

      <Suspense fallback={null}>
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={photoIndex}
          slides={slides}
        />
      </Suspense>
    </div>
  );
};

export default ProjectPage;
