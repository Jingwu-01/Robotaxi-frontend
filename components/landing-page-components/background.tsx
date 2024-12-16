import Image from "next/image";
import Illustration from "@/public/images/page-illustration.svg";

// background component for landing page
export default function Background() {
  return (
    <>
      <div className="absolute left-1/2 -z-10" aria-hidden="true">
        <Image
          className="max-w-none"
          src={Illustration}
          width={846}
          height={594}
          alt="Background illustration"
        />
      </div>
    </>
  );
}
