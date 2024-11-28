import Background from "@/components/landing_page_components/background";
import Title from "@/components/landing_page_components/title";
import Features from "@/components/landing_page_components/features";
import JoinUs from "@/components/landing_page_components/join-us";
import Footer from "@/components/landing_page_components/footer";
import Video from "@/components/landing_page_components/video";
import VideoImg from "@/public/images/landing-page-video-img.jpg";

export default function Landing() {
  return (
    <div>
      <Background />
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-20">
          <Title />
          <Video
            thumb={VideoImg}
            thumbWidth={1104}
            thumbHeight={576}
            thumbAlt="Video thumbnail"
            video="videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
      <Features />
      <JoinUs />
      <Footer />
    </div>
  );
}