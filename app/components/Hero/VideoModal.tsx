"use client";

import React, { useState } from "react";
import * as FaIcons from "react-icons/fa"; // Pura library import korlam

/**
 * Dynamic Icon Helper:
 * String name ke real Component e convert korbe.
 */
const DynamicIcon = ({ name }: { name: string }) => {
  const iconName = name?.trim();
  const IconComponent = (FaIcons as any)[iconName];
  
  if (!IconComponent) {
    return null; // Icon na thakle kicu dekhabe na
  }
  return <IconComponent />;
};

const VideoModal = ({ videoLink, videoIcon }: { videoLink: string; videoIcon: any[] }) => {
  const [showVideo, setShowVideo] = useState(false);

  const openVideo = () => setShowVideo(true);
  const closeVideo = () => setShowVideo(false);

  return (
    <>
      {/* Button with Dynamic Icons from Admin Panel */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {videoIcon?.map((item, index) => (
          <button
            key={index}
            onClick={openVideo}
            className="flex items-center gap-2 bg-[#FF5757] hover:bg-[#FF4040] px-5 py-2 rounded text-white font-semibold text-sm sm:text-base shadow-lg transition-all active:scale-95"
          >
            {/* Dynamic Icon ekhane call kora hoyeche */}
            <DynamicIcon name={item.icon} />
            <span>{item.text}</span>
          </button>
        ))}
      </div>

      {/* Video Modal Overlay */}
      {showVideo && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4 backdrop-blur-sm"
          onClick={closeVideo} // Bahire click korle close hobe
        >
          <div 
            className="relative w-full max-w-4xl aspect-video shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Video r bhitor click korle jeno bondho na hoy
          >
            <iframe
              className="w-full h-full rounded-lg border-2 border-white/10"
              src={videoLink.replace("watch?v=", "embed/")} // YouTube link fix korar jonno
              title="Intro Video"
              allow="autoplay; encrypted-media; fullscreen"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
            
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white text-2xl bg-white/10 hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;