# motion-hooks

A React Hooks wrapper over [Motion One](https://motion.dev/), An animation library, built on the Web Animations API for the smallest filesize and the fastest performance.

[![npm version](https://badge.fury.io/js/motion-hooks.svg)](https://www.npmjs.com/package/motion-hooks)

## Installation

```
npm install motion-hooks motion
```

> Your project needs to have react@16.8.0 react-dom@16.8.0 or greater

## Hooks

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

**API**

```js
const { play, replay, reset, isFinished, ...propsReturnedByAnimate } =
  useMotionAnimate(selector, keyframes, options, events);
```

`useMotionAnimate` returns:

- `play`: plays the animation
- `replay`: Resets and plays the animation
- `reset`: resets the element to its original styling
- `isFinished`: is `true` when animation has finished playing
- `...propsReturnedByAnimate`: Refer to [motion one docs](https://motion.dev/dom/controls)

`useMotionAnimate` accepts:

- `selector` - The target element, can be string or a ref
- `keyframes` - Element will animate from its current style to those defined in the keyframe. Refer to [motion's docs](https://motion.dev/dom/animate#keyframes) for more.
- `options` - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/animate#options) for the values you could pass to this.
- `events` - Pass functions of whatever you want to happen when a event like `onFinish` happens.

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

---

Any Type of feedback is more than welcome! This project is in very early stage and would love to have contributors of any skill/exp level.

You can contact me on my [Twitter handle @Sarve\_\_\_tanvesh](https://twitter.com/Sarve___tanvesh)
