import { TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from './mock-translate.pipe';

describe('MockTranslatePipe', () => {
  let pipe: MockTranslatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockTranslatePipe]
    });

    pipe = TestBed.get(MockTranslatePipe);
  });

  describe('transform', () => {
    it('should return key when no options given', () => {
      expect(pipe.transform('testKey')).toBe('testKey');
    });

    it('should return key when options is empty object ', () => {
      expect(pipe.transform('testKey', {})).toBe('testKey');
    });

    it('should return key and option when there is one option ', () => {
      expect(pipe.transform('testKey', { a: 1 })).toBe('testKey a:1');
    });

    it('should return key and options sorted by name', () => {
      expect(pipe.transform('testKey', { c: 3, a: 1, b: 2 })).toBe(
        'testKey a:1 b:2 c:3'
      );
    });
  });
});
