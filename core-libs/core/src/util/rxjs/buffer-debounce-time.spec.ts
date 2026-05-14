import { cold, getTestScheduler } from 'jasmine-marbles';
import { bufferDebounceTime } from './buffer-debounce-time';

describe('bufferDebounceTime', () => {
  it('should not group emissions below threshold', () => {
    const source$ = cold('-a-b', { a: '1', b: '2' }).pipe(
      bufferDebounceTime(0, getTestScheduler())
    );
    const target$ = cold('-a-b', { a: ['1'], b: ['2'] });

    expect(source$).toBeObservable(target$);
  });

  it('should group emissions above threshold', () => {
    const source$ = cold('-a-b', { a: '1', b: '2' }).pipe(
      bufferDebounceTime(20, getTestScheduler())
    );
    const target$ = cold('-----c', { c: ['1', '2'] });

    expect(source$).toBeObservable(target$);
  });

  it('should group emissions within threshold', () => {
    const source$ = cold('-a-b---c', { a: '1', b: '2', c: '3' }).pipe(
      bufferDebounceTime(20, getTestScheduler())
    );
    const target$ = cold('-----d---e', { d: ['1', '2'], e: ['3'] });

    expect(source$).toBeObservable(target$);
  });
});
