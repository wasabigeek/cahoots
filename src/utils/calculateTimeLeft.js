const calculateTimeLeft = date => {
  const difference = (date - Date.now()) / 1000;
  return difference > 0 ? difference : 0;
};

const tickTimer = ({ endDate, intervalCallback, endedCallback }) => {
  setTimeout(() => {
    // timeLeft is in seconds
    const timeLeft = calculateTimeLeft(endDate);
    if (timeLeft > 0) {
      intervalCallback(timeLeft);
      tickTimer({ endDate, intervalCallback, endedCallback });
    }
    else {
      endedCallback(timeLeft);
    }
  }, 1000);
};

export const startTimer = ({ seconds, intervalCallback, endedCallback }) => {
  const endDate = new Date(Date.now() + 1000 * seconds);
  tickTimer({ endDate, intervalCallback, endedCallback });
};
