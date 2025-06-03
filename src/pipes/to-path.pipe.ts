import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPath'
})
export class ToPathPipe implements PipeTransform {
  public transform(value: string): string {
    return value.toLowerCase().replaceAll(' ', '-');
  }
}
