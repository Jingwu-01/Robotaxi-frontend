// Description: Landing page component.
import Background from "@/components/landing-page-components/background";
import Title from "@/components/landing-page-components/title";
import Features from "@/components/landing-page-components/features";
import JoinUs from "@/components/landing-page-components/join-us";
import Footer from "@/components/landing-page-components/footer";
import Video from "@/components/landing-page-components/video";
import VideoImg from "@/public/images/landing-page-video-img.jpg";

// Landing page component
export default function Landing() {
  return (
    <div>
      {/* Background */}
      <Background />

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-20">
          <Title />
          <Video
            thumb={VideoImg}
            thumbWidth={1104}
            thumbHeight={576}
            thumbAlt="video thumbnail"
            video="videos/robotaxi.mp4"
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