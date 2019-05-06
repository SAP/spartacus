import { Pipe, PipeTransform } from '@angular/core';
import { mockTranslate } from './mock-translate';
import { Translatable } from '../translatable';

@Pipe({ name: 'cxTranslate' })
export class MockTranslatePipe implements PipeTransform {
  transform(input: Translatable | string, options: object = {}): string {
    if ((input as Translatable).raw) {
      return (input as Translatable).raw;
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
