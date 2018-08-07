import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'applyStatus',
})
export class ApplyStatusPipe implements PipeTransform {
  transform(value: number, ...args) {
    if (value == 1) {
      return "已同意"
    }
    if (value == 2) {
      return "已拒绝"
    }
    if (value == 3) {
      return "已忽略"
    }
  }
}
