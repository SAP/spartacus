import { of } from 'rxjs';
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
