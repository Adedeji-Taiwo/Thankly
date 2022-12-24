import React, { useState, useEffect } from 'react';


    type MenuItemsType = {
        id: number,
        title: string,
    }

    const menuData: MenuItemsType[] = [
        {
            id: 1,
            title: "home"
        },
        {
            id: 2,
            title: "features",
        },
        {
            id: 3,
            title: "design",
        },
        {
            id: 4,
            title: "testimonials"
        }
    ]


    const Header = () => {
    const [open, setOpen] = useState<boolean>(false);


     //prevent scroll when dropdown open is clicked
     useEffect(() => {
        const body = document.querySelector('body');
        if (open) {
            body!.style.overflow = "hidden";
        }
        else {
            body!.style.overflowY = "scroll";
            body!.style.overflowX = "hidden";
        }
    }, [open])


    //handle open click
    const handleopen = () => {
        setOpen(!open);
    }


  return (
    <header>
    <nav className="z-10 w-full absolute">
      <div className='container px-4 lg:px-8 mx-auto max-w-screen-xl'>
            <div className="flex flex-wrap items-center justify-between py-4 gap-6 md:gap-0 relative">
                <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
                    <a href="#" aria-label="logo" className="flex space-x-2 items-center">
                        <div aria-hidden="true" className="flex space-x-1">
                        <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white"></div>
                        <div className="h-6 w-2 bg-primary"></div>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">Thankly</span>
                    </a>
                    
                    <div className="relative flex items-center justify-start lg:hidden max-h-10 md:mr-0 mr-3">
                        <label role="button" htmlFor="toggle_nav" aria-label="hamburger" className="relative" onClick={handleopen}>
                            <div aria-hidden="true" className={`m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300 ${open && 'rotate-45 translate-y-1.5'}`}></div>
                            <div aria-hidden="true" className={`m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300 ${open && '-rotate-45 -translate-y-1'}`}></div>
                        </label>
                    </div>
                </div>
                <div aria-hidden="true" className={`fixed z-10 inset-0 h-screen w-screen bg-white/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 ${open && 'origin-top scale-y-100'} lg:hidden dark:bg-gray-900/70`}></div>
                <div className={`flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full opacity-0 translate-y-1 absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                            lg:relative lg:scale-100 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                            ${open && 'scale-100 opacity-100 lg:translate-y-0'} lg:shadow-none dark:lg:bg-inherit dark:bg-gray-800 dark:border-gray-700 ${open ? "block" : "hidden"}
                            dark:shadow-none`}>
                   
                    <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                        <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                            {menuData.map(({id, title}) => (
                                 <li key={id} onClick={() => setOpen(false)}>
                                 <a href={`#${title}`} className="block md:px-4 transition hover:text-primary">
                                     <span className='capitalize'>{title}</span>
                                 </a>
                             </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-12 lg:mt-0" onClick={() => setOpen(false)}>
                        <a
                            href="#design"
                            className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                            >
                            <span className="relative text-sm font-semibold text-white"
                                >Get Started</span>
                        </a>
                    </div>
                </div>
            </div>
          </div>
    </nav>
</header>
  )
}

export default Header