import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Confirm: React.FC = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center ">
      <p className="my-10">Your order is confirmed</p>
      <Link href={"/order"}>
        <Button>View Order</Button>
      </Link>
    </div>
  );
};

export default Confirm;
