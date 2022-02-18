import { TestBed } from '@angular/core/testing';
import { MultiLinePipe } from './multiline-titles.pipe';

describe('MultiLinePipe', () => {
  let pipe: MultiLinePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiLinePipe],
    });

    pipe = TestBed.inject(MultiLinePipe);
  });

  describe('transform', () => {
    it('should split the string on two lines', () => {
      expect(pipe.transform('Test test')).toBe('Test<br />test');
      expect(pipe.transform('Test of test')).toBe('Test of<br />test');
      expect(pipe.transform('Test of other test')).toBe(
        'Test of other<br />test'
      );
    });
  });
});
