import { WindowRef } from '@spartacus/core';
import { TestBed } from '@angular/core/testing';
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

fdescribe('QuoteStorefrontUtilsService', () => {
  let classUnderTest: QuoteStorefrontUtilsService;
  //let fixture: ComponentFixture<MockComponent>;
  //let htmlElem: HTMLElement;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    classUnderTest = TestBed.inject(QuoteStorefrontUtilsService);
    /**
    fixture = TestBed.createComponent(MockComponent);
    htmlElem = fixture.nativeElement;
     */
    windowRef = TestBed.inject(WindowRef);
  });

  afterEach(() => {
    //document.body.removeChild(htmlElem);
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
});
