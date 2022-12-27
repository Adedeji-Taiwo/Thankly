import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';




//loading skeletal component
export const skeletonLoader = Array.from({ length: 4 }, (_, index) => {
  return <SkeletonTheme key={index} baseColor="#293049" highlightColor="#434959" height={300}>
    <p>
      <Skeleton count={1} />
    </p>
  </SkeletonTheme>;
});



//store latest card to local storage
export const cardSaver = (type: string, bottomText: string, dataUrl: string | File | Blob | Uint8Array,) => {
  const card = JSON.parse(localStorage.getItem('thankly')!);
  card && localStorage.removeItem('thankly');
  localStorage.setItem('thankly', JSON.stringify({
    type: type,
    name: `Thankly-${bottomText}`,
    data: dataUrl,
  }));
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




export const generateRandomUrl = async (): Promise<string | undefined> => {
  const url = `https://source.unsplash.com/random/300x30${Math.floor(Math.random() * 10)}`;

  try {
    const response = await fetch(url);
    return response.url;
  } catch (error) {
    console.log(error)
  }
};






//modal buttons functions
export const openModal = (e: React.MouseEvent, index: number, setCurrentIndex: (value: React.SetStateAction<number | null>) => void, setCompleted: (value: React.SetStateAction<boolean>) => void, setTopText: (value: React.SetStateAction<string>) => void) => {
  setCurrentIndex(index);
  setTopText("Thank you");
  setCompleted(false);
};

export const closeModal = (e: React.MouseEvent | undefined, setCurrentIndex: (value: React.SetStateAction<number | null>) => void) => {
  if (e) {
    e.preventDefault();
  }
  setCurrentIndex(null);
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



