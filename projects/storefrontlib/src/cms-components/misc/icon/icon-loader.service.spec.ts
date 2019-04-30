import { TestBed } from '@angular/core/testing';
import { IconLoaderService } from './icon-loader.service';
import { IconConfig, ICON_TYPES } from './icon.config';

const MockFontIconConfig: IconConfig = {
  icon: {},
};

const MockFontAwesomeIconConfig: IconConfig = {
  icon: {
    prefix: 'fa-',
    iconClass: 'fas',
    icons: {
      [ICON_TYPES.CART]: 'basket-icon',
    },
  },
};

const MockSvgIconWithPathConfig: IconConfig = {
  icon: {
    useSvg: true,
    svgPath: 'icon/path.svg',
    icons: {
      [ICON_TYPES.CART]: 'basket-icon',
    },
  },
};

const MockSvgIconConfig: IconConfig = {
  icon: {
    useSvg: true,
  },
};

describe('IconLoaderService', () => {
  let service: IconLoaderService;

  describe('Font Awesome icon configuration', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: IconConfig, useValue: MockFontIconConfig }],
      });

      service = TestBed.get(IconLoaderService);
    });
    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should use standard icon type in font', () => {
      expect(service.getStyleClasses(ICON_TYPES.CART).length).toEqual(1);
      expect(service.getStyleClasses(ICON_TYPES.CART)[0]).toEqual(
        ICON_TYPES.CART
      );
    });

    it('should not return an svg path when icons are driven by fonts', () => {
      expect(service.getSvgPath(ICON_TYPES.CART)).toBeFalsy();
    });
  });

  describe('Font Awesome icon configuration', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: IconConfig, useValue: MockFontAwesomeIconConfig },
        ],
      });

      service = TestBed.get(IconLoaderService);
    });

    it('should use standard icon type in font', () => {
      const iconClasses = service.getStyleClasses(ICON_TYPES.SEARCH);
      expect(iconClasses.length).toEqual(2);
      expect(iconClasses[0]).toEqual('fas');
      expect(iconClasses[1]).toEqual(`fa-${ICON_TYPES.SEARCH}`);
    });

    it('should use custom font awesome class mapping for CART icon', () => {
      const iconClasses = service.getStyleClasses(ICON_TYPES.CART);
      expect(iconClasses.length).toEqual(2);
      expect(iconClasses[0]).toEqual('fas');
      expect(iconClasses[1]).toEqual('fa-basket-icon');
    });
  });

  describe('SVG icon configuration with external path', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: IconConfig, useValue: MockSvgIconWithPathConfig },
        ],
      });
      service = TestBed.get(IconLoaderService);
    });

    it('should use svg', () => {
      expect(service.useSvg()).toBeTruthy();
    });

    it('should return an external SVG path and  ', () => {
      expect(service.getSvgPath(ICON_TYPES.SEARCH)).toEqual(
        'icon/path.svg#search'
      );
    });

    it('should return an specific icon mapping in the SVG path', () => {
      expect(service.getSvgPath(ICON_TYPES.CART)).toEqual(
        'icon/path.svg#basket-icon'
      );
    });
  });

  describe('SVG icon configuration without external path', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: IconConfig, useValue: MockSvgIconConfig }],
      });
      service = TestBed.get(IconLoaderService);
    });

    it('should return an SVG path without a file reference', () => {
      expect(service.getSvgPath(ICON_TYPES.SEARCH)).toEqual('#search');
    });
  });
});
