import { Component, CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  Product,
  ProductService,
  RouterState,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { KeyboardFocusService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorStorefrontUtilsService } from './configurator-storefront-utils.service';

let mockedWindow: {
  innerWidth?: number;
  innerHeight?: number;
  scrollY?: number;
  scroll(): void;
} = {
  innerWidth: 1000,
  innerHeight: 1000,
  scrollY: 1000,
  scroll() {},
};
class MockedWindowRef extends WindowRef {
  get nativeWindow(): Window | undefined {
    return this.isBrowser() ? <any>mockedWindow : undefined;
  }
}

let isGroupVisited: Observable<boolean> = of(false);
const testSelector = 'test-configurator-overview-menu';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';
const mockRouterStateTemplate: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
      displayOnly: false,
    },
    queryParams: {},
    semanticRoute: CONFIGURATOR_ROUTE,
  },
};

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
  return document.createElement(name);
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

@Component({
  selector: 'cx-configurator',
  template: `
    <cx-configurator-form>
      <label id="ATTR_1--value_1">value_1</label>
      <label id="ATTR_1--value_2">value_2</label>
      <label id="ATTR_1--value_3">value_3</label>
    </cx-configurator-form>
  `,
  standalone: false,
})
class MockComponent {}

let routerStateObservable: any = null;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }

  go() {}
}

let product: Product;

class MockProductService {
  get(): Observable<Product> {
    return of(product);
  }
}

