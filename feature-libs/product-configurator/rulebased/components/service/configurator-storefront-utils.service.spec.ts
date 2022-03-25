import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
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

describe('ConfigUtilsService', () => {
  let classUnderTest: ConfiguratorStorefrontUtilsService;
  const owner = ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    'testProduct'
  );
  let windowRef: WindowRef;
  let keyboardFocusService: KeyboardFocusService;
  let querySelectorOriginal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
    classUnderTest = TestBed.inject(ConfiguratorStorefrontUtilsService);
    windowRef = TestBed.inject(WindowRef as Type<WindowRef>);
    keyboardFocusService = TestBed.inject(
      KeyboardFocusService as Type<KeyboardFocusService>
    );
    querySelectorOriginal = document.querySelector;
  });

  afterEach(() => {
    document.querySelector = querySelectorOriginal;
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

  it("should not scroll to element because browser set to 'false' of windowRef", () => {
    spyOn(windowRef, 'isBrowser').and.returnValue(true);
    const nativeWindow = windowRef.nativeWindow;
    if (nativeWindow) {
      spyOn(nativeWindow, 'scroll').and.callThrough();
      classUnderTest.scrollToConfigurationElement(
        '.VariantConfigurationTemplate'
      );

      expect(nativeWindow.scroll).toHaveBeenCalledTimes(0);
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
    const controlArray = new Array<FormControl>();
    const control1 = new FormControl(true);
    const control2 = new FormControl(false);
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
    const controlArray = new Array<FormControl>();
    const control1 = new FormControl(true);
    const control2 = new FormControl(false);
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

  describe('Focused elements', () => {
    function createElement(id: string): HTMLElement {
      const element = document.createElement('attribute');
      element.id = id;
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

    describe('focusAttribute', () => {
      it('should delegate to keyboard focus service', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const focusedElements = createFocusedElements('ATTR', 2, 3);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
        classUnderTest.focusAttribute('ATTR_2');
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
      });

      it('should not delegate to keyboard focus service because form is not defined', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(undefined);
        spyOn(keyboardFocusService, 'findFocusable').and.callThrough();
        classUnderTest.focusAttribute('ATTR_2');
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });

      it('should delegate to keyboard focus service but no focused element is found', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const focusedElements = createFocusedElements('ATTR', 2, 3);
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(focusedElements);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue(
          focusedElements
        );
        classUnderTest.focusAttribute('NO_ATTR_2');
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
      });

      it('should not delegate to keyboard focus service', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(false);
        spyOn(keyboardFocusService, 'findFocusable').and.callThrough();
        classUnderTest.focusAttribute('ATTR_2');
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(0);
      });

      it('should not delegate to keyboard focus service if there are no focused elements in form', () => {
        spyOn(windowRef, 'isBrowser').and.returnValue(true);
        const theElement = document.createElement('elementMock');
        document.querySelector = jasmine
          .createSpy('HTML Element')
          .and.returnValue(theElement);
        spyOn(keyboardFocusService, 'findFocusable').and.returnValue([]);
        classUnderTest.focusAttribute('ATTR_2');
        expect(keyboardFocusService.findFocusable).toHaveBeenCalledTimes(1);
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
});
