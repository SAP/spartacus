import { TestBed } from '@angular/core/testing';
import { SelectedResultPipe } from './selected-result.pipe';

describe('HighlightPipe', () => {
  const pipe: SelectedResultPipe = TestBed.inject(SelectedResultPipe);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedResultPipe],
    });
  });

  describe('transform', () => {
    it('should return the suggestion from its link', () => {
      expect(pipe.transform('electronics-spa/en/USD/search/memory')).toBe(
        'electronics-spa/en/USD/search/memory'
          .split(/\d\//)
          [
            'electronics-spa/en/USD/search/memory'.split(/\d\//).length - 1
          ].split('$')[0]
      );
    });
  });
});
