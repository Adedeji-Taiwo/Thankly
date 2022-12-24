import React from 'react'
import useDarkMode from '../hook/useDarkMode'
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { thank } from '../assets/features';



const Hero = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };


  return (

    <div className="relative container px-4 lg:px-8 mx-auto max-w-screen-xl">
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>

      <div>
        <div className="relative pt-36" id='home'>
          <div className="lg:w-2/3 text-center mx-auto">
            <DarkModeSwitch
              className='w-5 h-5 absolute md:right-3 md:left-auto md:top-24 top-20 mx-auto right-0 left-0'
              checked={darkMode}
              onChange={toggleDarkMode}
              size={120}
            />
            <h1 data-aos="fade-up" data-aos-delay="300" className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Shaping a world with <span className="text-primary dark:text-white">gratitude.</span></h1>
            <p data-aos="fade-up" data-aos-delay="400" className="mt-8 text-gray-700 dark:text-gray-300">Thankly allows you to effortlessly create personalized, downloadable "Thank You" Greeting Cards for your friends, family members/relatives and loved ones.</p>
            <div data-aos="fade-up" data-aos-delay="500" className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <a
                href="#design"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white"
                >Get started</span>
              </a>
              <a
                href="#build"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <span
                  className="relative text-base font-semibold text-primary dark:text-white"
                >Learn more</span>
              </a>
            </div>



            <div data-aos="fade-down" data-aos-delay="500" className="mx-auto flex max-w-screen-sm items-center justify-center pt-16 pb-6">
              <div className="h-80 w-full rounded-md bg-gradient-to-r from-[#9333EA] to-indigo-300 p-1">
                <div className="flex h-full w-full items-center justify-center bg-gray-800" style={{
                  backgroundImage: `url(${thank})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  WebkitBackgroundSize: "cover"
                }}>
                </div>
              </div>
            </div>




            <div data-aos="fade-down" data-aos-delay="200" className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 md:flex justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Simplicity redefined</h6>
                <p className="mt-2 text-gray-500">Extend love the easy way!</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The fastest on the market</h6>
                <p className="mt-2 text-gray-500">You are only few clicks away!</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Dual Formats</h6>
                <p className="mt-2 text-gray-500">Image downloadable in different formats!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero