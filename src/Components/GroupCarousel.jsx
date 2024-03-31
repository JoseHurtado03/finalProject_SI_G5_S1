import React from 'react';
import Slider from 'react-slick';
import GroupCard from './TarjetaGrupo';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//
//Para instalar la libreria colocar el siguiente comando en la terminal:
//npm install react-slick slick-carousel




const GroupCarousel = ({grupos}) => {
const [currentSlide, setCurrentSlide] = React.useState(0);

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (prevSlide, nextSlide) => {
    setCurrentSlide(nextSlide);
    }
};

return (
    <div>
    <Slider {...settings}>
        {grupos.map((group, index) => (
        <GroupCard key={index} nombre={group.nombre} mision={group.mision} vision={group.vision}/>
        ))}
    </Slider>
    <div className="current-slide">
        {currentSlide + 1}/{grupos.length}
    </div>
    </div>
);
};

export default GroupCarousel;
