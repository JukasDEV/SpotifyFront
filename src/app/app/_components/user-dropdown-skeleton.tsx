export const UserDropdownSkeleton = () => {
    return (
        <div className="animate-pulse flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div className="flex-1 flex flex-col space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full max-w-xs"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 max-w-sm"></div>
            </div>
        </div>
    );
};
