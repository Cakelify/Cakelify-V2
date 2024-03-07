import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

function ReviewSlider() {
  const data = [
    {
      name: "Sourabh G.",
      review:
        "The cakes from Cakelify are absolutely delicious! They are freshly baked, moist, and flavorful. I've ordered multiple cakes for various occasions, and each one has been a hit with everyone",
    },
    {
      name: "Dilip",
      review:
        "The Cakelify offers a wide variety of cake flavors and designs to choose from. Whether you're looking for a classic chocolate cake or a custom-designed specialty cake, they have something for every taste and occasion.",
    },
    {
      name: "Sudhir",
      review:
        "Cakelify's delivery service is prompt and reliable. Cakes always arrive on time and in perfect condition, thanks to their careful packaging. The tracking system provides updates on the delivery status, which adds convenience and peace of mind.",
    },
    {
      name: "Pradeep",
      review:
        "The customer service team is friendly, helpful, and responsive. They are always ready to assist with any questions or concerns, making the ordering process smooth and enjoyable.",
    },
    {
      name: "Aman",
      review:
        "My experience with Cakelify has been exceptional. From browsing their website to enjoying the delicious cakes, everything has been seamless and delightful. I highly recommend Cakelify to anyone looking for high-quality cakes and excellent service",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col justify-center mb-20">
      <div className="flex flex-col justify-center">
        <h2 className="text-center  fontStyle font-black text-xl pl-10 pr-10 ">
          <p className="text-center m-0">Loved by over</p>
          <p className="text-center m-0">2000+ Cake lovers ❤️</p>
          <p className="m-0">😄😄😄</p>
        </h2>
        <div className="w-11/12 h-100 ml-auto mr-auto ">
          <div className="mt-2">
            <p className="text-center mt-3 mb-4 fontStyle1 text-xl ">
              Why our Customers love us
            </p>
            <Slider {...settings}>
              {data.map((d) => (
                <div>
                  <div className="bg-alpha-pink max-h-max text-black rounded-3xl ">
                    <div className="flex flex-col justify-center items-center gap-4 p-7 ">
                      <p className="text-white font-semibold fontStyle">
                        {d.review}
                      </p>
                    </div>
                  </div>
                  <div class="bottom-arrow bg-alpha-pink  rounded-sm"></div>

                  <p className="flex flex-col justify-center items-center gap-4 p-6 fontStyle">
                    {d.name}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewSlider;
