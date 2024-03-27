import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteStorefrontUtilsService } from './quote-storefront-utils.service';

@Component({
  selector: 'cx-quote',
  template: `
    <cx-quote-list>
      <label id="ATTR_1--value_1">value_1</label>
      <label id="ATTR_1--value_2">value_2</label>
      <label id="ATTR_1--value_3">value_3</label>
    </cx-quote-list>
  `,
})
class MockQuoteComponent {}

describe('QuoteStorefrontUtilsService', () => {
  let classUnderTest: QuoteStorefrontUtilsService;
  let fixture: ComponentFixture<MockQuoteComponent>;
  let htmlElem: HTMLElement;
  let windowRef: WindowRef;
  let querySelectorOriginal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockQuoteComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    classUnderTest = TestBed.inject(QuoteStorefrontUtilsService);
    fixture = TestBed.createComponent(MockQuoteComponent);
    htmlElem = fixture.nativeElement;
    windowRef = TestBed.inject(WindowRef);
    fixture.detectChanges();
    querySelectorOriginal = document.querySelector;
  });

  afterEach(() => {
    document.querySelector = querySelectorOriginal;
    if (htmlElem) {
      document.body.removeChild(htmlElem);
    }
  });

  describe('getElement', () => {
    it('should not get HTML element if not running in browser', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getElement('elementMock')).toBeUndefined();
    });

    it('should get HTML element based on query selector when running in browser and element exists', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const theElement = document.createElement('elementMock');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(theElement);
      expect(classUnderTest.getElement('elementMock')).toEqual(theElement);
    });

    it('should get null if element does not exist', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(null);
      expect(classUnderTest.getElement('unknownElement')).toEqual(null);
    });
  });

  describe('changeStyling', () => {
    it('should not change styling of HTML element if element does not exist', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const element = document.createElement('notExistingElement');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(undefined);

      classUnderTest.changeStyling('notExistingElement', 'position', 'sticky');
      expect(element.style.position).not.toEqual('sticky');
    });

    it('should change styling of HTML element', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const theElement = document.createElement('elementMock');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(theElement);
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

      spyOn(list, 'getBoundingClientRect').and.returnValue(
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

      spyOnProperty(window, 'innerWidth').and.returnValue(100);

      expect(classUnderTest['isInViewport'](list)).toBe(false);
    });

    it("should return 'true' because window's innerWith is known", () => {
      list.style.display = 'flex';
      list.style.flexDirection = 'column';

      spyOnProperty(window, 'innerWidth').and.returnValue(1000);

      expect(classUnderTest['isInViewport'](list)).toBe(true);
    });

    it("should return 'true' because clientWidth of element is known and its right is less than its width", () => {
      list.style.display = 'flex';
      list.style.flexDirection = 'column';

      spyOnProperty(window, 'innerWidth').and.returnValue(undefined);

      expect(classUnderTest['isInViewport'](list)).toBe(true);
    });

    it("should return 'true' because clientHeight of element is known and its bottom is less than its height", () => {
      list.style.display = 'flex';
      list.style.flexDirection = 'column';
      list.style.height = '1000px';

      spyOnProperty(window, 'innerHeight').and.returnValue(undefined);

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

      spyOn(list, 'getBoundingClientRect').and.returnValue(
        new DOMRect(100, 100, 250, 500)
      );
    });

    it('should return zero because no element is found by a selector query', () => {
      expect(classUnderTest['getHeight']('unknown-query')).toBe(0);
    });

    it('should return zero because component is not in viewport', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(100);

      expect(classUnderTest['getHeight']('cx-quote-list')).toBe(0);
    });

    it('should return offsetHeight of the element because component is not in viewport', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1000);

      expect(classUnderTest['getHeight']('cx-quote-list')).toBeGreaterThan(0);
    });
  });

  describe('getDomRectValue', () => {
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
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getWindowHeight()).toBe(0);
    });

    it('should return zero if nativeWindow is undefined', () => {
      spyOn(windowRef, 'isBrowser').and.returnValues(true, false);
      expect(classUnderTest.getWindowHeight()).toBe(0);
    });

    it('should return the height of the window', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      expect(classUnderTest.getWindowHeight()).toBeGreaterThan(0);
    });
  });
});
