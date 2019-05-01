import { Pipe, PipeTransform } from '@angular/core';
import { mockTranslate } from './mock-translate';
import { Translation } from '../translation';

@Pipe({ name: 'cxTranslate' })
export class MockTranslatePipe implements PipeTransform {
  transform(input: Translation | string, options: object = {}): string {
    if ((input as Translation).raw) {
      return (input as Translation).raw;
    }

    let key: string;
    if (typeof input === 'string') {
      key = input;
    } else {
      key = input.key;
      options = { ...options, ...input.params };
    }

    return mockTranslate(key, options);
  }
}
