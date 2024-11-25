import Background from "@/components/landing_page_components/background";
import Video from "@/components/landing_page_components/video";
import Features from "@/components/landing_page_components/features";
import JoinUs from "@/components/landing_page_components/join-us";
import Footer from "@/components/landing_page_components/footer";

export default function Home() {
  return (
    <>
      <Background />
      <Video />
      <Features />
      <JoinUs />
      <Footer />
    </>
  );
}