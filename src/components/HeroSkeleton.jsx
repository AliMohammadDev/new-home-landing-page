export const HeroSkeleton = () => (
    <div className="w-full h-screen bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute z-10 top-1/2 -translate-y-1/2 px-10 w-full">
            <div className="h-12 md:h-20 bg-gray-300 rounded-lg w-1/2 mb-4" />
            <div className="h-6 bg-gray-300 rounded-lg w-1/3" />
        </div>
    </div>
);