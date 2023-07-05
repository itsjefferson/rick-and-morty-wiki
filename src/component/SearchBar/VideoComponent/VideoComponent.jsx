import React from "react";

const VideoComponent = React.memo(() => {
  return (
    <video
      src="/assets/Video-Cover-Contrast.mp4"
      width="100%"
      autoPlay
      loop
      muted
    >
      Your browser does not support the video tag
    </video>
  );
});

export default VideoComponent;
