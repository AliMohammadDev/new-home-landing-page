import { useState } from 'react';
import Slider from 'react-slick';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.jsx';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.jsx';
import { Link } from 'react-router-dom';
import { useAddToCartItem } from '../../api/cart.jsx';
import { addToast } from '@heroui/react';
import { useGetProfile } from '../../api/auth.jsx';
import RatingStars from '../RatingStars.jsx';
import { useAddReviews } from '../../api/reviews.jsx';
function ProductSlider1({ products = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: user } = useGetProfile();

  const { mutate: addToCart, isLoading } = useAddToCartItem();

  const handleAddCartItem = (variant) => {
    if (!user) {
      addToast({
        title: 'Cart',
        description: 'You have to login first!',
        color: 'warning',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    addToCart(
      {
        product_variant_id: variant.id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          addToast({
            title: 'Cart',
            description: `${variant.product.name} added to cart successfully!`,
            color: 'success',
            duration: 4000,
            isClosable: true,
          });
        },
        onError: () => {
          addToast({
            title: 'Cart',
            description: `Failed to add ${variant.product.name} to cart`,
            color: 'error',
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );
  };



  const CustomArrow = ({ onClick, direction }) => (
    <button
      onClick={onClick}
      className="absolute -top-10 md:-top-14 bg-[#D9D9D9] cursor-pointer text-black rounded-full w-8 h-8 md:w-12 md:h-12 transition flex items-center justify-center md:mt-1"
      style={{
        right: direction === 'next' ? 0 : 50,
        zIndex: 10,
      }}
    >
      {direction === 'next' ? (
        <ChevronRightIcon color="#025043" />
      ) : (
        <ChevronLeftIcon color="#025043" />
      )}
    </button>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const progress = products.length > 0 ? ((currentSlide + 1) / products.length) * 100 : 0;




  const { mutate: addReview } = useAddReviews();

  const handleRateProduct = (variantId, rating) => {
    if (!user) {
      addToast({
        title: 'Rating',
        description: 'You have to login first!',
        color: 'warning',
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    addReview(
      {
        product_variant_id: variantId,
        rating,
      },
      {
        onSuccess: () => {
          addToast({
            title: 'Thank you!',
            description: 'Your review has been submitted',
            color: 'success',
          });
        },
        onError: (error) => {
          addToast({
            title: 'Error',
            description:
              error.response?.data?.message || 'Failed to submit review',
            color: 'error',
          });
        }
      }
    );

  };


  return (
    <>
      {/* Essential to prep */}
      <section className="bg-[#EDEAE2] text-[#025043] md:px-20 md:py-10">
        <span className="font-[Qanduchia] text-black text-[40px] md:text-[64px] block mb-6 pl-4 md:pl-0">
          Essential to prep
          <p className="text-black text-[14px] font-[Expo-book] md:text-[15px]">
            Quality homeware essentials designed to make everyday living easier,
            more organized, and more stylish.
          </p>
        </span>
        {/* Slider */}
        <div className="grid grid-cols-1 gap-10 relative">
          <Slider {...settings}>

            {products.map((variant) => {
              const product = variant.product;

              return (
                <div key={variant.id} className="md:px-1">
                  <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD]">
                    <img
                      src={product.image}
                      alt="stainless steel cookware"
                      className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-[#025043] text-[16px] font-medium mb-2">
                        {product.name}
                      </h3>

                      <div className="border-b border-[#025043]/50 mb-3"></div>

                      <p className="text-[#025043] text-[18px] font-semibold mb-4">
                        {product.final_price} $
                      </p>

                      <div className="flex items-center justify-between md:flex-col lg:flex-row text-[#025043]">
                        <div className="flex items-center gap-1 text-sm">
                          <RatingStars
                            rating={Number(variant.reviews_avg) || 0}
                            onRate={(star) =>
                              handleRateProduct(variant.id, star)
                            }
                          />
                          <span className="text-xs text-gray-500">
                            ({variant.reviews_count || 0})
                          </span>
                          <Link to={'/products'} className="text-sm hover:underline ml-2">
                            view more
                          </Link>
                        </div>
                        <button
                          onClick={() => handleAddCartItem(variant)}
                          disabled={isLoading}
                          className="bg-[#025043] text-white text-sm px-4 py-1.5 rounded-full hover:bg-[#01382f] transition disabled:opacity-50"
                        >
                          {isLoading ? 'Adding...' : 'Add to cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )

            })}

          </Slider>

          <div className="mt-6 px-2 md:px-0">
            <div className="w-full h-1 md:h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductSlider1;
