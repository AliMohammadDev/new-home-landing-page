import { useState } from 'react';

const CategoryCard = ({ title, description, image }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="text-center py-20 transition-all duration-500 overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? 'rgba(0,0,0,0.4)' : 'white',
        backgroundImage: hover ? `url(${image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: hover ? 'overlay' : 'normal    ',
        color: hover ? 'white' : '#025043',
      }}
    >
      <span className="text-3xl font-semibold">{title}</span>
      <p className="text-xs mt-5 md:mt-1 md:p-2">{description}</p>
    </div>
  );
};

export default CategoryCard;
