import React from 'react'
import { eric, west, dan, ben , sarah, rodrigo } from './../assets/testimony/index';


type TestimonialsType = {
    id: number,
    img: string,
    name: string,
    role: string,
    testimony: string,
}


const testimonialsData: TestimonialsType[] = [
    {
        id: 1,
        img: eric,
        name: "Eric Ampire",
        role: "CEO Sphinx",
        testimony: "I love Thankly because it is so easy for me to use. I can add text, choose any image, and move them where I need them. I am over 60 years old and not very computer friendly but Thankly is easy to understand and work around. I find Thankly an important tool for my family's business. We will be sticking around this beautiful tool for as long as I know. Huge cheers to the Thankly team for an amazing job well done."
    },
    {
        id: 2,
        img: rodrigo,
        name: "Rodrigo Aguilar",
        role: "Creator Awesomer",
        testimony: "I don’t know where I was without @Thankly. They have absolutely great graphics for any social media platform. Whether it be a YouTube thumbnail, an Instagram Post or whatever you want to create. Its an amazing tool."
    },
    {
        id: 3,
        img: west,
        name: "West Adamson",
        role: "Mobile Dev",
        testimony: "Thankly has been very useful in both my personal and professional life. It's one of my most used creative tools on my pc. It's surely a good avenue for extending the love as it springs to mind."
    },
    {
        id: 4,
        img: dan,
        name: "Dan Roeche",
        role: "QA Tester",
        testimony: "I choose Thankly because it was easy to use, customize, and adjust, whilst giving me the results I wanted fairly quickly. I have to compliment you on such a great tool you've built."
    },
    {
        id: 5,
        img: ben,
        name: "Ben Green",
        role: "Manager",
        testimony: "I had people asking me how do I create such cool designs. With Thankly I don't have to worry about stitching up images or texts. I can easily choose my templates, design, and download any preferred format."
    },
    {
        id: 6,
        img: sarah,
        name: "Sarah Phil",
        role: "Sales",
        testimony: "I like Thankly's ease of use. And the cards come out so nicely. I get my designs done in 3 minutes. This way I could spin up multiple cards for all my loved ones in little time. Well done Thankly team."
    }
]



const Testimonials = () => {
  return (
   
<div className="text-gray-600 dark:text-gray-300 md:pt-32 pt-24" id="testimonials">
  <div className='container px-4 lg:px-8 mx-auto max-w-screen-xl'>
    <div data-aos="fade-up" data-aos-delay="300" className="mb-20 space-y-4">
      <h2 className="text-left text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
        What our users are saying.
      </h2>
    </div>
    <div data-aos="zoom-in" className="md:columns-2 lg:columns-3 gap-8 space-y-8">
        {testimonialsData.map(({id, name, role, img, testimony}) => (
            <div key={id} className={`aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none`}>
            <div className="flex gap-4">
              <img className="w-12 h-12 rounded-full" src={img} alt="testimonial" loading="lazy" />
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-white">{name}</h6>
                <p className="text-sm text-gray-500 dark:text-gray-300">{role}</p>
              </div>
            </div>
            <p className="mt-8">{testimony}</p>
          </div>
        ))}

    </div>
  </div>
</div>
  )
}

export default Testimonials