export default function CirclePercentage({percentage}: {percentage: number | any}) {
    return (
      <div className="relative flex items-center justify-center">
        <svg className="w-12 h-12" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeDasharray="100, 100"
            strokeWidth="2"
          />
          <path
            className={`font-bold ${percentage < 50 ? `text-red-500` : percentage < 75 ? `text-yellow-500` : `text-green-500`}`} 
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeDasharray={`${percentage}, 100`} 
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
        <span className="absolute text-xl font-semibold text-[12px] text-black">{percentage}</span>
      </div>
    )
  }
  
  