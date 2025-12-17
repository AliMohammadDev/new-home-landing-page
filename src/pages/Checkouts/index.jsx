function Checkouts() {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-between items-start text-white px-6 lg:px-20 py-16 md:py-32 gap-10 md:gap-16 bg-[#025043] min-h-screen font-[Expo-arabic]">
        {/* Left Side - Contact Information */}
        <div
          className="w-full rounded-t-4xl md:w-1/2 space-y-10 text-left font-[Expo-bold]  translate-y-6 p-8"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Title */}
          <h2 className="text-2xl md:text-3xl tracking-wide">
            CONTACT INFORMATION
          </h2>

          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 font-[Expo-arabic] rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 rounded-xl font-[Expo-arabic] bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl font-[Expo-arabic] bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 rounded-xl font-[Expo-arabic] bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Address Title */}
          <h2 className="text-2xl md:text-3xl font-[Expo-bold] tracking-wide pt-4">
            ADDRESS
          </h2>

          {/* Row 3 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Country"
              className="w-full p-3 rounded-xl font-[Expo-arabic] bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 rounded-xl font-[Expo-arabic] bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Row 4 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Street"
              className="w-full p-3 rounded-xl font-[Expo-arabic] bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              type="text"
              placeholder="Building / Floor"
              className="w-full p-3 rounded-xl font-[Expo-arabic] bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Row 5 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              placeholder="Postal Code"
              className="w-full p-3 rounded-xl font-[Expo-arabic] bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              type="text"
              placeholder="Additional Info"
              className="w-full p-3 rounded-xl font-[Expo-arabic] bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>
        </div>

        {/* Right Form */}
        <div
          className="w-full rounded-t-4xl md:w-1/2 space-y-6 text-left font-[Expo-bold] translate-y-6 p-8"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Title */}
          <h2 className="text-2xl md:text-3xl tracking-wide mb-4">
            Order Summary
          </h2>

          {/* Divider */}
          <div className="w-full h-0.5 bg-white/40"></div>

          {/* Product Item */}
          <div className="flex items-center justify-between gap-4 bg-white/10 p-4 rounded-xl">
            <img
              src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765364809/productInfo_d9c0pg.png"
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-[Expo-arabic]">Product Name</h3>
              <p className="text-sm font-[Expo-arabic] text-white/70">
                5000 SP
              </p>
            </div>

            <button className="text-red-300 cursor-pointer font-[Expo-arabic] hover:text-red-400 text-sm">
              Remove
            </button>
          </div>

          {/* Product Item Example 2 */}
          <div className="flex items-center justify-between gap-4 bg-white/10 p-4 rounded-xl">
            <img
              src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765364809/productInfo_d9c0pg.png"
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-[Expo-arabic]">Another Product</h3>
              <p className="text-sm font-[Expo-arabic] text-white/70">
                3000 SP
              </p>
            </div>

            <button className="text-red-300 cursor-pointer font-[Expo-arabic] hover:text-red-400 text-sm">
              Remove
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 bg-white/40"></div>

          {/* Total */}
          <div className="flex justify-between text-xl font-[Expo-arabic] font-bold">
            <span>Total</span>
            <span>8000 SP</span>
          </div>

          {/* Button */}
          <button className="w-full py-4 font-[Expo-arabic] cursor-pointer bg-white text-[#025043] text-xl rounded-2xl font-bold hover:bg-gray-200 transition">
            Place Order / Pay
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkouts;
