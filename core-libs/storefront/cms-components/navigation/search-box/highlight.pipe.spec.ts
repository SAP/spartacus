import { TestBed } from '@angular/core/testing';
import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightPipe],
    });
    pipe = TestBed.inject(HighlightPipe);
  });

  describe('transform', () => {
    it('should return text with hightlight', () => {
      expect(pipe.transform('eos 400D', 'eos')).toBe(
        '<span class="highlight">eos</span> 400D'
      );
    });

    it('should not return text with hightlight', () => {
      expect(pipe.transform('eos 400D', 'else')).toBe('eos 400D');
    });

    it('should trim match before replacing hightlight', () => {
      expect(pipe.transform('eos 400D', 'eos ')).toBe(
        '<span class="highlight">eos</span> 400D'
      );

      expect(pipe.transform('eos 400D', ' eos')).toBe(
        '<span class="highlight">eos</span> 400D'
      );
    });

    it('should not return hightlight when there is no match', () => {
      expect(pipe.transform('eos 400D')).toBe('eos 400D');
      expect(pipe.transform('eos 400D', undefined)).toBe('eos 400D');
    });
  });
});
