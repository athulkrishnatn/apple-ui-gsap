'use client';

import { hightlightsSlides } from '@/constants';
import { pauseImg, playImg, replayImg } from '@/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type VideoState = {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
};

type HandleType = 'video-end' | 'video-last' | 'video-reset' | 'play' | 'pause';

const VideoCarousel = () => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLDivElement | null)[]>([]);

  const [video, setVideo] = useState<VideoState>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedVideos, setLoadedVideos] = useState<number>(0);
  const { isLastVideo, startPlay, videoId, isPlaying } = video;

  // GSAP animations
  useGSAP(() => {
    // Slider animation
    gsap.to('.slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });

    // Scroll trigger to start playing
    gsap.to('.video-container', {
      scrollTrigger: {
        trigger: '.video-container',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          setVideo((prev) => ({
            ...prev,
            startPlay: true,
            isPlaying: true,
          }));
        },
      },
    });
  }, [videoId]);

  // Handle video loaded
  const handleLoadedMetadata = useCallback((i: number) => {
    setLoadedVideos(prev => prev + 1);
    
    // Auto-start the first video when it's loaded and we're ready
    if (i === 0) {
      setTimeout(() => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      }, 500);
    }
  }, []);

  // Play/pause video logic
  const playVideo = useCallback(async (videoElement: HTMLVideoElement) => {
    try {
      videoElement.currentTime = 0; // Start from beginning
      await videoElement.play();
      return true;
    } catch (error) {
      console.log('Autoplay prevented:', error);
      return false;
    }
  }, []);

  const pauseVideo = useCallback((videoElement: HTMLVideoElement) => {
    try {
      videoElement.pause();
    } catch (error) {
      console.log('Error pausing video:', error);
    }
  }, []);

  // Main video control effect
  useEffect(() => {
    const currentVideo = videoRef.current[videoId];
    if (!currentVideo) return;

    const handleVideoControl = async () => {
      // Pause all other videos
      videoRef.current.forEach((video, index) => {
        if (video && index !== videoId) {
          pauseVideo(video);
        }
      });

      // Control current video
      if (isPlaying && startPlay) {
        const played = await playVideo(currentVideo);
        if (!played) {
          // If autoplay failed, update state
          setVideo(prev => ({ ...prev, isPlaying: false }));
        }
      } else {
        pauseVideo(currentVideo);
      }
    };

    // Small delay to ensure video is ready
    const timer = setTimeout(handleVideoControl, 100);
    return () => clearTimeout(timer);
  }, [videoId, isPlaying, startPlay, playVideo, pauseVideo]);

  // Progress bar animation
  useEffect(() => {
    if (!isPlaying || !startPlay) return;

    const span = videoSpanRef.current[videoId];
    const currentVideo = videoRef.current[videoId];
    const videoDuration = hightlightsSlides[videoId]?.videoDuration;

    if (!span || !currentVideo || !videoDuration) return;

    let animationFrame: number;
    
    const updateProgress = () => {
      const progress = (currentVideo.currentTime / videoDuration) * 100;
      
      gsap.to(span, {
        width: `${Math.min(progress, 100)}%`,
        backgroundColor: 'white',
        duration: 0.1,
      });

      gsap.to(videoDivRef.current[videoId], {
        width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw',
        duration: 0.1,
      });

      if (progress < 100 && isPlaying) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else if (progress >= 100) {
        // Reset progress bar
        gsap.to(videoDivRef.current[videoId], {
          width: '12px',
          duration: 0.3,
        });
        gsap.to(span, {
          backgroundColor: '#afafaf',
          duration: 0.3,
        });
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [videoId, isPlaying, startPlay]);

  const handleProcess = useCallback((type: HandleType, i: number = 0) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({ 
          ...prev, 
          isEnd: true, 
          videoId: i + 1,
          isPlaying: true,
        }));
        break;
      case 'video-last':
        setVideo((prev) => ({ 
          ...prev, 
          isLastVideo: true,
          isPlaying: false 
        }));
        break;
      case 'video-reset':
        setVideo({
          isEnd: false,
          startPlay: true,
          videoId: 0,
          isLastVideo: false,
          isPlaying: true,
        });
        break;
      case 'play':
        setVideo((prev) => ({ ...prev, isPlaying: true, startPlay: true }));
        break;
      case 'pause':
        setVideo((prev) => ({ ...prev, isPlaying: false }));
        break;
    }
  }, []);

  const handlePlayPause = useCallback(() => {
    if (isLastVideo) {
      handleProcess('video-reset');
    } else if (isPlaying) {
      handleProcess('pause');
    } else {
      handleProcess('play');
    }
  }, [isLastVideo, isPlaying, handleProcess]);

  return (
    <div className="video-container">
      <div className="flex items-center overflow-hidden">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} className="slider sm:pr-20 pr-10 flex-shrink-0">
            <div className="relative sm:w-[80vw] w-[95vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full flex items-center rounded-3xl overflow-hidden bg-black">
                <video
                  className={`video ${
                    list.id === 2 ? 'translate-x-44' : ''
                  } w-full h-full object-cover`}
                  ref={(el) => {
                    videoRef.current[i] = el;
                  }}
                  onLoadedMetadata={() => handleLoadedMetadata(i)}
                  onEnded={() => {
                    if (i !== hightlightsSlides.length - 1) {
                      handleProcess('video-end', i);
                    } else {
                      handleProcess('video-last');
                    }
                  }}
                  onPlay={() => {
                    console.log(`Video ${i} started playing`);
                  }}
                  onPause={() => {
                    console.log(`Video ${i} paused`);
                  }}
                  onError={(e) => {
                    console.error(`Video ${i} error:`, e);
                  }}
                  playsInline
                  muted
                  preload="metadata"
                  webkit-playsinline="true"
                >
                  <source src={list.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, index) => (
                  <p key={`${text}-${index}`} className="md:text-2xl text-xl font-medium text-white drop-shadow-lg">
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
            <div
              key={i}
              ref={(el) => {
                videoDivRef.current[i] = el;
              }}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              onClick={() => {
                setVideo(prev => ({
                  ...prev,
                  videoId: i,
                  isPlaying: true,
                  startPlay: true,
                  isLastVideo: false,
                  isEnd: false,
                }));
              }}
            >
              <span
                ref={(el) => {
                  videoSpanRef.current[i] = el;
                }}
                className="absolute h-full w-full rounded-full bg-transparent"
              />
            </div>
          ))}
        </div>

        <button 
          className="ml-4 p-4 rounded-full bg-gray-300 backdrop-blur flex items-center justify-center hover:bg-gray-400 transition-colors"
          onClick={handlePlayPause}
          type="button"
        >
          <Image
            width={30}
            height={30}
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
          />
        </button>
      </div>

      {/* Debug info - remove in production */}
      <div className="mt-4 text-sm text-gray-600 bg-gray-100 p-2 rounded">
        <p>Current Video: {videoId + 1}/{hightlightsSlides.length}</p>
        <p>Is Playing: {isPlaying ? 'Yes' : 'No'}</p>
        <p>Start Play: {startPlay ? 'Yes' : 'No'}</p>
        <p>Videos Loaded: {loadedVideos}/{hightlightsSlides.length}</p>
        <p>Is Last Video: {isLastVideo ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default VideoCarousel;