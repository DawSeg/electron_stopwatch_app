import React, { useState, useMemo, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState('');
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    //let seconds = String(Math.floor(time % 60)).padStart(2, '0');
    //let minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const formattedTime = useMemo(() => formatTime(time), [time]);

  const startTimer = () => {
    setTime(1200);
    setStatus('work');
    setTimer(setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000));
  };

  useEffect(() => {
    if (time === 0) {
      if (status === 'work') {
        setStatus('rest');
        setTime(20);
      } else {
        setStatus('work');
        setTime(1200);
      }
    }
  }, [time]);

  const stopTimer = () => {
    clearInterval(timer);
    setStatus('off');
    setTime(0);
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === 'work' && (
        <img src="./images/work.png" />
      )}
      {status === 'rest' && (
        <img src="./images/rest.png" />
      )}
      {status !== 'off' && (
        <div className="timer">
          {formattedTime}
        </div>
      )}
      {status === 'off' && (
        <button onClick={startTimer} className="btn">Start</button>
      )}
      {status !== 'off' && (
        <button onClick={stopTimer} className="btn">Stop</button>
      )}
      <button className="btn btn-close">X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
