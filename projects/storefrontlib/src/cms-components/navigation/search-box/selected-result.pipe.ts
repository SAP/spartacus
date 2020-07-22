import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxSelectedResult' })
export class SelectedResultPipe implements PipeTransform {
  transform(text: string): string {
    if (text != undefined) {
      return text.split(/\d\//)[text.split(/\d\//).length - 1].split('$')[0];
    }
  }
}
