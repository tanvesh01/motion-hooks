import {
    AcceptedElements,
    AnimationListOptions,
    MotionKeyframesDefinition,
    AnimationControls,
} from 'motion';

export interface UseAnimationTypes {
    onFinish: (res: (value?: unknown) => void) => void;
}

type ModifiedAcceptedElements = AcceptedElements | React.RefObject<any>;

type segment =
    | [ModifiedAcceptedElements, MotionKeyframesDefinition]
    | [ModifiedAcceptedElements, MotionKeyframesDefinition, AnimationListOptions];

type SequenceDefination = segment[];

export interface UseMotionTimelineReturn {
    play: () => void;
    reset: () => void;
    replay: () => void;
    isFinished: boolean;
    timelineInstance: AnimationControls | null;
}

export type { SequenceDefination };
