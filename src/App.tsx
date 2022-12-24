import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import { Header, Hero, Features, Gallery, Testimonials, Footer, BackToTop } from './components';


function App() {
  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <div className="bg-white dark:bg-gray-900">
      <Toaster />
      <Header />
      <Hero />
      <Features />
      <Gallery />
      <Testimonials />
      <BackToTop />
      <Footer />
    </div>
  )
}

export default App
