import { useEffect, useState } from "react";

interface Props {
  server: "anarchy" | "classic";
}

const VIDEOS = {
  anarchy: "-ioHuCZryTg",
  classic: "5QU20HMPZ3M",
};

export default function VideoBackground({ server }: Props) {
  const videoId = VIDEOS[server];
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const opacity = Math.max(0, 1 - (scrollY / (vh * 0.65)));
      setScrollOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="video-bg"
      style={{ opacity: scrollOpacity, transition: "opacity 0.08s linear" }}
    >
      <iframe
        key={server}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&start=5`}
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        title="background"
      />
      <div className="video-overlay" />
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)" }}
      />
      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[3]"
        style={{ height: "45vh", background: "linear-gradient(to bottom, transparent 0%, rgba(3,0,0,0.7) 70%, rgba(3,0,0,1) 100%)" }}
      />
    </div>
  );
}