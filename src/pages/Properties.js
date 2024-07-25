import React, { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import CountDown from "../components/functions/CountDown";
import AnimationTitles from "../components/functions/AnimationTitles";
import { motion } from "framer-motion"; // Importa motion de framer-motion

const propertiesData = [
  {
    imgSrc: require("../images/properties/picture-of-a-wooden-building-in-the-forest.webp"),
    title: "Cottage «Forrest 1»",
    description: "@Red Oak Realty",
    time: { h: 9, m: 45, s: 8 },
    bid: "29.71 ETH"
  },
  {
    imgSrc: require("../images/properties/pexels-stan-krotov-12737424 1.webp"),
    title: "Freshness",
    description: "@ERA Ukraine Real Estate",
    time: { h: 29, m: 15, s: 10 },
    bid: "14.81 ETH"
  },
  {
    imgSrc: require("../images/properties/pexels-rachel-claire-8112843 1.webp"),
    title: "Wish house",
    description: "@UA real estate agency",
    time: { h: 23, m: 6, s: 1 },
    bid: "16.62 ETH"
  },
  {
    imgSrc: require("../images/properties/david-kovalenko-9-qFzV9a2Zc-unsplash.webp"),
    title: "Spruce",
    description: "@Dream House",
    time: { h: 10, m: 30, s: 58 },
    bid: "17.01 ETH"
  },
  {
    imgSrc: require("../images/properties/house_big-1.webp"),
    title: "Residence Rybna",
    description: "@UA real estate agency",
    time: { h: 18, m: 21, s: 8 },
    bid: "29.71 ETH"
  },
  {
    imgSrc: require("../images/properties/house_big.webp"),
    title: "Blue Sky",
    description: "@ERA Ukraine Real Estate",
    time: { h: 23, m: 16, s: 11 },
    bid: "17.31 ETH"
  }
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function Properties() {
  const [shuffledProperties, setShuffledProperties] = useState([]);

  useEffect(() => {
    setShuffledProperties(shuffleArray(propertiesData));
  }, []);

  function active(e) {
    let act = document.querySelectorAll(".active");
    act[0].classList.remove("active");
    e.target.classList.add("active");
  }

  function like(e) {
    e.target.classList.toggle("fa-solid");
    e.target.classList.toggle("fa-regular");
    e.target.classList.toggle("text-danger");
  }

  return (
    <div className="properties">
      <Container>
        <AnimationTitles
          className="title mx-auto"
          title="Discover more properties"
        />
        <div className="tabs d-flex justify-content-start justify-content-sm-center align-items-center flex-nowrap w-lg-50">
          <Swiper
            className="mySwiper overflow-none"
            grabCursor={true}
            spaceBetween={15}
            slidesPerView={6}
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 6,
              },
            }}
          >
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                All
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button
                className="ms-0 bg-black-100 border-0 active"
                onClick={active}
              >
                Cottage
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Chalet
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Manor
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Penthouse
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Farmhouse
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Duplex
              </Button>
            </SwiperSlide>
          </Swiper>
        </div>
        <motion.div
          initial={{ x: -80 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            grabCursor={true}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              520: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1198: {
                slidesPerView: 5,
              },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper mt-4"
          >
            {shuffledProperties.map((property, index) => (
              <SwiperSlide key={index}>
                <Card className="bg-black-100 rounded">
                  <Card.Body className="p-2">
                    <div className="rounded overflow-hidden position-relative">
                      <Card.Img variant="top" alt="img" src={property.imgSrc} />
                      <i className="fa-regular fa-heart like" onClick={like}></i>
                    </div>
                    <h5 className="mt-2 text-white fw-normal">{property.title}</h5>
                    <p className="gray-90">{property.description}</p>
                    <div className="d-flex">
                      <div className="me-3">
                        <CountDown h={property.time.h} m={property.time.m} s={property.time.s} />
                        <span className="gray-90">Remaining Time</span>
                      </div>
                      <div>
                        <h6 className="text-white">{property.bid}</h6>
                        <span className="gray-90">Current Bid</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </div>
  );
}

export default Properties;
