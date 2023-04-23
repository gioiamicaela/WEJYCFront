import React from 'react';
import NavBar from '../components/NavBar';
import Swiper from '../components/SwiperComponent';
import { photoList } from '../data/data';

function Home() {
  return (
    <div>
      <NavBar />
      <Swiper list={photoList} />
    </div>
  );
}

export default Home;
