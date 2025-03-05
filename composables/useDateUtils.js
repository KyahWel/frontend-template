export const useDateUtils = () => {

  const getDateDiff = (date1, date2, scheduleType, withLabel) => {
      if (!date1 || !date2) return 0;
      let diff = getDate(date2).getTime() - getDate(date1).getTime();
      
      if (scheduleType === 'PER_HOUR') diff /= (60 * 60 * 1000);
      else diff /= (24 * 60 * 60 * 1000);
      
      if (scheduleType === 'PER_DAY') diff += 1;
      diff = Math.round(diff);
      
      if (withLabel) {
          switch (scheduleType) {
              case 'PER_DAY':
                  return `${diff} ${diff > 1 ? 'days' : 'day'}`;
              case 'PER_NIGHT':
                  return `${diff} ${diff > 1 ? 'nights' : 'night'}`;
              case 'PER_HOUR':
                  return `${diff} ${diff > 1 ? 'hours' : 'hour'}`;
              default:
                  return diff;
          }
      }

      return diff;
  };

  function getDate(date) {
      return typeof date === "string" ? new Date(date) : date;
  }

  const formatDate = (date, type) => {
      if (!date) return date;
      let dt = new Date(date);

      if (type === "datetime") {
          type = { hour12: true, year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit" };
      } else if (type === "time") {
          type = { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" };
      } else if (type === "time24") {
          type = { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" };
      } else if (type === "YYYY-MM-DD") {
          type = { year: "numeric", month: "2-digit", day: "2-digit" };
      } else if (type === "date") {
          type = { year: "numeric", month: "long", day: "2-digit" };
      }

      if (!type || typeof type === 'string') {
          type = { year: "numeric", month: "long", day: "2-digit" };
      }

      return dt.toLocaleString("en-US", type);
  };

  return {
      getDateDiff,
      formatDate,
  };
};
