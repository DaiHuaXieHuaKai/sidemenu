import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar',
})
export class AvatarPipe implements PipeTransform {
  transform(value: string, ...args) {
    if (value) {
      return JSON.parse(value).avatar;
    } else {
      return "assets/images/avatar.png";
    }
  }
}
