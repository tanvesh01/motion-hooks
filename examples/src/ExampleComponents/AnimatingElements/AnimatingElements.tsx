import { useMotionTimeline } from '../../../../src/index';
import { useEffect, useRef } from 'react';
import Image from './mind-blown-explosion.gif';
import classes from './AnimatingElements.module.css';

export default function AnimatingElements() {
    const gifRef = useRef(null);
    const { play, isFinished, replay } = useMotionTimeline(
        [
            // You can use Refs too!
            [gifRef, { scale: [0, 1.2], opacity: 1 }],
            [`.${classes.heading}`, { y: [50, 0], opacity: [0, 1] }],
            [`.${classes.container} p`, { opacity: 1 }],
        ],
        { duration: 2 },
    );

    useEffect(() => {
        play();
    }, []);

    return (
        <div className={classes.App}>
            <button disabled={!isFinished} onClick={() => replay()}>
                Replay
            </button>

            <div className={classes.container}>
                <img
                    ref={gifRef}
                    className={classes.gif}
                    src={Image}
                    alt="mind explosion gif"
                />
                <div>
                    <h1 className={classes.heading}>Tanvesh</h1>
                    <p>@sarve__tanvesh</p>
                </div>
            </div>
        </div>
    );
}
