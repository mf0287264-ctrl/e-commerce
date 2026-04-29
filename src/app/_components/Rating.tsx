import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
type prob = {
  rating: number;
};
export default function Rating({ rating }: prob) {
  return (
    <div className="flex items-center text-yellow-400">
      {[...Array(5)].map((_, i) => {
        if (rating >= i + 1) {
          return <FaStar key={i} />;
        } else if (rating >= i + 0.5) {
          return <FaStarHalfAlt key={i} />;
        } else {
          return <FaRegStar key={i} />;
        }
      })}
    </div>
  );
}
