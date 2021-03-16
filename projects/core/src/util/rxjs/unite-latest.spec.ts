import { uniteLatest } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { map, reduce, take } from 'rxjs/operators';

describe('getLastValueSync', () => {
  it('should combine first emissions synchronously', () => {
    let result;
    uniteLatest([of('a'), of('b'), of('c')]).subscribe((res) => (result = res));
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should unite multiple synchronous emissions with asap emission', (done) => {
    const a = new Subject();
    const b = a.pipe(map((x) => (x += 'b')));
    const c = a.pipe(map((x) => (x += 'c')));

    uniteLatest([a, b, c])
      .pipe(
        take(3),
        reduce((acc, curr) => [...acc, curr], [])
      )
      .subscribe((results) => {
        expect(results).toEqual([
          ['1', '1b', '1c'],
          ['3', '3b', '3c'],
          ['4', '4b', '4c'],
        ]);
        done();
      });

    a.next('1');
    a.next('2');
    a.next('3');

    setTimeout(() => {
      a.next('4');
    });
  });

  it('should complete when all sources complete', (done) => {
    uniteLatest([of('a'), of('b'), of('c')]).subscribe({
      next: (val) => expect(val).toEqual(['a', 'b', 'c']),
      complete: done,
    });
  });
});
