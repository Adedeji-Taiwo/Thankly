import { useEffect, useState } from 'react';
import Toggle from './TextColorToggle';


type GalleryModalProps = {
    closeModal: (e?: React.MouseEvent) => void;
    findPrev: (e?: React.MouseEvent) => void;
    findNext: (e?: React.MouseEvent) => void;
    hasPrev: boolean;
    hasNext: boolean;
    src: string | undefined;
    topText: string,
    bottomText: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handlePng: () => Promise<string | void> | void,
}




const GalleryModal: React.FC<GalleryModalProps> = ({
    closeModal,
    findPrev,
    findNext,
    hasPrev,
    hasNext,
    src,
    topText,
    bottomText,
    handleChange,
    handleUpload,
    handlePng,
}) => {
    const [enabled, setEnabled] = useState<boolean>(false);


    useEffect(() => { 
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.keyCode === 27) closeModal();
            if (e.keyCode === 37 && hasPrev) findPrev();
            if (e.keyCode === 39 && hasNext) findNext();
        };
        document.body.addEventListener('keydown', handleKeyDown);
        return () => document.body.removeEventListener('keydown', handleKeyDown);
    }, [closeModal, findPrev, findNext, hasNext, hasPrev]);

    return (
        <>
            <div onClick={closeModal} className='fixed z-10 h-full w-full top-0 left-0 bg-black opacity-50'></div>
            <div className="fixed inset-x-0 z-50 lg:w-2/3 w-[95%] max-w-[800px] md:h-3/4 h-full m-auto inset-y-0">
                <div data-aos="fade-up" data-aos-delay="300" className='relative flex md:flex-row flex-col w-full justify-center items-center gap-1 rounded-md bg-gradient-to-r from-primary to-indigo-300 p-1'>
                    <button className='absolute right-0 top-0 rounded-bl-md inline dark:text-gray-900 text-white text-3xl font-light dark:bg-white bg-primary w-10 h-10 text-center z-10' onClick={closeModal}>&times;</button>
                    <div id="my-img" className='md:w-3/5 w-full mx-auto relative'>
                        <button id="prev" className={`absolute left-0 right-auto top-1/2 rounded-r-md inline ${hasPrev ? 'text-gray-900' : 'text-white'} text-3xl font-light ${hasPrev ? 'bg-white' : 'bg-primary'}  w-10 h-10 text-center`} onClick={findPrev} disabled={!hasPrev}>&lsaquo;</button>
                        <button id="next" className={`absolute right-0  top-1/2 rounded-l-md inline  ${hasNext ? 'text-gray-900' : 'text-white'} text-3xl font-light ${hasNext ? 'bg-white' : 'bg-primary'} w-10 h-10 text-center`} onClick={findNext} disabled={!hasNext}>&rsaquo;</button>
                        {/* This id is defined for downloading images */}
                        <img id="img" src={src} className="w-full aspect-square md:h-auto h-[40vh]" />
                        <h2 className={`absolute left-0 right-0 mx-auto font-black text-center text-3xl md:text-4xl ${enabled ? 'text-white' : 'text-black'} top-7`}>{topText}</h2>
                        <h2 className={`absolute left-0 right-0 mx-auto font-black text-center text-3xl md:text-4xl capitalize ${enabled ? 'text-white' : 'text-black'} bottom-9`}>{bottomText}</h2>
                        <p className={`text-primary text-xs text-center absolute left-0 right-0 mx-auto bottom-4 italic`}>Thankly</p>
                    </div>

                    <div className="flex md:w-2/5 w-full justify-center items-center bg-white dark:bg-gray-900">
                         {/* input form for adding text into img */}
                        <div className="shadow-md flex flex-col items-center justify-center max-w-sm p-10 pb-20">
                            <div aria-label="logo" className="md:flex space-x-2 items-center justify-center mx-auto mb-5 hidden">
                                <div aria-hidden="true" className="flex space-x-1">
                                    <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white"></div>
                                    <div className="h-6 w-2 bg-primary"></div>
                                </div>
                                <span className="md:text-2xl text-xl font-bold text-gray-900 dark:text-white">Thankly</span>
                            </div>
                            <div className="w-full dark:border-gray-800 border-dotted border-2 p-2">
                                <span className="sr-only">Choose file</span>
                                <div className="font-bold h-8 mt-3 text-gray-600 text-xs leading-8 uppercase">Replace with local image</div>
                                <input type="file" accept="image/*" className="block w-full text-sm text-slate-500 my-2
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-primary
                                    hover:file:bg-violet-100 hover:cursor-pointer"
                                    onChange={handleUpload}
                                />
                            </div>
                            <div className="w-full dark:border-gray-800 border-dotted border-2 p-2">
                                <div className="font-bold h-8 mt-3 text-gray-600 text-xs leading-8 uppercase">Add Name</div>
                                <div className="my-2 bg-white p-1 flex border border-gray-200 rounded-full">
                                    <input 
                                        type='text'
                                         value={bottomText}
                                         onChange={handleChange}
                                         name="bottomText"
                                        placeholder="loved one..." 
                                        className="rounded-full p-1 px-2 placeholder:text-sm appearance-none outline-none w-full text-gray-800"
                                     />
                                </div>
                            </div>

                            {/*mobile buttons*/}
                            <div className="w-full md:hidden flex flex-col justify-center items-start gap-1  dark:border-gray-800 border-dotted border-2 p-2">

                                <div className="font-bold h-8 mt-3 text-gray-600 text-xs leading-8 uppercase">Download</div>
                                <div className=' flex justify-center items-center w-full gap-1 my-2'>
                                <Toggle 
                                        enabled={enabled}
                                        setEnabled={setEnabled}
                                    />
                                    <button type='button'  onClick={handlePng} className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                                        <span  className="relative text-base font-semibold text-white">PNG</span>
                                    </button>
                                </div>
                            </div>

                            {/*desktop buttons*/}
                            <div className="md:flex justify-center items-center gap-1 w-full hidden mt-4">
                            <Toggle 
                                enabled={enabled}
                                setEnabled={setEnabled}
                            />
                                <button  type='button' onClick={handlePng} className="relative flex h-11 w-1/2 items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                                    <span className="relative text-base font-semibold text-white">Download PNG</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GalleryModal;