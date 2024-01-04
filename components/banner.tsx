import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselDemo: React.FC = () => {
  // banner image url
  const bannerUrl: string[] = [
    "https://www.gingermediagroup.com/wp-content/uploads/2023/04/image-3.jpeg",
    "https://static.ebayinc.com/static/assets/Uploads/Stories/Articles/_resampled/FillWyIxMDI0IiwiNTEyIl0/060518-SneakerEvent-BU-EventName-EventBanner-Tall-1536x924-Final2.jpg",

    "https://pbs.twimg.com/media/CnC-ITAWYAEKv8S.jpg",

    "https://tifosisports.co.za/cdn/shop/files/Cloudmonter_Pearl-Flame_Banner-2048x1024_1024x1024.jpg?v=1695358536",
  ];

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      stopOnHover={false}
      showStatus={false}
      showThumbs={false}
      className="w-full max-w-[1200px] md:w-3/4"
    >
      {bannerUrl.map((url) => (
        <div key={url}>
          <img src={url} className="object-fill" />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselDemo;
