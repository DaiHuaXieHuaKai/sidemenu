import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondstominute',
})
export class SecondsToMinute implements PipeTransform {

  transform(value: number, ...args) {
    if (value) {
      let minute = Math.floor(value / 60);
      let seconds = value % 60;
      let secondsString = '';
      if (seconds < 10) {
        secondsString = '0' + seconds;
      } else {
        secondsString = seconds.toString();
      }
      return minute + ':' + secondsString;
    } else {
      return '0:00';
    }
  }
}
