interface Props {
  server: "anarchy" | "classic";
}

// YouTube video IDs
const VIDEOS = {
  anarchy: "-ioHuCZryTg",
  classic: "5QU20HMPZ3M",
};

export default function VideoBackground({ server }: Props) {
  const videoId = VIDEOS[server];

  return (
    <div className="video-bg">
      <iframe
        key={server}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&start=5`}
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        title="background"
      />
      <div className="video-overlay" />
      {/* Extra dark vignette at edges */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}
