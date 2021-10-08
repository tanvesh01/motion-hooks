# motion-hooks

A React Hooks wrapper over [Motion One](https://motion.dev/), An animation library, built on the Web Animations API for the smallest filesize and the fastest performance.

[![npm version](https://badge.fury.io/js/motion-hooks.svg)](https://www.npmjs.com/package/motion-hooks) ![npm](https://img.shields.io/npm/dt/motion-hooks) [![Twitter Follow](https://img.shields.io/twitter/follow/Sarve___tanvesh?label=Chat)](https://twitter.com/Sarve___tanvesh)

## Installation

```
npm install motion-hooks motion
```

> Your project needs to have react@16.8.0 react-dom@16.8.0 or greater

## Hooks

As of now, motion-hooks has 2 hooks that wrap around `animate` and `timeline` of motion one respectively

-   [`useMotionAnimate`](https://github.com/tanvesh01/motion-hooks#usemotionanimate)
-   [`useMotionTimeline`](https://github.com/tanvesh01/motion-hooks#usemotiontimeline)

## Example usage

**Things You could do with [`useMotionAnimate`](https://github.com/tanvesh01/motion-hooks#usemotionanimate)**

Animating List - [Link to codesandbox](https://codesandbox.io/s/divine-mountain-qelct?file=/src/App.js)

![useMotionAnimate List Example](https://media1.giphy.com/media/JNMxjkEipIurs5RaQb/giphy.gif)

Animating Counter - [Link to codesandbox](https://codesandbox.io/s/nice-browser-d4ds3?file=/src/App.js)

![useMotionAnimate Counter Example](https://media3.giphy.com/media/80wDwOyRlnS1woHcF0/giphy.gif)

**Things You could do with [`useMotionTimeline`](https://github.com/tanvesh01/motion-hooks#usemotiontimeline)**

Animating elements independently - [Link to codesandbox](https://codesandbox.io/s/dazzling-dawn-f48sm?file=/src/App.js)

![useMotionTimeline Example Usage](https://media1.giphy.com/media/RxCRUxJgi4nuM7b7yv/giphy.gif)

### `useMotionAnimate`

Returns all the properties returned by [`animate`](https://motion.dev/dom/animate) and some helper functions and state

> Props returned my [`animate`](https://motion.dev/dom/animate) are `null` initially

You may view this example [here on codesandbox](https://codesandbox.io/s/divine-mountain-qelct?file=/src/App.js).

```jsx
function App() {
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
        <div className="App">
            <button disabled={!isFinished} onClick={() => replay()}>
                Replay
            </button>

            <ul className="list">
                <li className="listItem">Item 1</li>
                <li className="listItem">Item 2</li>
                <li className="listItem">Item 3</li>
            </ul>
        </div>
    );
}
```

Instead of passing strings to select elements, you can also pass a `ref` :point_down:

```jsx
const boxRef = useRef(null);
const { play, isFinished, replay } = useMotionAnimate(
    boxRef,
    { y: -20, scale: 1.2 },
    { duration: 1 },
);

return <div ref={boxRef}>BOX</div>;
```

**API**

```js
const { play, replay, reset, isFinished, animateInstance } = useMotionAnimate(
    selector,
    keyframes,
    options,
    events,
);
```

`useMotionAnimate` returns:

-   `play`: plays the animation
-   `replay`: Resets and plays the animation
-   `reset`: resets the element to its original styling
-   `isFinished`: is `true` when animation has finished playing
-   `animateInstance`: Animation Controls. Refer to [motion one docs](https://motion.dev/dom/controls) for more.

`useMotionAnimate` accepts:

-   `selector` - The target element, can be string or a ref
-   `keyframes` - Element will animate from its current style to those defined in the keyframe. Refer to [motion's docs](https://motion.dev/dom/animate#keyframes) for more.
-   `options` - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/animate#options) for the values you could pass to this.
-   `events` - Pass functions of whatever you want to happen when a event like `onFinish` happens.

    **`events` usage example**

    ```jsx
    const { play, isFinished, replay } = useMotionAnimate(
        '.listItem',
        { y: -20, opacity: 1 },
        {
            delay: stagger(0.3),
            duration: 0.5,
        },
        {
            onFinish: () => {
                // Whatever you want to do when animation finishes
            },
        },
    );
    ```

### `useMotionTimeline`

Create complex sequences of animations across multiple elements.

returns `timelineInstance` (Animation Controls) that are returned by [`timeline`](https://motion.dev/dom/timeline) and some helper functions and state

> Props returned my [`timeline`](https://motion.dev/dom/timeline) are `null` initially

You may view this example [here on codesandbox](https://codesandbox.io/s/dazzling-dawn-f48sm?file=/src/App.js).

```jsx
function App() {
    const gifRef = useRef(null);
    const { play, isFinished, replay } = useMotionTimeline(
        [
            // You can use Refs too!
            [gifRef, { scale: [0, 1.2], opacity: 1 }],
            ['.heading', { y: [50, 0], opacity: [0, 1] }],
            ['.container p', { opacity: 1 }],
        ],
        { duration: 2 },
    );

    useEffect(() => {
        play();
    }, []);

    return (
        <div className="App">
            <button disabled={!isFinished} onClick={() => replay()}>
                Replay
            </button>

            <div className="container">
                <img
                    ref={gifRef}
                    className="gif"
                    src={Image}
                    alt="mind explosion gif"
                />
                <div>
                    <h1 className="heading">Tanvesh</h1>
                    <p>@sarve__tanvesh</p>
                </div>
            </div>
        </div>
    );
}
```

**API**

```js
const { play, replay, reset, isFinished, timelineInstance } = useMotionTimeline(
    sequence,
    options,
    events,
);
```

`useMotionTimeline` returns:

-   `play`: plays the animation
-   `replay`: Resets and plays the animation
-   `reset`: resets the element to its original styling
-   `isFinished`: is `true` when animation has finished playing
-   `timelineInstance`: Animation Controls. Refer to [motion one docs](https://motion.dev/dom/controls) for more.

`useMotionTimeline` accepts:

-   `sequence` - `sequence` is an array, defines animations with the same settings as the animate function. In the arrays, Element can be either a string or a ref. You can refer to [sequence docs](https://motion.dev/dom/timeline#sequence) for more on this.
-   `options` - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/animate#options) for the values you could pass to this.
-   `events` - Pass functions of whatever you want to happen when a event like `onFinish` happens. Exactly same as useMotionAnimate's `onFinish`.

---

## Local Installation & Contributing

-   Fork [motion-hooks](https://github.com/tanvesh01/motion-hooks)

```sh
git clone https://github.com/:github-username/motion-hooks.git
cd motion-hooks
npm install # Installs dependencies for motion-hooks
cd examples # React app to test out changes
npm install # Installs dependencies for example app
npm run dev # To run example on localhost:3000
```

The contributing guidelines along with local setup guide is mentioned in [CONTRIBUTING.md](https://github.com/tanvesh01/motion-hooks/blob/main/CONTRIBUTING.md)

Any Type of feedback is more than welcome! This project is in very early stage and would love to have contributors of any skill/exp level.

You can contact me on my [Twitter handle @Sarve\_\_\_tanvesh](https://twitter.com/Sarve___tanvesh)
