import {
  Header,
  Hero,
  IntroCard,
  TopProjects,
  Contact,
  Tools,
  Footer,
  PageTransition,
} from "../components";

const Home = () => {
  return (
    <PageTransition>
      <div className="bg-black text-white selection:bg-primary-500/30 selection:text-white relative">
        {/* Global Noise Overlay */}
        <div className="noise-overlay"></div>

        <Header />

        <main>
          <Hero />
          <IntroCard />
          <TopProjects />
          <Tools />
          <Contact />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Home;
