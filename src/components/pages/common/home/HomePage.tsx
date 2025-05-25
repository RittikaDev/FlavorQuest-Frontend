import { AboutUs } from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import FeaturedSpots from "./FeaturedSpots/FeaturedSpots";
import FoodCategories from "./FoodCategories/FoodCategories";
import PremiumBenefits from "./PremiumBenefits/PremiumBenefits";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <FeaturedSpots />
      <PremiumBenefits />
      <FoodCategories />
      {/* <TopRated /> */}
    </div>
  );
};

export default HomePage;
