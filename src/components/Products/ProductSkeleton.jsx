

export const ProductSkeleton = () => (
    <div className="animate-pulse bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-[500px]">
        <div className="w-full h-64 bg-gray-300" />
        <div className="p-4 flex flex-col flex-1 space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-300 rounded w-1/2" />
            <div className="border-b border-gray-200" />
            <div className="h-6 bg-gray-300 rounded w-1/4" />
            <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full" />
                <div className="h-3 bg-gray-300 rounded w-full" />
            </div>
            <div className="mt-auto h-10 bg-gray-300 rounded-full w-full" />
        </div>
    </div>
);