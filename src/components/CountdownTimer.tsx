import { useEffect, useState } from "react";

const CountdownTimer = (props: {
  initialMinute?: number;
  initialSeconds?: number;
  initialHour?: number;
}) => {
  const { initialHour = 0, initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [hour, setHour] = useState(initialHour);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds === 0 && minutes === 0 && hour === 0)
        clearInterval(myInterval);
      else {
        if (seconds !== 0) setSeconds(seconds - 1);
        else setSeconds(59);
        if (seconds === 0 && minutes > 0) setMinutes(minutes - 1);
        if (seconds === 0 && minutes === 0) setMinutes(59);

        if (hour > 0 && minutes === 0 && seconds === 0) setHour(hour - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {hour === 0 && minutes === 0 && seconds === 0 ? null : (
        <h1>
          {hour > 0 && `${hour}:`}
          {minutes < 10 && hour > 0
            ? `0${minutes}`
            : (hour > 0 || minutes > 0) && minutes}
          {(hour > 0 || minutes > 0) && ":"}
          {seconds < 10 && (hour > 0 || minutes > 0) ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};

export default CountdownTimer;
