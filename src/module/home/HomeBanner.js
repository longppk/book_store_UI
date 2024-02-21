import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";

const HomeBannerStyles = styled.section`
  margin-top: 94px;
  padding: 20px 0;
  background-color: #f0f0f0;
  text-align: center;

    .image-slide{
        width: 1200px;
        height: 400px;
        border-radius: 8px;
    }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="slide-style">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img
                className="image-slide"
              src="https://cdn0.fahasa.com/media/magentothem/banner7/VPP_Slide_T1_840x320.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
                className="image-slide"
              src="https://cdn0.fahasa.com/media/magentothem/banner7/Newbook_new_year_tuan2_Slide_840x320.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
                className="image-slide"
              src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/2023-11_Thieu-nhi/Thieunhi_LDP_Mainbanner_web_1920x700.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img className="image-slide"
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/Manga_LDP_Mainbanner_web_1920x700.jpg"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
