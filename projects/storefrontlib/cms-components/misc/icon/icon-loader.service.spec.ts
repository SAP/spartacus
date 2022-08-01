import { TestBed } from '@angular/core/testing';
import { DirectionMode } from '../../../layout/direction/config/direction.model';
import { IconLoaderService } from './icon-loader.service';
import { IconConfig, IconResourceType, ICON_TYPE } from './icon.model';

const FONT_AWESOME_RESOURCE =
  'https://use.fontawesome.com/releases/v5.8.1/css/all.css';
const MockFontIconConfig: IconConfig = {
  icon: {
    symbols: {
      SEARCH: 'fas fa-search',
      VISA: 'fab fa-cc-visa',
      AMEX: 'fab fa-amex',
      MASTERCARD: 'fab fa-master-card',
      PAYPAL: 'fab fa-paypal',
      CART: 'cartSymbol',
      INFO: 'infoSymbol',
      HAPPY: '😊',
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
      {
        type: IconResourceType.LINK,
        url: FONT_AWESOME_RESOURCE,
      },
      {
        type: IconResourceType.LINK,
        url: FONT_AWESOME_RESOURCE,
        types: ['PAYPAL'],
      },
      {
        type: IconResourceType.LINK,
        url: 'different-font.css',
        types: ['MASTERCARD'],
      },
      {
        type: IconResourceType.TEXT,
        types: ['HAPPY'],
      },
    ],
    flipDirection: {
      CARET_RIGHT: DirectionMode.RTL,
      CARET_LEFT: DirectionMode.RTL,
    },
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

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should return symbol', () => {
    expect(service.getSymbol(ICON_TYPE.VISA)).toEqual('fab fa-cc-visa');
  });

  it('should return rtl flip direction', () => {
    expect(service.getFlipDirection(ICON_TYPE.CARET_RIGHT)).toEqual(
      DirectionMode.RTL
    );
  });

  it('should not return any flip direction', () => {
    expect(service.getFlipDirection(ICON_TYPE.CART)).toBeFalsy();
  });

  describe('Styles', () => {
    it('should return configured symbol in the class when using fonts', () => {
      expect(service.getStyleClasses(ICON_TYPE.VISA)).toContain('fab');
      expect(service.getStyleClasses(ICON_TYPE.VISA)).toContain('fa-cc-visa');
    });
  });

  describe('SVG icons', () => {

    it('should return svg path for sprited SVG', () => {
      expect(service.getSvgPath(ICON_TYPE.CART)).toEqual('./assets/sprite.svg#cartSymbol');
    });

    it('should return svg path for non-sprited SVG', () => {
      expect(service.getSvgPath(ICON_TYPE.INFO)).toEqual('#infoSymbol');
    });
  });
});
