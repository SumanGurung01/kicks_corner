import { allSneakers, countSilhouettes } from "@/lib/sneaker";
import { generateOrderId } from "@/method/method";
import { Sneaker } from "@/typing";
import { Link } from "lucide-react";
import React, { useState } from "react";

function Marquee() {
  function filterSneaker(collection: Sneaker[]) {
    const silhouette = countSilhouettes(collection);

    const filteredSneaker = Object.keys(silhouette).map((sil) => {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].silhouette === sil) {
          return {
            image: collection[i].image[0],
            silhouette: collection[i].silhouette,
          };
        }
      }
    });

    return filteredSneaker;
  }
  const [marqueeSneaker, setMarqueeSneaker] = useState(
    filterSneaker(allSneakers),
  );

  return (
    marqueeSneaker && (
      <div className="no-scrollbar mb-10 flex w-full overflow-x-auto">
        {marqueeSneaker.map((sneaker) => (
          <div
            key={generateOrderId()}
            className="ml-8 w-32 flex-shrink-0 py-8 xl:ml-0 xl:mr-8"
          >
            <img
              width={1000}
              height={1000}
              src={sneaker?.image}
              alt="sneaker"
              loading="lazy"
              className="rotate-[30deg] rounded-full object-cover"
            />
            <p className="text-center text-xs font-semibold">
              {sneaker?.silhouette}
            </p>
          </div>
        ))}
      </div>
    )
  );
}

export default Marquee;
