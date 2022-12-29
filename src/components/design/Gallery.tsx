import React, { FC, useState, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import GalleryModal from './GalleryModal';
import LatestDownload from './LatestDownload';
import { generateRandomUrl, cardSaver, skeletonLoader, handleChange, handleUpload, openModal, closeModal, findNext, findPrev } from './functions';
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { toast } from 'react-hot-toast';
import success from './../../assets/download/success.png';



type ImageTextState = {
  topText: string;
  bottomText: string;
};

type latestCardType = {
  name: string,
  data: string | File | Blob | Uint8Array,
  type: string,
}


type GalleryProps = {};


const Gallery: FC<GalleryProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topText, setTopText] = useState<ImageTextState['topText']>('Thank You!');
  const [bottomText, setBottomText] = useState<ImageTextState['bottomText']>('');
  const [uploadedImg, setUploadedImg] = useState<string>('');
  const [imgUrls, setImgUrls] = useState<(string | undefined)[]>();
  const [latestCard, setLatestCard] = useState<latestCardType | undefined>();
  const [completed, setCompleted] = useState<boolean>(false);
  






  useEffect(() => {
    // Fetch 4 random images from Unsplash API and store their URLs in an array
    const fetchImages = async () => {
      const imgArray = await Promise.all(
        Array.from(Array(4)).map(async () => {
          return generateRandomUrl();
        })
      );
      setImgUrls(imgArray);
      setIsLoading(false);
    };

    fetchImages();
  }, [isLoading]);




  //Retrieve card from local storage
  useEffect(() => {
    const card = JSON.parse(localStorage.getItem('thankly')!);
    if (card) {
      setLatestCard(card);
    }
  }, [completed]);






  //single image card
  const renderImageContent = (src: string | undefined, index: number) => {
    return (
      <div onClick={(e) => openModal(e, index, setCurrentIndex, setCompleted, setTopText)} key={index} className="relative cursor-pointer before:transition-opacity-ease before:opacity-0 after:transition-opacity-ease after:opacity-0
            hover:before:transition-opacity-ease hover:before:opacity-100  after:transition-opacity-ease hover:after:opacity-100
            after:content-['\02194'] after:text-[50px] after:absolute after:text-white after:left-[40%] after:top-1/3 after:block after:-rotate-45 after:transform after:-translate-3d-50-pct-minus-50-pct-0 
            before:content-none before:absolute before:top-0 before:left-0 before:right-0 before:block before:bottom-[4px] before:bg-['rgba(34, 34, 34, 0.5)'] ">
        <img src={src} key={src} className={`w-full rounded-md bg-gradient-to-r from-primary to-indigo-300 p-1 ${!isLoading && 'aspect-square'}`} />
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
            <h1 className="md:text-lg text-base font-semibold text-gray-800">
              Image Downloaded!
            </h1>
          </article>
        </section>
      ),
      { duration: 4000 }
    )

    setBottomText('');
    setUploadedImg('');
    setCompleted(true);
    setCurrentIndex(null);
  }





  //Download PNG image
  const handlePng = async () => {
    if (bottomText === "") {
      return toast.error("input cannot be empty!", { duration: 3000 })
    }

    const elem = document.querySelector<HTMLElement>('#my-img');
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



    //utilize this condition for image selections from api and not upload
      setTimeout(() => {
        toastMsg();
      }, 4000);

      //element styling
      const node = document.getElementById('my-img')!;
      node.style.borderRadius = "6px";
      node.style.padding = "4px";
      node.style.backgroundImage = "linear-gradient(to right, #9333EA, #A5B4FC)";

      
      //ran twice to capture image for ios/mcos
      return htmlToImage
        .toPng(node)
        .then((dataUrl) => {
          htmlToImage.toPng(node).then((dataUrl) => {
            download(dataUrl, `Thankly-${bottomText}`);
          })

          //store latest card to local storage
          cardSaver("htmlToImage", bottomText,  dataUrl);
        });
   
  };





  //handle latest download
  const handleLatestDownload = () => {
    if (latestCard?.type === "htmlToCanvas") {
      return download(latestCard?.data, latestCard?.name, 'image/png');
    }

    download(latestCard!.data, latestCard?.name);
  }






  return (
    <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl md:pt-32 pt-24" id="design">

      <div className='md:flex md:flex-row flex-col md:gap-0 justify-between items-center'>
        <h2 className="text-3xl font-bold text-gray-900 mb-7 md:text-4xl dark:text-white relative w-max">
          <span className="absolute h-5 w-5 right-0 top-0 animate-ping inline-flex rounded-full bg-primary"></span>
          Select an image card
        </h2>
        <button className={`relative h-11 max-w-24 items-center justify-center px-6 flex before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max ${isLoading && 'pointer-events-none'}`} disabled={isLoading} onClick={() => setIsLoading(!isLoading)}>
          <span className="relative text-base font-semibold text-primary dark:text-white">
            {isLoading ? "Refreshing" : "Refresh"}
          </span>
        </button>
      </div>
      <div data-aos="fade-up" data-aos-delay="300" className="gallery grid w-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 max-w-[1200px] mx-auto mt-12 mb-8">
        {isLoading ? skeletonLoader.map((item) => item) : imgUrls?.map(renderImageContent)}
      </div>

      {/*modal image pop up*/}
      {currentIndex !== null && (
        <GalleryModal
          closeModal={(event?: React.MouseEvent) => closeModal(event, setCurrentIndex)}
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

      {/*latest download*/}
      {latestCard && (
        <LatestDownload
          name={latestCard.name}
          handleLatestDownload={handleLatestDownload}
        />
      )}
    </div>
  );
};

export default Gallery;