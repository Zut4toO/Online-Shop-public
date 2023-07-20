// https://www.npmjs.com/package/react-responsive-carousel

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Ambience = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const getImages = async () => {
      const res = await axios.get('/api/galery');
      setImages(res.data);
    };

    getImages();
  }, []);

  return (
    <div className='min-h-screen bg-gray-700 py-8'>
      <Carousel
        className='2xl:mx-96 xl:mx-64 md:mx-32 mx-8'
        showArrows={true}
        //showThumbs={true}
        //emulateTouch={true}
      >
        {images.map((url, index) => {
          return (
            <div key={index} className='max-w-[80%] max-h-[80%]'>
              <img src={url.image} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Ambience;
