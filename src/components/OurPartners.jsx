import React from 'react';
import { Link } from 'react-router-dom';
import qslogo from '../assets/images/qs-logo.svg';
import dimlajlogo from '../assets/images/dimlaj-logo.png';
function OurPartners() {
  return (
    <>
      <div className="flex   items-center justify-center  gap-12 bg-[#025043] my-20 w-full">
        <div className="flex sm:flex-row md:flex-row flex-col items-center justify-center gap-12 ">
          <Link to={`/products/8`} rel="noreferrer">
            <img src={qslogo} alt="qslogo" className="w-auto h-15 grayscale" />
          </Link>
          <Link to={`/products/9`} rel="noreferrer">
            <img src={dimlajlogo} alt="2" className="w-auto h-15 grayscale" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default OurPartners;
