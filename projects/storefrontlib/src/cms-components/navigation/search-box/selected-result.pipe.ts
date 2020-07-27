import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxSelectedResult' })
export class SelectedResultPipe implements PipeTransform {
  transform(text: string): string {
    return text.split(/\d\//)[text.split(/\d\//).length - 1].split('$')[0];
  }
}
