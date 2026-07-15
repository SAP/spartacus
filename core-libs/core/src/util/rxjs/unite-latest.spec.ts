import { uniteLatest } from './unite-latest';
import { firstValueFrom, of, Subject } from 'rxjs';
import { map, reduce, take } from 'rxjs/operators';

describe('getLastValueSync', () => {
  it('should combine first emissions synchronously', async () => {
    const stream$ = uniteLatest([of('a'), of('b'), of('c')]);
    const awaitedStream = await firstValueFrom(stream$);

    expect(awaitedStream).toEqual(['a', 'b', 'c']);
  });

  it('should unite multiple synchronous emissions with asap emission', async () => {
    const a = new Subject();
    const b = a.pipe(map((x) => (x += 'b')));
    const c = a.pipe(map((x) => (x += 'c')));

    const unitedPreviousValues$ = uniteLatest([a, b, c]).pipe(
      take(3),
      reduce((acc, curr) => [...acc, curr], [])
    );

    const unitedPreviousValues = firstValueFrom(unitedPreviousValues$);

    a.next('1');
    a.next('2');
    a.next('3');

    setTimeout(() => {
      a.next('4');
    });

    const awaitedValues = await unitedPreviousValues;
    expect(awaitedValues).toEqual([
      ['1', '1b', '1c'],
      ['3', '3b', '3c'],
      ['4', '4b', '4c'],
    ]);
  });

  it('should complete when all sources complete', async () => {
    const unitedStream$ = uniteLatest([of('a'), of('b'), of('c')]);
    const awaitedStream = await firstValueFrom(unitedStream$);

    expect(awaitedStream).toEqual(['a', 'b', 'c']);
  });
});
