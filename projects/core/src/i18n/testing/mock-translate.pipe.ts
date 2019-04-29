import { Pipe, PipeTransform } from '@angular/core';
import { mockTranslate } from './mock-translate';
import { TranslationCommand } from '../translation-command';

@Pipe({ name: 'cxTranslate' })
export class MockTranslatePipe implements PipeTransform {
  transform(input: TranslationCommand | string, options: object = {}): string {
    if ((input as TranslationCommand).raw) {
      return (input as TranslationCommand).raw;
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
