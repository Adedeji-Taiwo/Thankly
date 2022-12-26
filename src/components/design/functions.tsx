import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';





// Generate a random image URL
export const generateRandomUrl = () => {
  return `https://source.unsplash.com/random/300x30${Math.floor(Math.random() * 10)}`;
};







//loading skeletal component
export const skeletonLoader = Array.from({ length: 4 }, (_, index) => {
  return <SkeletonTheme key={index} baseColor="#293049" highlightColor="#434959" height={300}>
    <p>
      <Skeleton count={1} />
    </p>
  </SkeletonTheme>;
});







//onload setter for image loaded images
export const onLoad = (setIsLoaded: (value: React.SetStateAction<boolean>) => void) => {
  setIsLoaded(true);
}




//name input handler
export const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setBottomText: (value: React.SetStateAction<string>) => void) => {
  const { value } = event.target;
  setBottomText(value);
};



//Add local image
export const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, setUploadedImg: (value: React.SetStateAction<string>) => void) => {
  event.preventDefault();
  const { files } = event.target;
  const uploadFile = URL.createObjectURL(files![0]);
  setUploadedImg(uploadFile);
};










//modal buttons functions
export const openModal = (e: React.MouseEvent, index: number, setCurrentIndex: (value: React.SetStateAction<number | null>) => void, setTopText: (value: React.SetStateAction<string>) => void) => {
  setCurrentIndex(index);
  setTopText("Thank you");

};

export const closeModal = (e: React.MouseEvent | undefined, setCurrentIndex: (value: React.SetStateAction<number | null>) => void, setCompleted: (value: React.SetStateAction<boolean>) => void) => {
  if (e) {
    e.preventDefault();
  }
  setCurrentIndex(null);
  setCompleted(true);
};


export const findPrev = (e: React.MouseEvent | undefined, setCurrentIndex: (value: React.SetStateAction<number | null>) => void) => {
  if (e) {
    e.preventDefault();
  }
  setCurrentIndex((prevIndex) => prevIndex! - 1);
};


export const findNext = (e: React.MouseEvent | undefined, setCurrentIndex: (value: React.SetStateAction<number | null>) => void) => {
  if (e) {
    e.preventDefault();
  }
  setCurrentIndex((prevIndex) => prevIndex! + 1);
};



