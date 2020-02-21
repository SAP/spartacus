import { TestBed } from '@angular/core/testing';
import { IconLoaderService } from './icon-loader.service';
import { ICON_TYPE, IconConfig, IconResourceType } from './icon.model';

const MockFontIconConfig: IconConfig = {
  icon: {
    symbols: {
      SEARCH: 'fas fa-search',
      VISA: 'fab fa-cc-visa',
      CART: 'cartSymbol',
      INFO: 'infoSymbol',
    },
    resources: [
      {
        type: IconResourceType.SVG,
        url: './assets/sprite.svg',
        types: [ICON_TYPE.CART],
      },
      {
        type: IconResourceType.SVG,
        types: [ICON_TYPE.INFO],
      },
    ],
  },
};

describe('IconLoaderService', () => {
  let service: IconLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: IconConfig, useValue: MockFontIconConfig }],
    });

    service = TestBed.inject(IconLoaderService);
  });

  describe('Font Awesome icons', () => {
    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should use configured symbol in the class when using fonts', () => {
      expect(service.getStyleClasses(ICON_TYPE.VISA)).toContain('fab');
      expect(service.getStyleClasses(ICON_TYPE.VISA)).toContain('fa-cc-visa');
    });

    it('should not use svg', () => {
      expect(service.useSvg(ICON_TYPE.SEARCH)).toBeFalsy();
    });

    it('should not return an svg path when icons are driven by fonts', () => {
      expect(service.getSvgPath(ICON_TYPE.VISA)).toBeFalsy();
    });
  });

  describe('SVG icons', () => {
    it('should use svg', () => {
      expect(service.useSvg(ICON_TYPE.CART)).toBeTruthy();
    });

    it('should use SVG sprites', () => {
      expect(service.getSvgPath(ICON_TYPE.CART)).toEqual(
        './assets/sprite.svg#cartSymbol'
      );
    });

    it('should use local SVG symbol', () => {
      expect(service.getSvgPath(ICON_TYPE.INFO)).toEqual('#infoSymbol');
    });
  });
});
