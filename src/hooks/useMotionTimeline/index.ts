import { useState } from 'react';

import { timeline, AnimationControls } from 'motion';
import { convertRefsToElement, isOfType } from '../../helpers/utils';
import { TimelineOptions } from 'motion/types/targets/dom/timeline';
import {
    SequenceDefination,
    UseAnimationTypes,
    UseMotionTimelineReturn,
} from './useMotionTimelineTypes';

/**
 * `useMotionTimeline` returns `timelineInstance` (Animation Controls) that are returned by `timeline` and some helper functions and state
 * for Example: `play`, `reset`, `replay` and `isFinished`
 * @param sequence - `sequence` is an array, defines animations with the same settings as the animate function. In the arrays,  Element can be either a string or a ref.
 * @param options - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/timeline#options) for the values you could pass into this.
 * @param events - Pass functions of whatever you want to happen when a event like `onFinish` happens.
 */
export const useMotionTimeline = (
    sequence: SequenceDefination,
    options?: TimelineOptions,
    events?: UseAnimationTypes,
): UseMotionTimelineReturn => {
    const [timelineInstance, setTimelineInstance] =
        useState<AnimationControls | null>(null);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const play = async () => {
        const currentTimelineInstance = timeline(
            convertRefsToElement(sequence),
            options,
        );
        setIsFinished(false);
        setTimelineInstance(currentTimelineInstance);
        await currentTimelineInstance.finished.then((res) => {
            events && events.onFinish(res);
            setIsFinished(true);
        });
    };

    const reset = () => {
        timelineInstance && timelineInstance.stop();
        sequence.forEach((el) => {
            let selector = el[0];
            if (isOfType(selector, 'current')) {
                selector.current.style = null;
            } else if (typeof selector === 'string') {
                let selectedElements: NodeListOf<HTMLElement> =
                    document.querySelectorAll(selector);

                selectedElements.forEach((el) => {
                    el.style && el.removeAttribute('style');
                });
            }
        });
    };

    const replay = () => {
        reset();
        isFinished && play();
    };

    return {
        timelineInstance,
        play,
        reset,
        replay,
        isFinished,
    };
};