describe('ConfiguratorStorefrontUtilsService', () => {
  let classUnderTest: ConfiguratorStorefrontUtilsService;
  let fixture: ComponentFixture<MockComponent>;
  let htmlElem: HTMLElement;
  let focusedElements: any;
  let mockRouterState: any;
  const owner = ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    'testProduct'
  );
  let windowRef: WindowRef;
  let keyboardFocusService: KeyboardFocusService;

  beforeEach(() => {
    mockRouterState = structuredClone(mockRouterStateTemplate);
    routerStateObservable = of(mockRouterState);

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
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        { provide: WindowRef, useClass: MockedWindowRef },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    classUnderTest = TestBed.inject(ConfiguratorStorefrontUtilsService);
    fixture = TestBed.createComponent(MockComponent);
    htmlElem = fixture.nativeElement;
    windowRef = TestBed.inject(WindowRef);
    mockedWindow.innerHeight = 1000;
    mockedWindow.innerWidth = 1000;
    mockedWindow.scrollY = 1000;
    keyboardFocusService = TestBed.inject(
      KeyboardFocusService as Type<KeyboardFocusService>
    );
  });

  afterEach(() => {
    if (htmlElem) {
      document.body.removeChild(htmlElem);
    }
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
    spyOn(windowRef.document, 'querySelector').and.returnValue(theElement);
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
    it('should create a group id for a child group with prefix', () => {
      expect(classUnderTest.createOvGroupId('A', 'B')).toBe('A--B-ovGroup');
    });
  });

  describe('createOvMenuItemId', () => {
    it('should create a menu item id for a child group with prefix', () => {
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
    describe('focusFirstActiveElement', () => {
      it('should delegate to keyboard focus service', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const focusedElements = createFocusedElements('ATTR', 2, 3);
        spyOn(windowRef.document, 'querySelector').and.returnValue(
          focusedElements[0]
        );
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
        classUnderTest.focusFirstActiveElement('elementSelector');
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
      });

      it('should not delegate to keyboard focus service because form is undefined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        spyOn(windowRef.document, 'querySelector').and.returnValue(undefined);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue([]);
        classUnderTest.focusFirstActiveElement('elementSelector');
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });

      it('should not delegate to keyboard focus service because there are no focused elements in form', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(false);
        spyOn(keyboardFocusService, 'findFocusable').and.callThrough();
        classUnderTest.focusFirstActiveElement('elementSelector');
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });

      it('should not delegate to keyboard focus service because keyboard focus service returns no focusable elements', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const focusedElements = createFocusedElements('ATTR', 2, 3);
        spyOn(windowRef.document, 'querySelector').and.returnValue(
          focusedElements[0]
        );
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue([]);
        classUnderTest.focusFirstActiveElement('elementSelector');
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
      });
    });

    describe('focusValue', () => {
      let attribute: Configurator.Attribute;

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

      function verify(
        focusedElements: any,
        haveBeenCalledTimes = 0,
        focusedElementIndex?: number
      ): void {
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(
          haveBeenCalledTimes
        );

        focusedElements.forEach((focusedElement: any, index: number) => {
          if (index === focusedElementIndex) {
            expect(focusedElement.focus).toHaveBeenCalled();
          } else {
            expect(focusedElement.focus).not.toHaveBeenCalled();
          }
        });
      }

      beforeEach(() => {
        attribute = {
          name: 'ATTR_1',
          uiType: Configurator.UiType.RADIOBUTTON,
          values: [],
        };
        focusedElements = fixture.debugElement
          .queryAll(By.css('label'))
          .map((el) => el.nativeNode);
        spyOn(windowRef.document, 'querySelector').and.returnValue(
          focusedElements
        );
      });

      it('should set focus because attribute exists', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );

        classUnderTest.focusValue(attribute);
        verify(focusedElements, 1, 0);
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
        verify(focusedElements, 1, 1);
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
        verify(focusedElements, 1, 0);
      });

      it('should not set focus because no focused element is found', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
        attribute.name = 'NO_ATTR_2';

        classUnderTest.focusValue(attribute);
        verify(focusedElements, 1);
      });

      it('should not set focus because form is not defined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
        asSpy(windowRef.document.querySelector).and.returnValue(undefined);

        classUnderTest.focusValue(attribute);
        verify(focusedElements);
      });

      it('should not set focus because browser context is not defined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(false);
        spyFocusForFocusedElements(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );

        classUnderTest.focusValue(attribute);
        verify(focusedElements);
      });
    });
  });

  describe('getPrefixId', () => {
    it('should return group ID string', () => {
      expect(classUnderTest.getPrefixId(undefined, 'BBB')).toBe('cx--BBB');
    });

    it('should return prefix ID separated by 2 dashes and group ID string', () => {
      expect(classUnderTest.getPrefixId('AAA', 'BBB')).toBe('AAA--BBB');
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

  describe('getElement', () => {
    it('should not get HTML element based on query selector', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getElement('elementMock')).toBeUndefined();
    });

    it('should get HTML element based on query selector', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const theElement = document.createElement('elementMock');
      spyOn(windowRef.document, 'querySelector').and.returnValue(theElement);

      expect(classUnderTest.getElement('elementMock')).toEqual(theElement);
    });
  });

  describe('changeStyling', () => {
    it('should change styling of HTML element', () => {
      const theElement = document.createElement('elementMock');
      spyOn(windowRef.document, 'querySelector').and.returnValue(undefined);

      classUnderTest.changeStyling('elementMock', 'position', 'sticky');
      expect(theElement.style.position).not.toEqual('sticky');
    });

    it('should change styling of HTML element', () => {
      const theElement = document.createElement('elementMock');
      spyOn(windowRef.document, 'querySelector').and.returnValue(theElement);

      classUnderTest.changeStyling('elementMock', 'position', 'sticky');
      expect(theElement.style.position).toEqual('sticky');
    });
  });

  describe('removeStyling', () => {
    it('should not remove styling of HTML element', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const theElement = document.createElement('elementMock');
      theElement.style.position = 'sticky';
      spyOn(windowRef.document, 'querySelector').and.returnValue(undefined);

      classUnderTest.removeStyling('elementMock', 'position');
      expect(theElement.style.position).toEqual('sticky');
    });

    it('should remove styling of HTML element', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      const theElement = document.createElement('elementMock');
      theElement.style.position = 'sticky';
      spyOn(windowRef.document, 'querySelector').and.returnValue(theElement);

      classUnderTest.removeStyling('elementMock', 'position');
      expect(theElement.style.position).toBe('');
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

      spyOn(document, 'querySelectorAll').and.returnValue(<any>elements);

      const htmlElements = classUnderTest.getElements('section');

      if (htmlElements) {
        const result = Array.from(htmlElements);
        expect(result.length).toEqual(elements.length);
        expect(result).toEqual(elements);
      }
    });
  });

  describe('getVerticallyScrolledPixels', () => {
    it('should return undefined', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getVerticallyScrolledPixels()).toBeUndefined();
    });

    it('should return number of pixels that the document is currently scrolled vertically', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      mockedWindow.scrollY = 250;
      const nativeWindow = windowRef.nativeWindow;
      if (nativeWindow) {
        expect(classUnderTest.getVerticallyScrolledPixels()).toBe(250);
      }
    });
  });

  describe('hasScrollbar', () => {
    it('should return false because element is undefined', () => {
      spyOn(windowRef.document, 'querySelector').and.returnValue(undefined);

      expect(classUnderTest.hasScrollbar('elementMock')).toBe(false);
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
      expect(classUnderTest.hasScrollbar('cx-configurator-form')).toBe(false);
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

      expect(classUnderTest.hasScrollbar('cx-configurator-form')).toBe(true);
    });
  });

  describe('isInViewport', () => {
    let form: any;
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

      mockedWindow.innerWidth = 100;

      expect(classUnderTest['isInViewport'](form)).toBe(false);
    });

    it("should return true because window's innerWith is known", () => {
      form.style.display = 'flex';
      form.style.flexDirection = 'column';

      mockedWindow.innerWidth = 1000;

      expect(classUnderTest['isInViewport'](form)).toBe(true);
    });

    it('should return true because clientWidth of element is known and its right is less than its width', () => {
      form.style.display = 'flex';
      form.style.flexDirection = 'column';

      mockedWindow.innerWidth = undefined;

      expect(classUnderTest['isInViewport'](form)).toBe(true);
    });

    it('should return true because clientHeight of element is known and its bottom is less than its height', () => {
      form.style.display = 'flex';
      form.style.flexDirection = 'column';
      form.style.height = '1000px';

      mockedWindow.innerHeight = undefined;

      expect(classUnderTest['isInViewport'](form)).toBe(true);
    });
  });

  describe('getHeight', () => {
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
      expect(classUnderTest['getHeight']('unknown-query')).toBe(0);
    });

    it('should return zero because form is not in viewport', () => {
      mockedWindow.innerWidth = 100;

      expect(classUnderTest['getHeight']('cx-configurator-form')).toBe(0);
    });

    it('should return offsetHeight of the element because form is not in viewport', () => {
      mockedWindow.innerWidth = 1000;

      expect(
        classUnderTest['getHeight']('cx-configurator-form')
      ).toBeGreaterThan(0);
    });
  });

  describe('getSpareViewportHeight', () => {
    let spaHeader: any;
    let ovHeader: any;
    let addToCart: any;

    afterEach(() => {
      ConfiguratorTestUtils.remove(spaHeader);
      ConfiguratorTestUtils.remove(ovHeader);
      ConfiguratorTestUtils.remove(addToCart);
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

      mockedWindow.innerWidth = 1000;
    }

    it('should return zero because isBrowser is undefined', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getSpareViewportHeight()).toBe(0);
    });

    it('should return zero because isBrowser is undefined', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      expect(classUnderTest.getSpareViewportHeight()).toBe(0);
    });

    it('should return zero because nativeWindow is undefined', () => {
      spyOn(windowRef, 'isBrowser').and.returnValues(true, false);
      expect(classUnderTest.getSpareViewportHeight()).toBe(0);
    });

    it('should return viewport height when addToCartHeight equals zero', () => {
      createTestData();
      expect(classUnderTest.getSpareViewportHeight()).toBeGreaterThan(0);
    });

    it('should return viewport height when addToCartHeight is greater than zero', () => {
      createTestData();
      addToCart.style.padding = '20px';
      addToCart.style.height = '80px';
      spyOn(addToCart, 'getBoundingClientRect').and.returnValue(
        new DOMRect(100, 100, 1000, 80)
      );
      spyOn<any>(classUnderTest, 'getHeight').and.returnValue(100);

      expect(classUnderTest.getSpareViewportHeight()).toBeGreaterThan(0);
    });
  });

  describe('ensureElementVisible', () => {
    let ovMenu: any;
    let menuItem: any;

    afterEach(() => {
      ConfiguratorTestUtils.remove(ovMenu);
      ConfiguratorTestUtils.remove(menuItem);
    });

    function createTestData(offsetHeight: number, offsetTop: number) {
      const documentHeight = document
        .querySelector('html')
        ?.getBoundingClientRect();
      const height: number = documentHeight ? documentHeight.height : 0;
      const elementOffsetHeight = height - offsetHeight;
      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      ovMenu = document.createElement(testSelector);
      document.body.append(ovMenu);
      spyOnProperty(ovMenu, 'offsetHeight').and.returnValue(
        elementOffsetHeight
      );
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

    it('should not ensure visibility of the element', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      ovMenu = document.createElement('cx-configurator-overview-menu');
      spyOn(windowRef.document, 'querySelector').and.returnValue(ovMenu);
      classUnderTest.ensureElementVisible(
        'cx-configurator-overview-menu',
        undefined
      );
      expect(ovMenu.scrollTop).toBe(0);
    });

    it('should ensure visibility of the element when element.offsetTop is less than container.scrollTop', () => {
      createTestData(5500, 250);

      classUnderTest.ensureElementVisible(testSelector, menuItem);
      ovMenu = document.querySelector(testSelector);
      expect(ovMenu.scrollTop).toBeGreaterThan(0);
    });

    it('should ensure visibility of the element when element.offsetTop is greater than container.scrollTop', () => {
      createTestData(5000, 450);
      spyOnProperty(ovMenu, 'offsetTop').and.returnValue(250);
      classUnderTest.ensureElementVisible(testSelector, menuItem);
      ovMenu = document.querySelector(testSelector);
      expect(ovMenu.scrollTop).toBeGreaterThan(0);
    });

    it('should ensure visibility of the element when element.offsetTop is less than container.scrollTop', () => {
      createTestData(5000, 50);
      spyOnProperty(ovMenu, 'offsetTop').and.returnValue(50);
      classUnderTest.ensureElementVisible(testSelector, menuItem);
      ovMenu = document.querySelector(testSelector);
      expect(ovMenu.scrollTop).toBeGreaterThan(0);
    });
  });

  describe('isDisplayOnlyVariant', () => {
    it('should return `false` in case displayOnly property is `false`', () => {
      mockRouterState.state.params.displayOnly = false;
      mockRouterState.state.queryParams.productCode = PRODUCT_CODE;
      fixture.detectChanges();

      classUnderTest
        .isDisplayOnlyVariant()
        .subscribe((isDisplayOnlyVariant) => {
          expect(isDisplayOnlyVariant).toBe(false);
        })
        .unsubscribe();
    });

    it('should return `false` in case the product code is unknown', () => {
      mockRouterState.state.params.displayOnly = true;
      fixture.detectChanges();

      classUnderTest
        .isDisplayOnlyVariant()
        .subscribe((isDisplayOnlyVariant) => {
          expect(isDisplayOnlyVariant).toBe(false);
        })
        .unsubscribe();
    });

    it('should return `false` in case the product is `undefined`', () => {
      mockRouterState.state.params.displayOnly = true;
      mockRouterState.state.queryParams.productCode = undefined;
      fixture.detectChanges();

      classUnderTest
        .isDisplayOnlyVariant()
        .subscribe((isDisplayOnlyVariant) => {
          expect(isDisplayOnlyVariant).toBe(false);
        })
        .unsubscribe();
    });

    it('should return `true` in case the product is a variant product in the display only view', () => {
      mockRouterState.state.params.displayOnly = true;
      mockRouterState.state.queryParams.productCode = PRODUCT_CODE;
      product = {
        baseProduct: 'BASE' + PRODUCT_CODE,
      };
      fixture.detectChanges();

      classUnderTest
        .isDisplayOnlyVariant()
        .subscribe((isDisplayOnlyVariant) => {
          expect(isDisplayOnlyVariant).toBe(true);
        })
        .unsubscribe();
    });
  });

  describe('isLastSelected', () => {
    it('should return false if setLastSelected was never invoked', () => {
      expect(classUnderTest.isLastSelected('name', 'code')).toBe(false);
    });

    it('should return true if setLastSelected was invoked with same attribute name and value code before', () => {
      classUnderTest.setLastSelected('name', 'code');
      expect(classUnderTest.isLastSelected('name', 'code')).toBe(true);
    });

    it('should return false if attribute name does not fit', () => {
      classUnderTest.setLastSelected('other', 'code');
      expect(classUnderTest.isLastSelected('name', 'code')).toBe(false);
    });

    it('should return false if value code does not fit', () => {
      classUnderTest.setLastSelected('name', 'other');
      expect(classUnderTest.isLastSelected('name', 'code')).toBe(false);
    });
  });

  function asSpy(f: any) {
    return <jasmine.Spy>f;
  }
});
