import RelativeTime from '@yaireo/relative-time'
export default function  getTime(time){
    const relativeTime = new RelativeTime();
    return relativeTime.from(time);
  }