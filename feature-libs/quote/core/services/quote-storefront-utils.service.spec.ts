import { vi } from 'vitest';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { QuoteStorefrontUtilsService } from './quote-storefront-utils.service';

const mockedWindowTemplate: { innerWidth?: number; innerHeight?: number } = {
  innerWidth: 1000,
  innerHeight: 1000,
};

let mockedWindow = mockedWindowTemplate;
class MockedWindowRef extends WindowRef {
  get nativeWindow(): Window | undefined {
    return this.isBrowser() ? <any>mockedWindow : undefined;
  }
}

@Component({
  selector: 'cx-quote',
  template: `
    <cx-quote-list>
      <label id="ATTR_1--value_1">value_1</label>
      <label id="ATTR_1--value_2">value_2</label>
      <label id="ATTR_1--value_3">value_3</label>
    </cx-quote-list>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class MockQuoteComponent {}

describe('QuoteStorefrontUtilsService', () => {
  let classUnderTest: QuoteStorefrontUtilsService;
  let fixture: ComponentFixture<MockQuoteComponent>;
  let htmlElem: HTMLElement;
  let windowRef: WindowRef;

  afterEach(() => {
    vi.restoreAllMocks();
    if (htmlElem && htmlElem.parentNode) {
      document.body.removeChild(htmlElem);
    }
    htmlElem = null as any;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockQuoteComponent],
      providers: [{ provide: WindowRef, useClass: MockedWindowRef }],
    }).compileComponents();

    classUnderTest = TestBed.inject(QuoteStorefrontUtilsService);
    fixture = TestBed.createComponent(MockQuoteComponent);
    htmlElem = fixture.nativeElement;
    windowRef = TestBed.inject(WindowRef);
    mockedWindow = structuredClone(mockedWindowTemplate);
    fixture.detectChanges();
  });

  describe('getElement', () => {
    it('should not get HTML element if not running in browser', () => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(false);
      expect(classUnderTest.getElement('elementMock')).toBeUndefined();
    });

    it('should get HTML element based on query selector when running in browser and element exists', () => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(true);
      const theElement = document.createElement('elementMock');
      vi.spyOn(windowRef.document, 'querySelector').mockReturnValue(theElement);
      expect(classUnderTest.getElement('elementMock')).toEqual(theElement);
    });

    it('should get null if element does not exist', () => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(true);
      vi.spyOn(windowRef.document, 'querySelector').mockReturnValue(null);
      expect(classUnderTest.getElement('unknownElement')).toEqual(null);
    });
  });

  describe('changeStyling', () => {
    it('should not change styling of HTML element if element does not exist', () => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(true);
      const element = document.createElement('notExistingElement');
      vi.spyOn(windowRef.document, 'querySelector').mockReturnValue(undefined);

      classUnderTest.changeStyling('notExistingElement', 'position', 'sticky');
      expect(element.style.position).not.toEqual('sticky');
    });

    it('should change styling of HTML element', () => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(true);
      const theElement = document.createElement('elementMock');
      vi.spyOn(windowRef.document, 'querySelector').mockReturnValue(theElement);
      classUnderTest.changeStyling('elementMock', 'position', 'sticky');
      expect(theElement.style.position).toEqual('sticky');
    });
  });

  describe('isInViewport', () => {
    let list: any;
    let labels: HTMLElement[];

    beforeEach(() => {
      list = htmlElem.querySelector('cx-quote-list') as HTMLElement;
      list.style.padding = '25px';
      list.style.height = '50px';
      list.style.border = 'thick double #32a1ce;';

      labels = Array.from(htmlElem.querySelectorAll('label'));
      labels.forEach((label) => {
        label.style.padding = '25px';
        label.style.height = '50px';
      });

      vi.spyOn(list, 'getBoundingClientRect').mockReturnValue(
        new DOMRect(100, 100, 250, 500)
      );
    });

    it("should return 'false' because the method gets undefined as parameter", () => {
      expect(classUnderTest['isInViewport'](undefined)).toBe(false);
    });

    it("should return 'false'", () => {
      labels.forEach((label) => {
        label.style.padding = '5px';
        label.style.height = '10px';
      });

      mockedWindow.innerWidth = 100;

      expect(classUnderTest['isInViewport'](list)).toBe(false);
    });

    it("should return 'true' because window's innerWith is known", () => {
      list.style.display = 'flex';
      list.style.flexDirection = 'column';

      mockedWindow.innerWidth = 1000;

      expect(classUnderTest['isInViewport'](list)).toBe(true);
    });

    it("should return 'true' because clientWidth of element is known and its right is less than its width", () => {
      list.style.display = 'flex';
      list.style.flexDirection = 'column';

      mockedWindow.innerWidth = undefined;
      // jsdom has no layout engine — clientWidth is always 0; mock it so the viewport check passes
      Object.defineProperty(list, 'clientWidth', { value: 1000, configurable: true });

      expect(classUnderTest['isInViewport'](list)).toBe(true);
    });

    it("should return 'true' because clientHeight of element is known and its bottom is less than its height", () => {
      list.style.display = 'flex';
      list.style.flexDirection = 'column';
      list.style.height = '1000px';

      mockedWindow.innerHeight = undefined;
      // jsdom has no layout engine — clientHeight is always 0; mock it so the viewport check passes
      Object.defineProperty(list, 'clientHeight', { value: 1000, configurable: true });

      expect(classUnderTest['isInViewport'](list)).toBe(true);
    });
  });

  describe('getHeight', () => {
    let list;

    beforeEach(() => {
      list = htmlElem.querySelector('cx-quote-list') as HTMLElement;
      list.style.padding = '25px';
      list.style.height = '50px';
      list.style.border = 'thick double #32a1ce;';

      vi.spyOn(list, 'getBoundingClientRect').mockReturnValue(
        new DOMRect(100, 100, 250, 500)
      );
    });

    it('should return zero because no element is found by a selector query', () => {
      expect(classUnderTest['getHeight']('unknown-query')).toBe(0);
    });

    it('should return zero because component is not in viewport', () => {
      mockedWindow.innerWidth = 100;

      expect(classUnderTest['getHeight']('cx-quote-list')).toBe(0);
    });

    it('should return offsetHeight of the element because component is in viewport', () => {
      mockedWindow.innerWidth = 1000;
      Object.defineProperty(list, 'offsetHeight', { value: 50, configurable: true });
      expect(classUnderTest['getHeight']('cx-quote-list')).toBeGreaterThan(0);
    });
  });

  describe('getDomRectValue', () => {
    let list: HTMLElement;

    beforeEach(() => {
      list = htmlElem.querySelector('cx-quote-list') as HTMLElement;
      // jsdom's DOMRect.toJSON() is not implemented; provide a stub that the service can call
      vi.spyOn(list, 'getBoundingClientRect').mockReturnValue({
        top: 10,
        left: 10,
        right: 260,
        bottom: 510,
        width: 250,
        height: 500,
        x: 10,
        y: 10,
        toJSON() {
          return { top: 10, left: 10, right: 260, bottom: 510, width: 250, height: 500, x: 10, y: 10 };
        },
      } as DOMRect);
    });

    it('should return undefined if no element is found by a selector query', () => {
      expect(
        classUnderTest['getDomRectValue']('unknown-query', 'bottom')
      ).toBeUndefined();
    });

    it('should return undefined if element does not contain a searched property', () => {
      expect(
        classUnderTest['getDomRectValue']('cx-quote-list', 'property')
      ).toBeUndefined();
    });

    it('should return property value', () => {
      expect(
        classUnderTest['getDomRectValue']('cx-quote-list', 'top')
      ).toBeDefined();
    });
  });

  describe('getWindowHeight', () => {
    it('should return zero if not running in browser', () => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(false);
      expect(classUnderTest.getWindowHeight()).toBe(0);
    });

    it('should return zero if nativeWindow is undefined', () => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValueOnce(true).mockReturnValueOnce(false);
      expect(classUnderTest.getWindowHeight()).toBe(0);
    });

    it('should return the height of the window', () => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(true);
      expect(classUnderTest.getWindowHeight()).toBeGreaterThan(0);
    });
  });
});
