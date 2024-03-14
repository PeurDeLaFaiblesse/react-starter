import { useState } from 'react';
import styles from './Counter.module.scss';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className={styles.test}>{count}</h1>
      <button onClick={increaseCount}>increase</button>
    </div>
  );
};
