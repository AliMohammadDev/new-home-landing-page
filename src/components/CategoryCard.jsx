import { Link } from "react-router-dom";

const CategoryCard = ({ id, title, description, image }) => {
  return (
    <Link to={`/products/${id}`}>
      <div className="group perspective w-full h-[300px]">
        <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">

          <div
            className="absolute inset-0 backface-hidden"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-full h-full bg-black/40 flex flex-col justify-center items-center text-center px-6">
              <h3 className="text-2xl font-semibold text-white font-[Expo-arabic]">
                {title}
              </h3>
              <p className="text-sm lg:text-[10px] xl:text-[15px] mt-4 text-white font-[Expo-arabic]">
                {description}
              </p>
            </div>
          </div>

          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white flex flex-col justify-center items-center text-center px-6">
            <h3 className="text-2xl font-semibold text-[#025043] font-[Expo-arabic]">
              {title}
            </h3>
            <p className="text-sm lg:text-[10px] xl:text-[15px] mt-4 text-gray-600 font-[Expo-arabic]">
              {description}
            </p>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;