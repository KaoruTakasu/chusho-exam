import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Props = {
  setIsTimerActive: Dispatch<SetStateAction<boolean>>;
};

export default function Timer(props: Props) {
  const { setIsTimerActive } = props;
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const tick = () => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
        // タイマーが0に達したときの処理を追加することができます。
        setIsTimerActive(false);
      }
    };

    interval = setInterval(tick, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  return (
    <div>
      <h1 className='text-3xl font-bold text-center mb-6'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
    </div>
  );
}
