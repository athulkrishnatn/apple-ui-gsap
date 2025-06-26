import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import * as THREE from 'three';
import { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Type definitions
interface AnimationProps {
  [key: string]: any;
}

interface ScrollProps {
  trigger?: string | Element;
  toggleActions?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  [key: string]: any;
}

interface TimelineAnimationProps {
  transform?: string;
  duration?: number;
  opacity?: number;
  scale?: number;
  x?: number;
  y?: number;
  z?: number;
  [key: string]: any;
}

export const animateWithGsap = (
  target: string | Element, 
  animationProps: AnimationProps, 
  scrollProps?: ScrollProps
): void => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    }
  });
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline, 
  rotationRef: RefObject<THREE.Group>, 
  rotationState: number, 
  firstTarget: string | Element, 
  secondTarget: string | Element, 
  animationProps: TimelineAnimationProps
): void => {
  if (!rotationRef.current) return;

  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut'
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  );
};