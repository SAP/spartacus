import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  I18nextTranslationService,
  TranslationChunkService,
} from '@spartacus/core';
import { defaultI18nConfig } from '../i18n/config/default-i18n-config';
import {
  resolveValuesBy,
  resolveObjectBy,
  resolveKeyAndValueBy,
} from './resolveObject';

const object1 = {
  a: 'value1',
  b: 'value2',
  c: 'value3',
  d: 'value4',
};
const translationService = new I18nextTranslationService(
  defaultI18nConfig,
  new TranslationChunkService(defaultI18nConfig)
);
function observableUpperCase(text: string) {
  return of(text.toUpperCase());
}

describe('resolveObject', () => {
  describe('resolveValuesBy', () => {
    it('toUpperCase', () => {
      resolveValuesBy(object1, observableUpperCase).subscribe(resolved => {
        expect(resolved).toEqual([
          { a: 'VALUE1' },
          { b: 'VALUE2' },
          { c: 'VALUE3' },
          { d: 'VALUE4' },
        ]);
      });
    });

    it('translationService', () => {
      resolveValuesBy(object1, text =>
        translationService.translate(text).pipe(take(1))
      ).subscribe(resolved => {
        expect(resolved).toEqual([
          { a: '[value1:value1]' },
          { b: '[value2:value2]' },
          { c: '[value3:value3]' },
          { d: '[value4:value4]' },
        ]);
      });
    });
  });

  describe('resolveObjectBy', () => {
    it('toUpperCase', () => {
      resolveObjectBy(object1, observableUpperCase).subscribe(resolved => {
        expect(resolved).toEqual({
          a: 'VALUE1',
          b: 'VALUE2',
          c: 'VALUE3',
          d: 'VALUE4',
        });
      });
    });

    it('translationService', () => {
      resolveObjectBy(object1, text =>
        translationService.translate(text).pipe(take(1))
      ).subscribe(resolved => {
        expect(resolved).toEqual({
          a: '[value1:value1]',
          b: '[value2:value2]',
          c: '[value3:value3]',
          d: '[value4:value4]',
        });
      });
    });
  });

  describe('resolveKeyAndValueBy', () => {
    it('toUpperCase', () => {
      resolveKeyAndValueBy(object1, observableUpperCase).subscribe(resolved => {
        expect(resolved).toEqual([
          { key: 'a', value: 'VALUE1' },
          { key: 'b', value: 'VALUE2' },
          { key: 'c', value: 'VALUE3' },
          { key: 'd', value: 'VALUE4' },
        ]);
      });
    });

    it('translationService', () => {
      resolveKeyAndValueBy(object1, text =>
        translationService.translate(text).pipe(take(1))
      ).subscribe(resolved => {
        expect(resolved).toEqual([
          { key: 'a', value: '[value1:value1]' },
          { key: 'b', value: '[value2:value2]' },
          { key: 'c', value: '[value3:value3]' },
          { key: 'd', value: '[value4:value4]' },
        ]);
      });
    });
  });
});
