import { useState } from 'react';

import { animate, AnimationListOptions, MotionKeyframesDefinition } from 'motion';

interface UseAnimationTypes {
  onFinish: (res: any) => void;
}

interface NulledAnimationControls {
  play: VoidFunction | null;
  pause: VoidFunction | null;
  stop: VoidFunction | null;
  finish?: VoidFunction | null;
  reverse?: VoidFunction | null;
  cancel: VoidFunction | null;
  finished?: Promise<any>;
  currentTime: number | null;
  playbackRate: number | null;
}

export const useMotionAnimate = (
  selector: React.RefObject<any> | string,
  keyframes: MotionKeyframesDefinition,
  options?: AnimationListOptions | undefined,
  events?: UseAnimationTypes,
) => {
  const [propsRefContainer, setPropsRefContainer] =
    useState<NulledAnimationControls>({
      currentTime: null,
      playbackRate: null,
      // functions
      pause: null,
      play: null,
      finish: null,
      cancel: null,
      stop: null,
    });
  const play = async () => {
    if (selector) {
      let selectedType;

      if (typeof selector === 'string') {
        selectedType = selector;
      } else {
        selectedType = selector.current;
      }

      if (selectedType) {
        const animateInstance = animate(selectedType, keyframes, options);

        await animateInstance.finished.then((res) => {
          events && events.onFinish(res);
        });

        setPropsRefContainer({
          currentTime: animateInstance.currentTime,
          playbackRate: animateInstance.playbackRate,
          // functions
          pause: animateInstance.pause,
          play: animateInstance.play,
          finish: animateInstance.finish,
          cancel: animateInstance.cancel,
          stop: animateInstance.stop,
        });
      }
    }
  };
  const reset = () => {
    if (typeof selector !== 'string') {
      // @ts-ignore
      selector.current.style = null;
    } else {
      let selectedElement: HTMLElement = document.querySelector(
        selector,
      ) as HTMLElement;
      // @ts-ignore
      selectedElement.style = null;
    }
  };

  return {
    ...propsRefContainer,
    play,
    reset,
  };
};
