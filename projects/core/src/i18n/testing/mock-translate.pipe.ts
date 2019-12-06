import { Pipe, PipeTransform } from '@angular/core';

import { Translatable } from '../translatable';
import { mockTranslate } from './mock-translate';

@Pipe({ name: 'cxTranslate' })
export class MockTranslatePipe implements PipeTransform {
  transform(input: Translatable | string, options: object = {}): string {
    if ((input as Translatable).raw) {
      return (input as Translatable).raw;
    }

    const key = typeof input === 'string' ? input : input.key;
    if (typeof input !== 'string') {
      options = { ...options, ...input.params };
    }
    return mockTranslate(key, options);
  }
}
