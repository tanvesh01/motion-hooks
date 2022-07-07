import { useState } from 'react';
import { animate, AnimationControls } from 'motion';

import {
    AcceptedElements,
    AnimationListOptions,
    MotionKeyframesDefinition,
} from '@motionone/dom/types/animate/types';

interface UseAnimationTypes {
    onFinish: (res: (value?: unknown) => void) => void;
}

/**
 * `useMotionAnimate` returns `animateInstance`(Animation Controls) returned by `animate` and some helper functions and state
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
    const [animateInstance, setAnimateInstance] = useState<AnimationControls | null>(
        null,
    );
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
                const currentAnimateInstance = animate(
                    selectedType,
                    keyframes,
                    options,
                );
                setIsFinished(false);
                setAnimateInstance(currentAnimateInstance);
                await currentAnimateInstance.finished.then((res) => {
                    events && events.onFinish(res);
                    setIsFinished(true);
                });
            }
        }
    };

    const reset = () => {
        animateInstance && animateInstance.stop();
        if (typeof selector !== 'string' && selector.current) {
            selector.current.style = null;
        } else if (typeof selector === 'string') {
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
        animateInstance,
        play,
        reset,
        replay,
        isFinished,
    };
};
