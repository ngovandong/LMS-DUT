import RelativeTime from "@yaireo/relative-time";

export default function getTime(time) {
  const relativeTime = new RelativeTime();
  const formatted = relativeTime.from(time);

  if (time >= new Date().getTime()) {
    return formatted.startsWith("in ")
      ? formatted.replace("in ", "Due in ")
      : `Due ${formatted}`;
  }

  return formatted;
}
