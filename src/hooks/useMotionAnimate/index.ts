import { useState } from 'react';

import {
  AcceptedElements,
  animate,
  AnimationListOptions,
  MotionKeyframesDefinition,
} from 'motion';

interface UseAnimationTypes {
  onFinish: (res: (value?: unknown) => void) => void;
}

interface NulledAnimationControls {
  play: VoidFunction | null;
  pause: VoidFunction | null;
  stop: VoidFunction | null;
  finish?: VoidFunction | null;
  reverse?: VoidFunction | null;
  cancel: VoidFunction | null;
  finished?: Promise<unknown>;
  currentTime: number | null;
  playbackRate: number | null;
}

/**
 * `useMotionAnimate` returns all the properties returned by `animate` and some helper functions and state
 * for Example: `play`, `reset`, `replay` and `isFinished`
 * @param selector - The target element, can be string or a ref
 * @param keyframes - Element will animate from its current style to those defined in the keyframe. Refer to [motion's docs](https://motion.dev/dom/animate#keyframes) for more.
 * @param options - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/animate#options) for the values you could pass to this.
 * @param events - Pass functions of whatever you want to happen when a event like `onFinish` happens.
 */
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
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const play = async () => {
    if (selector) {
      let selectedType: AcceptedElements;

      if (typeof selector === 'string') {
        selectedType = selector;
      } else {
        selectedType = selector.current;
      }

      if (selectedType) {
        const animateInstance = animate(selectedType, keyframes, options);
        setIsFinished(false);
        await animateInstance.finished.then((res) => {
          events && events.onFinish(res);
          setIsFinished(true);
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
      let selectedElements: NodeListOf<HTMLElement> =
        document.querySelectorAll(selector);

      selectedElements.forEach((el) => {
        el.style && el.removeAttribute('style');
      });
    }
  };

  const replay = () => {
    reset();
    isFinished && play();
  };

  return {
    ...propsRefContainer,
    play,
    reset,
    replay,
    isFinished,
  };
};
