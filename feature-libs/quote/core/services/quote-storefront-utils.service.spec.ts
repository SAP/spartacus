import { WindowRef } from '@spartacus/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteStorefrontUtilsService } from './quote-storefront-utils.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'cx-quote-list',
  template: `
    <cx-quote-list>
      <label id="ATTR_1--value_1">value_1</label>
      <label id="ATTR_1--value_2">value_2</label>
      <label id="ATTR_1--value_3">value_3</label>
    </cx-quote-list>
  `,
})
class MockComponent {}

xdescribe('QuoteStorefrontUtilsService', () => {
  let classUnderTest: QuoteStorefrontUtilsService;
  let fixture: ComponentFixture<MockComponent>;
  let htmlElem: HTMLElement;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    classUnderTest = TestBed.inject(QuoteStorefrontUtilsService);
    fixture = TestBed.createComponent(MockComponent);
    htmlElem = fixture.nativeElement;
    windowRef = TestBed.inject(WindowRef);
  });

  afterEach(() => {
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
    it('should not change styling of HTML element', () => {
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

  describe('removeStyling', () => {
    it('should not remove styling of HTML element', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const element = document.createElement('notExistingElement');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(undefined);

      classUnderTest.removeStyling('notExistingElement', 'position');
      expect(element.style.position).not.toEqual('sticky');
    });

    it('should remove styling of HTML element', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const theElement = document.createElement('elementMock');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(theElement);
      theElement.style.position = 'sticky';
      classUnderTest.removeStyling('elementMock', 'position');
      expect(theElement.style.position).toBe('');
    });
  });

  fdescribe('isInViewport', () => {
    let form: any;
    let labels: HTMLElement[];

    beforeEach(() => {
      form = htmlElem.querySelector('cx-quote-list') as HTMLElement;
      form.style.padding = '25px';
      form.style.height = '50px';
      form.style.border = 'thick double #32a1ce;';

      labels = Array.from(htmlElem.querySelectorAll('label'));
      labels.forEach((label) => {
        label.style.padding = '25px';
        label.style.height = '50px';
      });

      spyOn(form, 'getBoundingClientRect').and.returnValue(
        new DOMRect(100, 100, 250, 500)
      );
    });

    it('should return false because the method gets undefined as parameter', () => {
      expect(classUnderTest['isInViewport'](undefined)).toBe(false);
    });

    it('should return false', () => {
      labels.forEach((label) => {
        label.style.padding = '5px';
        label.style.height = '10px';
      });

      spyOnProperty(window, 'innerWidth').and.returnValue(100);

      expect(classUnderTest['isInViewport'](form)).toBe(false);
    });

    it("should return true because window's innerWith is known", () => {
      form.style.display = 'flex';
      form.style.flexDirection = 'column';

      spyOnProperty(window, 'innerWidth').and.returnValue(1000);

      expect(classUnderTest['isInViewport'](form)).toBe(true);
    });

    it('should return true because clientWidth of element is known and its right is less than its width', () => {
      form.style.display = 'flex';
      form.style.flexDirection = 'column';

      spyOnProperty(window, 'innerWidth').and.returnValue(undefined);

      expect(classUnderTest['isInViewport'](form)).toBe(true);
    });

    it('should return true because clientHeight of element is known and its bottom is less than its height', () => {
      form.style.display = 'flex';
      form.style.flexDirection = 'column';
      form.style.height = '1000px';

      spyOnProperty(window, 'innerHeight').and.returnValue(undefined);

      expect(classUnderTest['isInViewport'](form)).toBe(true);
    });
  });

  xdescribe('getHeight', () => {
    let list;

    beforeEach(() => {
      //list = htmlElem.querySelector('cx-quote-list') as HTMLElement;
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

    it('should return zero because form is not im viewport', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(100);

      expect(classUnderTest['getHeight']('cx-quote-list')).toBe(0);
    });

    it('should return offsetHeight of the element because form is not im viewport', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1000);

      expect(classUnderTest['getHeight']('cx-quote-list')).toBeGreaterThan(0);
    });
  });

  describe('getWindowHeight', () => {
    it("should return zero because isBrowser returns 'false'", () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getWindowHeight()).toBe(0);
    });

    it('should return the height of the window', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      expect(classUnderTest.getWindowHeight()).toBeGreaterThan(0);
    });
  });
});
