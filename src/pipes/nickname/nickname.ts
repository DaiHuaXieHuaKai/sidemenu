import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nickname',
})
export class NicknamePipe implements PipeTransform {
  transform(value: string, ...args) {
    if (value) {
      return JSON.parse(value).nickname;
    } else {
      return "未知用户";
    }
  }
}
