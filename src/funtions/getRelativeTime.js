import RelativeTime from "@yaireo/relative-time";
export default function getTime(time) {
  
  const relativeTime = new RelativeTime();
  let newTime=relativeTime.from(time);
  if(time>= new Date().getTime()){
    return newTime.replace("in","Due")+" later";
  }
  return newTime;
  
}
