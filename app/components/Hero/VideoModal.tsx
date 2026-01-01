"use client";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const VideoModal = ({ videoLink, videoIcon }) => {
  const [showVideo, setShowVideo] = useState(false);

  const openVideo = () => setShowVideo(true);
  const closeVideo = () => setShowVideo(false);

  return (
    <>
      <button
        onClick={openVideo}
        className="flex items-center gap-2 bg-[#FF5757] hover:bg-[#FF4040] px-5 py-2 rounded text-white font-semibold text-sm sm:text-base shadow-lg mx-auto md:mx-0"
      >
        {videoIcon.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </button>

      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src={videoLink}
              title="Intro Video"
              allow="autoplay; encrypted-media"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <button
              onClick={closeVideo}
              className="absolute top-2 right-2 text-white text-xl bg-red-600 hover:bg-red-700 rounded-full px-3 py-1"
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
