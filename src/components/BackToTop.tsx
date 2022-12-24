import { useEffect,useState } from 'react'
import { BiChevronUp } from 'react-icons/bi'



const BackToTop = () => {
    const [showButton, setShowButton] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
          if (window.pageYOffset > 200) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        });
      }, []);

    
      // This function will scroll the window to the top 
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // for smoothly scrolling
        });
      };


  return (
    <>
        {showButton && (
        <div data-aos="fade-up" data-aos-delay="300" className="fixed bottom-7 right-6 z-[200] h-10 w-10 cursor-pointer rounded-full bg-primary flex justify-center items-center text-xl font-semibold text-white transition-all duration-300 ease-out delay-75 hover:shadow-lg" onClick={scrollToTop}>
           <BiChevronUp />
        </div>
        )}
    </>
  )
   }
export default BackToTop;
     