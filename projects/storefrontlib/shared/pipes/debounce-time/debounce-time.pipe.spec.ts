import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { DebounceTimePipe } from './debounce-time.pipe';

fdescribe('DebounceTimePipe', () => {
  let pipe: DebounceTimePipe<any>;
  let observer: Observable<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebounceTimePipe],
    });
    pipe = TestBed.inject(DebounceTimePipe);
  });

  describe('transform', () => {
    it('should debounce observable by 1000 ms', fakeAsync(() => {
      let obs = of('Test Title');
      let title = '';
      observer = pipe.transform(obs, 4000);
      observer.pipe(take(1)).subscribe((result) => {
        console.log('here1');
        title = result;
      });
      console.log('here1');
      expect(title).toEqual('');

      tick(1000);

      observer.pipe(take(1)).subscribe((result) => (title = result));
      expect(title).toEqual('Test Title');
    }));
  });
});
