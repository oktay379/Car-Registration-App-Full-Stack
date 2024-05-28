import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Cars from "./Cars";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Home = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const carData = [
    { id: 1, model: 'Aracını Kaydet', description: 'Aracını Şimdi Kaydet ve Kullanıcılara Ulas', image: 'https://www.katilimevim.com.tr/wp-content/uploads/shutterstock_711620761-min-1-580x350.jpg' },
    { id: 2, model: 'Kullanıcılara Mesaj At', description: 'Hatalı Kullanıcılar ile Şimdi İletişime Geç', image: 'https://arabam-blog.mncdn.com/wp-content/uploads/2020/10/104.jpg' },
    { id: 3, model: 'Kullanıcıları Uyar', description: 'Hatalı Kullanıcıları Direkt Uyar', image: 'https://arabam-blog.mncdn.com/wp-content/uploads/2023/11/sifir-arac-kampanyalari.jpg' },
    { id: 4, model: 'Araçalar Hakkında Yorum Yap', description: 'Kullanıcıların Araçları Hakkında Yorum Yap', image: 'https://www.araba.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Ftasit-com%2Fimages%2Ff_webp%2Cq_auto%2Fv1669631800%2Faraba-segmentleri-1%2Faraba-segmentleri-1.jpg%3F_i%3DAA&w=3840&q=75' }
  ];


  const [cars, setCars] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/car/getCars")
    .then(cars => {
      setCars(cars.data)
    })
    .catch(err => console.log(err));
  },[]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = cars.slice(firstPostIndex, lastPostIndex);


  return ( 
  <div className="min-h-screen bg-gray-100">

    <main className="container mx-auto p-6">
      <section className="text-center my-12">
        <h2 className="text-4xl font-bold text-gray-800">Araç Plakanı Gir</h2>
        <h3 className="text-gray-600 mt-4 font-bold">Vın-Vın İle Sende Plakanı Gir, Kullanıcılar İle İletişime Geç</h3>
      </section>

      <section>
        <Slider {...settings}>
          {carData.map((car) => (
            <div key={car.id} className="p-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={car.image} alt={car.model} className="w-full h-96 object-cover"/>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">{car.model}</h3>
                  <p className="text-gray-600 mt-2">{car.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </main>

    <div className="flex justify-center mt-5">
      <span className="text-2xl">Kayıtlı Tum Araclar</span>
    </div>

    <div className="flex flex-wrap justify-center container mx-auto cursor-pointe">
      <Cars cars = {currentPosts}/>
    </div>

    <div className="flex justify-center mt-5 p-4">
      <Pagination
        totalPosts = {cars.length}
        postsPerPage = {postsPerPage}
        setCurrentPage = {setCurrentPage}
      />
    </div>
  </div>
  )
}

export default Home