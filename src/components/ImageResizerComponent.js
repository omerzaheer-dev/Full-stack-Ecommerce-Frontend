import React, { useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';

// Utility function to fetch image from URL and convert it to a File object
const fetchImageAsFile = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const file = new File([blob], 'image.jpg', { type: blob.type });
  return file;
};

// Function to resize the image
const resizeImage = (file, maxWidth, maxHeight, outputType, quality, callback) => {
  Resizer.imageFileResizer(
    file,
    maxWidth,
    maxHeight,
    outputType,
    quality,
    0,
    (uri) => {
      callback(uri);
    },
    'base64'
  );
};

const ImageResizerComponent = ({imgUrl,Width,Height,ph,pw}) => {
  const imageUrl = imgUrl;
  const [resizedImage, setResizedImage] = useState('');

  const handleResize = async () => {
    try {
      const file = await fetchImageAsFile(imageUrl);
      resizeImage(file, Width, Height, 'PNG', 100, (resizedImage) => {
        setResizedImage(resizedImage);
      });
    } catch (error) {
      console.error('Error resizing image:', error);
    }
  };

  useEffect(()=>{
    handleResize()
  },[imageUrl])

  return (
    <div >
      {resizedImage && (
        <div className={`h-[${ph}px] w-[${pw}]px bg-slate-200`}>
          <img src={resizedImage} alt="Resized" className='object-fill w-full h-full' style={{ backgroundColor: 'transparent'}} />
        </div>
      )}
    </div>
  );
};

export default ImageResizerComponent;
