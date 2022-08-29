import { TimelineDefinition } from '@motionone/dom/types/timeline/types';
import { SequenceDefination } from '../hooks/useMotionTimeline/useMotionTimelineTypes';

export const isOfType = <T>(
    varToBeChecked: any,
    propertyToCheckFor: keyof T,
): varToBeChecked is T => (varToBeChecked as T)[propertyToCheckFor] !== undefined;

export const convertRefsToElement = (
    sequence: SequenceDefination,
): TimelineDefinition => {
    const newArray = [...sequence];
    newArray.forEach((array) => {
        if (isOfType(array[0], 'current')) {
            array[0] = array[0].current;
        }
    });
    return newArray as TimelineDefinition;
};
