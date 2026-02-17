import { useParams, Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useProject } from "../hooks/useProjects";
import {
  PageTransition,
  Header,
  Footer,
  Button,
  Badge,
  LoadingSpinner,
} from "../components";
import CaseStudyContent from "../components/project/CaseStudyContent";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState, useRef } from "react";
import { urlFor } from "../lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import emailjs from "@emailjs/browser";

const ProjectPage = () => {
  const { slug } = useParams();
  const { project, loading, error } = useProject(slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      formRef.current.reset();
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
        <Link to="/" className="mt-4 text-primary-400">
          Go Home
        </Link>
      </div>
    );

  const slides =
    project.gallery?.map((img) => ({ src: urlFor(img).url() })) || [];

  return (
    <div className="min-h-screen text-white bg-black">
      <Header />
      <PageTransition>
        <div className=" mb-8">
          {/* Hero Image */}
          <div className="mx-auto max-w-7xl">
            <Link
              to="/"
              className="inline-flex items-center mb-6 transition-colors text-neutral-400 hover:text-white"
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
              {project.category && <Badge>{project.category}</Badge>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 /px-6 mx-auto mt-12 max-w-7xl /md:px-12 /lg:px-20 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-12 lg:col-span-2">
              <div className="my-8">
                {project.featuredImage && (
                  <img
                    src={urlFor(project.featuredImage)
                      .width(700)
                      .quality(85)
                      .url()}
                    alt={project.title}
                    className="max-w-md w-full h-auto rounded-md"
                  />
                )}
              </div>
              {project.caseStudy ? (
                <CaseStudyContent value={project.caseStudy} />
              ) : (
                <p className="text-lg text-neutral-400">
                  {project.description}
                </p>
              )}

              {/* Gallery Grid */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Project Gallery</h3>
                  <Masonry
                    breakpointCols={{ default: 2, 640: 1 }}
                    className="flex w-auto -ml-4"
                    columnClassName="pl-4 bg-clip-padding"
                  >
                    {project.gallery.map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="mb-4 relative rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => {
                          setPhotoIndex(idx);
                          setLightboxOpen(true);
                        }}
                      >
                        <img
                          src={urlFor(img).width(800).url()}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-auto block"
                        />
                      </motion.div>
                    ))}
                  </Masonry>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="sticky p-6 border bg-neutral-900/50 border-neutral-800 rounded-2xl backdrop-blur-sm top-24">
                <h3 className="pb-4 text-xl font-bold border-b border-neutral-800">
                  About This Project
                </h3>

                <div className="space-y-4 py-4">
                  {project.client && (
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Client</span>
                      <span className="text-sm font-medium text-white">{project.client}</span>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Year</span>
                      <span className="text-sm font-medium text-white">{project.year}</span>
                    </div>
                  )}
                  {project.category && (
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Category</span>
                      <span className="text-sm font-medium text-white capitalize">{project.category}</span>
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
                        <p className="mb-4 text-sm text-neutral-500">
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold text-white">
                            Start a Project
                          </h4>
                          <button
                            onClick={() => {
                              setShowForm(false);
                              setStatus(null);
                            }}
                            className="text-xs text-neutral-500 hover:text-white transition-colors"
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
                            placeholder="Your name"
                            className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                          <input
                            type="email"
                            name="from_email"
                            required
                            placeholder="your@email.com"
                            className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                          <input
                            type="text"
                            name="subject"
                            required
                            placeholder="Project subject"
                            className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                          <textarea
                            name="message"
                            required
                            rows={3}
                            placeholder="Tell me about your project..."
                            className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                          />

                          {status === "success" && (
                            <p className="text-xs text-green-400">
                              Message sent! I'll be in touch soon.
                            </p>
                          )}
                          {status === "error" && (
                            <p className="text-xs text-red-400">
                              Something went wrong. Please try again.
                            </p>
                          )}

                          <button
                            type="submit"
                            disabled={sending}
                            className="w-full px-4 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
      <Footer />

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={slides}
      />
    </div>
  );
};

export default ProjectPage;
