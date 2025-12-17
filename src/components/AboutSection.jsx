


function AboutSection() {
    return (
        <section className="bg-[#EDEAE2] text-[#025043] mt-25 py-24  md:px-20">
            <span className="font-[Expo-book] text-black text-[40px] md:text-[64px] block mb-6 pl-4 md:pl-0">
                Intro to the company
            </span>

            <p className="text-black text-[14px] md:text-[24px] mb-4 pl-4 md:pl-0">
                Almanzel-Alhadith is a company specializes in providing high-quality
                kitchen tools and hospitality equipment for homes, restaurants, and
                hotels.
                <span className="text-black text-[14px] md:text-[24px] block mb-4">
                    Our core product range includes:
                </span>
            </p>

            <ul className="list-none font-[Expo-light] text-black space-y-2 pl-10 md:pl-20">
                <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
                    Elegant glassware, cups, mugs, jars, and all tabletop essentials.
                </li>
                <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
                    Decorative homeware, gifts, crystal items, and ornaments. Premium
                </li>
                <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
                    White porcelain and embellished or gold-accented porcelain for
                    fine dining.
                </li>
                <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
                    Durable stainless steel and high-grade metal kitchen tools.
                </li>
                <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
                    Specialized equipment for meat, dairy, and cold storage. Quality
                </li>
                <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
                    Plastic kitchenware, including chopping boards and fridge
                    containers.
                </li>
            </ul>

            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <span className="font-[Asteroid] text-5xl md:text-7xl text-black relative -bottom-5 md:bottom-0 sm:-top-4 -left-2 md:-left-12">
                    We
                </span>
                <p className="font-[Expo-book] text-sm md:text-lg text-black max-w-2xl relative md:-left-15 top-8">
                    combine functionality with refined aesthetics to meet the needs of
                    both domestic and professional kitchens.
                </p>
            </div>
        </section>
    )
}

export default AboutSection