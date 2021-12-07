import React from 'react';
import './AnimatedCounter.css';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useMotionAnimate } from '../../../../src/index';

const ICON_STYLES = { color: 'white', width: '1.4rem', height: 'auto' };

function AnimatedCounter() {
    const currentCounter = React.useRef(null);
    const { play } = useMotionAnimate(
        currentCounter,
        { y: [5, 20, -10, 0], opacity: [1, 0, 0, 1] },
        { duration: 0.5 },
    );
    const { play: playDecrease } = useMotionAnimate(
        currentCounter,
        { y: [0, -10, 20, 0], opacity: [1, 0, 0, 1] },
        { duration: 0.5 },
    );

    const [counter, setCounter] = React.useState(0);

    const increase = () => {
        play();
        setTimeout(() => {
            setCounter(counter + 1);
        }, 100);
    };
    const descrease = () => {
        playDecrease();
        setTimeout(() => {
            setCounter(counter - 1);
        }, 100);
    };

    return (
        <div className="CounterContainer">
            <div className="container">
                <button onClick={increase}>
                    <ChevronUpIcon style={ICON_STYLES} />
                </button>

                <p ref={currentCounter}>{counter}</p>

                <button onClick={descrease}>
                    <ChevronDownIcon style={ICON_STYLES} />
                </button>
            </div>
        </div>
    );
}

export default AnimatedCounter;
