import React, { FC, useState, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import GalleryModal from './GalleryModal';
import { generateRandomUrl, skeletonLoader, onLoad, handleChange, handleUpload, openModal, closeModal, findNext, findPrev } from './functions';
import download from "downloadjs";
import html2canvas from 'html2canvas';
import * as htmlToImage from "html-to-image";
import { toast } from 'react-hot-toast';
import success from './../../assets/download/success.png';



type ImageTextState = {
  topText: string;
  bottomText: string;
};


type GalleryProps = {};


const Gallery: FC<GalleryProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [topText, setTopText] = useState<ImageTextState['topText']>('Thank You');
  const [bottomText, setBottomText] = useState<ImageTextState['bottomText']>('');
  const [uploadedImg, setUploadedImg] = useState<string>('');
  const [imgUrls, setImgUrls] = useState<string[]>();
  const [completed, setCompleted] = useState<boolean>(false);





  useEffect(() => {
    //return an array of randomized urls
    const imgArray = Array.from(Array(4)).map(() => {
      return generateRandomUrl();
    });

    setImgUrls(imgArray);

  }, [completed]);





  //single image card
  const renderImageContent = (src: string, index: number) => {
    return (
      <div onClick={(e) => openModal(e, index, setCurrentIndex, setTopText, setCompleted)} key={index} className="relative cursor-pointer before:transition-opacity-ease before:opacity-0 after:transition-opacity-ease after:opacity-0
            hover:before:transition-opacity-ease hover:before:opacity-100  after:transition-opacity-ease hover:after:opacity-100
            after:content-['\02194'] after:text-[50px] after:absolute after:text-white after:left-[40%] after:top-1/3 after:block after:-rotate-45 after:transform after:-translate-3d-50-pct-minus-50-pct-0 
            before:content-none before:absolute before:top-0 before:left-0 before:right-0 before:block before:bottom-[4px] before:bg-['rgba(34, 34, 34, 0.5)'] ">
        <img src={src} key={src} onLoad={() => onLoad(setIsLoaded)} className={`w-full rounded-md bg-gradient-to-r from-primary to-indigo-300 p-1 ${isLoaded && 'aspect-square'}`} />
      </div>
    );
  };




  
//toast on download success
const toastMsg = () => {
  toast(
    () => (
      <section className="w-full py-4">
        <img src={success} className="w-10 mx-auto" alt="successful download" />

        <article className="text-center mt-4">
          <h1 className="text-lg font-semibold text-gray-800">
            Image Downloaded!
          </h1>
        </article>
      </section>
    ),
    { duration: 4000 }
  )

  setBottomText('');
  setUploadedImg('');
  setCurrentIndex(null);
  setCompleted(true);
}





//Download PNG image
const handlePng = async () => {
  if (bottomText === "") {
    return toast.error("input cannot be valid!", { duration: 3000 })
  }

  const elem =
    document.querySelector<HTMLElement>('#my-img');
  if (!elem) return;


  //remove navigation from view
  const prev = document.getElementById('prev')!;
  const next = document.getElementById('next')!;
  prev.style.display = "none";
  next.style.display = "none";

  //style img
  const img = document.getElementById('img')!;
  img.style.aspectRatio = "4/5";
  img.style.objectFit = "cover";



  //utilize this condition for image selections and not upload
  if (!uploadedImg) {
    setTimeout(() => {
      toastMsg();
    }, 4000);

    //element styling
    const node = document.getElementById('my-img')!;
    node.style.borderRadius = "6px";
    node.style.padding = "4px";
    node.style.backgroundImage = "linear-gradient(to right, #9333EA, #A5B4FC)";

    return htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        download(dataUrl, `Thankly-${bottomText}`);
      });

  }


  //use rest of function when its file upload
  const copiedElem = elem.cloneNode(
    true
  ) as HTMLElement;


  document.body.append(copiedElem);


  const canvas = await html2canvas(copiedElem);
  const dataURL = canvas.toDataURL('image/png');
  download(dataURL, `Thankly-${bottomText}`, 'image/png');

  toastMsg();

};






  return (
    <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl md:pt-32 pt-24" id="design">

      <div className='flex justify-between items-center'>
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white relative w-max">
          <span className="absolute h-5 w-5 right-0 top-0 animate-ping inline-flex rounded-full bg-primary"></span>
          Select an image card
        </h2>
        <button className="relative h-11 w-full items-center justify-center px-6 md:flex hidden before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max" onClick={() => window.location.reload()}>
          <span className="relative text-base font-semibold text-primary dark:text-white">
            Refresh
          </span>
        </button>
      </div>
      <div data-aos="fade-up" data-aos-delay="300" className="gallery grid w-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 max-w-[1200px] mx-auto mt-12 mb-8">
        {imgUrls?.map(renderImageContent)}
        {!isLoaded && skeletonLoader.map((item) => item)}
      </div>

      {/*modal image pop up*/}
      {currentIndex !== null && (
        <GalleryModal
          closeModal={(event?: React.MouseEvent) => closeModal(event, setCurrentIndex, setCompleted)}
          findPrev={(event?: React.MouseEvent) => findPrev(event, setCurrentIndex)}
          findNext={(event?: React.MouseEvent) => findNext(event, setCurrentIndex)}
          hasPrev={currentIndex !== null && currentIndex > 0}
          hasNext={currentIndex !== null && currentIndex + 1 < imgUrls!.length}
          src={uploadedImg ? uploadedImg : imgUrls![currentIndex]}
          handleChange={(event) => handleChange(event, setBottomText)}
          handlePng={handlePng}
          handleUpload={(event) => handleUpload(event, setUploadedImg)}
          topText={topText}
          bottomText={bottomText}
        />
      )}
    </div>
  );
};

export default Gallery;