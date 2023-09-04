export const formatCount = (number) => {
  if (number >= 10000000) {
    const croreCount = number / 10000000;
    return (
      croreCount.toFixed(croreCount % 1 === 0 ? 0 : 1) + " crore"
      // (croreCount % 1 === 0 ? "" : " crore")
    );
  } else if (number >= 100000) {
    const lakhCount = number / 100000;
    return (
      lakhCount.toFixed(lakhCount % 1 === 0 ? 0 : 1) + " lakh"
      // (lakhCount % 1 === 0 ? "" : " lakh")
    );
  } else if (number >= 1000) {
    const thousandCount = number / 1000;
    return (
      thousandCount.toFixed(thousandCount % 1 === 0 ? 0 : 1) + "k"
      // (thousandCount % 1 === 0 ? "" : "k")
    );
  }
  return number.toString();
};

export const convertToPublishedAgo = (timestamp) => {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);

  const timeDiff = currentDate - inputDate;

  // Time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDiff < minute) {
    return "Just now";
  } else if (timeDiff < hour) {
    const minutesAgo = Math.floor(timeDiff / minute);
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDiff < day) {
    const hoursAgo = Math.floor(timeDiff / hour);
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else if (timeDiff < month) {
    const daysAgo = Math.floor(timeDiff / day);
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else if (timeDiff < year) {
    const monthsAgo = Math.floor(timeDiff / month);
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  } else {
    const yearsAgo = Math.floor(timeDiff / year);
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
  }
};

// Custom random sorting function
export const randomSort = () => {
  return Math.random() - 0.5; // Negative, positive, or zero, randomly sorting
};
