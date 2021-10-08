import { useEffect, useRef } from 'react';
import { useMotionAnimate } from '../../../../src';
import { stagger } from 'motion';
import './AnimatingList.css';

function AnimatingList() {
    const { play, isFinished, replay } = useMotionAnimate(
        '.listItem',
        { y: -20, opacity: 1 },
        {
            delay: stagger(0.3),
            duration: 0.5,
            easing: [0.22, 0.03, 0.26, 1],
        },
    );

    // Play the animation on mount of the component
    useEffect(() => {
        play();
    }, []);

    return (
        // Replay the animation anytime by calling a function, anywhere
        <div className="listContainer">
            <button disabled={!isFinished} onClick={() => replay()}>
                Replay
            </button>

            <ul className="list">
                <li className="listItem">Buy a Turtle</li>
                <li className="listItem">
                    Name him
                    <p>"The Speed of Light"</p>
                </li>
                <li className="listItem">
                    Claim that you can Run faster
                    <p>Than the "The Speed of Light"</p>
                </li>
            </ul>
        </div>
    );
}

export default AnimatingList;
