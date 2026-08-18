import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Divider from "./components/Divider";
import Stack from "./components/Stack";
import Experience from "./components/Experience";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <Stack />
        <Divider />
        <Experience />
        <Divider />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
