import { Pipe, PipeTransform } from '@angular/core';
import { mockTranslate } from './mock-translate';

@Pipe({ name: 'cxTranslate' })
export class MockTranslatePipe implements PipeTransform {
  transform(key: any, options: object = {}): string {
    return mockTranslate(key, options);
  }
}
