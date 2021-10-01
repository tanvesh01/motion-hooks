import { useState } from 'react';

import {
    AcceptedElements,
    timeline,
    AnimationListOptions,
    MotionKeyframesDefinition,
} from 'motion';
import { convertRefsToElement, isOfType } from '../../helpers/utils';
import { TimelineOptions } from 'motion/types/targets/dom/timeline';

// TODO: Place all these types/interfaces in another file

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
    duration: number | null;
}

type ModifiedAcceptedElements = AcceptedElements | React.RefObject<any>;

type segment =
    | [ModifiedAcceptedElements, MotionKeyframesDefinition]
    | [ModifiedAcceptedElements, MotionKeyframesDefinition, AnimationListOptions];

export type SequenceDefination = segment[];

interface UseAnimationTypes {
    onFinish: (res: (value?: unknown) => void) => void;
}

interface UseMotionTimelineReturn extends NulledAnimationControls {
    play: () => void;
    reset: () => void;
    replay: () => void;
    isFinished: boolean;
}

/**
 * `useMotionTimeline` returns all the properties returned by `animate` and some helper functions and state
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
            duration: null,
        });
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const play = async () => {
        const timelineInstance = timeline(convertRefsToElement(sequence), options);
        setIsFinished(false);
        await timelineInstance.finished.then((res) => {
            events && events.onFinish(res);
            setIsFinished(true);
        });

        setPropsRefContainer({
            currentTime: timelineInstance.currentTime,
            playbackRate: timelineInstance.playbackRate,
            // functions
            pause: timelineInstance.pause,
            play: timelineInstance.play,
            finish: timelineInstance.finish,
            cancel: timelineInstance.cancel,
            stop: timelineInstance.stop,
            duration: timelineInstance.duration,
        });
    };

    const reset = () => {
        propsRefContainer.stop && propsRefContainer.stop();
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
        ...propsRefContainer,
        play,
        reset,
        replay,
        isFinished,
    };
};
