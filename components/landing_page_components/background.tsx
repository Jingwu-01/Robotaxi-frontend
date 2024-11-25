import Image from "next/image";
import Illustration from "@/public/images/page-illustration.svg";

export default function Background() {
  return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/4"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={Illustration}
          width={846}
          height={594}
          alt="Page illustration"
        />
      </div>
    </>
  );
}