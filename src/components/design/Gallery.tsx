import React, { FC, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import download from "downloadjs";
import GalleryModal from './GalleryModal';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';
import success from './../../assets/download/success.png';
import * as htmlToImage from "html-to-image";



//return an array of randomized urls
const imgUrls = Array.from(Array(4)).map(() => {
  return `https://source.unsplash.com/random/300x30${Math.floor(Math.random() * 10)}`;
});



//loading skeletal component
const skeletonLoader = Array.from({ length: 4 }, (_, index) => {
  return <SkeletonTheme key={index} baseColor="#293049" highlightColor="#434959" height={300}>
    <p>
      <Skeleton count={1} />
    </p>
  </SkeletonTheme>;
});





type ImageTextState = {
  topText: string;
  bottomText: string;
  uploadedImg: string
};

type GalleryProps = {}



const Gallery: FC<GalleryProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [topText, setTopText] = useState<ImageTextState['topText']>('Thank You');
  const [bottomText, setBottomText] = useState<ImageTextState['bottomText']>('');
  const [uploadedImg, setUploadedImg] = useState<ImageTextState['uploadedImg']>('');

  //onload setter for image loaded images
  const onLoad = () => {
    setIsLoaded(true);
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBottomText(value);
  };

  //Add local image
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { files } = event.target;
    const uploadFile = URL.createObjectURL(files![0]);
    setUploadedImg(uploadFile);
  };



  //Download PNG image
  const handlePng = async () => {
    const elem =
      document.querySelector<HTMLElement>('#my-img');
    if (!elem) return;



    //utilize this condition for image selections and not upload
    if (!uploadedImg) {
      return htmlToImage
      .toPng(document.getElementById('my-img')!)
      .then((dataUrl) => {
        download(dataUrl, `Thankly-${bottomText}`);
      });
    }


    //use rest of function when its file upload
    const copiedElem = elem.cloneNode(
      true
    ) as HTMLElement;
   

    copiedElem.style.width = '400px';
    copiedElem.style.height = '500px';

    document.body.append(copiedElem);


    const canvas = await html2canvas(copiedElem);
    const dataURL = canvas.toDataURL('image/png');
    download(dataURL, `Thankly-${bottomText}`, 'image/png');

    setCurrentIndex(null);
    setTopText('');

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
      {duration: 4000}
    )
  };





  //single image card
  const renderImageContent = (src: string, index: number) => {
    return (
      <div onClick={(e) => openModal(e, index)} key={index} className="relative cursor-pointer before:transition-opacity-ease before:opacity-0 after:transition-opacity-ease after:opacity-0
            hover:before:transition-opacity-ease hover:before:opacity-100  after:transition-opacity-ease hover:after:opacity-100
            after:content-['\02194'] after:text-[50px] after:absolute after:text-white after:left-[40%] after:top-1/3 after:block after:-rotate-45 after:transform after:-translate-3d-50-pct-minus-50-pct-0 
            before:content-none before:absolute before:top-0 before:left-0 before:right-0 before:block before:bottom-[4px] before:bg-['rgba(34, 34, 34, 0.5)'] ">
        <img src={src} key={src} onLoad={onLoad} className={`w-full rounded-md bg-gradient-to-r from-primary to-indigo-300 p-1 ${isLoaded && 'aspect-square'}`} />

      </div>
    );
  };


  //modal buttons functions
  const openModal = (e: React.MouseEvent, index: number) => {
    setCurrentIndex(index);
  };

  const closeModal = (e: React.MouseEvent | undefined) => {
    if (e) {
      e.preventDefault();
    }
    setCurrentIndex(null);
  };

  const findPrev = (e: React.MouseEvent | undefined) => {
    if (e) {
      e.preventDefault();
    }
    setCurrentIndex((prevIndex) => prevIndex! - 1);
  };

  const findNext = (e: React.MouseEvent | undefined) => {
    if (e) {
      e.preventDefault();
    }
    setCurrentIndex((prevIndex) => prevIndex! + 1);
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
        {imgUrls.map(renderImageContent)}
        {!isLoaded && skeletonLoader.map((item) => item)}
      </div>

      {/*modal image pop up*/}
      {currentIndex !== null && (
        <GalleryModal
          closeModal={closeModal}
          findPrev={findPrev}
          findNext={findNext}
          hasPrev={currentIndex !== null && currentIndex > 0}
          hasNext={
            currentIndex !== null && currentIndex + 1 < imgUrls.length
          }
          src={uploadedImg ? uploadedImg : imgUrls[currentIndex!]}
          handleChange={handleChange}
          handlePng={handlePng}
          handleUpload={handleUpload}
          topText={topText}
          bottomText={bottomText}
        />
      )}
    </div>
  );
};

export default Gallery;