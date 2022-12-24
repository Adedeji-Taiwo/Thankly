import React from 'react'
import { family } from '../assets/features'

const Features = () => {
  return (
    
<div className="container px-4 lg:px-8 mx-auto max-w-screen-xl md:pt-32 pt-24" id="features">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sky-500">
        <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
      </svg>
      
      <div className="space-y-6 justify-between text-gray-600 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
        <div data-aos="fade-left" data-aos-once="true" className="md:w-1/2">
          <img
            src={family}
            alt="image"
            loading="lazy"
            width=""
            height=""
            className="w-full"
          />
        </div>
        <div data-aos="fade-right" data-aos-once="true" className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Design your own cards with Thankly
          </h2>
          <p className="my-8 text-gray-600 dark:text-gray-300">
            The card is a classic and timeless way to show someone your sincere feelings. However, are you still visiting the stores to buy cards? Start making your own cards with Thankly. <br /> <br />
            We provide a unique way for you to show your appreciation and display your favourite photos. No design skills are required.
          </p>
          <div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
            <div className="mt-8 flex gap-4 md:items-center">
              <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20">  
                <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"  fill="currentColor" className="w-6 h-6 m-auto text-indigo-500 dark:text-indigo-400">
                    <path d="M1 12.155c2.256 3.97 4.55 7.918 6.879 11.845h-5.379c-.829 0-1.5-.675-1.5-1.5v-10.345zm2.85.859c3.278 1.952 12.866 7.658 13.121 7.805l-5.162 2.98c-.231.132-.49.201-.751.201-.549 0-1.037-.298-1.299-.75l-5.909-10.236zm1.9-12.813c-.23-.133-.489-.201-.75-.201-.524 0-1.026.277-1.299.75l-3.5 6.062c-.133.23-.201.489-.201.749 0 .527.278 1.028.75 1.3 2.936 1.695 14.58 8.7 17.516 10.396.718.413 1.633.168 2.048-.55l3.5-6.062c.133-.23.186-.488.186-.749 0-.52-.257-1.025-.734-1.3l-17.516-10.395m.25 3.944c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2"/>
                </svg>
              </div>
              <div className="w-5/6">
                <h4 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">Create Anytime</h4>
                <p className="text-gray-500 dark:text-gray-400">Build thoughtful image cards on the go for that special someone.</p>
              </div> 
            </div> 
            <div className="pt-4 flex gap-4 md:items-center">
              <div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">         
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 19l1.5-5h-4.5l7-9-1.5 5h4.5l-7 9z"/>
                </svg>                            
              </div>
              <div className="w-5/6">
                <h4 className="font-semibold text-lg text-gray-700 dark:text-teal-300">Lightning Quick</h4>
                <p className="text-gray-500 dark:text-gray-400">You can have your image cards ready to be sent in matter of seconds.</p>
              </div> 
            </div> 
          </div>
        </div>
      </div>
      </div>
  )
}

export default Features