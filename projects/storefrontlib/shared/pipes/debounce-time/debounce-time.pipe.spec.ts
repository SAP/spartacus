import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DebounceTimePipe } from './debounce-time.pipe';

describe('DebounceTimePipe', () => {
  let pipe: DebounceTimePipe<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebounceTimePipe],
    });
    pipe = TestBed.inject(DebounceTimePipe);
  });

  it('should debounce observable by 2000 ms', fakeAsync(() => {
    let finalTime;

    const observable = new Observable((subscribe: any) => {
      subscribe.next('test');
    });

    const initialTime = new Date().getTime();

    const observer = pipe.transform(observable, 2000);
    observer.pipe(take(1)).subscribe(() => {
      finalTime = new Date().getTime();
    });

    tick(2000);
    const time = (finalTime ?? 0) - initialTime;

    expect(time).toBeGreaterThanOrEqual(2000);
  }));
});
