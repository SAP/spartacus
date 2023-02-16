import { Component, CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { KeyboardFocusService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from './configurator-storefront-utils.service';

let isGroupVisited: Observable<boolean> = of(false);

class MockConfiguratorGroupsService {
  isGroupVisited(): Observable<boolean> {
    return isGroupVisited;
  }
}

class MockKeyboardFocusService {
  findFocusable() {}

  set() {}
}

function createElement(id: string): HTMLElement {
  const element = document.createElement('label');
  element.id = id;
  return element;
}

function createNode(name: string): HTMLElement {
  const element = document.createElement(name);
  return element;
}

function createFocusedElements(
  attribute: string,
  amountOfAttributes: number,
  amountOfValues: number
): HTMLElement[] {
  const focusedElements: HTMLElement[] = [];
  for (let i = 1; i <= amountOfAttributes; i++) {
    let attrId = attribute + '_' + i;
    for (let j = 1; j <= amountOfValues; j++) {
      let valueId = 'value_' + j;
      const value = createElement(attrId + '--' + valueId);
      focusedElements.push(value);
    }
  }
  return focusedElements;
}

function remove(element: HTMLElement | undefined): void {
  if (element) {
    element.remove();
  }
}

@Component({
  selector: 'cx-configurator',
  template: `
    <cx-configurator-form>
      <label id="ATTR_1--value_1">value_1</label>
      <label id="ATTR_1--value_2">value_2</label>
      <label id="ATTR_1--value_3">value_3</label>
    </cx-configurator-form>
  `,
})
class MockComponent {}

fdescribe('ConfigUtilsService', () => {
  let classUnderTest: ConfiguratorStorefrontUtilsService;
  let fixture: ComponentFixture<MockComponent>;
  let htmlElem: HTMLElement;
  let focusedElements: any;
  const owner = ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    'testProduct'
  );
  let windowRef: WindowRef;
  let keyboardFocusService: KeyboardFocusService;
  let querySelectorOriginal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      providers: [
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
        {
          provide: KeyboardFocusService,
          useClass: MockKeyboardFocusService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    classUnderTest = TestBed.inject(ConfiguratorStorefrontUtilsService);
    fixture = TestBed.createComponent(MockComponent);
    htmlElem = fixture.nativeElement;
    windowRef = TestBed.inject(WindowRef as Type<WindowRef>);
    keyboardFocusService = TestBed.inject(
      KeyboardFocusService as Type<KeyboardFocusService>
    );
    querySelectorOriginal = document.querySelector;
  });

  afterEach(() => {
    document.querySelector = querySelectorOriginal;
    document.body.removeChild(htmlElem);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  function getCurrentResult() {
    let result = false;
    classUnderTest
      .isCartEntryOrGroupVisited(owner, 'group_01')
      .subscribe((data) => (result = data))
      .unsubscribe();
    return result;
  }

  it('should scroll to element', () => {
    const theElement = document.createElement('div');
    document.querySelector = jasmine
      .createSpy('HTML Element')
      .and.returnValue(theElement);
    spyOn(theElement, 'getBoundingClientRect').and.returnValue(
      new DOMRect(100, 2000, 100, 100)
    );
    spyOn(windowRef, 'isBrowser').and.returnValue(true);
    const nativeWindow = windowRef.nativeWindow;
    if (nativeWindow) {
      spyOn(nativeWindow, 'scroll').and.callThrough();
      classUnderTest.scrollToConfigurationElement(
        '.VariantConfigurationTemplate'
      );

      expect(nativeWindow.scroll).toHaveBeenCalledWith(0, 0);
    }
  });

  it('should return false because the product has not been added to the cart and the current group was not visited', () => {
    isGroupVisited = of(false);
    owner.type = CommonConfigurator.OwnerType.PRODUCT;
    expect(getCurrentResult()).toBe(false);
  });

  it('should return true because the product has been added to the cart', () => {
    isGroupVisited = of(false);
    owner.type = CommonConfigurator.OwnerType.CART_ENTRY;
    expect(getCurrentResult()).toBe(true);
  });

  it('should return true because the current group was visited', () => {
    isGroupVisited = of(true);
    expect(getCurrentResult()).toBe(true);
  });

  it('should assemble values from a checkbox list into an attribute value', () => {
    const controlArray = new Array<UntypedFormControl>();
    const control1 = new UntypedFormControl(true);
    const control2 = new UntypedFormControl(false);
    controlArray.push(control1, control2);
    const attribute: Configurator.Attribute = {
      name: 'attr',
      values: [{ valueCode: 'b' }, { name: 'blue', valueCode: 'a' }],
    };

    const values: Configurator.Value[] =
      classUnderTest.assembleValuesForMultiSelectAttributes(
        controlArray,
        attribute
      );
    if (attribute.values) {
      expect(values.length).toBe(2);
      expect(values[0].valueCode).toBe(attribute.values[0].valueCode);
      expect(values[0].selected).toBe(true);
      expect(values[1].name).toBe(attribute.values[1].name);
      expect(values[1].selected).toBe(false);
    } else fail();
  });

  it('should gracefully handle situation that control array has values not present in attribute', () => {
    const controlArray = new Array<UntypedFormControl>();
    const control1 = new UntypedFormControl(true);
    const control2 = new UntypedFormControl(false);
    controlArray.push(control1, control2);
    const attribute: Configurator.Attribute = {
      name: 'attr',
      values: [{ name: 'blue', valueCode: 'a' }],
    };

    const values: Configurator.Value[] =
      classUnderTest.assembleValuesForMultiSelectAttributes(
        controlArray,
        attribute
      );
    expect(values.length).toBe(1);
  });

  it('should gracefully handle situation that no values are present: an empty array should be returned', () => {
    const controlArray = new Array<UntypedFormControl>();
    const control1 = new UntypedFormControl(true);
    controlArray.push(control1);
    const attribute: Configurator.Attribute = {
      name: 'attr',
    };

    const values: Configurator.Value[] =
      classUnderTest.assembleValuesForMultiSelectAttributes(
        controlArray,
        attribute
      );
    expect(values.length).toBe(0);
  });

  describe('scroll', () => {
    it('should handle situation that we are not in browser environment', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      classUnderTest['scroll'](fixture.debugElement.nativeElement);
      expect(windowRef.nativeWindow).toBeUndefined();
    });
  });

  describe('createOvGroupId', () => {
    it('should create a group id from its 1 parameter', () => {
      expect(classUnderTest.createOvGroupId(undefined, 'B')).toBe('B-ovGroup');
    });

    it('should create a group id from its 2 parameters', () => {
      expect(classUnderTest.createOvGroupId('A', 'B')).toBe('A--B-ovGroup');
    });
  });

  describe('createOvMenuItemId', () => {
    it('should create a menu item id from its 1 parameter', () => {
      expect(classUnderTest.createOvMenuItemId(undefined, 'B')).toBe(
        'B-ovMenuItem'
      );
    });

    it('should create a menu item id from its 2 parameters', () => {
      expect(classUnderTest.createOvMenuItemId('A', 'B')).toBe(
        'A--B-ovMenuItem'
      );
    });
  });

  describe('focusOnElementForConflicting', () => {
    it('should return focusable element if provided and attribute carries no values', () => {
      const attribute: Configurator.Attribute = { name: 'Name' };
      const foundFocusableElement = fixture.debugElement.nativeElement;
      expect(
        classUnderTest['focusOnElementForConflicting'](
          attribute,
          foundFocusableElement,
          []
        )
      ).toBe(foundFocusableElement);
    });
  });

  describe('Focused elements', () => {
    describe('focusFirstAttribute', () => {
      it('should delegate to keyboard focus service', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const focusedElements = createFocusedElements('ATTR', 2, 3);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
        classUnderTest.focusFirstAttribute();
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
      });

      it('should not delegate to keyboard focus service because form is undefined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(undefined);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue([]);
        classUnderTest.focusFirstAttribute();
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });

      it('should not delegate to keyboard focus service because there are no focused elements in form', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(false);
        spyOn(keyboardFocusService, 'findFocusable').and.callThrough();
        classUnderTest.focusFirstAttribute();
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });

      it('should not delegate to keyboard focus service because keyboard focus service returns no focusable elements', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const focusedElements = createFocusedElements('ATTR', 2, 3);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue([]);
        classUnderTest.focusFirstAttribute();
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
      });
    });

    describe('focusValue', () => {
      function createValue(name: string, isSelected: boolean) {
        const value: Configurator.Value = {
          valueCode: name,
          valueDisplay: name,
          name: name,
          selected: isSelected,
        };
        return value;
      }

      function spyFocusForFocusedElements(focusedElements: any) {
        focusedElements.forEach((focusedElement: any) => {
          spyOn(focusedElement, 'focus').and.callThrough();
        });
      }

      let attribute: Configurator.Attribute = {
        name: 'ATTR_1',
        uiType: Configurator.UiType.RADIOBUTTON,
        values: [],
      };

      beforeEach(() => {
        focusedElements = fixture.debugElement
          .queryAll(By.css('label'))
          .map((el) => el.nativeNode);

        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(focusedElements);
      });

      it('should not set focus because attribute does not contain any values', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );

        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);

        expect(focusedElements[0].focus).toHaveBeenCalled();
        expect(focusedElements[1].focus).not.toHaveBeenCalled();
        expect(focusedElements[2].focus).not.toHaveBeenCalled();
      });

      it('should set focus because attribute contains selected value', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );

        const value1 = createValue('value_1', false);
        const value2 = createValue('value_2', true);
        const value3 = createValue('value_3', false);
        attribute.values = [value1, value2, value3];

        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
        expect(focusedElements[0].focus).not.toHaveBeenCalled();
        expect(focusedElements[1].focus).toHaveBeenCalled();
        expect(focusedElements[2].focus).not.toHaveBeenCalled();
      });

      it('should set focus because on conflict description', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        focusedElements = [
          createNode('cx-configurator-conflict-description'),
        ].concat(focusedElements);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );

        const value1 = createValue('value_1', false);
        const value2 = createValue('value_2', true);
        const value3 = createValue('value_3', false);
        attribute.values = [value1, value2, value3];

        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
        expect(focusedElements[0].focus).toHaveBeenCalled();
        expect(focusedElements[1].focus).not.toHaveBeenCalled();
        expect(focusedElements[2].focus).not.toHaveBeenCalled();
        expect(focusedElements[3].focus).not.toHaveBeenCalled();
      });

      it('should not set focus because no focused element is found', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
        attribute.name = 'NO_ATTR_2';

        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
        expect(focusedElements[0].focus).not.toHaveBeenCalled();
        expect(focusedElements[1].focus).not.toHaveBeenCalled();
        expect(focusedElements[2].focus).not.toHaveBeenCalled();
      });

      it('should not set focus because form is not defined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(undefined);

        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
        expect(focusedElements[0].focus).not.toHaveBeenCalled();
        expect(focusedElements[1].focus).not.toHaveBeenCalled();
        expect(focusedElements[2].focus).not.toHaveBeenCalled();
      });

      it('should not set focus because browser context is not defined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(false);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );

        classUnderTest.focusValue(attribute);
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
        expect(focusedElements[0].focus).not.toHaveBeenCalled();
        expect(focusedElements[1].focus).not.toHaveBeenCalled();
        expect(focusedElements[2].focus).not.toHaveBeenCalled();
      });
    });
  });

  describe('createGroupId', () => {
    it('should return empty string because group ID is undefined', () => {
      expect(classUnderTest.createGroupId(undefined)).toBeUndefined();
    });

    it('should return group ID string', () => {
      expect(classUnderTest.createGroupId('1234')).toBe('1234-group');
    });
  });

  describe('setFocus', () => {
    it('should not call keyboard focus service to set focus because no parameters are defined', () => {
      spyOn(keyboardFocusService, 'set').and.callThrough();
      classUnderTest.setFocus();
      expect(keyboardFocusService.set).toHaveBeenCalledTimes(0);
    });

    it('should not call keyboard focus service to set focus because key is not defined', () => {
      spyOn(keyboardFocusService, 'set').and.callThrough();
      classUnderTest.setFocus(undefined, 'GR_01');
      expect(keyboardFocusService.set).toHaveBeenCalledTimes(0);
    });

    it('should call keyboard focus service to set focus because key is defined', () => {
      spyOn(keyboardFocusService, 'set').and.callThrough();
      classUnderTest.setFocus('key');
      expect(keyboardFocusService.set).toHaveBeenCalledTimes(1);
    });
  });

  describe('change styling of selected element', () => {
    it('should not get HTML element based on query selector', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getElement('elementMock')).toBeUndefined();
    });

    it('should get HTML element based on query selector', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const theElement = document.createElement('elementMock');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(theElement);

      expect(classUnderTest.getElement('elementMock')).toEqual(theElement);
    });

    it('should change styling of HTML element', () => {
      const theElement = document.createElement('elementMock');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(undefined);

      classUnderTest.changeStyling('elementMock', 'position', 'sticky');
      expect(theElement.style.position).not.toEqual('sticky');
    });

    it('should change styling of HTML element', () => {
      const theElement = document.createElement('elementMock');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(theElement);

      classUnderTest.changeStyling('elementMock', 'position', 'sticky');
      expect(theElement.style.position).toEqual('sticky');
    });
  });

  describe('getElements', () => {
    it('should not get HTML elements based on query selector', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getElements('elementMock')).toBeUndefined();
    });

    function createElements(
      tagName: string,
      amountOfElement: number
    ): Array<HTMLElement> {
      const nodes: Array<HTMLElement> = [];
      for (let index = 0; index < amountOfElement; index++) {
        const element = document.createElement(tagName);
        element.id = index + '-' + tagName;
        nodes.push(element);
      }
      return nodes;
    }

    it('should return HTML element based on query selector', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const elements: Array<HTMLElement> = createElements('section', 10);

      document.querySelectorAll = jasmine
        .createSpy('section')
        .and.returnValue(elements);

      const result = Array.from(classUnderTest.getElements('section'));
      expect(result.length).toEqual(elements.length);
      expect(result).toEqual(elements);
    });
  });

  describe('getScrollY', () => {
    it('should return undefined', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getScrollY()).toBeUndefined();
    });

    it('should return number of pixels that the document is currently scrolled vertically', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      spyOnProperty(window, 'scrollY').and.returnValue(250);
      const nativeWindow = windowRef.nativeWindow;
      if (nativeWindow) {
        expect(classUnderTest.getScrollY()).toBe(250);
      }
    });
  });

  describe('isScrollBox', () => {
    it('should return false because element is undefined', () => {
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(undefined);

      expect(classUnderTest.isScrollBox('elementMock')).toBe(false);
    });

    it('should return false because element scrollHeight is not larger than element clientHeight', () => {
      const form = htmlElem.querySelector(
        'cx-configurator-form'
      ) as HTMLElement;
      const labels: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('label')
      );
      labels.forEach((label) => {
        label.style.padding = '5px';
        label.style.height = '10px';
      });
      form.style.padding = '25px';
      form.style.height = '50px';
      expect(classUnderTest.isScrollBox('cx-configurator-form')).toBe(false);
    });

    it('should return true because element scrollHeight is larger than element clientHeight', () => {
      const form = htmlElem.querySelector(
        'cx-configurator-form'
      ) as HTMLElement;
      const labels: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('label')
      );
      labels.forEach((label) => {
        label.style.padding = '25px';
        label.style.height = '50px';
      });
      form.style.padding = '25px';
      form.style.height = '50px';
      form.style.display = 'flex';
      form.style.flexDirection = 'column';

      expect(classUnderTest.isScrollBox('cx-configurator-form')).toBe(true);
    });
  });

  describe('isInViewport', () => {
    let form;
    let labels: HTMLElement[];

    beforeEach(() => {
      form = htmlElem.querySelector('cx-configurator-form') as HTMLElement;
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

    it('should return true because clientHeight of element is known', () => {
      form.style.display = 'flex';
      form.style.flexDirection = 'column';

      spyOnProperty(window, 'innerWidth').and.returnValue(undefined);

      expect(classUnderTest['isInViewport'](form)).toBe(true);
    });
  });

  describe('getElementHeight', () => {
    let form;

    beforeEach(() => {
      form = htmlElem.querySelector('cx-configurator-form') as HTMLElement;
      form.style.padding = '25px';
      form.style.height = '50px';
      form.style.border = 'thick double #32a1ce;';

      spyOn(form, 'getBoundingClientRect').and.returnValue(
        new DOMRect(100, 100, 250, 500)
      );
    });

    it('should return zero because no element is found by a selector query', () => {
      expect(classUnderTest['getElementHeight']('unknown-query')).toBe(0);
    });

    it('should return zero because form is not im viewport', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(100);

      expect(classUnderTest['getElementHeight']('cx-configurator-form')).toBe(
        0
      );
    });

    it('should return offsetHeight of the element because form is not im viewport', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1000);

      expect(
        classUnderTest['getElementHeight']('cx-configurator-form')
      ).toBeGreaterThan(0);
    });
  });

  describe('getViewportHeight', () => {
    let spaHeader;
    let ovHeader;
    let addToCart;

    afterEach(() => {
      remove(spaHeader);
      remove(ovHeader);
      remove(addToCart);
    });

    function createTestData() {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      spaHeader = document.createElement('header');
      document.body.append(spaHeader);

      ovHeader = document.createElement('cx-page-slot');
      ovHeader.className = 'VariantConfigOverviewHeader';
      document.body.append(ovHeader);

      addToCart = document.createElement('cx-configurator-add-to-cart-button');
      document.body.append(addToCart);

      spyOnProperty(window, 'innerWidth').and.returnValue(1000);
    }

    it('should return zero because isBrowser is undefined', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getViewportHeight()).toBe(0);
    });

    it('should return viewport height when addToCartHeight equals zero', () => {
      createTestData();
      expect(classUnderTest.getViewportHeight()).toBeGreaterThan(0);
    });

    it('should return viewport height when addToCartHeight is greater than zero', () => {
      createTestData();
      addToCart.style.padding = '20px';
      addToCart.style.height = '80px';
      spyOn(addToCart, 'getBoundingClientRect').and.returnValue(
        new DOMRect(100, 100, 1000, 80)
      );

      expect(classUnderTest.getViewportHeight()).toBeGreaterThan(0);
    });
  });

  describe('syncScroll', () => {
    let ovMenu;
    let menuItem;

    afterEach(() => {
      remove(ovMenu);
      remove(menuItem);
    });

    function createTestData(offsetHeight: number, offsetTop: number) {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      ovMenu = document.createElement('cx-configurator-overview-menu');
      document.body.append(ovMenu);
      spyOnProperty(ovMenu, 'offsetTop').and.returnValue(250);
      spyOnProperty(ovMenu, 'offsetHeight').and.returnValue(offsetHeight);
      spyOnProperty(ovMenu, 'scrollTop').and.returnValue(150);

      menuItem = document.createElement('button');
      document.body.append(menuItem);
      menuItem.className = 'cx-menu-item';

      spyOn(menuItem, 'getBoundingClientRect').and.returnValue(
        new DOMRect(100, 100, 100, 25)
      );
      spyOnProperty(menuItem, 'offsetTop').and.returnValue(offsetTop);
      spyOnProperty(menuItem, 'offsetHeight').and.returnValue(50);
    }

    it('should not sync scrolling', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      ovMenu = document.createElement('cx-configurator-overview-menu');
      document.querySelector = jasmine
        .createSpy('HTML Element')
        .and.returnValue(ovMenu);
      classUnderTest.syncScroll('cx-configurator-overview-menu', undefined);
      expect(ovMenu.scrollTop).toBe(0);
    });

    it('should sync scrolling when element.offsetTop is less than container.scrollTop', () => {
      createTestData(150, 50);
      classUnderTest.syncScroll('cx-configurator-overview-menu', menuItem);
      ovMenu = document.querySelector('cx-configurator-overview-menu');
      expect(ovMenu.scrollTop).toBeGreaterThan(0);
    });

    it('should sync scrolling when element.offsetTop is greater than container.scrollTop', () => {
      createTestData(100, 250);
      classUnderTest.syncScroll('cx-configurator-overview-menu', menuItem);
      ovMenu = document.querySelector('cx-configurator-overview-menu');
      expect(ovMenu.scrollTop).toBeGreaterThan(0);
    });
  });
});
