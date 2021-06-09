import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
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
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: IconConfig, useValue: MockFontIconConfig }],
    });

    service = TestBed.inject(IconLoaderService);
    winRef = TestBed.inject(WindowRef);
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

  describe('Linked resources', () => {
    it('should add the font resource', () => {
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      service.addLinkResource(ICON_TYPE.VISA);
      expect(winRef.document.createElement).toHaveBeenCalledWith('link');
    });

    it('should not add the font resource for the same font icon', () => {
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      service.addLinkResource(ICON_TYPE.VISA);
      service.addLinkResource(ICON_TYPE.VISA);
      expect(winRef.document.createElement).toHaveBeenCalledTimes(1);
    });

    it('should not add the same font resource for fonts with the same font resource', () => {
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      service.addLinkResource(ICON_TYPE.VISA);
      service.addLinkResource('PAYPAL');
      expect(winRef.document.createElement).toHaveBeenCalledTimes(1);
    });

    it('should add 2 fonts resources for the different fonts', () => {
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      service.addLinkResource(ICON_TYPE.VISA);
      service.addLinkResource('MASTERCARD');
      expect(winRef.document.createElement).toHaveBeenCalledTimes(2);
    });
  });

  describe('Styles', () => {
    it('should return configured symbol in the class when using fonts', () => {
      expect(service.getStyleClasses(ICON_TYPE.VISA)).toContain('fab');
      expect(service.getStyleClasses(ICON_TYPE.VISA)).toContain('fa-cc-visa');
    });
  });

  describe('sanitize HTML for icons', () => {
    it(`should not have bypassed HTML sanitizing for font icon`, () => {
      const domSanitizer: DomSanitizer = TestBed.inject(DomSanitizer);
      spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.stub();
      service.getHtml(ICON_TYPE.VISA);
      expect(domSanitizer.bypassSecurityTrustHtml).not.toHaveBeenCalled();
    });

    it(`should have bypassed HTML sanitizing for text icon`, () => {
      const domSanitizer: DomSanitizer = TestBed.inject(DomSanitizer);
      spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.stub();
      service.getHtml('HAPPY');
      expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalled();
    });

    it('should have bypassed HTML sanitizing for sprited SVG', () => {
      const domSanitizer: DomSanitizer = TestBed.inject(DomSanitizer);
      spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.stub();
      service.getHtml(ICON_TYPE.CART);
      expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(
        '<svg><use xlink:href="./assets/sprite.svg#cartSymbol"></use></svg>'
      );
    });

    it('should have bypassed HTML sanitizing for non-sprited SVG', () => {
      const domSanitizer: DomSanitizer = TestBed.inject(DomSanitizer);
      spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.stub();
      service.getHtml(ICON_TYPE.INFO);
      expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(
        '<svg><use xlink:href="#infoSymbol"></use></svg>'
      );
    });
  });
});
