import React, { useEffect, useState } from "react";
import { allSneakers } from "@/lib/sneaker";
import { Sneaker } from "@/typing";
import { generateOrderId } from "@/method/method";
import Link from "next/link";

interface props {
  silhouette: String;
}

function Recommended({ silhouette }: props) {
  const [recommendedSneaker, setRecommendedSneaker] = useState<Sneaker[]>([]);

  useEffect(() => {
    const sneaker = allSneakers.filter(
      (sneaker) => silhouette === sneaker.silhouette,
    );
    setRecommendedSneaker(sneaker);
  }, [silhouette]);

  return (
    recommendedSneaker && (
      <div className="no-scrollbar m-4 flex overflow-x-auto xl:m-0">
        {recommendedSneaker.map((sneaker) => (
          <Link
            href={`/sneaker/${sneaker.id}`}
            key={sneaker.id}
            className="ml-4 w-44 flex-shrink-0 xl:ml-0 xl:mr-4"
          >
            <img
              width={1000}
              height={1000}
              src={sneaker.image[0]} // Assuming sneaker.image[0] contains the URL of the image
              alt="sneaker"
              loading="lazy"
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    )
  );
}

export default Recommended;
