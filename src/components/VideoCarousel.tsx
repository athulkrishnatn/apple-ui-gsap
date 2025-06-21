import { hightlightsSlides } from '@/constants';
import { pauseImg, playImg, replayImg } from '@/utils';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type VideoState = {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
};

type HandleType = 'video-end' | 'video-last' | 'video-reset' | 'play' | 'pause';

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const [video, setVideo] = useState<VideoState>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<any[]>([]);

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useEffect(() => {
    if (loadedData.length > 3) {
      const currentVideo = videoRef.current[videoId];
      if (currentVideo) {
        if (!isPlaying) {
          currentVideo.pause();
        } else if (startPlay) {
          currentVideo.play();
        }
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    const span = videoSpanRef.current;
    if (span[videoId]) {
      gsap.to(span[videoId], {
        onUpdate: () => {
          // Progress animation update logic
        },
        onComplete: () => {
          // Animation complete logic
        },
      });
    }
  }, [videoId, startPlay]);

  const handleProcess = (type: HandleType, i: number = 0) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      case 'video-last':
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case 'video-reset':
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      case 'play':
        setVideo((prev) => ({ ...prev, isPlaying: true }));
        break;
      case 'pause':
        setVideo((prev) => ({ ...prev, isPlaying: false }));
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full flex items-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  preload="auto"
                  ref={(el) => {
                    if (el) videoRef.current[i] = el;
                  }}
                  onPlay={() =>
                    setVideo((prev) => ({
                      ...prev,
                      isPlaying: true,
                    }))
                  }
                  muted
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center mt-10">
        <div className="flex items-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) videoDivRef.current[i] = el;
              }}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                ref={(el) => {
                  if (el) videoSpanRef.current[i] = el;
                }}
                className="absolute h-full w-full rounded-full"
              />
            </span>
          ))}
        </div>

        <button className="ml-4 p-4 rounded-full bg-gray-300 backdrop-blur flex-center">
          <Image
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                ? () => handleProcess('play')
                : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
