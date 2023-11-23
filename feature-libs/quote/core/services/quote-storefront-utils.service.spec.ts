import { WindowRef } from '@spartacus/core';
import createSpy = jasmine.createSpy;
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QuoteStorefrontUtilsService } from './quote-storefront-utils.service';

describe('QuoteStorefrontUtilsService', () => {
  const theElement = document.createElement('elementMock');
  let classUnderTest: QuoteStorefrontUtilsService;
  let mockedWindowRefBrowserTrue = {
    isBrowser: createSpy().and.returnValue(of(true)),
    document: {
      querySelector: createSpy().and.callFake(function (input: string) {
        if (input === 'elementMock') return theElement;
        return null;
      }),
    },
  };

  let mockedWindowRefBrowserFalse = {
    isBrowser: createSpy().and.returnValue(of(false)),
    document: {
      querySelector: createSpy(),
    },
  };

  describe('getElement', () => {
    it('should not get HTML element if not running in browser', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: WindowRef, useValue: mockedWindowRefBrowserFalse },
        ],
      });

      classUnderTest = TestBed.inject(QuoteStorefrontUtilsService);
      expect(classUnderTest.getElement('elementMock')).toBeUndefined();
    });

    it('should get HTML element based on query selector when running in browser and element exists', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: WindowRef, useValue: mockedWindowRefBrowserTrue },
        ],
      });

      classUnderTest = TestBed.inject(QuoteStorefrontUtilsService);
      expect(classUnderTest.getElement('elementMock')).toEqual(theElement);
    });

    it('should get null if element does not exist', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: WindowRef, useValue: mockedWindowRefBrowserTrue },
        ],
      });

      classUnderTest = TestBed.inject(QuoteStorefrontUtilsService);
      expect(classUnderTest.getElement('unknownElement')).toEqual(null);
    });
  });
});
