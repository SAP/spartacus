import { of } from 'rxjs';
import {
  resolveValuesBy,
  resolveObjectBy,
  resolveKeyAndValueBy,
} from './resolveObject';
// import {
//   I18nextTranslationService,
//   TranslationChunkService,
// } from '@spartacus/core';
// import { defaultI18nConfig } from '../i18n/config/default-i18n-config';

const object1 = {
  a: 'value1',
  b: 'value2',
  c: 'value3',
  d: 'value4',
};
// const translationService = new I18nextTranslationService(
//   defaultI18nConfig,
//   new TranslationChunkService(defaultI18nConfig)
// );
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
      }).unsubscribe();
    });
    // it('translationService', () => {
    //   resolveValuesBy(object1, translationService.translate).subscribe(
    //     resolved => {
    //       expect(resolved).toEqual([
    //         { a: 'VALUE1' },
    //         { b: 'VALUE2' },
    //         { c: 'VALUE3' },
    //         { d: 'VALUE4' },
    //       ]);
    //     }
    //   ).unsubscribe();;
    // });
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
  });
});
